--CREATE DATABASE API_Notes
--use API_Notes

CREATE TABLE States(
	id int identity(1,1) primary key not null,
	stateName varchar(25) not null
);
CREATE TABLE Users(
	id int identity(1,1) not null primary key,
	sta int foreign key references States(id) not null,
	email varchar(250) not null,
	pass varchar(16) not null
);

CREATE TABLE Notes(
	id int identity(1,1) not null primary key,
	userOwner int foreign key references Users(id),
	sta int foreign key references States(id) not null,
	note varchar(max) not null
);
go

/*
	Procedure to create a new state.
	Param:
		@stateName varchar: New state you want to create.
	Selects:
		null: Returns null when @stateName param is null.
		-1: State name is repeated.
		_: id of the state created.
*/
CREATE OR ALTER PROCEDURE sp_create_State @stateName varchar(25) WITH ENCRYPTION
AS
BEGIN
	if @stateName is null
		begin
			SELECT null;
		end
	else if (SELECT count(stateName) FROM States WHERE stateName=@stateName )>0
		begin
			SELECT -1 as stateRepeated;
		end
	else
		begin
			INSERT INTO States(stateName) VALUES(@stateName)
			SELECT SCOPE_IDENTITY() as idStateCreated;--Selects the id of the state created.
		end
		/*
select * from States;

exec sp_create_State null;
exec sp_create_State 'Available';
exec sp_create_State 'Available';
exec sp_create_State 'Deleted';
*/
END
go




/*
	Procedure to create a new user.

	! Validate params before you execute this procedure.
	! Passoword param must be hashed.

	Params:
		@email varchar(250): Email of the user.
 		@password varchar(16): Password of the user.
	Selects:
		null: @email or @password params are null.
		-1: @email param is already registered by another user.
		_: Id of the created user.
*/
CREATE OR ALTER PROCEDURE sp_create_user @email varchar(250), @password varchar(16) WITH ENCRYPTION
AS 
BEGIN
	if @email is null or @password is null
		begin
			SELECT null;
		end
	else if (select count(email) from Users where email=@email)>0
		begin
			SELECT -1 as emailRepeated;
		end
	else
		begin
			--sta 1: Available
			INSERT INTO Users(sta,email,pass) VALUES(1,@email,@password);
			SELECT SCOPE_IDENTITY() as idUserCreated;--Selects the id of the user created.
		end
		/*
select * from Users;
exec sp_create_user null,null;
exec sp_create_user 'felipeobando@estudiantec.cr','password';
exec sp_create_user 'felipeobando@estudiantec.cr','password';
exec sp_create_user 'correoalterno@gmail.com','password2';
*/
END
go



/*
	Procedure to create a new note.
	
	Params:
		@userOwner int: id of the owner of the note to be created.
		@note varchar(max): Message of the note to be created.
	Selects:
		null: @userOwner is null or @note is null.
		-1: User owner not found.
		_: id of the note created.
*/
CREATE OR ALTER PROCEDURE sp_create_note @userOwner int,@note varchar(max) WITH ENCRYPTION
AS
BEGIN
	if @userOwner is null or @note is null
		begin
			SELECT NULL;
		end
	else if (select count(email) from Users where id=@userOwner)=0
		begin
			SELECT -1 as userNotFound;
		end
	else
		begin
			INSERT INTO Notes(userOwner,sta,note) values(@userOwner,1,@note);
			SELECT SCOPE_IDENTITY() as idNoteCreated;--Selects the id of the created note.
		end
		/*
select * from Notes;
exec sp_create_note null,null;
exec sp_create_note null,'';
exec sp_create_note '',null;
exec sp_create_note 100,'hola';
exec sp_create_note 1,'Probando proc de notas.';
exec sp_create_note 2,'Probando proc de notas 2.';
exec sp_create_note 2,'Probando proc de notas 3.';
*/

END
go




/*
	Procedure to update a note.
	Params:
		@id int: id of the note to be updated.
		@newNote varchar(max): New note to replace the actual note.
	Selects:
		null: @id is null or @newNote is null.
		-1: Note not found.
		_: id of the note updated.
*/
CREATE OR ALTER PROCEDURE sp_update_note @id int,@newNote varchar(max) WITH ENCRYPTION
AS
BEGIN
	if @id is null or @newNote is null
		begin
			SELECT NULL;
		end
	else if (select count(id) from Notes where id=@id)=0
		begin
			SELECT -1 as noteNotFound;
		end
	else
		begin
			UPDATE Notes set note = @newNote where id=@id;
			SELECT @id as idNoteUpdated
		end
		/*
select * from Notes;
exec sp_update_note null,null;
exec sp_update_note null,'';
exec sp_update_note '',null;
exec sp_update_note 100,'';
exec sp_update_note 1,'Note was updated.';
*/
END
go



/*
	Procedure to delete a note.
	Params:
		@id int: id of the note to be deleted.
	Selects:
		null: @id is null.
		-1: Note not found.
		_: id of the deleted note.
*/
CREATE OR ALTER PROCEDURE sp_delete_note @id int WITH ENCRYPTION
AS
BEGIN
	if @id is null
		begin
			SELECT NULL;
		end
	else if (select count(id) from Notes where id=@id)=0
		begin
			SELECT -1 as noteNotFound;
		end
	else
		begin
			UPDATE Notes set sta=2 where id=@id;
			SELECT @id as idNoteDeleted;
		end
		/*
select * from States;
select * from Notes;
exec sp_delete_note null;
exec sp_delete_note 100;
exec sp_delete_note 1;
*/
END
go



/*
	Procedure to read all notes of an user.
	Params:
		@userOwner int: id of the user owner of the notes.
	Selects: 
		null: @userOwner is null.
		-1: user not found.
		_: All notes of the user owner.

*/
CREATE OR ALTER PROCEDURE sp_read_notes @userOwner int WITH ENCRYPTION
AS 
BEGIN
	if @userOwner is null
		begin
			SELECT null;
		end
	else if (select count(id) from Users where id=@userOwner)=0
		begin
			SELECT -1 as userNotFound;
		end
	else
		begin
			SELECT N.id as idNote,
					N.note,
					userOwner as idOwner,
					U.email as emailOwner 
			FROM Notes as N
			INNER JOIN Users as U on U.id = N.userOwner
			WHERE U.id=@userOwner and N.sta=1;
		end
		/*
select * from Notes
select * from Users
exec sp_read_notes null;
exec sp_read_notes 100;
exec sp_read_notes 1;
exec sp_read_notes 2;
*/
END
go

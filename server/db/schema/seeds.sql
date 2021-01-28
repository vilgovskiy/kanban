insert into users (name, password)
values ('admin','admin'), ('user','user'), ('test','test')

insert into boards (name, owner)
values ('First Board', 1), ('Second Board', 1), ('User board', 2), ('Admin board', 1), ('Everyones board', 2)

insert into boards_members (board_id, user_id)
values (1,1), (1,2), (1,3), (2,1), (2,3), (3,2), (3,3), (4,1), (5,1), (5,2), (5,3)
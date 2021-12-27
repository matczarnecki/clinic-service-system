create table authorities
(
    code varchar(255) not null
        primary key,
    description varchar(255) null,
    name varchar(255) null
);

create table roles
(
    code varchar(255) not null
        primary key,
    name varchar(255) null
);

create table role_authorities
(
    role_code varchar(255) not null,
    authority_code varchar(255) not null,
    primary key (role_code, authority_code),
    constraint FK3ssyof1h3h7vr219wi7j4e908
        foreign key (role_code) references roles (code),
    constraint FK55lwbdg73kvilpefcrt6lusx5
        foreign key (authority_code) references authorities (code)
);

create table users
(
    id int auto_increment
        primary key,
    email_address varchar(255) null,
    first_name varchar(255) null,
    is_active bit not null,
    last_name varchar(255) null,
    password varchar(255) null,
    username varchar(255) null,
    role varchar(255) null,
    constraint FK4c6vlshk8x83ifeoggi3exg3k
        foreign key (role) references roles (code)
);

INSERT into roles(code, name) VALUES ('ADM', 'ADMIN');
INSERT into roles(code, name) VALUES ('DOC', 'DOCTOR');
INSERT into roles(code, name) VALUES ('REG', 'REGISTRANT');

INSERT into authorities(code, description, name) VALUES ('CAN_SEE_USERS', 'Viewing users', 'CAN SEE USERS');
INSERT into authorities(code, description, name) VALUES ('CAN_SEE_ROLES', 'Viewing roles', 'CAN SEE ROLES');
INSERT into authorities(code, description, name) VALUES ('CAN_EDIT_USERS', 'Editing users', 'CAN EDIT USERS');
INSERT into role_authorities(role_code, authority_code) VALUES ('ADM', 'CAN_SEE_USERS');
INSERT into role_authorities(role_code, authority_code) VALUES ('ADM', 'CAN_SEE_ROLES');
INSERT into role_authorities(role_code, authority_code) VALUES ('ADM', 'CAN_EDIT_USERS');

insert into users (id, email_address, is_active, password, username, role)
values (1, 'admin@admin.pl', true, '31d4fa9d861597e8b86a331b', 'admin', 'ADM');
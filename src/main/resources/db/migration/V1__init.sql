create table authorities
(
    code        varchar(255) not null
        primary key,
    description varchar(255) null,
    name        varchar(255) null
);

create table roles
(
    code varchar(255) not null
        primary key,
    name varchar(255) null
);

create table role_authorities
(
    role_code      varchar(255) not null,
    authority_code varchar(255) not null,
    primary key (role_code, authority_code),
    constraint FK3ssyof1h3h7vr219wi7j4e908
        foreign key (role_code) references roles (code),
    constraint FK55lwbdg73kvilpefcrt6lusx5
        foreign key (authority_code) references authorities (code)
);

create table users
(
    id            int auto_increment
        primary key,
    email_address varchar(255) null,
    first_name    varchar(255) null,
    is_active     bit          not null,
    last_name     varchar(255) null,
    password      varchar(255) null,
    username      varchar(255) null,
    role          varchar(255) null,
    constraint FK4c6vlshk8x83ifeoggi3exg3k
        foreign key (role) references roles (code)
);

CREATE TABLE patients
(
    id         INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(255)       NOT NULL,
    last_name  VARCHAR(255)       NOT NULL,
    CONSTRAINT pk_patients PRIMARY KEY (id)
);

CREATE TABLE appointments
(
    id               INT AUTO_INCREMENT NOT NULL,
    appointment_time datetime           NULL,
    doctor_id        INT                NULL,
    patient_id       INT                NULL,
    status           VARCHAR(255)       NULL,
    diagnosis        VARCHAR(255)       NULL,
    CONSTRAINT pk_appointments PRIMARY KEY (id)
);

ALTER TABLE appointments
    ADD CONSTRAINT FK_APPOINTMENTS_ON_DOCTOR FOREIGN KEY (doctor_id) REFERENCES users (id);

ALTER TABLE appointments
    ADD CONSTRAINT FK_APPOINTMENTS_ON_PATIENT FOREIGN KEY (patient_id) REFERENCES patients (id);

INSERT into roles(code, name)
VALUES ('ADM', 'ADMIN');
INSERT into roles(code, name)
VALUES ('DOC', 'DOCTOR');
INSERT into roles(code, name)
VALUES ('REG', 'REGISTRANT');

INSERT into authorities(code, description, name)
VALUES ('CAN_SEE_USERS', 'Viewing users', 'CAN SEE USERS');
INSERT into authorities(code, description, name)
VALUES ('CAN_SEE_ROLES', 'Viewing roles', 'CAN SEE ROLES');
INSERT into authorities(code, description, name)
VALUES ('CAN_EDIT_USERS', 'Editing users', 'CAN EDIT USERS');
INSERT into authorities(code, description, name)
VALUES ('CAN_SEE_APPOINTMENTS', 'Viewing appointments (without diagnosis)', 'CAN SEE APPOINTMENTS');
INSERT into authorities(code, description, name)
VALUES ('CAN_ADD_APPOINTMENTS', 'Adding appointments', 'CAN ADD APPOINTMENTS');
INSERT into authorities(code, description, name)
VALUES ('CAN_CANCEL_APPOINTMENTS', 'Canceling appointments', 'CAN CANCEL APPOINTMENTS');
INSERT into authorities(code, description, name)
VALUES ('CAN_SEE_PATIENTS', 'Viewing patients', 'CAN SEE PATIENTS');
INSERT into authorities(code, description, name)
VALUES ('CAN_ADD_PATIENTS', 'Adding patients', 'CAN ADD PATIENTS');
INSERT into authorities(code, description, name)
VALUES ('CAN_SEE_DOCTORS', 'Viewing doctors', 'CAN SEE DOCTORS');

INSERT into role_authorities(role_code, authority_code)
VALUES ('ADM', 'CAN_SEE_USERS');
INSERT into role_authorities(role_code, authority_code)
VALUES ('ADM', 'CAN_SEE_ROLES');
INSERT into role_authorities(role_code, authority_code)
VALUES ('ADM', 'CAN_EDIT_USERS');
INSERT into role_authorities(role_code, authority_code)
VALUES ('REG', 'CAN_SEE_APPOINTMENTS');
INSERT into role_authorities(role_code, authority_code)
VALUES ('REG', 'CAN_CANCEL_APPOINTMENTS');
INSERT into role_authorities(role_code, authority_code)
VALUES ('REG', 'CAN_ADD_APPOINTMENTS');
INSERT into role_authorities(role_code, authority_code)
VALUES ('REG', 'CAN_SEE_PATIENTS');
INSERT into role_authorities(role_code, authority_code)
VALUES ('REG', 'CAN_ADD_PATIENTS');
INSERT into role_authorities(role_code, authority_code)
VALUES ('REG', 'CAN_SEE_DOCTORS');

insert into users (id, email_address, is_active, password, username, role, first_name, last_name)
values (1, 'admin@admin.pl', true, '31d4fa9d861597e8b86a331b', 'admin', 'ADM', 'Pan', 'Admin');
insert into users (id, email_address, is_active, password, username, role, first_name, last_name)
values (2, 'doctor@doctor.pl', true, '31d4fa9d861597e8b86a331b', 'doctor', 'DOC', 'Pan', 'Doktor');
insert into users (id, email_address, is_active, password, username, role, first_name, last_name)
values (3, 'registrant@registrant.pl', true, '31d4fa9d861597e8b86a331b', 'registrant', 'REG', 'Pan', 'Rejestrator');

insert into patients(id, first_name, last_name)
values (1, 'John', 'Smith');

insert into appointments(id, appointment_time, doctor_id, patient_id, status, diagnosis)
values (1, now(), 2, 1, 'SCHEDULED', NULL)



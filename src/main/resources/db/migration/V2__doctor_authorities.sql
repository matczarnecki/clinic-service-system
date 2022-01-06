INSERT into authorities(code, description, name)
VALUES ('CAN_SEE_FULL_APPOINTMENTS', 'Viewing appointments', 'CAN SEE FULL APPOINTMENTS');

INSERT into authorities(code, description, name)
VALUES ('CAN_SEE_PATIENT_APPOINTMENTS', 'Viewing patient appointments', 'CAN SEE PATIENT APPOINTMENTS');

INSERT into authorities(code, description, name)
VALUES ('CAN_MAKE_APPOINTMENTS', 'Making appointments', 'CAN MAKE APPOINTMENTS');

INSERT into role_authorities(role_code, authority_code)
VALUES ('DOC', 'CAN_SEE_FULL_APPOINTMENTS');

INSERT into role_authorities(role_code, authority_code)
VALUES ('DOC', 'CAN_SEE_PATIENT_APPOINTMENTS');

INSERT into role_authorities(role_code, authority_code)
VALUES ('DOC', 'CAN_MAKE_APPOINTMENTS');

INSERT into role_authorities(role_code, authority_code)
VALUES ('DOC', 'CAN_CANCEL_APPOINTMENTS');

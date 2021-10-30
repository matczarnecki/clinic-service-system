INSERT INTO authorities (name, description) VALUES ('CAN_SEE_USERS', 'Can see users');
INSERT INTO authorities (name, description) VALUES ('CAN_SEE_EXCEPTION_MESSAGES', 'Can see exception messages');

INSERT INTO roles (name) VALUES ('ROLE_ADMIN');
INSERT INTO roles (name) VALUES ('ROLE_USER');

INSERT INTO role_authorities (role_id, authority_id) VALUES (1, 1);
INSERT INTO role_authorities (role_id, authority_id) VALUES (1, 2);

INSERT INTO users (email_address, is_active, password, username) VALUES ('admin@polsl.com', true, '975e351d47df73e0b479719c', 'admin')

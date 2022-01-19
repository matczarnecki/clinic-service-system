ALTER TABLE users
    ADD is_blocked BIT DEFAULT 0,
    ADD number_of_failed_logins INT DEFAULT 0;

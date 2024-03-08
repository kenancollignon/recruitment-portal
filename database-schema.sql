CREATE TABLE IF NOT EXISTS recruitment_process (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS organization (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    process_id INT,
    FOREIGN KEY (process_id) REFERENCES recruitment_process(id)
);

CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    netid VARCHAR(255),
    active BOOLEAN
);

CREATE TABLE IF NOT EXISTS event (
    id INT PRIMARY KEY,
    location VARCHAR(255),
    time DATETIME,
    duration TIME,
    description VARCHAR(255),
    invited_users INT,
    FOREIGN KEY (invited_users) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS note (
    id INT PRIMARY KEY,
    body VARCHAR(255),
    author INT,
    event INT,
    FOREIGN KEY (author) REFERENCES user(id),
    FOREIGN KEY (event) REFERENCES event(id)
);

CREATE TABLE IF NOT EXISTS message (
    id INT PRIMARY KEY,
    body VARCHAR(255),
    timestamp TIMESTAMP,
    subject VARCHAR(255),
    chain_id INT,
    sender_id INT,
    FOREIGN KEY (chain_id) REFERENCES message_chain(id),
    FOREIGN KEY (sender_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS message_recipient (
    id INT PRIMARY KEY,
    recipient_id INT,
    group_id INT,
    message_id INT,
    FOREIGN KEY (recipient_id) REFERENCES user(id),
    FOREIGN KEY (group_id) REFERENCES message_group(id),
    FOREIGN KEY (message_id) REFERENCES message(id)
);

CREATE TABLE IF NOT EXISTS message_chain (
    id INT PRIMARY KEY,
    subject VARCHAR(255),
    last_message_date DATETIME
);

CREATE TABLE IF NOT EXISTS group_table (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS message_group (
    id INT PRIMARY KEY,
    user_id INT,
    group_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (group_id) REFERENCES group_table(id)
);

CREATE TABLE IF NOT EXISTS status (
    status_code INT PRIMARY KEY,
    status_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS user_processes (
    process_id INT,
    user_id INT,
    status_id INT,
    FOREIGN KEY (process_id) REFERENCES recruitment_process(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (status_id) REFERENCES status(status_code)
);

CREATE TABLE IF NOT EXISTS user_organizations (
    user_id INT,
    organization_id INT,
    role VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (organization_id) REFERENCES organization(id)
);

CREATE TABLE IF NOT EXISTS organization_events (
    organization_id INT,
    event_id INT,
    FOREIGN KEY (organization_id) REFERENCES organization(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

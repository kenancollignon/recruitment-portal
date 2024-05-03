CREATE TABLE IF NOT EXISTS recruitment_process (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS organization (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    process_id INT,
    FOREIGN KEY (process_id) REFERENCES recruitment_process(id)
);

CREATE TABLE IF NOT EXISTS user (
    net_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    organizations INT,
    processes INT,
    statuses INT
);

CREATE TABLE IF NOT EXISTS event (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(255),
    time TIME,
    duration TIME,
    organization_id INT,
    description VARCHAR(255),
    FOREIGN KEY (organization_id) REFERENCES organization(id)
    
);

CREATE TABLE IF NOT EXISTS event_invitee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_net_id VARCHAR(255),
    event_id INT,
    invitee_status INT,
    FOREIGN KEY (user_net_id) REFERENCES user(net_id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE IF NOT EXISTS note (
    id INT AUTO_INCREMENT PRIMARY KEY,
    body VARCHAR(255),
    author_net_id VARCHAR(255),
    event_id INT,
    FOREIGN KEY (author_net_id) REFERENCES user(net_id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE IF NOT EXISTS message_chain (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255),
    last_message DATETIME
);

CREATE TABLE IF NOT EXISTS message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    body VARCHAR(255),
    timestamp DATETIME,
    tag VARCHAR(255),
    sender_net_id VARCHAR(255),
    chain_id INT,
    FOREIGN KEY (sender_net_id) REFERENCES user(net_id),
    FOREIGN KEY (chain_id) REFERENCES message_chain(id)
);

CREATE TABLE IF NOT EXISTS message_group (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_group_id INT
);

CREATE TABLE IF NOT EXISTS user_group (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    group_id INT,
    FOREIGN KEY (user_id) REFERENCES user(net_id),
    FOREIGN KEY (group_id) REFERENCES message_group(id)
);

CREATE TABLE IF NOT EXISTS message_recipient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message_id INT,
    message_group_id INT,
    FOREIGN KEY (message_group_id) REFERENCES message_group(id),
    FOREIGN KEY (message_id) REFERENCES message(id)
);

CREATE TABLE IF NOT EXISTS status (
	status_code INT PRIMARY KEY ,
    status_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS user_statuses (
    status_code INT,
    process_id INT,
    organization_id INT,
    user_net_id VARCHAR(255),
    FOREIGN KEY (status_code) REFERENCES status(status_code),
    FOREIGN KEY (process_id) REFERENCES recruitment_process(id),
    FOREIGN KEY (organization_id) REFERENCES organization(id),
    FOREIGN KEY (user_net_id) REFERENCES user(net_id)
    
);

CREATE TABLE IF NOT EXISTS user_processes (
    process_id INT,
    user_net_id VARCHAR(255),
    status_id INT,
    FOREIGN KEY (process_id) REFERENCES recruitment_process(id),
    FOREIGN KEY (user_net_id) REFERENCES user(net_id),
    FOREIGN KEY (status_id) REFERENCES user_statuses(status_code)
);

CREATE TABLE IF NOT EXISTS user_organizations (
    user_net_id VARCHAR(255),
    organization_id INT,
    role VARCHAR(255),
    FOREIGN KEY (user_net_id) REFERENCES user(net_id),
    FOREIGN KEY (organization_id) REFERENCES organization(id)
);

CREATE TABLE IF NOT EXISTS process_organizations (
    process_id INT,
    organization_id INT,
    FOREIGN KEY (process_id) REFERENCES recruitment_process(id),
    FOREIGN KEY (organization_id) REFERENCES organization(id)
);



CREATE TABLE IF NOT EXISTS organization_events (
    organization_id INT,
    event_id INT,
    FOREIGN KEY (organization_id) REFERENCES organization(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE IF NOT EXISTS process_events (
    process_id INT,
    event_id INT,
    FOREIGN KEY (process_id) REFERENCES recruitment_process(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

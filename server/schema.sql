-- CREATE DATABASE plextech;
USE plextech;

CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password BINARY(60),
    registered BOOLEAN DEFAULT FALSE,
    treasurer BOOLEAN DEFAULT FALSE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    google BOOLEAN DEFAULT FALSE,
    reset_password BINARY(60),
    reset_timestamp BIGINT,
    bank_account_number TEXT,
    bank_routing_number TEXT,
    bank_name VARCHAR(255),
    bluevine_email VARCHAR(255),
    bluevine_password TEXT,
    bluevine_slug VARCHAR(255),
    tardies JSON DEFAULT NULL,
    absences JSON DEFAULT NULL,
    strikes JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    current_position VARCHAR(255),
    profile_blurb TEXT,
    linkedin_username VARCHAR(255),
    instagram_username VARCHAR(255),
    calendly_username VARCHAR(255),
    current_company VARCHAR(255),
    plaid_access_token VARCHAR(255),
    plaid_item_id VARCHAR(255),
    plaid_account_id VARCHAR(255)
);

CREATE TABLE requests (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    status ENUM('pendingReview', 'underReview', 'errors', 'approved', 'paid') DEFAULT 'pendingReview',
    item_description TEXT,
    amount DECIMAL(10,2),
    date DATE,
    comments JSON DEFAULT NULL,
    images JSON DEFAULT NULL,
    team_budget VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE attendance (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    meeting_leader CHAR(36),
    start_time VARCHAR(255),
    code CHAR(36),
    attendees JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (meeting_leader) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE posts (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    content TEXT,
    anonymous BOOLEAN DEFAULT FALSE,
    date DATE,
    upvotes JSON DEFAULT NULL,
    downvotes JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE mfa (
    id CHAR(36) PRIMARY KEY,
    code VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE DATABASE plexfinance;
USE plexfinance;

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
    tardies JSON DEFAULT ('[]'),
    absences JSON DEFAULT ('[]'),
    strikes JSON DEFAULT ('[]'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE requests (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    status ENUM('pendingReview', 'underReview', 'errors', 'approved', 'paid') DEFAULT 'pendingReview',
    item_description TEXT,
    amount DECIMAL(10,2),
    date DATE,
    comments JSON DEFAULT ('[]'),
    images JSON DEFAULT ('[]'),
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
    attendees JSON DEFAULT ('{}'),
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
    upvotes JSON DEFAULT ('[]'),
    downvotes JSON DEFAULT ('[]'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE mfa (
    id CHAR(36) PRIMARY KEY,
    code VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 
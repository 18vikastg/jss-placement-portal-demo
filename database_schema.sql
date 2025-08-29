-- AI Resume Analyzer Database Schema
-- Created by Vikas TG

-- Create database
CREATE DATABASE IF NOT EXISTS resume_analyzer_db;
USE resume_analyzer_db;

-- Table for user data and resume analysis
CREATE TABLE IF NOT EXISTS user_data (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    sec_token VARCHAR(255),
    ip_add VARCHAR(45),
    host_name VARCHAR(255),
    dev_user VARCHAR(255),
    os_name_ver VARCHAR(255),
    latlong VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    act_name VARCHAR(255),
    act_mail VARCHAR(255),
    act_mob VARCHAR(20),
    name VARCHAR(255),
    email VARCHAR(255),
    res_score VARCHAR(10),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    no_of_pages VARCHAR(10),
    reco_field VARCHAR(255),
    cand_level VARCHAR(255),
    skills TEXT,
    recommended_skills TEXT,
    courses TEXT,
    pdf_name VARCHAR(255)
);

-- Table for user feedback
CREATE TABLE IF NOT EXISTS user_feedback (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    feed_name VARCHAR(255),
    feed_email VARCHAR(255),
    feed_score INT,
    comments TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_email ON user_data(email);
CREATE INDEX idx_timestamp ON user_data(timestamp);
CREATE INDEX idx_reco_field ON user_data(reco_field);
CREATE INDEX idx_feed_timestamp ON user_feedback(timestamp);

-- Insert sample admin user (optional)
-- You can customize this or remove it
INSERT IGNORE INTO user_data (name, email, reco_field, cand_level) 
VALUES ('Admin User', 'admin@resumeanalyzer.com', 'Data Science', 'Experienced');

SHOW TABLES;
DESCRIBE user_data;
DESCRIBE user_feedback;

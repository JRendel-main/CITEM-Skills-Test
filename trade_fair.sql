-- Create the trade_fair database
CREATE DATABASE IF NOT EXISTS trade_fair;
USE trade_fair;

-- Create the exhibitors table
CREATE TABLE IF NOT EXISTS exhibitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    website VARCHAR(255) NULL
);

-- Insert sample exhibitors
INSERT INTO exhibitors (name, country, category, website) VALUES
('Tech Solutions Inc.', 'United States', 'Technology', 'https://techsolutions.com'),
('Global Manufacturing Ltd.', 'Germany', 'Manufacturing', 'https://globalmfg.de'),
('Fashion Forward', 'France', 'Fashion', 'https://fashionforward.fr'),
('AgriTech Innovations', 'Netherlands', 'Agriculture', 'https://agritech.nl'),
('MediCare Systems', 'Canada', 'Healthcare', 'https://medicare.ca'),
('EduLearn Platform', 'United Kingdom', 'Education', 'https://edulearn.co.uk'),
('Green Energy Corp', 'Sweden', 'Energy', 'https://greenenergy.se');

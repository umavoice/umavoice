CREATE USER umavoice;
ALTER USER umavoice PASSWORD 'umavoice';
CREATE DATABASE umavoice_database;
GRANT ALL PRIVILEGES ON DATABASE umavoice_database to umavoice;

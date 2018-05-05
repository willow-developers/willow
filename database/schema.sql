-- STEPS TO SET UP / START DATABASE LOCALLY:

-- 1) brew install postgresql
-- 2) brew servives start postgresql
-- 3) psql < database/schema.sql (in root folder)

-- TO ACCESS THE DATABASE IN THE TERMINAL:
-- 1) psql --> 'psql' opens the postgreSQL command line
-- 2) \c willow;

-- SAMPLE QUERY IN TERMINAL ONCE CONNECTED:
-- SELECT * FROM users;

-- ** If you need to drop the database and run this file again make sure
-- that no one is connected to the database, including yourself **

-- DROP TABLES WHILE THE DATABASE STILL EXISTS
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS labels CASCADE;
DROP TABLE IF EXISTS nodes CASCADE;
DROP TABLE IF EXISTS links CASCADE;

-- DROP DEFAULT USER
DROP USER IF EXISTS willow_admin;

DROP DATABASE IF EXISTS willow;
CREATE DATABASE willow;
CREATE USER willow_admin WITH SUPERUSER PASSWORD 'qwerty';

-- command to connect to 'willow' database --> ensures tables are created within correct DB
\c willow;

CREATE TABLE users (
  id SERIAL,
  username varchar(20),
  first_name varchar(100),
  last_name varchar(100),
  email varchar(100),
  hashed_password varchar(500),
  timestamp timestamp default current_timestamp,
  PRIMARY KEY (id),
  UNIQUE (username, email)
);

CREATE TABLE projects (
  id SERIAL,
  owner_id INTEGER,
  project_name varchar(100),
  date_created timestamp default current_timestamp,
  date_updated date,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE labels (
  id SERIAL,
  label_type varchar(100),
  label_sub_type varchar(100),
  label_mark varchar(100),
  label_notes varchar(1000),
  PRIMARY KEY (id)
);

CREATE TABLE nodes (
  id SERIAL,
  owner_id INTEGER,
  project_id INTEGER,
  label_id INTEGER,
  node_description varchar(100),
  node_status varchar(100), -- Completed, In Progress, Closed/Cancelled, etc.
  node_data jsonb,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
  FOREIGN KEY (label_id) REFERENCES labels (id) ON DELETE CASCADE
);

CREATE TABLE links (
  id SERIAL,
  source_id INTEGER,
  target_id INTEGER,
  label_id INTEGER,
  link_data jsonb,
  PRIMARY KEY (id),
  FOREIGN KEY (source_id) REFERENCES nodes (id) ON DELETE CASCADE,
  FOREIGN KEY (target_id) REFERENCES nodes (id) ON DELETE CASCADE,
  FOREIGN KEY (label_id) REFERENCES labels (id) ON DELETE CASCADE
);


-- //---------------------------------- DUMMY DATA ----------------------------------//

-- USER
INSERT INTO users (username, first_name, last_name, email, hashed_password)
  VALUES ('twagner', 'Tom', 'Wagner', 'twagner55@gmail.com', 'password');

-- PROJECT
INSERT INTO projects (owner_id, project_name)
  VALUES (1, 'Build SWP');

-- LABELS:
-- 1
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Objective', 'Start', 'This type of label is used to denote the beginning of a project');

-- 2
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Objective', 'End Goal', 'This type of label is used to denote the end goal of a project');

-- 3
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Objective', 'Subtask', 'This type of label is used to denote a subtask that must be completed in order to complete the project');

-- 4
INSERT INTO labels (label_type, label_notes)
  VALUES ('Explorative', 'This type of label is used to denote a subtask that must be completed in order to complete the project');

-- 5
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Relationship', 'Explores', 'This type of label is used to connect to an explorative node/idea');

-- 6
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Relationship', 'Completes', 'This type of label is used to connect an explorative node to a subtask once that idea/node is implemented or chosen');

-- 7
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Relationship', 'Prereq For', 'This type of label is used to connect a subtask that must be completed prior to moving forward to a future node/task');

-- 8
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Relationship', 'Connects', 'This type of label is used as a catch-all connection between two nodes/tasks');

-- NODES:
-- START NODE: (1)
INSERT INTO nodes (owner_id, project_id, label_id, node_description)
  VALUES (1, 1, 1, 'Solo Week Project');

-- FIRST SUBTASK: (2)
INSERT INTO nodes (owner_id, project_id, label_id, node_description)
  VALUES (1, 1, 3, 'Settle on a project idea');

-- SUBTASK 2a: (3)
INSERT INTO nodes (owner_id, project_id, label_id, node_description)
  VALUES (1, 1, 3, 'Develop/write front-end code');

-- SUBTASK 2b: (4)
INSERT INTO nodes (owner_id, project_id, label_id, node_description)
  VALUES (1, 1, 3, 'Write back-end code (server and datbase)');

-- END GOAL: (5)
INSERT INTO nodes (owner_id, project_id, label_id, node_description)
  VALUES (1, 1, 2, 'Deploy MVP-version of Solo Week Project');

-- LINKS:
-- START TO SETTLE ON PROJECT IDEA
INSERT INTO links (source_id, target_id, label_id)
  VALUES (1, 2, 8);

-- PROJECT IDEA TO FRONT-END CODE
INSERT INTO links (source_id, target_id, label_id)
  VALUES (2, 3, 7);

-- PROJECT IDEA TO BACK-END CODE
INSERT INTO links (source_id, target_id, label_id)
  VALUES (2, 4, 7);

-- FRONT-END CODE TO MVP
INSERT INTO links (source_id, target_id, label_id)
  VALUES (3, 5, 7);

-- BACK-END COD TO MVP
INSERT INTO links (source_id, target_id, label_id)
  VALUES (4, 5, 7);

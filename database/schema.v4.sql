-- STEPS TO SET UP / START DATABASE LOCALLY:

-- 1) brew install postgresql
-- 2) brew services start postgresql
-- 3) psql < database/schema.v3.sql (in root folder)

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
  google_id varchar(100),
  first_name varchar(100),
  last_name varchar(100),
  email varchar(100),
  hashed_password varchar(500),
  timestamp timestamp default current_timestamp,
  PRIMARY KEY (google_id),
  UNIQUE (google_id, email)
);

CREATE TABLE projects (
  id SERIAL,
  owner_id varchar(100),
  project_name varchar(100),
  zoomX double PRECISION,
  zoomY double PRECISION,
  zoomScale double PRECISION,
  date_created timestamp default current_timestamp,
  date_updated date,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES users (google_id) ON DELETE CASCADE
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
  hash_id varchar(100),
  owner_id varchar(100),
  project_id INTEGER,
  label_id INTEGER,
  node_description varchar(100),
  node_status varchar(100), -- Completed, In Progress, Closed/Cancelled, etc.
  x double PRECISION,
  y double PRECISION,
  node_data jsonb,
  PRIMARY KEY (hash_id),
  FOREIGN KEY (owner_id) REFERENCES users (google_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
  FOREIGN KEY (label_id) REFERENCES labels (id) ON DELETE CASCADE
);

CREATE TABLE links (
  id SERIAL,
  hash_id varchar(100),
  project_id INT,
  source_id varchar(100),
  target_id varchar(100),
  label_id INTEGER,
  link_data jsonb,
  PRIMARY KEY (id),
  FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
  FOREIGN KEY (source_id) REFERENCES nodes (hash_id) ON DELETE CASCADE,
  FOREIGN KEY (target_id) REFERENCES nodes (hash_id) ON DELETE CASCADE,
  FOREIGN KEY (label_id) REFERENCES labels (id) ON DELETE CASCADE
);


-- //---------------------------------- DUMMY DATA ----------------------------------//

-- USER
INSERT INTO users (google_id, first_name, last_name, email, hashed_password)
  VALUES ('107740050254369789353', 'Tom', 'Wagner', 'twagner55@gmail.com', 'password');

INSERT INTO users (google_id, first_name, last_name, email, hashed_password)
  VALUES ('110227128753222443119', 'Jun', 'Yoo', 'jyoo13495@gmail.com', 'password');


-- PROJECT
-- INSERT INTO projects (owner_id, project_name)
--   VALUES ('107740050254369789353', 'Build SWP');

INSERT INTO projects (owner_id, project_name, zoomX, zoomY, zoomScale)
  VALUES ('110227128753222443119', 'Build SWP - Jun', 0, 0, 1);

-- LABELS:
-- 1
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Explorative', 'none', 'Explorative Node');

-- 2
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Action', 'Start', 'Start Action Node');

-- 3
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Action', 'Next', 'Next Action Node');

-- 4
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Objective', 'One-Time', 'One-Time Objective Node');

-- 5
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Objective', 'Recurring', 'Recurring Objective Node');

-- 6
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Relationship', 'Explores', 'Connects to Exporative Nodes');

-- 7
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Relationship', 'Starts', 'Connects to Start Action Nodes');

-- 8
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Relationship', 'Then', 'Connects to Next Action Nodes');

-- 9
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Relationship', 'Should', 'Connects to Objective Nodes');

-- 10
INSERT INTO labels (label_type, label_sub_type, label_notes)
  VALUES ('Relationship', 'Complete', 'Connects to Objective Nodes');

-- NODES:
-- JUNS PROJECT
-- START NODE: (1) START ACTION NODE
INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
  VALUES ('110227128753222443119', 1, 2, 'Start', '110227128753222443119-1-1526666246059', 90.94002532959, 262.297256469727);
-- LEARN CODING: (2) NEXT ACTION NODE
INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
  VALUES ('110227128753222443119', 1, 3, 'LEARN CODING', '110227128753222443119-1-1526666518332', 200.689067840576, 257.106170654297);
-- CREATE PROJECTS: (3) NEXT ACTION NODE
INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
  VALUES ('110227128753222443119', 1, 3, 'CREATE PROJECTS', '110227128753222443119-1-1526666530347', 319.770111083984, 253.362060546875);
-- 3 PROJECTS: (4) ONE TIME OBJECTIVE NODE
INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
  VALUES ('110227128753222443119', 1, 4, '3 PROJECTS', '110227128753222443119-1-1526666538043', 439.1513671875, 247.504089355469);
-- CREATE RESUME: (5) NEXT ACTION NODE
INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
  VALUES ('110227128753222443119', 1, 3, 'CREATE RESUME', '110227128753222443119-1-1526666546220', 558.706481933594, 239.820358276368);
-- 1 RESUME: (6) ONE TIME OBJECTIVE NODE
INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
  VALUES ('110227128753222443119', 1, 4, '1 RESUME', '110227128753222443119-1-1526666554173', 646.566528320312, 236.411743164062);
-- APPLY JOBS: (7) NEXT ACTION NODE
INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
  VALUES ('110227128753222443119', 1, 3, 'APPLY JOBS', '110227128753222443119-1-1526666561262', 756.64166259766, 235.180099487305);
-- 10 JOBS A DAY: (8) RECURRING OBJECTIVE NODE
INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
  VALUES ('110227128753222443119', 1, 4, '10 JOBS A DAY', '110227128753222443119-1-1526666567924', 851.739318847657, 233.895263671875);
-- ACCEPT OFFER: (9) NEXT ACTION NODE
INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
  VALUES ('110227128753222443119', 1, 3, 'ACCEPT OFFER', '110227128753222443119-1-1526666577917', 968.410255432125, 228.826263427735);
-- GET SOFTWARE ENGINEERING JOB (END): (10) ONE TIME OBJECTIVE NODE
INSERT INTO nodes (owner_id, project_id, label_id, node_description, hash_id, x, y)
  VALUES ('110227128753222443119', 1, 4, '1 SOFTWARE ENGINEERING JOB', '110227128753222443119-1-1526666585388', 1057.27120971679, 223.168312072754);

-- LINKS:
-- JUNS PROJECT
-- START TO LEARN CODING : THEN
INSERT INTO links (hash_id, source_id, target_id, label_id, project_id)
  VALUES ('110227128753222443119-1-LINK-1526666792406', '110227128753222443119-1-1526666246059', '110227128753222443119-1-1526666518332', 8, 1);
-- LEARN CODING TO CREATE PROJECTS : THEN
INSERT INTO links (hash_id, source_id, target_id, label_id, project_id)
  VALUES ('110227128753222443119-1-LINK-1526667033871', '110227128753222443119-1-1526666518332', '110227128753222443119-1-1526666530347', 8, 1);
-- CREATE PROJECTS TO 3 PROJECTS : SHOULD
INSERT INTO links (hash_id, source_id, target_id, label_id, project_id)
  VALUES ('110227128753222443119-1-LINK-1526667080481', '110227128753222443119-1-1526666530347', '110227128753222443119-1-1526666538043', 9, 1);
-- 3 PROJECTS TO CREATE RESUME : THEN
INSERT INTO links (hash_id, source_id, target_id, label_id, project_id)
  VALUES ('110227128753222443119-1-LINK-1526667164851', '110227128753222443119-1-1526666538043', '110227128753222443119-1-1526666546220', 8, 1);
-- CREATE RESUME TO 1 RESUME : SHOULD
INSERT INTO links (hash_id, source_id, target_id, label_id, project_id)
  VALUES ('110227128753222443119-1-LINK-1526667233141', '110227128753222443119-1-1526666546220', '110227128753222443119-1-1526666554173', 9, 1);
-- 1 RESUME TO APPLY JOBS : THEN
INSERT INTO links (hash_id, source_id, target_id, label_id, project_id)
  VALUES ('110227128753222443119-1-LINK-1526667276982', '110227128753222443119-1-1526666554173', '110227128753222443119-1-1526666561262', 8, 1);
-- APPLY JOBS TO 10 JOBS A DAY : SHOULD
INSERT INTO links (hash_id, source_id, target_id, label_id, project_id)
  VALUES ('110227128753222443119-1-LINK-1526667394532', '110227128753222443119-1-1526666561262', '110227128753222443119-1-1526666567924', 9, 1);
-- 10 JOBS A DAY TO ACCEPT OFFER : THEN
INSERT INTO links (hash_id, source_id, target_id, label_id, project_id)
  VALUES ('110227128753222443119-1-LINK-1526667440078', '110227128753222443119-1-1526666567924', '110227128753222443119-1-1526666577917', 8, 1);
-- ACCEPT OFFER TO GET SOFTWARE ENGINEERING JOB : SHOULD
INSERT INTO links (hash_id, source_id, target_id, label_id, project_id)
  VALUES ('110227128753222443119-1-LINK-1526667488879', '110227128753222443119-1-1526666577917', '110227128753222443119-1-1526666585388', 9, 1);

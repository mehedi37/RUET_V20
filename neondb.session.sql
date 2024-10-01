CREATE TABLE all_notice (
  notice_id SERIAL PRIMARY KEY,
  notice_creator VARCHAR(250) NOT NULL,
  notice_title VARCHAR(250) NOT NULL,
  notice TEXT NOT NULL,
  time DATE NOT NULL DEFAULT CURRENT_DATE,
  series INT NOT NULL DEFAULT 0,
  section VARCHAR(50) NOT NULL DEFAULT '',
  department INT NOT NULL,
  CONSTRAINT dept_for_key FOREIGN KEY (department) REFERENCES departments(department_id)
);

CREATE TABLE class_routine (
  routine_id SERIAL PRIMARY KEY,
  department INT NOT NULL,
  section VARCHAR(10) NOT NULL,
  yr_sem INT NOT NULL,
  CONSTRAINT routine_dept_rel FOREIGN KEY (department) REFERENCES departments(department_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE class_routine_details (
  routine_details_id SERIAL PRIMARY KEY,
  routine_id INT NOT NULL,
  course_id INT NOT NULL,
  starting_time INT NOT NULL,
  ending_time INT NOT NULL,
  weekday INT NOT NULL,
  CONSTRAINT class_ending_rel FOREIGN KEY (ending_time) REFERENCES class_times(class_time_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT class_starting_rel FOREIGN KEY (starting_time) REFERENCES class_times(class_time_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT routine_details_course_rel FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT routine_routine_details_rel FOREIGN KEY (routine_id) REFERENCES class_routine(routine_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT weekday_class_rel FOREIGN KEY (weekday) REFERENCES weekday(day_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE class_times (
  class_time_id SERIAL PRIMARY KEY,
  time TIMESTAMP
);

CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY,
  course_code INT NOT NULL,
  course_name VARCHAR(250) NOT NULL,
  course_teacher INT NOT NULL,
  department INT NOT NULL,
  section VARCHAR(50) NOT NULL,
  course_credit DECIMAL(3,2) NOT NULL,
  syllabus TEXT,
  CONSTRAINT dept FOREIGN KEY (department) REFERENCES departments(department_id),
  CONSTRAINT teacher FOREIGN KEY (course_teacher) REFERENCES teachers(teacher_id)
);

CREATE TABLE course_advisors (
  advisor_id SERIAL PRIMARY KEY,
  teacher_id INT NOT NULL,
  department INT NOT NULL,
  section VARCHAR(50) NOT NULL,
  series INT NOT NULL,
  CONSTRAINT department_id FOREIGN KEY (department) REFERENCES departments(department_id),
  CONSTRAINT teacher_id FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);

CREATE TABLE ct (
  ct_id SERIAL PRIMARY KEY,
  course_id INT NOT NULL,
  section VARCHAR(50) NOT NULL,
  department INT NOT NULL,
  time DATE NOT NULL,
  note TEXT NOT NULL,
  CONSTRAINT ct_notice_course_rel FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT dept_id FOREIGN KEY (department) REFERENCES departments(department_id)
);

CREATE TABLE ct_result (
  ct_result_id SERIAL PRIMARY KEY,
  course_id INT NOT NULL,
  student_roll INT NOT NULL,
  ct_1 FLOAT NOT NULL DEFAULT 0,
  ct_2 FLOAT NOT NULL DEFAULT 0,
  ct_3 FLOAT NOT NULL DEFAULT 0,
  ct_4 FLOAT NOT NULL DEFAULT 0,
  CONSTRAINT ct_course_rel FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT ct_student_rel FOREIGN KEY (student_roll) REFERENCES students(student_roll) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE departments (
  department_id SERIAL PRIMARY KEY,
  dept_name VARCHAR(250) NOT NULL,
  dept_short_name VARCHAR(250) NOT NULL UNIQUE
);

CREATE TABLE greetings (
  greeting_id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  for_teachers BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE students (
  student_roll INT PRIMARY KEY,
  student_name VARCHAR(250) NOT NULL,
  student_email VARCHAR(250) NOT NULL,
  student_password VARCHAR(250) NOT NULL
);

CREATE TABLE teachers (
  teacher_id SERIAL PRIMARY KEY,
  teacher_name VARCHAR(250) NOT NULL,
  teacher_email VARCHAR(250) NOT NULL,
  teacher_password VARCHAR(250) NOT NULL
);

CREATE TABLE teacher_notice (
  notice_id SERIAL PRIMARY KEY,
  notice_creator VARCHAR(250) NOT NULL,
  department INT NOT NULL,
  time DATE NOT NULL DEFAULT CURRENT_DATE,
  notice_title VARCHAR(250) NOT NULL,
  notice TEXT NOT NULL,
  CONSTRAINT dept_teacher_id FOREIGN KEY (department) REFERENCES departments(department_id)
);

CREATE TABLE weekday (
  day_id SERIAL PRIMARY KEY,
  weekday_name VARCHAR(50) NOT NULL
);
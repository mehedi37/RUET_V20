-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2024 at 05:44 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ruet_v20`
--

-- --------------------------------------------------------

--
-- Table structure for table `all_notice`
--

CREATE TABLE `all_notice` (
  `notice_id` int(11) NOT NULL,
  `notice_creator` varchar(250) NOT NULL,
  `notice_title` varchar(250) NOT NULL,
  `notice` longtext NOT NULL,
  `time` date NOT NULL DEFAULT current_timestamp(),
  `series` int(11) NOT NULL DEFAULT 0,
  `section` varchar(50) NOT NULL DEFAULT '""',
  `department` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `all_notice`
--

INSERT INTO `all_notice` (`notice_id`, `notice_creator`, `notice_title`, `notice`, `time`, `series`, `section`, `department`) VALUES
(1, 'Mehedi Hasan', 'Title Of Notice', 'Test Notice', '2024-07-05', 20, 'A', 3);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_code` int(11) NOT NULL,
  `course_name` varchar(250) NOT NULL,
  `course_teacher` int(11) NOT NULL,
  `department` int(11) NOT NULL,
  `section` varchar(50) NOT NULL,
  `course_credit` float NOT NULL,
  `syllabus` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_code`, `course_name`, `course_teacher`, `department`, `section`, `course_credit`, `syllabus`) VALUES
(1203, 'Object Oriented Programming', 1, 3, 'A', 3, 'test'),
(3201, 'Database Systems', 4, 3, 'A', 3, '<p>test</p> <i> test1</i>');

-- --------------------------------------------------------

--
-- Table structure for table `course_advisors`
--

CREATE TABLE `course_advisors` (
  `advisor_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `department` int(11) NOT NULL,
  `section` varchar(50) NOT NULL,
  `series` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_advisors`
--

INSERT INTO `course_advisors` (`advisor_id`, `teacher_id`, `department`, `section`, `series`) VALUES
(2, 3, 3, 'A', 20);

-- --------------------------------------------------------

--
-- Table structure for table `ct`
--

CREATE TABLE `ct` (
  `ct_id` int(11) NOT NULL,
  `course_code` int(11) NOT NULL,
  `section` varchar(50) NOT NULL,
  `department` int(11) NOT NULL,
  `time` date NOT NULL,
  `note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ct`
--

INSERT INTO `ct` (`ct_id`, `course_code`, `section`, `department`, `time`, `note`) VALUES
(1, 1203, 'A', 3, '2024-07-02', 'CT at room no 201'),
(2, 1203, 'A', 3, '2024-07-01', 'CT at room no 104'),
(3, 3201, 'A', 3, '2024-07-13', 'It\'s gonna be hard.'),
(4, 3201, 'A', 3, '2024-09-12', 'valo kore por hala');

-- --------------------------------------------------------

--
-- Table structure for table `ct_result`
--

CREATE TABLE `ct_result` (
  `ct_result_id` int(11) NOT NULL,
  `course_code` int(11) NOT NULL,
  `department` int(11) NOT NULL,
  `section` char(4) NOT NULL,
  `student_roll` int(11) NOT NULL,
  `ct_1` float NOT NULL DEFAULT 0,
  `ct_2` float NOT NULL DEFAULT 0,
  `ct_3` float NOT NULL DEFAULT 0,
  `ct_4` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ct_result`
--

INSERT INTO `ct_result` (`ct_result_id`, `course_code`, `department`, `section`, `student_roll`, `ct_1`, `ct_2`, `ct_3`, `ct_4`) VALUES
(1, 3105, 0, 'A', 2003037, 12.5, 16, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `dept_name` varchar(250) NOT NULL,
  `dept_short_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `dept_name`, `dept_short_name`) VALUES
(1, 'Electrical and Electronics Engineering', 'EEE'),
(3, 'Computer Science and Engineering', 'CSE');

-- --------------------------------------------------------

--
-- Table structure for table `greetings`
--

CREATE TABLE `greetings` (
  `greeting_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `for_teachers` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `greetings`
--

INSERT INTO `greetings` (`greeting_id`, `text`, `for_teachers`) VALUES
(1, 'কিরে ? দিনকাল ভালো ?', 0),
(2, 'Welcome to Digital World', 1);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_roll` int(11) NOT NULL,
  `student_name` varchar(250) NOT NULL,
  `student_email` varchar(250) NOT NULL,
  `student_password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_roll`, `student_name`, `student_email`, `student_password`) VALUES
(2003009, 'Sadia Rahman Sharna', 'sadiasharna3@gmail.com', 'U2FsdGVkX1/moxCOPPI0EcUWnQmtcb+qQ0xT9kanHVY='),
(2003037, 'Mehedi Hasan', 'mjmehedihasanoo7@gmail.com', 'U2FsdGVkX1/moxCOPPI0EcUWnQmtcb+qQ0xT9kanHVY=');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `teacher_name` varchar(250) NOT NULL,
  `teacher_email` varchar(250) NOT NULL,
  `teacher_password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `teacher_name`, `teacher_email`, `teacher_password`) VALUES
(1, 'Dr. Md. Shahid Uz Zaman', 'szaman22.ruet@gmail.com', 'U2FsdGVkX19nhM5DvmMWTMkXgM2xNBoLQXsyt8bu4uE='),
(3, 'Mohiuddin Ahmed', 'mohiuddin.nirob.mn@gmail.com', 'U2FsdGVkX19nhM5DvmMWTMkXgM2xNBoLQXsyt8bu4uE='),
(4, 'Barshon Sen', 'sen.barshon@gmail.com', 'U2FsdGVkX19nhM5DvmMWTMkXgM2xNBoLQXsyt8bu4uE=');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_notice`
--

CREATE TABLE `teacher_notice` (
  `notice_id` int(11) NOT NULL,
  `notice_creator` varchar(250) NOT NULL,
  `department` int(11) NOT NULL,
  `time` date NOT NULL DEFAULT current_timestamp(),
  `notice_title` varchar(250) NOT NULL,
  `notice` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_notice`
--

INSERT INTO `teacher_notice` (`notice_id`, `notice_creator`, `department`, `time`, `notice_title`, `notice`) VALUES
(1, 'Ali SIr', 3, '2024-07-06', 'দাবি উপলক্ষে ', 'কাল তোমাদের সকল দাবি মেনে নেয়া হবে ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_notice`
--
ALTER TABLE `all_notice`
  ADD PRIMARY KEY (`notice_id`),
  ADD KEY `dept_for_key` (`department`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_code`,`course_teacher`,`department`,`section`),
  ADD KEY `teacher` (`course_teacher`),
  ADD KEY `dept` (`department`);

--
-- Indexes for table `course_advisors`
--
ALTER TABLE `course_advisors`
  ADD PRIMARY KEY (`advisor_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `department_id` (`department`);

--
-- Indexes for table `ct`
--
ALTER TABLE `ct`
  ADD PRIMARY KEY (`ct_id`),
  ADD KEY `course_code` (`course_code`),
  ADD KEY `dept_id` (`department`);

--
-- Indexes for table `ct_result`
--
ALTER TABLE `ct_result`
  ADD PRIMARY KEY (`ct_result_id`),
  ADD KEY `ct_student_rel` (`student_roll`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `dept_short_name` (`dept_short_name`);

--
-- Indexes for table `greetings`
--
ALTER TABLE `greetings`
  ADD PRIMARY KEY (`greeting_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_roll`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`);

--
-- Indexes for table `teacher_notice`
--
ALTER TABLE `teacher_notice`
  ADD PRIMARY KEY (`notice_id`),
  ADD KEY `dept_teacher_id` (`department`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all_notice`
--
ALTER TABLE `all_notice`
  MODIFY `notice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `course_advisors`
--
ALTER TABLE `course_advisors`
  MODIFY `advisor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ct`
--
ALTER TABLE `ct`
  MODIFY `ct_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ct_result`
--
ALTER TABLE `ct_result`
  MODIFY `ct_result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `greetings`
--
ALTER TABLE `greetings`
  MODIFY `greeting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `teacher_notice`
--
ALTER TABLE `teacher_notice`
  MODIFY `notice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `all_notice`
--
ALTER TABLE `all_notice`
  ADD CONSTRAINT `dept_for_key` FOREIGN KEY (`department`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `dept` FOREIGN KEY (`department`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `teacher` FOREIGN KEY (`course_teacher`) REFERENCES `teachers` (`teacher_id`);

--
-- Constraints for table `course_advisors`
--
ALTER TABLE `course_advisors`
  ADD CONSTRAINT `department_id` FOREIGN KEY (`department`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

--
-- Constraints for table `ct`
--
ALTER TABLE `ct`
  ADD CONSTRAINT `course_code` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`),
  ADD CONSTRAINT `dept_id` FOREIGN KEY (`department`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `ct_result`
--
ALTER TABLE `ct_result`
  ADD CONSTRAINT `ct_student_rel` FOREIGN KEY (`student_roll`) REFERENCES `students` (`student_roll`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher_notice`
--
ALTER TABLE `teacher_notice`
  ADD CONSTRAINT `dept_teacher_id` FOREIGN KEY (`department`) REFERENCES `departments` (`department_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

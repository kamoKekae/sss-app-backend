
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';


--
-- Database: `sss-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `checklist`
--

CREATE TABLE `checklist` (
  `checkListID` int(11) NOT NULL,
  `topic` int(11) NOT NULL,
  `courseID` int(11) NOT NULL,
  `visibility` varchar(5) NOT NULL,
  `deadline` date DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `checklistitems`
--

CREATE TABLE `checklistitems` (
  `checkListItemID` int(11) NOT NULL,
  `checkListID` int(11) NOT NULL,
  `checkListItem` varchar(200) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `commentID` int(11) NOT NULL,
  `checkListItemID` int(11) NOT NULL,
  `comment` varchar(200) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `completedchecklist`
--

CREATE TABLE `completedchecklist` (
  `completionID` int(11) NOT NULL,
  `checkListID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `courseID` int(11) NOT NULL,
  `schoolID` int(11) DEFAULT NULL,
  `numEnrolledStudents` int(11) NOT NULL,
  `lecturer` varchar(100) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `enrollement`
--

CREATE TABLE `enrollement` (
  `enrollmentID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `courseID` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `facultyID` int(11) NOT NULL,
  `facultyName` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `outcomes`
--

CREATE TABLE `outcomes` (
  `outcomeID` int(11) NOT NULL,
  `outcome` varchar(100) NOT NULL,
  `checkListItemID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `schoolID` int(11) NOT NULL,
  `facultyID` int(11) NOT NULL,
  `schoolName` varchar(100) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `studentID` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `studentNumber` varchar(15) NOT NULL
);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checklist`
--
ALTER TABLE `checklist`
  ADD PRIMARY KEY (`checkListID`),
  ADD KEY `courseID` (`courseID`);

--
-- Indexes for table `checklistitems`
--
ALTER TABLE `checklistitems`
  ADD PRIMARY KEY (`checkListItemID`),
  ADD KEY `checkListID` (`checkListID`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`commentID`),
  ADD KEY `checkListItemID` (`checkListItemID`);

--
-- Indexes for table `completedchecklist`
--
ALTER TABLE `completedchecklist`
  ADD PRIMARY KEY (`completionID`),
  ADD KEY `checkListID` (`checkListID`),
  ADD KEY `studentID` (`studentID`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`courseID`),
  ADD KEY `schoolID` (`schoolID`);

--
-- Indexes for table `enrollement`
--
ALTER TABLE `enrollement`
  ADD PRIMARY KEY (`enrollmentID`),
  ADD KEY `courseID` (`courseID`),
  ADD KEY `studentID` (`studentID`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`facultyID`);

--
-- Indexes for table `outcomes`
--
ALTER TABLE `outcomes`
  ADD PRIMARY KEY (`outcomeID`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `checkListItemID` (`checkListItemID`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`schoolID`),
  ADD KEY `facultyID` (`facultyID`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`studentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `checklist`
--
ALTER TABLE `checklist`
  MODIFY `checkListID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checklistitems`
--
ALTER TABLE `checklistitems`
  MODIFY `checkListItemID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `completedchecklist`
--
ALTER TABLE `completedchecklist`
  MODIFY `completionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `courseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enrollement`
--
ALTER TABLE `enrollement`
  MODIFY `enrollmentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `facultyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `outcomes`
--
ALTER TABLE `outcomes`
  MODIFY `outcomeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `schoolID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `studentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checklist`
--
ALTER TABLE `checklist`
  ADD CONSTRAINT `checklist_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`);

--
-- Constraints for table `checklistitems`
--
ALTER TABLE `checklistitems`
  ADD CONSTRAINT `checklistitems_ibfk_1` FOREIGN KEY (`checkListID`) REFERENCES `checklist` (`checkListID`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`checkListItemID`) REFERENCES `checklistitems` (`checkListItemID`);

--
-- Constraints for table `completedchecklist`
--
ALTER TABLE `completedchecklist`
  ADD CONSTRAINT `completedchecklist_ibfk_1` FOREIGN KEY (`checkListID`) REFERENCES `checklist` (`checkListID`),
  ADD CONSTRAINT `completedchecklist_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`schoolID`) REFERENCES `school` (`schoolID`);

--
-- Constraints for table `enrollement`
--
ALTER TABLE `enrollement`
  ADD CONSTRAINT `enrollement_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`),
  ADD CONSTRAINT `enrollement_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`);

--
-- Constraints for table `outcomes`
--
ALTER TABLE `outcomes`
  ADD CONSTRAINT `outcomes_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`),
  ADD CONSTRAINT `outcomes_ibfk_2` FOREIGN KEY (`checkListItemID`) REFERENCES `checklistitems` (`checkListItemID`);

--
-- Constraints for table `school`
--
ALTER TABLE `school`
  ADD CONSTRAINT `school_ibfk_1` FOREIGN KEY (`facultyID`) REFERENCES `faculty` (`facultyID`);
COMMIT;



flush privileges;
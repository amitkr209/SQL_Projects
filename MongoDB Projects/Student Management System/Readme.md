# Student Management System (MongoDB)

## Overview
This project demonstrates a simple **Student Management System** using **MongoDB**. It involves creating, inserting, querying, updating, deleting, and indexing student records. The system tracks student information, including name, age, gender, courses enrolled, GPA, registration date, and enrollment status.

## Objectives
- Create a student database and collection.
- Insert, query, update, and delete student records.
- Apply indexing for optimized queries.
- Utilize advanced queries like sorting, filtering, and full-text search.
- Implement a capped collection for student logs.

## Tools & Technologies
- **MongoDB**: NoSQL database for data storage.
- **Mongo Shell**: For executing queries and database operations.

## Database Structure
The `students` collection contains documents with the following fields:

- **name** *(string)*: Student's name
- **age** *(integer)*: Student's age
- **gender** *(string)*: Student's gender
- **courses** *(array)*: Courses the student is enrolled in
- **gpa** *(double)*: Student's GPA
- **registration_date** *(ISODate)*: Date of registration
- **full_time** *(boolean)*: Indicates if the student is a full-time learner

## Project Workflow

### 1. Database and Collection Creation
```javascript
// Create or switch to the 'school_db' database
use school_db;

// Create the 'students' collection
db.createCollection("students");
```

### 2. Insert Sample Data
```javascript
// Insert multiple student records into the 'students' collection
db.students.insertMany([...]) // Sample data includes 20 records with various fields.
```

### 3. Querying Data

- **Retrieve All Students**:
```javascript
db.students.find();
```

- **Find Full-Time Students**:
```javascript
db.students.find({full_time: true});
```

- **Find Students Enrolled in Python**:
```javascript
db.students.find({courses: "Python"});
```

- **Find Students with GPA Greater than 8.5**:
```javascript
db.students.find({gpa: { $gt: 8.5 }});
```

- **Find Full-Time Python Students**:
```javascript
db.students.find({full_time: true, courses: "Python"});
```

### 4. Updating Records

- **Update GPA for "Amit Kumar"**:
```javascript
db.students.updateOne({name: "Amit Kumar"}, { $set: { gpa: 9.0 }});
```

- **Add "Power BI" Course for "Gaurav Chauhan"**:
```javascript
db.students.updateOne({name: "Gaurav Chauhan"}, { $push: { courses: "Power BI" }});
```

- **Remove "full_time" Field from "Amit Kumar"**:
```javascript
db.students.updateOne({name: "Amit Kumar"}, { $unset: { full_time: "" }});
```

### 5. Sorting and Advanced Queries

- **Sort Students by GPA (Descending)**:
```javascript
db.students.find().sort({gpa: -1});
```

- **Sort Students by Age (Descending)**:
```javascript
db.students.find().sort({age: -1});
```

- **Find Students Who Are Full-Time or Have GPA > 8.5**:
```javascript
db.students.find({ $or: [{full_time: true}, {gpa: { $gt: 8.5 }}] });
```

- **Find Students Registered After Jan 1, 2024**:
```javascript
db.students.find({registration_date: { $gt: ISODate("2024-01-01T00:00:00Z") }});
```

### 6. Deleting Records

- **Delete One Student ("Gaurav Chauhan")**:
```javascript
db.students.deleteOne({name: "Gaurav Chauhan"});
```

- **Delete Students Older Than 30**:
```javascript
db.students.deleteMany({age: { $gt: 30 }});
```

### 7. Indexing for Performance Optimization

- **Create an Index on "name"**:
```javascript
db.students.createIndex({name: 1});
```

- **Create an Index on "courses" for Faster Search**:
```javascript
db.students.createIndex({courses: 1});
```

### 8. Bonus Challenges

- **Create a Capped Collection for Student Logs**:
```javascript
db.createCollection("student_logs", { capped: true, size: 1024, max: 100 });
```

- **Create a Text Index on "name" for Full-Text Search**:
```javascript
db.students.createIndex({name: "text"});

// Search Students Named "Amit"
db.students.find({$text: {$search: "Amit"}});
```

## Analysis & Insights
1. **Data Integrity**: The system ensures structured and consistent storage of student records.
2. **Efficient Queries**: The use of indexes optimizes search performance.
3. **Customizable**: The flexible schema supports additional fields if needed.
4. **Advanced Queries**: Full-text search and complex filter operations enhance data retrieval capabilities.
5. **Scalability**: MongoDB’s NoSQL structure easily scales with larger datasets.

## Project Learnings
- Understanding MongoDB's document-based structure.
- Implementing efficient queries using indexes.
- Performing CRUD operations programmatically.
- Applying advanced querying techniques like full-text search.
- Utilizing capped collections for log data.

## Conclusion
This **Student Management System** serves as a foundational MongoDB project, providing insights into database creation, data manipulation, and optimization techniques. The project highlights the power and flexibility of MongoDB in managing real-world educational records.

---

*Feel free to reach out for queries, collaboration, or suggestions!*

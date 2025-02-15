// Student Management System (MongoDB)

// Create a Collection
// Create a new database called "school_db":
use school_db;



// Create a Collection
// Create a "students" collection manually:
db.createCollection("students");



// Insert Sample Data
// Insert multiple student records:
db.students.insertMany([
    { name: "Amit Kumar", age: 22, gender: "Male", courses: ["MongoDB", "Python"], gpa: 8.5, registration_date: ISODate("2024-01-10T00:00:00Z"), full_time: true },
    { name: "Gaurav Chauhan", age: 25, gender: "Male", courses: ["JavaScript", "SQL"], gpa: 7.9, registration_date: ISODate("2024-02-15T00:00:00Z"), full_time: false },
    { name: "Gungun Sharma", age: 20, gender: "Female", courses: ["Python", "Data Science"], gpa: 9.1, registration_date: ISODate("2024-03-05T00:00:00Z"), full_time: true },
    { name: "Deepak Verma", age: 27, gender: "Male", courses: ["MongoDB", "SQL", "Power BI"], gpa: 8.0, registration_date: ISODate("2023-12-12T00:00:00Z"), full_time: true },
    { name: "Vikas Chauhan", age: 30, gender: "Male", courses: ["Python", "Machine Learning"], gpa: 7.5, registration_date: ISODate("2023-11-20T00:00:00Z"), full_time: false },
    { name: "Sneha Gupta", age: 23, gender: "Female", courses: ["JavaScript", "React", "Node.js"], gpa: 8.3, registration_date: ISODate("2023-09-15T00:00:00Z"), full_time: true },
    { name: "Anjali Sharma", age: 21, gender: "Female", courses: ["Python", "Data Science", "Tableau"], gpa: 9.0, registration_date: ISODate("2024-01-01T00:00:00Z"), full_time: true },
    { name: "Ravi Kumar", age: 24, gender: "Male", courses: ["MongoDB", "Express", "React"], gpa: 7.8, registration_date: ISODate("2023-10-30T00:00:00Z"), full_time: false },
    { name: "Priya Mehta", age: 22, gender: "Female", courses: ["SQL", "Power BI", "Excel"], gpa: 8.7, registration_date: ISODate("2024-02-25T00:00:00Z"), full_time: true },
    { name: "Aakash Singh", age: 26, gender: "Male", courses: ["JavaScript", "MongoDB", "Vue.js"], gpa: 7.6, registration_date: ISODate("2023-08-18T00:00:00Z"), full_time: false },
    { name: "Pooja Yadav", age: 20, gender: "Female", courses: ["Python", "SQL", "Power BI"], gpa: 9.2, registration_date: ISODate("2024-04-05T00:00:00Z"), full_time: true },
    { name: "Nitin Verma", age: 28, gender: "Male", courses: ["Machine Learning", "Deep Learning"], gpa: 7.4, registration_date: ISODate("2023-07-10T00:00:00Z"), full_time: false },
    { name: "Megha Kapoor", age: 23, gender: "Female", courses: ["Data Science", "Python"], gpa: 8.9, registration_date: ISODate("2023-12-22T00:00:00Z"), full_time: true },
    { name: "Kunal Malhotra", age: 29, gender: "Male", courses: ["MongoDB", "Express", "Angular"], gpa: 7.3, registration_date: ISODate("2023-06-01T00:00:00Z"), full_time: false },
    { name: "Ritika Bhardwaj", age: 22, gender: "Female", courses: ["SQL", "Tableau", "Power BI"], gpa: 8.6, registration_date: ISODate("2024-03-18T00:00:00Z"), full_time: true },
    { name: "Suresh Patel", age: 31, gender: "Male", courses: ["Java", "Spring Boot"], gpa: 7.0, registration_date: ISODate("2023-05-12T00:00:00Z"), full_time: false },
    { name: "Alok Yadav", age: 25, gender: "Male", courses: ["Python", "Django", "PostgreSQL"], gpa: 8.1, registration_date: ISODate("2023-09-25T00:00:00Z"), full_time: true },
    { name: "Neha Joshi", age: 24, gender: "Female", courses: ["JavaScript", "React", "Node.js"], gpa: 8.4, registration_date: ISODate("2023-10-15T00:00:00Z"), full_time: true },
    { name: "Rajesh Khanna", age: 27, gender: "Male", courses: ["MongoDB", "Express", "Vue.js"], gpa: 7.7, registration_date: ISODate("2023-07-30T00:00:00Z"), full_time: false },
    { name: "Simran Kaur", age: 21, gender: "Female", courses: ["Python", "SQL", "Excel"], gpa: 9.3, registration_date: ISODate("2024-02-12T00:00:00Z"), full_time: true }
]);


// Querying Data
// Retrieve All Students
db.students.find();

// Find Students Who Are Full-Time
db.students.find({full_time:true});

// Find Students Enrolled in Python.
db.students.find({courses:"Python"});

// Find all students with a GPA greater than 8.5
db.students.find({gpa:{$gt:8.5}});

// Find students who are full-time and enrolled in Python
db.students.find({full_time:true, courses:"Python"});



// Update Student Information
// Update a Amit Kumar gpa to 9.0
db.students.updateOne({name:"Amit Kumar"}, {$set:{gpa:9.0}});

// Add the "Power BI" Course to the student "Gaurav Chauhan".
db.students.updateOne({name:"Gaurav Chauhan"}, {$push:{courses:"Power BI"}});

// Remove the full_time field from the Amit Kumar.
db.students.updateOne({name:"Amit Kumar"}, {$unset:{full_time:""}});



//  Sorting and Advanced Queries
// Sort Students by GPA in Descending Order
db.students.find().sort({gpa:-1});

// Sort students by age in descending order
db.students.find().sort({age:-1});

// Find Students Who Are Either Full-Time or Have a GPA Greater Than 8.5
db.students.find({$or:[{full_time:true}, {gpa:{$gt:8.5}}]});

// Find students registered after January 1, 2024
db.students.find({registration_date:{$gt:ISODate("2024-01-01T00:00:00Z")}});



// Delete Records
// Delete One Student.
db.students.deleteOne({name:"Gaurav Chauhan"})

// Delete students older than 30
db.students.deleteMany({age:{$gt:30}});



// Indexing
// Create an index on student names.
db.students.createIndex({name:1});

// Create an index in courses for faster searches.
db.students.createIndex({courses:1});



// Bonus Challenges
// Implement a capped collection for student logs:
db.createCollection("student_logs", {capped:true, size:1024, max:100});

// Create a text index on names for full-text search
db.students.createIndex({name: "text"});

// Find students using full-text search
db.students.find({$text:{$search:"Amit"}});
db.students.find({$text:{$search:"Gungun"}});

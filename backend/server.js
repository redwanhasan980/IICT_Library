const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import models
const User = require('./models/User');
const Book = require('./models/Book');
const Member = require('./models/Member');
const Transaction = require('./models/Transaction');
const OutsideBook = require('./models/OutsideBook');
const Student = require('./models/Student');
const Faculty = require('./models/Faculty');
const Department = require('./models/Department');
const BookCatalog = require('./models/BookCatalog');
const Classification = require('./models/Classification');
const StudentBorrowing = require('./models/StudentBorrowing');
const FacultyBorrowing = require('./models/FacultyBorrowing');

// Define relationships
Student.belongsTo(Department, { as: 'department', foreignKey: 'DepartmentNameShortHand', targetKey: 'DepartmentNameShortHand' });
Faculty.belongsTo(Department, { as: 'department', foreignKey: 'DepartmentNameShortHand', targetKey: 'DepartmentNameShortHand' });
BookCatalog.hasOne(Classification, { as: 'classification', foreignKey: 'AccessionNumber', sourceKey: 'AccessionNumber' });
Classification.belongsTo(BookCatalog, { as: 'book', foreignKey: 'AccessionNumber', targetKey: 'AccessionNumber' });
StudentBorrowing.belongsTo(Student, { as: 'student', foreignKey: 'StudentRegNumber', targetKey: 'StudentRegNumber' });
StudentBorrowing.belongsTo(Book, { as: 'book', foreignKey: 'AccessionNumber', targetKey: 'AccessionNumber' });
FacultyBorrowing.belongsTo(Faculty, { as: 'faculty', foreignKey: 'TeacherID', targetKey: 'TeacherID' });
FacultyBorrowing.belongsTo(Book, { as: 'book', foreignKey: 'AccessionNumber', targetKey: 'AccessionNumber' });

// Import routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const memberRoutes = require('./routes/members');
const transactionRoutes = require('./routes/transactions');
const outsideBooksRoutes = require('./routes/outsideBooks');
const catalogRoutes = require('./routes/catalog');
const studentsRoutes = require('./routes/students');
const facultyRoutes = require('./routes/faculty');
const adminRoutes = require('./routes/admin');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/outside-books', outsideBooksRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to IICT Library Management System API with MySQL' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Sync database and start server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
    console.error('Server cannot start because the database connection failed.');
    process.exit(1); 
  });

# IICT Library Management System

A full-stack library management system built with **React, Express, Node.js, and MySQL** featuring an old-school library aesthetic.

## 🎨 Design Philosophy

This application features a **traditional university library aesthetic** with:

- Warm parchment backgrounds (#f4f1e8)
- Classic serif fonts (Playfair Display, Crimson Text)
- Dark brown and maroon accents
- Sharp, classic UI elements (no rounded corners)
- Paper texture feel throughout

## Features

### 📚 For Students

- Browse and search books by title, author, accession number, DDC
- View detailed book information
- Track borrow history
- Log outside books brought into library
- View personal profile

### 👩‍🏫 For Faculty

- Extended borrowing privileges (5 books, 30 days)
- Access to all student features
- Faculty-specific dashboard
- Borrow history tracking

### 🔐 For Librarians/Admin

- Complete book management (add, edit, delete)
- Issue and return books
- View all borrowers (students & faculty separately)
- Monitor outside book logs
- User management
- Generate reports
- Dashboard with system statistics

### 🌟 Core Features

- Role-based access control (Student, Faculty, Admin/Librarian)
- Automatic fine calculation (5Tk/day for overdue)
- Mobile-responsive design (bottom navigation on mobile)
- Outside book entry system
- Comprehensive transaction tracking

## Technology Stack

**Frontend:**

- React.js with React Router v6
- Custom CSS with old-school library theme
- Google Fonts (Playfair Display, Crimson Text)
- Axios for API calls
- Mobile-first responsive design

**Backend:**

- Node.js
- Express.js
- Sequelize ORM
- MySQL Database
- JWT Authentication
- bcryptjs for password hashing

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MySQL Server installed and running
- npm or yarn package manager

## Installation & Setup

### 1. Install MySQL

If you don't have MySQL installed:

- Download from: https://dev.mysql.com/downloads/installer/
- Install and remember your root password

### 2. Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE iict_library;
```

### 3. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Update .env file with your MySQL credentials
# Edit the .env file and set:
#   DB_USER=root (or your MySQL username)
#   DB_PASSWORD=your_mysql_password
#   DB_NAME=iict_library

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will start on `http://localhost:3000`

## Default Login Credentials

After starting the backend, you need to create your first user:

1. Go to `http://localhost:3000/register`
2. Create an admin account with:
   - Username: admin
   - Email: admin@iict.edu
   - Password: admin123

For the first user to be an admin, you'll need to manually update the database:

```sql
USE iict_library;
UPDATE users SET role = 'admin' WHERE email = 'admin@iict.edu';
```

## Route Structure

```
/                          - Landing page
├── /login                 - Login (role-based: Student/Faculty/Admin)
├── /about                 - About library
├── /contact               - Contact information
│
├── /student/*             - Student routes
│   ├── /dashboard         - Student overview
│   ├── /books             - Search & browse books
│   ├── /books/:id         - Book details
│   ├── /history           - Borrow history
│   ├── /outside-book      - Log outside books
│   └── /profile           - Student profile
│
├── /faculty/*             - Faculty routes
│   ├── /dashboard         - Faculty overview
│   ├── /books             - Search books
│   ├── /history           - Borrow history
│   └── /profile           - Faculty profile
│
└── /admin/*               - Admin/Librarian routes
    ├── /dashboard         - System summary
    ├── /books             - All books
    ├── /books/add         - Add new book
    ├── /books/edit/:id    - Edit book
    ├── /issue             - Issue book
    ├── /return            - Return book
    ├── /borrowers         - Student borrowers list
    ├── /faculty-records   - Faculty borrow records
    ├── /outside-books     - Outside book logs
    ├── /users             - User management
    └── /reports           - Library reports
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Add new book (Admin only)
- `PUT /api/books/:id` - Update book (Admin only)
- `DELETE /api/books/:id` - Delete book (Admin only)

### Members

- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Add new member (Admin only)
- `PUT /api/members/:id` - Update member (Admin only)
- `DELETE /api/members/:id` - Delete member (Admin only)

### Transactions

- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions/issue` - Issue book (Admin only)
- `PUT /api/transactions/return/:id` - Return book (Admin only)

### Outside Books (New!)

- `GET /api/outside-books` - Get all outside book logs
- `POST /api/outside-books` - Log outside book entry

## Database Schema

The application uses these main tables:

- **users** - System users with authentication (Student, Faculty, Admin roles)
- **books** - Book inventory with ISBN, title, author, etc.
- **members** - Library members (linked to users)
- **transactions** - Book issue/return records
- **outside_books** - Log of outside books brought by students (NEW!)

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── database.js       # MySQL/Sequelize configuration
│   ├── models/               # Database models
│   │   ├── User.js
│   │   ├── Book.js
│   │   ├── Member.js
│   │   └── Transaction.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   ├── books.js
│   │   ├── members.js
│   │   └── transactions.js
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── .env                  # Environment variables
│   ├── server.js             # Express server
│   └── package.json
│pages/
    │   │   ├── Public/
    │   │   │   ├── Landing.js
    │   │   │   ├── Login.js
    │   │   │   ├── About.js
    │   │   │   └── Contact.js
    │   │   ├── Student/
    │   │   │   ├── Dashboard.js
    │   │   │   ├── Books.js
    │   │   │   ├── BookDetails.js
    │   │   │   ├── BorrowHistory.js
    │   │   │   ├── OutsideBook.js
    │   │   │   └── Profile.js
    │   │   ├── Faculty/
    │   │   │   ├── Dashboard.js
    │   │   │   ├── Books.js
    │   │   │   ├── History.js
    │   │   │   └── Profile.js
    │   │   └── Admin/
    │   │       ├── Dashboard.js
    │   │       ├── Books.js
    │   │       ├── AddBook.js
    │   │       ├── EditBook.js
    │   │       ├── IssueBook.js
    │   │       ├── ReturnBook.js
    │   │       ├── BorrowersList.js
    │   │       ├── FacultyRecords.js
    │   │       ├── OutsideBookLogs.js
    │   │       ├── UserManagement.js
    │   │       └── Reports.js
    Public Pages
- **Landing:** Welcome page with library introduction
- **About:** Library history, rules, departments served
- **Contact:** Library contact information and staff details

### Student Features
- **Dashboard:** Overview of borrowed books and quick links
- **Book Search:** Search by title, author, accession number, Dewey Decimal
- **Book Details:** Full metadata view (catalog card style)
- **Borrow History:** Complete record with strikethrough for returned books
- **Outside Book Entry:** Log personal books brought into library
- **Profile:** Student information and privileges

### Faculty Features
- All student features plus:
- **Extended Limits:** 5 books for 30 days
- **Priority Access:** To new acquisitions
-  Design Guidelines

### Color Scheme
- **Background:** Parchment (#f4f1e8)
- **Primary:** Dark Brown (#5d4037)
- **Accent:** Maroon (#7b1e2a)
- **Text:** Dark Brown (#2c1810)

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Crimson Text (serif)

### UI Principles
- Sharp corners (no border-radius)
- Paper texture backgrounds
- Classic library card aesthetics
- Minimal, outline icons
- Mobile-first responsive design

## Mobile Responsiveness

- **Desktop:** Top navigation bar
- **Mobile:** Bottom navigation bar
- **Tables:** Convert to card layout on mobile
- **Search:** Sticky search bar
- **Touch-friendly:** Large tap target* Add, edit, delete books with accession register style forms
- **Issue/Return:** Book circulation management
- **Borrower Lists:** Separate views for students and faculty
- **Outside Book Monitoring:** Track outside books
- **User Management:** Manage members
- **Reports:** Library usage statistics

### Book Management
- Add new books with complete metadata (ISBN, title, author, publisher, etc.)
- Track quantity and availability
- Catalog search by title, author, ISBN, DDC
- Update and delete books (Admin only)
- Shelf location tracking

### Member Management
- Register students, faculty, staff
- Track membership status (active/suspended/expired)
- Store contact information and department details
- Member type based privilege styleyout/
    │   │       └── Navbar.js
    │   ├── services/
    │   │   └── api.js        # Axios configuration
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Features in Detail

### Book Management

- Add new books with ISBN, title, author, publisher, category
- Track quantity and availability
- Search books by title, author, or ISBN
- Update and delete books

### Member Management

- Register students, faculty, staff, and external members
- Track membership status (active/suspended/expired)
- Store contact information and department details

### Transaction Management

- Issue books to members
- Track due dates
- Automatic fine calculation (₹5 per day for overdue)
- Return books and update availability

### Security

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (Admin/Librarian/Member)
- Protected API routes

## Troubleshooting

**MySQL Connection Error:**

- Make sure MySQL service is running
- Check credentials in `.env` file
- Verify database exists: `SHOW DATABASES;`

**Port Already in Use:**

- Backend: Change `PORT` in `.env`
- Frontend: It will prompt to use a different port automatically

**Tables Not Created:**

- The app auto-creates tables on first run
- Or manually sync: Check `server.js` and ensure `sequelize.sync()` is called

## Future Enhancements

- [ ] Email notifications for due dates
- [ ] Book reservation system
- [ ] Reports and analytics
- [ ] Barcode scanning
- [ ] Multi-library support
- [ ] Mobile app

## License

MIT

## Support

For issues or questions, please open an issue in the repository.

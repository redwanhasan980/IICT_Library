# Quick Start Guide - IICT Library Management System

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### Step 2: Configure MySQL

1. Make sure MySQL is running
2. Create database:
   ```sql
   CREATE DATABASE iict_library;
   ```
3. Update `backend/.env` with your MySQL password

### Step 3: Start the Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Step 4: Create First Admin User

1. Go to `http://localhost:3000`
2. Click "Enter Library" → Register
3. Create account with any email (e.g., admin@iict.edu)
4. In MySQL, run:
   ```sql
   USE iict_library;
   UPDATE users SET role = 'admin' WHERE email = 'admin@iict.edu';
   ```
5. Logout and login again to see admin features

## 📌 Default User Roles

- **Student:** Default role (can browse, view history, log outside books)
- **Faculty:** Same as student + extended privileges (5 books, 30 days)
- **Admin/Librarian:** Full system access

## 🎨 Design Features

✅ Old-school library aesthetic with parchment background
✅ Serif fonts (Playfair Display, Crimson Text)
✅ Dark brown and maroon color scheme
✅ Sharp, classic UI (no rounded corners)
✅ Mobile responsive (bottom nav on mobile)

## 📱 Test on Mobile

Open `http://localhost:3000` on your phone's browser (make sure you're on the same network).
You'll see the bottom navigation automatically!

## 🐛 Common Issues

**Port 3000 already in use?**

- React will ask to use port 3001 automatically

**MySQL connection error?**

- Check if MySQL service is running
- Verify credentials in `.env`

**Tables not created?**

- They're created automatically on first run
- Check console for errors

**Frontend not connecting to backend?**

- Make sure backend is running on port 5000
- Check `package.json` proxy setting in frontend

## 📚 Test Data

To quickly populate the library:

1. Login as admin
2. Go to "Add New Book"
3. Add some sample books
4. Go to "User Management" to add members
5. Use "Issue Book" to create transactions

## 🎯 Key URLs

- Landing: `http://localhost:3000`
- Login: `http://localhost:3000/login`
- Student Dashboard: `http://localhost:3000/student/dashboard`
- Faculty Dashboard: `http://localhost:3000/faculty/dashboard`
- Admin Dashboard: `http://localhost:3000/admin/dashboard`
- API: `http://localhost:5000/api`

## 💡 Pro Tips

1. Use Chrome DevTools to test mobile view (F12 → Toggle device toolbar)
2. The strikethrough effect shows returned books in history
3. Outside book feature helps track personal books students bring
4. Fine calculation is automatic (₹5/day)
5. Search works across title, author, and ISBN

---

**Need help?** Check the full [README.md](README.md) for detailed documentation!

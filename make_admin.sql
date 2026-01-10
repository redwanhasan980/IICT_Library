-- Make your user an admin
UPDATE users SET role = 'admin' WHERE email = 'redwanhasan@gmail.com';

-- Verify the change
SELECT id, username, email, role FROM users WHERE email = 'redwanhasan@gmail.com';

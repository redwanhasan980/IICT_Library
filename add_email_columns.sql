-- Step 1: Add Email column to student table
ALTER TABLE `student` ADD COLUMN `Email` VARCHAR(100) NULL AFTER `Session`;

-- Step 2: Add Email column to faculty table
ALTER TABLE `faculty` ADD COLUMN `Email` VARCHAR(100) NULL AFTER `Signature`;

-- Step 3: Update existing user's email to link them (CORRECT EMAIL AND CORRECT REG NUMBER)
UPDATE student SET Email = 'redwanhasan@gmail.com' WHERE StudentRegNumber = '2021831047';

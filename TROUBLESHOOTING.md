Instructions to Fix PostgreSQL Connection:

The issue is that the PostgreSQL password authentication is failing. Here are the solutions:

OPTION 1: Reset PostgreSQL Password
1. Open Command Prompt as Administrator
2. Stop PostgreSQL service: net stop postgresql-x64-17
3. Navigate to PostgreSQL bin directory (usually C:\Program Files\PostgreSQL\17\bin\)
4. Start PostgreSQL in single-user mode and reset password
5. Restart service: net start postgresql-x64-17

OPTION 2: Update .env file with correct credentials
If you know the correct PostgreSQL password, update the .env file:
DATABASE_URL=postgresql://postgres:YOUR_CORRECT_PASSWORD@localhost:5432/student_accommodation

OPTION 3: Use SQLite (Simpler Alternative)
We can modify the application to use SQLite instead of PostgreSQL for easier setup.

CURRENT ERROR: 
- The server is running on port 5000
- The admin dashboard is running on port 3000  
- But database connection fails due to incorrect PostgreSQL password

Which option would you prefer?

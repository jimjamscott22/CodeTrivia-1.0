# CodeTrivia Backend Setup Guide

This guide will help you set up the backend server for CodeTrivia performance tracking on your Raspberry Pi MariaDB database.

## Prerequisites

- Raspberry Pi with MariaDB/MySQL running
- Node.js installed on your development machine
- Access to your Raspberry Pi database

## Step 1: Database Setup

### 1.1 Connect to your Raspberry Pi database

```bash
mysql -h <raspberry-pi-ip> -u <your-username> -p
```

### 1.2 Create the database

```sql
CREATE DATABASE codetrivia;
USE codetrivia;
```

### 1.3 Run the schema

Execute the SQL file at `database/schema.sql`:

```bash
mysql -h <raspberry-pi-ip> -u <your-username> -p codetrivia < database/schema.sql
```

Or manually copy and paste the contents into your MySQL client.

## Step 2: Backend Server Configuration

### 2.1 Navigate to the server directory

```bash
cd server
```

### 2.2 Install dependencies

```bash
npm install
```

### 2.3 Create environment configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
# Database Configuration
DB_HOST=192.168.x.x  # Your Raspberry Pi IP address
DB_PORT=3306
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=codetrivia

# Server Configuration
PORT=3001
NODE_ENV=development

# Default User ID
DEFAULT_USER_ID=1
```

### 2.4 Test the connection

Start the server to test the database connection:

```bash
npm run dev
```

You should see:
```
✓ Database connected successfully
🚀 CodeTrivia API server running on port 3001
```

## Step 3: Frontend Configuration

### 3.1 Update Vite proxy (already done in code)

The Vite config has been updated to proxy API requests to avoid CORS issues.

### 3.2 Set API URL (optional)

If your backend runs on a different port, create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001/api
```

## Step 4: Running the Full Stack

### Terminal 1: Start the backend server

```bash
cd server
npm run dev
```

### Terminal 2: Start the frontend

```bash
# From the root directory
npm run dev
```

## Step 5: Verify Everything Works

1. Open the app in your browser (usually `http://localhost:5173`)
2. Click the "📊 My Stats" button - you should see "No quiz data yet"
3. Complete a quiz
4. Check the backend console - you should see the session saved
5. Click "My Stats" again - you should now see your performance data!

## API Endpoints

The backend provides these endpoints:

- `GET /api/performance/summary/:userId` - Get performance summary
- `GET /api/performance/stats/:userId` - Get detailed statistics
- `GET /api/performance/weak-areas/:userId` - Get areas needing practice
- `POST /api/performance/session` - Save a quiz session
- `GET /health` - Health check

## How Personalization Works

1. As you complete quizzes, your results are saved to the database
2. The system tracks your accuracy by category and difficulty
3. When generating new questions, the LLM receives context about your weak areas
4. Questions are automatically weighted toward topics where you need more practice

## Troubleshooting

### Database Connection Failed

- Verify your Raspberry Pi IP address is correct
- Check that MariaDB is running: `systemctl status mariadb`
- Ensure your firewall allows port 3306
- Verify database credentials

### CORS Errors

- Make sure the Vite dev server is proxying requests
- Check that the backend is running on port 3001
- Clear browser cache and reload

### Stats Don't Show

- Check browser console for errors
- Verify backend server is running
- Check that quiz sessions are being saved (backend console logs)

## Database Maintenance

### View your data

```sql
-- See all quiz sessions
SELECT * FROM quiz_sessions ORDER BY completed_at DESC LIMIT 10;

-- See performance summary
SELECT * FROM category_performance;

-- See recent questions answered
SELECT * FROM question_results ORDER BY answered_at DESC LIMIT 20;
```

### Reset your data

```sql
DELETE FROM question_results;
DELETE FROM quiz_sessions;
DELETE FROM category_performance;
```

## Future Enhancements

- User authentication (currently uses a default user)
- Export performance data
- Compare performance with others
- Spaced repetition algorithm
- Custom study plans

## Production Deployment

For production deployment on Digital Ocean:

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name codetrivia-api
   pm2 save
   pm2 startup
   ```
3. Set up nginx as a reverse proxy
4. Use environment variables for sensitive data
5. Enable SSL/TLS with Let's Encrypt

---

Need help? Check the main README or open an issue on GitHub.

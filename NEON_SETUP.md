# Neon Database Setup Guide

This guide will walk you through setting up Neon PostgreSQL database for your portfolio website.

## Why Neon?

- ✅ **Generous Free Tier**: 512 MB storage, 3 GB data transfer/month
- ✅ **Serverless PostgreSQL**: Auto-scales, no maintenance
- ✅ **Fast**: Built on PostgreSQL with instant branching
- ✅ **Perfect for Vercel**: Recommended by Vercel (replaces Vercel Postgres)
- ✅ **No Project Limits**: Unlike Supabase free tier

## Step 1: Create a Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Click "Sign Up" 
3. Sign in with your GitHub account (recommended)

## Step 2: Create a New Project

1. After signing in, click "Create a project" or "New Project"
2. Fill in the project details:
   - **Project name**: `portfolio-database` (or any name you prefer)
   - **Region**: Choose the region closest to you (or closest to your Vercel deployment)
   - **PostgreSQL version**: Use the default (latest)
3. Click "Create Project"
4. Your project will be ready in seconds!

## Step 3: Get Your Database Connection String

1. After project creation, you'll see the **Connection Details** page
2. Look for **Connection string** section
3. **IMPORTANT**: Select **"Pooled connection"** from the dropdown (better performance)
4. Copy the connection string - it looks like:
   ```
   postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
5. Save this - you'll need it for your `.env` file

## Step 4: Create Database Tables

1. In your Neon dashboard, click on **SQL Editor** in the left sidebar
2. Click "New Query"
3. Copy and paste the following SQL schema:

```sql
-- Projects table
CREATE TABLE projects (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tech TEXT[] NOT NULL,
    github TEXT,
    demo TEXT,
    year TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiences table
CREATE TABLE experiences (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    achievements TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certifications table
CREATE TABLE certifications (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    date TEXT NOT NULL,
    credential_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leadership table
CREATE TABLE leadership (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    icon TEXT NOT NULL,
    description TEXT NOT NULL,
    year TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_projects_year ON projects(year);
CREATE INDEX idx_messages_timestamp ON messages(timestamp DESC);
CREATE INDEX idx_messages_read ON messages(read);
```

4. Click "Run" to execute the SQL
5. You should see "Success" - this means the tables were created!

## Step 5: Configure Environment Variables

1. In your project root, create a `.env` file (if it doesn't exist)
2. Add your Neon database URL:

```env
# Admin Panel Password
VITE_ADMIN_PASSWORD=your_password_here

# Neon Database Configuration
VITE_DATABASE_URL=postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

3. Replace the `VITE_DATABASE_URL` value with your actual connection string from Step 3

## Step 6: Test the Connection

1. Run your development server:
```bash
npm run dev
```

2. Open the browser console (F12)
3. You should see: `✅ Neon database initialized successfully`
4. You should also see: `✅ Data loaded from database`

## Step 7: Migrate Existing Data (Optional)

If you have data in localStorage that you want to migrate to Neon:

1. Open your browser console (F12)
2. The migration utility can be triggered from the admin panel, or run manually:
```javascript
import { migrateToDatabase } from './src/utils/migrateToDatabase.js';
migrateToDatabase().then(result => console.log('Migration result:', result));
```

## Step 8: Deploy to Vercel

When deploying to Vercel, you need to add the environment variable:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add the following variable:
   - **Name**: `VITE_DATABASE_URL`
   - **Value**: Your Neon connection string (pooled)
   - **Environment**: Production, Preview, Development (select all)
4. Redeploy your project

## Neon Dashboard Features

### Monitor Your Database
- **Dashboard**: View storage usage, data transfer, and active connections
- **Tables**: Browse your data directly in the web interface
- **SQL Editor**: Run queries and manage your data
- **Branches**: Create database branches for testing (like Git branches!)

### Connection Pooling
Always use the **"Pooled connection"** string for:
- Better performance
- Handles serverless function limitations
- Automatic connection management

## Troubleshooting

### "Database not configured" warning
- Make sure your `.env` file exists and has the correct `VITE_DATABASE_URL`
- Restart your development server after adding environment variables
- Check that variable name starts with `VITE_` (required for Vite)
- Verify the connection string includes `?sslmode=require`

### Tables not found error
- Make sure you ran the SQL schema in Step 4
- Check the SQL Editor for any error messages
- Verify table names match exactly (case-sensitive)

### Connection errors
- Verify your connection string is correct
- Make sure you're using the **Pooled connection** string
- Check that your IP isn't blocked (Neon allows all IPs by default)
- Ensure `sslmode=require` is in the connection string

### Data not syncing
- Check browser console for errors
- Verify your database URL is correct in `.env`
- Make sure tables were created successfully
- Try refreshing the page

## Security Best Practices

### Current Setup
- Database is accessible with the connection string
- Connection string includes password - keep it secret!
- Never commit `.env` file to Git (already in `.gitignore`)

### For Production
- Use environment variables in Vercel (never hardcode)
- Rotate your database password periodically
- Monitor usage in Neon dashboard
- Consider adding Row Level Security if needed

## Free Tier Limits

Neon's free tier includes:
- **Storage**: 512 MB
- **Data Transfer**: 3 GB/month
- **Compute**: 100 hours/month (auto-suspends when inactive)
- **Projects**: Unlimited!

Your portfolio should easily stay within these limits.

## Next Steps

- ✅ Your portfolio now uses cloud database storage
- ✅ Data persists across devices and browsers
- ✅ Ready for production deployment
- ✅ No project limits (unlike Supabase)

## Additional Resources

- **Neon Documentation**: [neon.tech/docs](https://neon.tech/docs)
- **Neon + Vercel Guide**: [neon.tech/docs/guides/vercel](https://neon.tech/docs/guides/vercel)
- **PostgreSQL Docs**: [postgresql.org/docs](https://www.postgresql.org/docs/)

## Support

If you encounter issues:
1. Check the Neon [Status Page](https://neonstatus.com/)
2. Visit [Neon Discord](https://discord.gg/92vNTzKDGp)
3. Review [Neon Documentation](https://neon.tech/docs)

---

**Congratulations!** Your portfolio now has professional cloud database storage powered by Neon PostgreSQL! 🎉

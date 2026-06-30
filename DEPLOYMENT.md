# Vercel Deployment Guide - Neon Database

Your code has been pushed to GitHub! Vercel will automatically detect the changes and start a new deployment.

## ⚠️ IMPORTANT: Add Environment Variable to Vercel

Before the deployment will work with the database, you **MUST** add the database URL to Vercel:

### Step 1: Go to Vercel Dashboard

1. Visit [vercel.com](https://vercel.com)
2. Sign in to your account
3. Click on your **Portfolio Website** project

### Step 2: Add Environment Variable

1. Click on **Settings** tab
2. Click on **Environment Variables** in the left sidebar
3. Add a new environment variable:

   **Name (Key):**
   ```
   VITE_DATABASE_URL
   ```

   **Value:**
   ```
   postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

   **Environments:** Select all three:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. Click **Save**

### Step 3: Redeploy

After adding the environment variable:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click the **⋯** (three dots) menu
4. Click **Redeploy**
5. Confirm the redeployment

**OR** simply push a new commit and Vercel will deploy automatically.

---

## What Happens Next

1. ✅ Vercel will build your app with the new database code
2. ✅ Your app will connect to Neon database
3. ✅ Data will persist across all devices
4. ✅ Your portfolio is now production-ready!

---

## Testing Your Deployment

Once deployed:

1. Visit your Vercel URL (e.g., `your-portfolio.vercel.app`)
2. Open browser console (F12)
3. Look for: `✅ Neon database initialized successfully`
4. Go to `/admin` and test adding/editing data
5. Refresh the page - data should persist!

---

## Troubleshooting

### "Database not configured" warning on Vercel

**Cause:** Environment variable not set or deployment happened before variable was added.

**Solution:**
1. Double-check the environment variable is added in Vercel settings
2. Make sure the variable name is exactly `VITE_DATABASE_URL`
3. Redeploy the project

### Data not persisting on deployed site

**Cause:** App is using localStorage fallback instead of database.

**Solution:**
1. Check browser console for database initialization message
2. Verify environment variable is set correctly
3. Check Vercel deployment logs for any errors

---

## Summary

✅ **Code pushed to GitHub:** All database integration code is committed  
✅ **Automatic deployment:** Vercel will deploy automatically  
⚠️ **Action required:** Add `VITE_DATABASE_URL` environment variable in Vercel  
🚀 **Result:** Your portfolio will use cloud database storage!

---

## Need Help?

- **Vercel Documentation:** [vercel.com/docs/environment-variables](https://vercel.com/docs/environment-variables)
- **Neon Documentation:** [neon.tech/docs](https://neon.tech/docs)
- **Setup Guide:** See [NEON_SETUP.md](./NEON_SETUP.md)

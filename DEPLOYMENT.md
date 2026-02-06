# Deployment Guide - Production Deployment

Complete guide for deploying your todo application to production.

## Overview

- **Frontend**: Vercel (optimized for Next.js)
- **Backend**: Railway (supports FastAPI + PostgreSQL)
- **Database**: Neon PostgreSQL (already configured)

**Estimated Time**: 30-45 minutes

---

## Part 1: Deploy Backend to Railway

### Prerequisites
- Railway account (free tier available at https://railway.app)
- GitHub repository pushed (✅ already done)

### Step 1: Create Railway Project

1. **Sign up/Login to Railway**:
   - Visit https://railway.app
   - Sign in with GitHub
   - Authorize Railway to access your repositories

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `fahad-hackthontwo-phase-2`
   - Railway will detect it's a monorepo

3. **Configure Backend Service**:
   - Railway may auto-detect the backend
   - If not, click "Add Service" → "GitHub Repo"
   - Set root directory: `backend`

### Step 2: Configure Environment Variables

In Railway dashboard, go to your backend service → Variables tab:

```bash
# Database (use your existing Neon connection string)
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Authentication (use same secret as frontend)
BETTER_AUTH_SECRET=your-secret-key-min-32-chars-change-this

# API Configuration
API_V1_PREFIX=/api/v1
PROJECT_NAME=Todo API
DEBUG=False

# CORS - Add your Vercel frontend URL after deployment
ALLOWED_ORIGINS=["https://your-app.vercel.app"]

# Server
HOST=0.0.0.0
PORT=8000
```

### Step 3: Configure Build Settings

In Railway dashboard → Settings:

**Build Command**:
```bash
pip install -r requirements.txt
```

**Start Command**:
```bash
cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**Root Directory**: `backend`

### Step 4: Run Database Migrations

After first deployment, open Railway shell:

```bash
# In Railway shell
alembic upgrade head
```

### Step 5: Get Backend URL

- Railway will provide a URL like: `https://your-app.railway.app`
- Copy this URL - you'll need it for frontend deployment
- Test the API: `https://your-app.railway.app/docs`

---

## Part 2: Deploy Frontend to Vercel

### Prerequisites
- Vercel account (free tier available at https://vercel.com)
- Backend deployed and URL obtained

### Step 1: Create Vercel Project

1. **Sign up/Login to Vercel**:
   - Visit https://vercel.com
   - Sign in with GitHub
   - Authorize Vercel to access your repositories

2. **Import Project**:
   - Click "Add New" → "Project"
   - Select `fahad-hackthontwo-phase-2`
   - Vercel will detect Next.js

3. **Configure Project Settings**:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Step 2: Configure Environment Variables

In Vercel project settings → Environment Variables:

```bash
# Backend API (use your Railway URL)
NEXT_PUBLIC_API_URL=https://your-app.railway.app

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-min-32-chars-change-this
BETTER_AUTH_URL=https://your-app.vercel.app

# Database (for Better Auth - use same Neon connection)
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Environment
NODE_ENV=production
```

**Important**: Make sure `BETTER_AUTH_SECRET` matches your backend!

### Step 3: Deploy

- Click "Deploy"
- Vercel will build and deploy automatically
- Wait for deployment to complete (~2-3 minutes)

### Step 4: Get Frontend URL

- Vercel will provide a URL like: `https://your-app.vercel.app`
- Copy this URL

### Step 5: Update Backend CORS

Go back to Railway → Backend service → Variables:

Update `ALLOWED_ORIGINS`:
```bash
ALLOWED_ORIGINS=["https://your-app.vercel.app"]
```

Redeploy backend for changes to take effect.

---

## Part 3: Verify Deployment

### Test Backend

1. **API Documentation**:
   ```
   https://your-app.railway.app/docs
   ```
   - Should show Swagger UI
   - Test endpoints

2. **Health Check**:
   ```
   https://your-app.railway.app/api/v1/health
   ```
   - Should return: `{"status": "healthy"}`

### Test Frontend

1. **Home Page**:
   ```
   https://your-app.vercel.app
   ```
   - Should load landing page
   - Links to signup/login should work

2. **Signup Flow**:
   - Create a new account
   - Should redirect to /tasks
   - Check browser console for errors

3. **Task Management**:
   - Create a task
   - Edit a task
   - Delete a task
   - Toggle completion
   - Verify all operations work

### Test Integration

1. **Authentication**:
   - Logout and login again
   - Verify JWT token is working
   - Check that session persists

2. **User Isolation**:
   - Create two different users
   - Verify each sees only their own tasks
   - Try accessing another user's task by URL

3. **Error Handling**:
   - Test with invalid credentials
   - Test with network issues
   - Verify error messages display correctly

---

## Part 4: Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to Vercel project → Settings → Domains
2. Add your custom domain (e.g., `todo.yourdomain.com`)
3. Follow DNS configuration instructions
4. Update `BETTER_AUTH_URL` environment variable
5. Update Railway `ALLOWED_ORIGINS` to include custom domain

### Add Custom Domain to Railway

1. Go to Railway project → Settings → Domains
2. Add custom domain (e.g., `api.yourdomain.com`)
3. Configure DNS records
4. Update Vercel `NEXT_PUBLIC_API_URL` environment variable

---

## Part 5: Monitoring & Maintenance

### Set Up Monitoring

**Vercel Analytics** (Built-in):
- Go to Vercel project → Analytics
- View page views, performance metrics
- Monitor Web Vitals

**Railway Logs**:
- Go to Railway service → Deployments
- View real-time logs
- Monitor errors and performance

**Sentry (Optional - Error Tracking)**:
1. Sign up at https://sentry.io
2. Create new project for Next.js
3. Create new project for Python
4. Add Sentry SDK to both frontend and backend
5. Configure error reporting

### Database Backups

**Neon Automatic Backups**:
- Neon provides automatic backups
- Go to Neon dashboard → Backups
- Configure retention period
- Test restore process

### Update Deployment

**Frontend Updates**:
- Push changes to GitHub
- Vercel auto-deploys on push to main branch
- Or manually trigger deployment in Vercel dashboard

**Backend Updates**:
- Push changes to GitHub
- Railway auto-deploys on push to main branch
- Or manually trigger deployment in Railway dashboard

---

## Troubleshooting

### Backend Issues

**Problem**: Database connection fails
- **Solution**: Verify `DATABASE_URL` is correct in Railway
- Check Neon dashboard for connection string
- Ensure `sslmode=require` is in connection string

**Problem**: CORS errors in browser console
- **Solution**: Update `ALLOWED_ORIGINS` in Railway
- Include both Vercel URL and custom domain (if any)
- Redeploy backend after changes

**Problem**: 500 errors on API calls
- **Solution**: Check Railway logs for error details
- Verify all environment variables are set
- Check database migrations are applied

### Frontend Issues

**Problem**: "API connection failed" errors
- **Solution**: Verify `NEXT_PUBLIC_API_URL` points to Railway URL
- Check backend is running and accessible
- Test backend URL directly in browser

**Problem**: Authentication not working
- **Solution**: Verify `BETTER_AUTH_SECRET` matches between frontend and backend
- Check `BETTER_AUTH_URL` is set to Vercel URL
- Clear browser cookies and try again

**Problem**: Build fails on Vercel
- **Solution**: Check build logs for specific errors
- Verify all dependencies are in `package.json`
- Test build locally: `npm run build`

### Database Issues

**Problem**: Migrations not applied
- **Solution**: Run migrations manually in Railway shell
- Use: `alembic upgrade head`
- Verify migrations in `alembic/versions/`

**Problem**: Connection pool exhausted
- **Solution**: Check Neon connection limits
- Optimize database queries
- Consider upgrading Neon plan

---

## Production Checklist

Before going live, verify:

### Security
- [ ] `DEBUG=False` in backend
- [ ] Strong `BETTER_AUTH_SECRET` (32+ random characters)
- [ ] CORS configured with specific origins (not `*`)
- [ ] Environment variables not exposed in code
- [ ] HTTPS enabled (automatic on Vercel/Railway)
- [ ] Database connection uses SSL

### Performance
- [ ] Frontend build optimized (check Vercel build logs)
- [ ] Backend response times acceptable (<500ms)
- [ ] Database queries optimized
- [ ] Images optimized (if any)
- [ ] Caching configured

### Functionality
- [ ] All user stories working
- [ ] Authentication flow complete
- [ ] Task CRUD operations working
- [ ] User isolation verified
- [ ] Error handling working
- [ ] Mobile responsive

### Monitoring
- [ ] Error tracking configured (Sentry or similar)
- [ ] Logs accessible (Railway/Vercel dashboards)
- [ ] Uptime monitoring (optional: UptimeRobot)
- [ ] Performance monitoring (Vercel Analytics)

### Documentation
- [ ] README updated with production URLs
- [ ] API documentation accessible
- [ ] Environment variables documented
- [ ] Deployment process documented

---

## Cost Estimates

### Free Tier Limits

**Vercel (Free)**:
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- **Sufficient for**: Hackathon, portfolio, small projects

**Railway (Free Trial)**:
- $5 credit/month
- ~500 hours runtime
- **Sufficient for**: Hackathon, testing, development

**Neon (Free)**:
- 0.5 GB storage
- 1 project
- Automatic backups
- **Sufficient for**: Hackathon, small projects

### Upgrade Recommendations

**If you exceed free tier**:
- Vercel Pro: $20/month (1 TB bandwidth)
- Railway: Pay-as-you-go ($0.000231/GB-hour)
- Neon Pro: $19/month (10 GB storage)

---

## Quick Deployment Commands

### Deploy Backend to Railway
```bash
# Railway CLI (alternative to web UI)
npm i -g @railway/cli
railway login
railway init
railway up
railway variables set DATABASE_URL=your-neon-url
railway variables set BETTER_AUTH_SECRET=your-secret
railway open
```

### Deploy Frontend to Vercel
```bash
# Vercel CLI (alternative to web UI)
npm i -g vercel
cd frontend
vercel login
vercel
# Follow prompts, set environment variables
vercel --prod
```

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Neon Docs**: https://neon.tech/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment/

---

## Success Criteria

Your deployment is successful when:
- ✅ Backend API accessible at Railway URL
- ✅ Frontend accessible at Vercel URL
- ✅ Users can signup and login
- ✅ Tasks can be created, edited, deleted
- ✅ User isolation working (test with 2 users)
- ✅ No CORS errors in browser console
- ✅ All pages load without errors
- ✅ Mobile responsive design working

**Congratulations! Your app is now live in production! 🚀**

# 🚀 GitHub Pages Deployment Setup Guide

## ✅ What's Been Set Up

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Automatically builds and deploys on every push to `main` branch
   - Runs `npm run build` in the frontend folder
   - Deploys the build folder to GitHub Pages

2. **Package.json Configuration** (Already Correct)
   - Homepage: `https://usharanih0515-lang.github.io/Stress-Management-System`
   - Proxy for development: `http://localhost:5000`

3. **Production Build** (Ready)
   - Build folder created and optimized
   - All dependencies installed and compiled

## 📋 Steps to Complete Deployment

### Step 1: Push Files to GitHub
```bash
cd "D:\Miniproject Stress management\Mini_project-main\new_project\hakuna-matata"
git add .
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

### Step 2: Enable GitHub Pages (Repository Settings)
1. Go to **GitHub.com → Your Repository**
2. Navigate to **Settings → Pages**
3. Under "Source", select **"GitHub Actions"** (not Deploy from a branch)
4. Verify "Custom domain" is empty (unless you have one)

### Step 3: Verify Deployment
1. After pushing, go to **Actions** tab in GitHub
2. Wait for the workflow to complete (takes 1-2 minutes)
3. Once complete, your app will be live at:
   ```
   https://usharanih0515-lang.github.io/Stress-Management-System
   ```

## 🔧 Troubleshooting

### If build fails:
- Check the GitHub Actions log for specific error
- Common issues:
  - Missing dependencies: Run `npm ci` in frontend folder
  - Node version mismatch: Workflow uses Node 18
  - Build errors: Run `npm run build` locally to replicate

### If pages don't show up:
- Wait 2-3 minutes after workflow completes
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check that workflow completed successfully (green checkmark)

### If pages show 404:
- Verify GitHub Pages settings are set to "GitHub Actions"
- Check that build folder deployed correctly
- Ensure homepage in package.json matches your repo name

## 📝 What Happens on Each Push

```
You push to main
  ↓
GitHub Actions triggers automatically
  ↓
Workflow: Setup Node.js → Install deps → Build → Deploy
  ↓
Your app goes live in ~1-2 minutes
```

## ✨ Your Deployment URL
- **Production**: `https://usharanih0515-lang.github.io/Stress-Management-System`
- **Local Dev**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000` (development only)

---

**Note**: The backend is configured for local development only. For production, you'll need to:
1. Deploy the backend (Node.js/Express) to a service like Heroku, Railway, or AWS
2. Update the proxy/API endpoint in the React app to point to production backend
3. Set environment variables for production API URLs

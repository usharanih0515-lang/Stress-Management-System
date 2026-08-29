# 🚀 Quick Start Guide - Stress Management System

## Prerequisites
- Node.js 14+ installed
- MongoDB (local or cloud)
- Git (for version control)

---

## ⚡ Quick Start (2 Commands)

### Terminal 1 - Start Backend
```bash
cd Mini_project-main/new_project/hakuna-matata/backend
npm install
npm run dev
```
✅ Backend runs on `http://localhost:5000`

### Terminal 2 - Start Frontend
```bash
cd Mini_project-main/new_project/hakuna-matata/frontend
npm install
npm start
```
✅ Frontend opens at `http://localhost:3000`

---

## 🧪 Test the Fixes

### 1. Test Breathing Exercise
1. Login to the app (or use existing credentials)
2. Click "Dashboard"
3. Click the "🧘 Breathing" button
4. Click "Start" button
5. ✅ Watch the circle expand and contract
6. ✅ See countdown timer in the center
7. ✅ See phase text change
8. Click "Pause" → pauses
9. Click "Resume" → continues
10. Click "Stop" → completes
11. ✅ See completion message

### 2. Test Chatbot
1. From Dashboard, click "🤖 AI Chatbot"
2. ✅ See initial message: "Hi! I'm your stress management assistant..."
3. Type: `I feel stressed`
4. Click Send or press Enter
5. ✅ Your message appears in blue on the right
6. ✅ Loading indicator appears (dots bouncing)
7. ✅ Response appears in gray on the left
8. Try typing:
   - `I cannot sleep` → Gets sleep tips
   - `I am overwhelmed` → Gets overwhelm guidance
   - `Give me a breathing exercise` → Gets breathing instructions
9. ✅ All responses are supportive and helpful

### 3. Test Dashboard Navigation
1. From Dashboard, click each button:
   - ✅ "🎯 Stress Check" → `/stress-detection`
   - ✅ "🧘 Breathing" → `/breathing`
   - ✅ "📝 Diary" → `/diary`
   - ✅ "🎵 Music" → `/music`
   - ✅ "📊 Analytics" → `/analytics`
   - ✅ "🤖 AI Chatbot" → `/chatbot`

---

## 📋 What's Fixed

### ✅ Breathing Exercise
- Complete rewrite of `frontend/src/pages/Relax/Breathing.js`
- Added animated breathing circle
- Added timer with countdown
- Added multiple breathing patterns (Relax, Box, Deep)
- Added Start/Pause/Resume/Reset buttons
- Added cycle counter
- Added completion message

### ✅ AI Chatbot
- Rewrote `frontend/src/pages/Chatbot/Chatbot.js`
- Added initial greeting message
- Added context-aware responses for stress keywords
- Added loading indicator
- Added fallback responses (works even without API key)
- Updated `backend/routes/chatbot.js` with fallback system
- Clean, modern UI design

### ✅ Dashboard
- Fixed Breathing button navigation in `frontend/src/pages/Dashboard/Dashboard.js`
- All buttons now properly connected

### ✅ Frontend-Backend Communication
- Added proxy to `frontend/package.json`
- Frontend can now properly reach backend at localhost:5000

---

## 🔧 Configuration

### Backend .env
Located at: `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb+srv://...
OPENAI_API_KEY=sk-... (optional)
```

### Frontend .env
Located at: `frontend/.env`
```env
# Can be empty - frontend uses proxy in development
# For production, add:
REACT_APP_API_URL=https://your-backend.com
```

---

## 📱 Mobile Testing

The project is fully responsive. Test on:
- Desktop (1920x1080)
- Tablet (768px width)
- Mobile (375px width)

All components adapt to screen size.

---

## ⚠️ Troubleshooting

### "Cannot GET /api/chatbot/message"
**Solution**: Make sure backend is running on port 5000
```bash
cd backend && npm run dev
```

### "Port 3000 already in use"
**Solution**: Kill the process using port 3000
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### "Cannot find module 'axios'"
**Solution**: Reinstall dependencies
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Breathing animation doesn't work
**Solution**: Clear browser cache and reload
- Press `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
- Clear all data
- Reload page

### Chatbot shows error message
**Solution**: 
- Check if backend is running
- Check browser console (F12 → Console tab)
- Chatbot should still work with fallback responses

---

## 📊 Feature Summary

| Feature | Status | Details |
|---------|--------|---------|
| Breathing Exercise | ✅ Complete | Animated, timer, 3 patterns |
| AI Chatbot | ✅ Complete | Smart responses, fallback system |
| Dashboard | ✅ Complete | All buttons working |
| Music Therapy | ✅ Already Works | Playlist system |
| Diary | ✅ Already Works | Journal entries |
| Analytics | ✅ Already Works | Progress tracking |
| Stress Detection | ✅ Already Works | Self-assessment |
| Authentication | ✅ Already Works | Register/Login |

---

## 🎯 Key Files Modified

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Chatbot/
│   │   │   ├── Chatbot.js ✅ REWRITTEN
│   │   │   └── Chatbot.css ✅ UPDATED
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js ✅ FIXED (Breathing button)
│   │   └── Relax/
│   │       └── Breathing.js ✅ REWRITTEN
│   └── ...
│── package.json ✅ ADDED PROXY
└── .env (can be empty)

backend/
├── routes/
│   └── chatbot.js ✅ UPDATED
├── package.json
├── server.js
├── app.js
└── .env (already configured)
```

---

## 🎉 Success Indicators

When everything is working:

1. ✅ Breathing page loads with animated circle
2. ✅ Chatbot shows initial greeting immediately
3. ✅ All dashboard buttons navigate correctly
4. ✅ No red error messages in console
5. ✅ Chatbot responds to common stress phrases
6. ✅ Breathing timer counts down correctly
7. ✅ Mobile layout is responsive

---

## 📞 Support

If you encounter issues:

1. **Check console errors**: Press F12 in browser, click Console
2. **Check backend logs**: Look at terminal running backend
3. **Verify ports**: Backend on 5000, Frontend on 3000
4. **Clear cache**: Hard refresh browser (Ctrl+Shift+R)
5. **Restart services**: Stop and restart both terminals

---

## 🚀 You're Ready!

Your Stress Management System is now fully functional. All features work together seamlessly.

**Enjoy your relaxation tools! 🧘‍♀️💆‍♂️✨**

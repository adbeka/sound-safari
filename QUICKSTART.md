# 🚀 Quick Start Guide - Sound Safari

Welcome to Sound Safari! Get your interactive audio adventure running in just a few minutes.

## 📋 Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18 or higher (`node --version`)
- ✅ npm or yarn package manager
- ✅ A modern web browser (Chrome, Firefox, Safari, or Edge)
- ✅ Microphone access (for audio features)

## ⚡ 3-Step Setup

### Step 1: Install Dependencies
```bash
npm install
```
This installs all required packages (React, TypeScript, Vite, etc.)

### Step 2: Start Development Server
```bash
npm run dev
```
The app will be available at: **http://localhost:3000**

### Step 3: Open in Browser
Navigate to `http://localhost:3000` in your web browser.

**Important**: Allow microphone access when prompted!

---

## 🎮 First Time Setup (In-App)

### For Parents - Creating a Profile

1. Click **"Setup Profile"** on the home screen
2. Enter your child's information:
   - Child's name
   - Age (in months)
   - Max session duration (5-30 minutes recommended)
3. Record 2-3 comfort sounds:
   - Kisses (mwah sounds)
   - Lullabies (gentle humming)
   - Special phrases ("I love you", "I'll be right back")
4. Click **"Save Profile"**

### Recording Comfort Sounds
1. Go to **Parent Dashboard → Comfort Sounds**
2. Enter a label (e.g., "Mommy's Kiss")
3. Click one of the record buttons
4. Make the sound for 5 seconds
5. Repeat for 2-3 different comfort sounds

---

## 🦁 Starting an Adventure

Once profile is set up:

1. Return to home screen
2. Click **"Start Adventure"**
3. Echo will greet your child and begin Phase 1
4. The app automatically progresses through:
   - 🌿 **Phase 1**: Discovery (5 sounds to find)
   - 🐘 **Phase 2**: Expression (8 animals to imitate)
   - 🥁 **Phase 3**: Creation (4 rhythms + free play)
5. Session ends automatically after max duration

---

## 📊 Viewing Insights

After sessions complete:

1. Click **"Parent Dashboard"**
2. Go to **"Insights"** tab
3. View:
   - Total sessions completed
   - Sounds discovered
   - Animals imitated
   - Rhythms created
   - Recent session history

---

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests
npm test
```

---

## 🌐 Accessing on Other Devices

### On Same Network
The dev server shows a network URL like:
```
Network: http://10.0.3.3:3000/
```

Access from:
- Tablets: Open browser → enter network URL
- Phones: Open browser → enter network URL
- Other computers: Same network → enter URL

### Production Deployment
After building (`npm run build`):
1. Deploy `dist/` folder to any static host:
   - Netlify
   - Vercel
   - GitHub Pages
   - Your own server

---

## 🎯 Testing Features

### Test Audio Detection
1. Start a game session
2. Make sounds (talking, clapping, singing)
3. Watch Echo's ears glow when detecting audio
4. Check engagement indicator (top right)

### Test Emotion Detection
1. Speak in different tones
2. High pitch + loud = detected as excited
3. Low volume = detected as calm
4. Very high pitch = may trigger comfort

### Test Comfort Sounds
1. Enable "Auto Comfort" in dashboard
2. Make distressed sounds (crying, whining)
3. Comfort sound should play automatically
4. Check session insights to see when played

---

## 🐛 Troubleshooting

### Microphone Not Working
- Check browser permissions (click lock icon in address bar)
- Try different browser (Chrome recommended)
- Check system microphone settings
- Reload page after granting permission

### Audio Not Playing
- Check volume levels
- Check browser audio settings
- Verify device isn't muted
- Try different browser

### App Not Loading
- Clear browser cache
- Check console for errors (F12)
- Ensure all dependencies installed
- Try `npm install` again

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📱 Browser Compatibility

### Fully Supported
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Features Required
- Web Audio API
- MediaDevices API
- Local Storage
- ES6+ JavaScript

---

## 🔐 Privacy & Safety

### Data Storage
- All data stored locally (browser localStorage)
- No external servers contacted
- No cloud storage used
- Audio never transmitted

### Microphone Usage
- Only active during game sessions
- Stops when game ends
- Analyzed locally only
- Never recorded to disk (except comfort sounds)

### Comfort Sounds
- Stored in browser memory only
- Can be deleted anytime
- Never transmitted
- Only play when triggered

---

## 💡 Tips for Best Experience

### Environment
- Quiet room (reduces false detections)
- Good microphone placement
- Comfortable seating for child
- Clear space for movement/clapping

### Session Duration
- Start with 10 minutes for younger children
- Gradually increase to 15-20 minutes
- Watch engagement indicators
- End early if child loses interest

### Comfort Sounds
- Record in quiet environment
- Use natural, warm tone
- Keep under 5 seconds each
- Test playback before using

### Parent Guidance
- Introduce Echo before first session
- Stay nearby initially
- Gradually increase independence
- Celebrate achievements after!

---

## 📞 Getting Help

### Documentation
- Main README: Comprehensive overview
- DEVELOPMENT.md: Technical details
- This file: Quick start guide

### Common Questions
**Q: How long does a session last?**
A: Based on your max duration setting (5-30 min)

**Q: Can multiple children use it?**
A: Currently single profile only. Clear browser data to switch users.

**Q: Does it work offline?**
A: Yes! After initial load, fully offline.

**Q: Can I use it on mobile?**
A: Yes! Best on tablets. Works on phones too.

---

## 🎉 You're Ready!

Your Sound Safari is now set up and ready for adventure!

1. Create profile ✓
2. Record comfort sounds ✓
3. Start playing ✓

**Have an amazing Sound Safari adventure!** 🦁🎵

---

*For technical support or feature requests, check the repository issues or documentation.*
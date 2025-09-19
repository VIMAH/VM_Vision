# Video Slideshow Assets

## 🎬 Required Video Files

Place your video files in this directory with these exact names:

```
client/public/videos/
├── tech-demo-1.mp4  ← Software Development showcase
├── tech-demo-2.mp4  ← Web3 Solutions showcase  
├── tech-demo-3.mp4  ← Digital Identity showcase
└── tech-demo-4.mp4  ← Cloud Architecture showcase
```

## 📋 Video Specifications

### ✅ Recommended Format: MP4
- **Codec**: H.264 (most compatible)
- **Audio**: AAC (for sound support)
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Duration**: 3-5 seconds per clip
- **File Size**: Under 10MB per video for fast loading
- **Aspect Ratio**: 16:9 (consistent across all videos)

### 🔄 Alternative Formats
- **WebM**: Better compression, good browser support
- **MOV**: Apple devices, but larger file sizes

## 🛠️ Quick Setup Guide

### Step 1: Add Your Videos
1. **Create your video files** (3-5 seconds each)
2. **Name them exactly** as shown above
3. **Place them** in `client/public/videos/`
4. **Test the slideshow** - it will auto-advance every 5 seconds

### Step 2: Optimize for Web (Optional)
```bash
# Compress videos for faster loading
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k -movflags +faststart output.mp4

# Convert to WebM (better compression)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -c:a libopus output.webm
```

## 🎯 Best Practices

1. **Short clips** (3-5 seconds) work best for slideshow
2. **Loop-friendly content** - smooth start/end transitions
3. **Consistent aspect ratio** (16:9 recommended)
4. **Add sound** if desired - will play when user interacts
5. **Optimize file sizes** for fast loading

## 🔧 Fallback System

The slideshow includes:
- ✅ **Primary videos** (your MP4 files)
- ✅ **Fallback videos** (sample videos if yours don't load)
- ✅ **Graceful fallback** (shows content if videos fail)
- ✅ **Error handling** (automatic retry with fallback)

## 🚀 Testing

1. **Start your development server**: `npm start`
2. **Navigate to home page** - slideshow should appear
3. **Check browser console** for any video loading errors
4. **Test on mobile** - responsive design included

## 📱 Mobile Optimization

- Videos automatically resize for mobile
- Touch-friendly indicators
- Optimized loading for slower connections

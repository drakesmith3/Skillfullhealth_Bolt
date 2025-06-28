# Video Setup Instructions for GLOHSEN Demo

## Local Video Support

The demo modal in the home page now supports both YouTube videos and local video files. This provides flexibility for cases where YouTube access might be restricted or when you want to use custom video content.

## Adding Local Videos

To use local videos in the demo modal:

1. **Place your video files in the `/public` folder** of this project with these names:
   - `demo-video.mp4` (Primary format - MP4)
   - `demo-video.webm` (Optional - WebM format for better browser compatibility)

2. **Supported video formats:**
   - MP4 (H.264 codec recommended)
   - WebM (VP9 codec recommended)
   - File size recommendation: Under 100MB for better loading performance

3. **Video specifications for best quality:**
   - Resolution: 1920x1080 (1080p) or 1280x720 (720p)
   - Frame rate: 30fps or 60fps
   - Bitrate: 2-5 Mbps for good quality/size balance

## Current Configuration

- **YouTube Video**: `https://youtu.be/p_PDSng7X0E`
- **Local Video Path**: `/demo-video.mp4` (place in public folder)
- **Fallback Video Path**: `/demo-video.webm` (optional, for better browser support)

## How to Switch Between YouTube and Local Video

The demo modal includes toggle buttons that allow users to switch between:
- **YouTube**: Streams the video from YouTube (requires internet connection)
- **Local**: Plays the video file from your local server (works offline)

## Troubleshooting

### Local Video Not Loading
1. Ensure the video file is named exactly `demo-video.mp4`
2. Check that the file is in the `/public` folder
3. Verify the video format is supported (MP4 with H.264 codec works best)
4. Check browser console for any error messages

### YouTube Video Not Loading
1. Check internet connection
2. Verify the YouTube video ID is correct: `p_PDSng7X0E`
3. Check if YouTube is accessible from your network
4. Some corporate networks block YouTube embeds

## File Structure
```
public/
├── demo-video.mp4          # Primary local video file
├── demo-video.webm         # Optional fallback format
├── VIDEO_SETUP_INSTRUCTIONS.md  # This file
└── ... (other public assets)
```

## Video Encoding Tips

For optimal performance, you can use tools like FFmpeg to encode your videos:

```bash
# Convert to MP4 with H.264
ffmpeg -i input-video.mov -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k demo-video.mp4

# Convert to WebM with VP9 (optional)
ffmpeg -i input-video.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus demo-video.webm
```

## Notes

- The demo modal will automatically detect if local video files are available
- If local video fails to load, users can switch back to YouTube video
- Both video sources support standard video controls (play, pause, seek, fullscreen)
- The modal is responsive and works on both desktop and mobile devices

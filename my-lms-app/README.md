# React LMS (Learning Management System)

A modern, single-student Learning Management System built with React, featuring video progress tracking, localStorage persistence, and a beautiful UI.

## 🎯 Features

- **Video Player with Progress Tracking**: Watch course videos with automatic progress saving
- **Resume Functionality**: Videos automatically resume from where you left off
- **Progress Persistence**: All progress saved to localStorage
- **Dashboard Analytics**: View your learning statistics at a glance
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Completion Tracking**: Courses are automatically marked as completed at 95% progress

## 📁 Project Structure

```
my-lms-app/
├── src/
│   ├── components/
│   │   ├── CourseCard.jsx         # Individual course card component
│   │   ├── CourseCard.css
│   │   ├── CourseList.jsx         # List of all courses
│   │   ├── CourseList.css
│   │   ├── Dashboard.jsx          # Learning statistics dashboard
│   │   ├── Dashboard.css
│   │   ├── ProgressBar.jsx        # Reusable progress bar component
│   │   ├── ProgressBar.css
│   │   ├── VideoPlayer.jsx        # Main video player with controls
│   │   └── VideoPlayer.css
│   ├── data/
│   │   └── courses.js             # Sample course data
│   ├── utils/
│   │   └── localStorage.js        # localStorage utility functions
│   ├── App.jsx                    # Main application component
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd my-lms-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 💡 How It Works

### Progress Tracking

The application uses several key mechanisms to track and save video progress:

1. **Video Time Updates**: The `VideoPlayer` component listens to the `timeupdate` event and saves progress every 5 seconds
2. **localStorage Persistence**: Progress data is stored in localStorage with the key format `course_{courseId}`
3. **Auto-Resume**: When a video is loaded, the player checks localStorage and resumes from the last watched position
4. **Completion Detection**: Courses are marked complete when the user reaches 95% of the video duration

### Data Structure

Each course progress is stored in localStorage with the following structure:

```javascript
{
  currentTime: 123.45,        // Current playback time in seconds
  duration: 720,              // Total video duration
  percentage: 17.15,          // Progress percentage
  lastUpdated: "2026-01-13T...", // ISO timestamp
  completed: false,           // Completion status
  completedAt: null          // Completion timestamp (if completed)
}
```

### Components Overview

- **App.jsx**: Main container managing view state (course list vs video player)
- **Dashboard.jsx**: Displays learning statistics (total courses, completed, in-progress, average)
- **CourseList.jsx**: Grid layout of all available courses
- **CourseCard.jsx**: Individual course card with thumbnail, progress, and metadata
- **VideoPlayer.jsx**: Full-featured video player with custom controls and progress tracking
- **ProgressBar.jsx**: Reusable progress visualization component

## 🎨 Customization

### Adding Your Own Videos

Edit `src/data/courses.js` and replace the sample video URLs with your own:

```javascript
export const courses = [
  {
    id: '1',
    title: 'Your Course Title',
    description: 'Course description',
    videoUrl: 'https://your-video-url.mp4',
    duration: 600, // in seconds
    thumbnail: 'https://your-thumbnail-url.jpg',
    instructor: 'Instructor Name'
  },
  // Add more courses...
];
```

### Styling

All components have their own CSS files for easy customization. The color scheme uses:
- Primary Blue: `#4A90E2`
- Success Green: `#38ef7d`
- Warning Orange: `#f5576c`

## 🛠️ Built With

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **HTML5 Video** - Native video player
- **localStorage API** - Progress persistence
- **CSS3** - Styling with gradients and animations

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📧 Support

For questions or issues, please open an issue in the repository.

---

Built with ❤️ using React

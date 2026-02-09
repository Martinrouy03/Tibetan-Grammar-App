# Tibetan Grammar Master

A comprehensive web application for learning Tibetan language and grammar step by step.

## Features

- **Progressive Lessons**: Structured lessons from beginner to advanced levels
- **Interactive Vocabulary Cards**: Flip cards with audio pronunciation
- **Grammar Explanations**: Detailed grammar rules with examples
- **Audio Support**: Native Tibetan pronunciation with adjustable playback speed
- **Progress Tracking**: Track your learning progress with localStorage persistence
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technologies Used

- **React 18.3.1**: Frontend framework
- **Redux Toolkit 1.9.7**: State management
- **SCSS/Sass**: Styling
- **FontAwesome**: Icons
- **Moment.js**: Date/time handling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd C:\Users\marti\Desktop\Apps\tibapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
tibapp/
├── public/
│   ├── audio/              # Audio pronunciation files
│   ├── configuration.json  # App configuration
│   └── index.html
│
├── src/
│   ├── app/                # Redux store configuration
│   ├── services/           # Redux actions and reducers
│   ├── views/              # React components
│   ├── data/               # Lesson content (JSON)
│   ├── utils/              # Utility functions
│   ├── assets/             # Images and other assets
│   └── Constant.js         # App constants
│
└── package.json
```

## Lesson Data Structure

### Adding New Lessons

1. Create a new JSON file in `src/data/lessons/` (e.g., `lesson-3.json`)
2. Follow the lesson structure from existing lessons
3. Add corresponding audio files in `public/audio/lessons/lesson-3/`
4. Update `src/data/lessonsIndex.json` with the new lesson metadata

No code changes are required to add new lessons!

## Audio Files

Audio files should be placed in:
- `public/audio/lessons/lesson-X/` for lesson audio
- `public/audio/exercises/` for exercise audio

Supported formats: MP3

## Progress Tracking

User progress is automatically saved to localStorage with the key `tibetanAppProgress`. This includes:
- Completed lessons
- Exercise scores
- Learning streaks
- Time spent studying

## Configuration

The app can be configured via `public/configuration.json`:
- UI theme and colors
- Audio settings (playback rates, auto-play)
- Progress tracking options
- Multi-language support (EN/FR)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Additional exercise types (translation, matching)
- User authentication
- Cloud progress sync
- Spaced repetition algorithm
- Achievement system
- Offline mode support

## License

This project is for educational purposes.

---

**Version:** 1.0.0
**Created:** February 2026

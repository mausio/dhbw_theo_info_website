# Sorting Algorithm Visualization

An interactive web application for learning and visualizing sorting algorithms, built with React, TypeScript, and Vite.

## Project Statistics

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                      95           1289             71           9882
XML                             10              1              0            461
Markdown                         1             24              0             85
HTML                             2              0              0             26
JavaScript                       1              1              0             25
-------------------------------------------------------------------------------
SUM:                           109           1315             71          10479
-------------------------------------------------------------------------------
```


## Features

- Interactive visualizations of multiple sorting algorithms:
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Counting Sort
  - Bucket Sort
  - Radix Sort
  - Heap Sort

- Educational features:
  - Step-by-step animation
  - Manual and automatic execution modes
  - Speed control for animations
  - Interactive tasks and quizzes
  - Leaderboard system
  - Multilingual support (i18n)

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dhbw_theo_info_web.git
cd dhbw_theo_info_web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`


## Build

To create a production build:

```bash
npm run build
```

## Technology Stack

- React 18.3
- TypeScript
- Vite
- Material-UI (MUI)
- React Router DOM
- Redux Toolkit
- i18next
- Styled Components
- Various animation libraries (Lottie, etc.)

## Project Structure

- `/src`
  - `/components` - Reusable React components
  - `/pages` - Page components
  - `/styles` - Styled components and global styles
  - `/context` - React context providers
  - `/utils` - Utility functions
  - `/static` - Static assets and content
  - `/translation` - i18n translation files

## Features in Detail

### Algorithm Visualizations
- Interactive bar charts and diagrams
- Color-coded elements to track algorithm progress
- Step-by-step execution with explanations
- Adjustable animation speed

### Gamification Features
- Global leaderboard system to track and compare progress
- Points system for completing algorithm exercises
- Achievement badges for mastering different sorting algorithms
- Interactive challenges with increasing difficulty levels
- Real-time progress tracking and performance metrics
- Competitive elements to encourage learning and engagement
- Personalized learning paths based on performance

### Educational Components
- Comprehensive algorithm explanations
- Interactive quizzes and tasks
- Progress tracking
- Comment section for discussions

### User Interface
- Modern, responsive design
- Intuitive controls
- Dark mode support
- Accessibility features
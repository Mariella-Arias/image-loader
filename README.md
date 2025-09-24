# Image Loader

A Node.js application for file uploading.

## Features

- **View Images**

  - A grid with all stored images

- **Upload Images**

  - Browse device storage to select new image to upload

- **Delete Images**

  - Delete a single image
  - Confirmation dialog to prevent accidental deletion

## Technology Stack

- **Frontend Tooling**: Vite
- **Backend Framework**: Express.js 5.x
- **Styling**: Material UI v7
- **HTTP Client**: Axios
- **Language**: TypeScript
- **Linting and formatting**: ESLint and Prettier
- **Package Manager**: npm
- **Runtime**: Node.js

## Project Structure

```
image-loader/
│
├── apps/                # Apps directory
│   ├── client/
│   │   ├── src/                     # UI source code
│   │   │  ├── assets/               # Shared assets
│   │   │  ├── components/           # Shared components
│   │   │  │   └── ImageLoader.tsx   # Image Loader component
│   │   │  │
│   │   │  ├── types/                # TypeScript type definitions
│   │   │  ├── App.tsx               # Main app component
│   │   │  ├── main.tsx              # Client entry point
│   │   │  ├── styles.css            # Global styles
│   │   │  └── vite-env.d.ts         # Vite environment types
│   │   │
│   │   ├── .gitignore         # Git ignore file
│   │   ├── eslint.config.js   # ESLint configuration
│   │   ├── index.html         # HTML entry point
│   │   ├── package.json       # npm dependencies
│   │   └── tsconfig.json      # TypeScript configuration
│   │
│   └── server/
│      ├── uploads/              # Target directory
│      ├── package.json          # npm dependencies
│      └── server.js             # Server entry point and routes
│
├── .gitignore           # Git ignore file
└── package.json         # Monorepo configuration

```

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/Mariella-Arias/image-loader.git
   cd image-loader
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Access the application at `http://localhost:5173`

## Development

- **UX Design**: 1hr
- **Project Configuration**: 2hrs
- **Backend**: 6hrs
- **Frontend**: 7hrs
- **Project Documentation**: 1hr

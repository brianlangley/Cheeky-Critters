# Cheeky-Critters
**A phaser.io game inspired by Angry Birds and Happy Tree Friends**

## Table of Contents
- [Cheeky-Critters](#cheeky-critters)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [About project](#about-project)
      - [Design document](#design-document)
  - [Development Environment](#development-environment)
    - [Hardware Specifications](#hardware-specifications)
    - [Software and Tools](#software-and-tools)
      - [Code Editor](#code-editor)
      - [Package Managers](#package-managers)
      - [Build Tools](#build-tools)
      - [Game Engine](#game-engine)
      - [Version Control](#version-control)
    - [Browsers](#browsers)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Serving the Project](#serving-the-project)
    - [Build for Production](#build-for-production)
    - [Using `http-server` (optional)](#using-http-server-optional)
  - [Accessing the Project](#accessing-the-project)

## Getting Started

### About project

This project is a simple game inspired by Angry Birds and Happy Tree Friends. The game is built using the Phaser 3 game engine and Webpack. 

Based on the successfully acclaimed game Angry Birds, the player has to launch a critter from a slingshot to hit the target. The critter will bounce off the walls and obstacles until it hits the target. The player has to use the critter's bounces to hit the target in the fewest possible moves.

#### Design document
To get a clear understanding of the game's intended design and mechanics, please refer to the [design document](./docs/Cheeky%20Critters%20Project%20Design.pdf).

## Development Environment

### Hardware Specifications

- **Model:** Apple Macbook Air 13-inch
- **Chip:** Apple Silicon M1
- **Memory:** 8 GB
- **Operating System:** MacOS - Sonoma 14.4.1

### Software and Tools

#### Code Editor

- Visual Studio Code 1.90.1 ARM64

#### Package Managers

- Node.js v22.3.0
- npm 10.8.1
- Homebrew v4.3.6

#### Build Tools

- Webpack v5.92.0
- Webpack CLI v 5.1.4

#### Game Engine

- Phaser 3.80.1

#### Version Control

- Git v2.45.2

### Browsers

- Chrome: 125.0.6422.176
- Safari: 17.4.1

## Prerequisites

- Node.js and npm must be installed on your machine.
- Optional: A local server such as `http-server` for serving the `dist` directory.

## Installation

1. Clone the repository

2. Install npm dependencies:
   ```bash
   npm install
   ```

## Development

To start Webpack in watch mode and automatically rebuild your project on file changes:

```bash
npm run watch
```

This command enables Webpack to watch for changes in your source files and rebuild the project automatically.

## Serving the Project 

You can use the `npm run start` command to start the development server. This command will also enable Webpack to watch for changes in your source files and rebuild the project automatically.

```bash
npm run start
```

### Build for Production

To build the project for production:

```bash
npm run build
```

The production-ready files will be in the `dist` directory.


### Using `http-server` (optional)

1. Install `http-server` globally (if not already installed):
   ```bash
   npm install -g http-server
   ```

2. Start the server from the project directory:
   ```bash
   http-server dist
   ```

## Accessing the Project

Open your browser and navigate to: `http://localhost:8080/`

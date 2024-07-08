# Cheeky Critters
[![Netlify Status](https://api.netlify.com/api/v1/badges/ae694896-f62d-49b0-a96d-e27857fbaf1c/deploy-status)](https://app.netlify.com/sites/cheekycritters/deploys)

A phaser.io game inspired by Angry Birds and Happy Tree Friends-

### Project details

**Project name:** Cheeky Critters  

**Client:** Best Education B.V.  

**Project owner:**  
- Bob van der Berge  

**Customer:**  
- Miss Jacobs  

**Team members:**  
- Brian Langley (Development + Design)

## Table of Contents
- [Cheeky Critters](#cheeky-critters)
    - [Project details](#project-details)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Objective](#objective)
    - [Key Features](#key-features)
    - [Technical Goals](#technical-goals)
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
  - [Techniques](#techniques)
  - [Tech Breakdown](#tech-breakdown)
  - [Installation](#installation)
  - [Development](#development)
  - [Serving the Project](#serving-the-project)
    - [Build for Production](#build-for-production)
    - [Using `http-server` (optional)](#using-http-server-optional)
  - [Accessing the Project](#accessing-the-project)
  - [Powerpoint Presentation](#powerpoint-presentation)
  - [Progress Tracking](#progress-tracking)
  - [Checklist](#checklist)
  - [User Stories](#user-stories)
    - [Planned Sprint Planning](#planned-sprint-planning)
    - [Actual Sprint Planning](#actual-sprint-planning)
  - [Project Files](#project-files)
  - [Logbook](#logbook)
  - [Project Transfer](#project-transfer)

## Getting Started

Cheeky Critters combines the engaging mechanics of Angry Birds with the whimsical charm of Happy Tree Friends. Developed with the Phaser 3 game engine and Webpack, this game challenges players to launch critters using a cannon, aiming to hit targets with as few moves as possible. The critters will ricochet off walls and obstacles, requiring strategic planning to achieve the goal.

### Objective

The essence of Cheeky Critters is to deliver a captivating and fun experience. Players are tasked with aiming and launching characters at structures and targets, aiming for maximum destruction. The game is designed to hold the player's interest with its humorous animations, exaggerated expressions, and cleverly designed levels that encourage strategic thinking and precision.

### Key Features

- -Engaging Gameplay:- Inspired by the beloved mechanics of Angry Birds.
- -Whimsical Aesthetics:- Characters and animations draw inspiration from Happy Tree Friends, ensuring a humorous and enjoyable experience.
- -Strategic Challenges:- Players must carefully plan their shots to navigate through obstacles and hit targets efficiently.
- -Powered by Phaser 3:- Utilizes the latest Phaser 3 game engine for smooth and responsive gameplay.


### Technical Goals

- Develop a fully functional side-view game using Phaser 3.
- Implement accurate physics for character launching and collisions.
- Create engaging sound effects and particle effects.
- Design multiple levels with increasing difficulty.
- Ensure the game is optimized for performance.


### Design document

To get a clear understanding of the game's intended design and mechanics, please refer to the [design document](./docs/Cheeky%20Critters%20Project%20Design.pdf).

## Development Environment

### Hardware Specifications

- -Model:- Apple Macbook Air 13-inch
- -Chip:- Apple Silicon M1
- -Memory:- 8 GB
- -Operating System:- MacOS - Sonoma 14.4.1

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

## Techniques

- Phaser 3 framework for game development.
- JavaScript for scripting game mechanics.
- HTML and CSS for game interface design.
- Webpack for module bundling and build automation.
- Babel for JavaScript transpiling.

## Tech Breakdown

- Phaser: Main game development framework.
- JavaScript: Scripting language for game mechanics.
- HTML/CSS: Used for structuring and styling the game interface.
- Webpack: Tool for bundling game assets.
- Babel: Transpiler to ensure compatibility across different browsers.

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

Open your browser and navigate to: `http://localhost:8080/` or alternatively, its hosted online via Netlify at: [Cheeky Critters](https://cheekycritters.netlify.app/)

## [Powerpoint Presentation](https://www.canva.com/design/DAGKWZsXCwQ/1XsmluoDbC99PXlPtgD6QQ/view?utm_content=DAGKWZsXCwQ&utm_campaign=designshare&utm_medium=link&utm_source=editor)

PDF version of the presentation can be found [here](./docs/Cheeky%20Critters.pdf).


## Progress Tracking

## Checklist

- [x] Setup project structure and install dependencies.
- [x] Implement basic game mechanics (cannon, character launch).
- [x] Add sound effects and particle effects.
- [x] Design and implement multiple levels.
- [ ] Optimize game performance.
- [ ] Conduct extensive playtesting and debugging.

## User Stories

- As a player, I want to drag and release a character to launch it towards targets.
- As a player, I want to see various targets and structures to aim at.
- As a player, I want to hear sound effects when my character hits a target.
- As a player, I want to see particle effects upon impact.
- As a player, I want the game to become more challenging as I progress through levels.


### Planned Sprint Planning

| Milestone | Description | Due |
| --------- | ----------- | --- |
| #1 | Basic cannon and impact mechanics- Basic character animations and states (neutral, launched, flying, impact)- Basic structure code logic and enemy spawning | Day 1 - 3 |
| #2 | QA on impact and level/structure logic- Refining and building upon level design and structures- Sound effects for launching, impacts and reactions- Particle effects | Day 3 - 7 |
| #3 | Character and enemy damage animations- Level difficulty tiers with more complex levels and challenges | Day 8 - 9 |
| #4 | UI and Menu- Game music- Conduct extensive playtesting and debugging | Day 10 - 12 |
| #5 | Optimize performance and finalize project- Powerpoint and presentation prep work | Day 12 - 14 |
| Backlog | Additional player and enemy character types- More levels than the base requirements- Debris and special abilities | TBD |

### Actual Sprint Planning

**Day 1:**

- Found all necessary assets, background, and ground textures. Separated the ground texture to define it manually within Phaser.
- Expanded upon the Happy Tree Friends theme by utilizing a cannon instead of a cannon.
- Added two base characters and three enemy types, with mirroring and circular forms for easy collision and rotation.
- Set max background width to 1920px and height to 600-620px.
- Added effects for the cannon and impact using GIFs.
- Used sound effects from demo-phaser-crazybirds repo by Nix Solutions, and additional sound effects from Pixabay and Mixkit.
- Texture assets from vecteezy, edited character sprites from deviant artists, and GIFs from Giphy.

**Day 4:**

- Personal matters prevented work on Days 2 and 3.
- Worked on game structure with an Object-Oriented Programming (OOP) approach.
  - Created folder and file structure.
  - Set up `main.js` with essential classes and scenes.
- Pre-loader: Created a feature branch, pathed and loaded files, merged branch with master.
- Menu Scene: Implemented loading of logos with music, main menu with start button, background, and theme music. Added a prompt for user interaction to enable audio autoplay.

**Day 8:**

- Set up base map generation with random background and ground textures.
- Established ground sprite as the base point for interactions.
- Implemented a cannon with rotation and aiming mechanics, projectile mechanics, visual and functional enhancements.
- Continued tasks into Day 9 for fine-tuning mechanics.

**Day 9:**

- Completed final tasks for the cannon.
- Deprecated `Character.js` as it was unnecessary.
  
**Day 11:**

- Faced issues with structure generation and collision responses in Phaser.
- Attempted different approaches, including sprite rotation and code-generated rectangles, with limited success.
- Simplified to basic tower structure due to complexity and instability.
  
**Day 14:**

- Discovered Matter.js but decided not to use it due to time constraints.
- Added simple collision detection and visual/audio feedback for impacts.

**Day 17:**

- Balancing personal life and project work was challenging.
- Used AI to expedite structure and projectile interaction tasks.
- Implemented enemy spawning logic with rarity levels and scoring system.
- Added game system and game over mechanism.

**Day 18:**

- Merged scoring branch to master.
- Finalized documentation and set up Netlify for online access.
- Attempted to fix score rendering issue.

## Project Files

- `package.json` Project dependencies and scripts.
- `main.js` Main game logic and setup.
- `GameScene.js` Core game scene with mechanics.
- `MenuScene.js` Game menu scene with navigation.
- `PreloadScene.js` Preloading assets and resources.
- `Cannon.js` Cannon mechanics and interactions.
- `Enemy.js` Enemy logic and behavior.
- `Scoring.js` Scoring system implementation.
- `Structure.js` Game structure and physics.

## Logbook

**Day 1:**

I was busy finding all necessary assets, background and ground. The reason I separate this is to ensure that within Phaser, I can manually define the top of the ground texture as the beginning point and a border. If the ground was within the image, it would have been too arbitrary and had to be manually defined per image; making it tedious and inefficient.

I opted to expand further upon the happy tree friends theme, and utilise a canon instead of a cannon, making the game more characteristic and unique. 

Alongside this, I have two base characters for now, along side three enemy types. They are mirrored of one another, the players facing east and enemies west. They all have a circle form, ensuring easy collision and rotation.All background have been given a max width of 1920px, and heights vary between 600-620px.

Ground height texture are a max of Effects for the canon and impact have also been added. I opted to use gif’s as then there is no need for me to programatically define the image still states. 

Most of the sound effects have been taken from the repo demo-phaser-crazybirds      by Nix Solutions

Additional to that, theme of happy tree friends was from YouTube. Sound effects are from PixaBay, and Mixkut

All texture assets are from vecteezy:

[Mate Cole](https://www.vecteezy.com/members/graphicsrf) Character sprites have been edited but originally from [deviant artists](https://www.deviantart.com/rawflower/gallery) and gifs are from giphy.

**Day 4:**

Unfortunately, I could not do any work on days 2 and 3 due to personal matters.
Today, I began working on the game structure, adopting an Object-Oriented Programming (OOP) approach.

1. Project Setup:

- Folder and File Structure: Created the necessary folders and files to organise the project efficiently.
- Main.js: Set up the main.js file with the essential classes and scenes to establish the game's core structure.

1. Pre-loader:
    - Feature Branch: Created a new feature branch dedicated to the pre-loader.
    - Pathing and Loading: Ensured all files were correctly pathed and loaded into the project.
    - Merge: Once completed, this branch was pushed and merged with the master.

2. Menu Scene:
    - Implementation: Began implementing the menu scene, which includes:
        - Loading two logos with their respective music.
        - Displaying the main menu with a start button, background, and theme music.
    - Autoplay Issue: Faced a challenge with getting the music to autoplay due to browser privacy settings. To work around this, I added a prompt asking users to click before the game initializes, allowing the audio to play.

This branch has also been merged with the master.

**Day 8:**

Due to personal reasons at home, I was unable to maintain a consistent work schedule. Despite this, I made significant progress on the project.

I began the day by setting up the base map generation. This involved creating two arrays: one for the background textures and one for the ground textures. Each refresh randomly selects a new background and ground from these arrays, which are then placed into the backdrop.

The ground sprite was established as the base point for future interactions with gravity and other sprites.

After completing and merging the feature/basic-game-scene branch into the master, I started implementing a cannon. I chose a cannon over a cannon to fit the darker style of Happy Tree Friends and to add a unique element to the game.

However, the implementation turned out to be more complex than initially anticipated. The main challenges included:

1. Rotation and Aiming: Ensuring the cannon could aim within a 90-degree arc (from North to East) and accurately display an aim line reflecting the direction, power, and arc of the shot.
2. Projectile Mechanics: Ensuring the projectile follows the calculated trajectory with proper velocity, realistic collision, bounce, and impact.
3. Visual and Functional Enhancements: Adding a base to cover the cannon's rotation for a more refined look, using GIF effects for the cannon shot and projectile impact, and ensuring the projectile is shot from the barrel's end rather than the cannon's centre.

These tasks required two days to complete, continuing into Day 9. I iterated locally several times to get the mechanics just right, utilizing ChatGPT to create a more realistic projectile trajectory.

**Day 9:**

Today, I completed the final tasks necessary for the cannon. A break and a refresher helped me gain more clarity on the code. Additionally, I deprecated the Character.js file, as it was unnecessary because the character was being rendered and defined within Cannon.js, alongside the states of flying and impact.

**Day 11:**

Structure generation proved troublesome. For a TLDR: Phaser did not have the necessary functionality to implement a physical response to collisions of the impact. In hindsight, I should have introduced Matter.js at an earlier stage.

I aimed to create a logically and architecturally sound structure that could be automatically rendered and spawned per game. After many iterations and hours of work, I realized I made several mistakes. My sprite for the wooden beam was horizontal, and to create vertical beams, I used Phaser's angle function to rotate it 90 degrees. However, upon impact by a projectile, the beams would stand upright and slide across the ground like an ice hockey puck.

I then tried an alternative approach of generating rectangles within the code and bypassing the sprite route, but this also proved troublesome and did not achieve the desired effect. This entire generation process was more challenging than I initially envisioned, and I should have conducted more prior research before pursuing this approach.

The main problem was defining a collision reaction to the projectile, ensuring that if a 90-degree (upright) beam was standing and impacted, it would tip over and fall. After hours of toiling, I simplified the process for that day to a basic tower structure. A traditional house with a foundation, walls, and an angled roof was too complex and ended up collapsing into itself.

**Objective:** Create a logically and architecturally sound structure that could be automatically rendered and spawned per game.

**Challenges:**

- Sprite Rotation Issue: The sprite for the wooden beam was horizontal, and rotating it 90 degrees using Phaser's angle function caused it to slide across the ground like an ice hockey puck upon impact.
- Alternative Approach: Tried generating rectangles within the code instead of using sprites, but this did not achieve the desired effect and was cumbersome.
- Collision Reaction: Defining a realistic collision reaction was difficult. The beams needed to tip over and fall when impacted by a projectile.
Iterations and Realisations:
- Spent many hours and iterations trying to get the structure generation right.
- Simplified the process to a basic tower structure as creating a traditional house with a foundation, walls, and an angled roof was too complex and unstable.

**Day 14:**

After the 12th day of development, I eventually discovered Matter.js with the help of ChatGPT. However, due to time constraints and the need to rewrite a significant portion of my code for the structure and cannon, coupled with a weird effect with the ground, I decided not to utilise this tool.

Instead, I added a simple if/else statement to check if an impact from the projectile occurred. If damage was detected, the beam would arc slightly. While not realistic or ideal, it still provided a clear indication of an impact. Additionally, I included state changes for the beam texture and a sound effect for the impact.

**Alternative Solution:**

- Simple Collision Detection: Added a simple if/else statement to check if an impact from the projectile occurred. If damage was detected, the beam would arc slightly.
- Visual and Audio Feedback: Implemented state changes for the beam texture and added a sound effect for the impact.
Outcome: While not realistic or ideal, this solution provided a clear indication of an impact and allowed for some level of interaction with the structures.

**Day 17:**

This was my 7th day of working on this project. 

Finding a balance between my person situation and working on this project was challenging. I still wasn’t satisfied with the structure and how the projectile (character) interacted with structure. To this extend and lack of time, and honestly a want to just be finished with this phase. I heavily utilised AI to finish this part.

I eventually decided it wasn’t worth the time anymore, after several days of working on such a minimal task. I decided to just push something that worked and push on with the final features necessary. This being the enemy spawning logic and scoring.

For the enemy spawning, the code was straight forward and fairly easy to implement; However this was because I had ChatGPT helping to quickly finish this up. I added degrees of rarity to the enemy types being spawned, from standard, to rare and rarest. Each have different levels of scoring.Scoring was added, however there was a problem with rendering on screen, for some reason I was unable and confused as to why it wasn’t showing. So I opted to add it to the console log to at least prove that a scoring system is in effect.

As mentioned earlier, each enemy type has a score to it. Alongside this, damage to structures also grants 10 points. However missing shots deduct 50 points.Alongside this, a new game system and game over mechanism was added. For safety as there were some bugs, I also added a new game button on the top right that simply refreshes the map with a new type, and new enemies and structures (however the score continues, showing a level system) In the event the player uses all 7 shots, and not all enemies are destroyed, a game over shows and the game resets with the score set at 0.

**Day 18:**

Merging the scoring branch to master and finalising documentation for this repo. I will also try set up a netlify for this project so it can be accessed with ease online. Also given time left, I will attempt to fix the issue with the score not rendering visually in game.


## [Project Transfer](./docs/Project%20Transfer.md)

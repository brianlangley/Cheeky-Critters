# Test cases Cheeky Critters

## Table of contents
- [Test cases Cheeky Critters](#test-cases-cheeky-critters)
  - [Table of contents](#table-of-contents)
  - [Test case 1: Score is visible](#test-case-1-score-is-visible)
  - [Test case 2: Win condition](#test-case-2-win-condition)
  - [Test case 3: More power and high arch of aim](#test-case-3-more-power-and-high-arch-of-aim)
  - [Test case 4: More physics in the game](#test-case-4-more-physics-in-the-game)
  - [Test case 5: Mobile touch screen support](#test-case-5-mobile-touch-screen-support)
- [Summary](#summary)

## Test case 1: Score is visible

- **Description**: As a player, I want to be able to see my score so that I can track my progress.
- **Tester**: Lorenz Girgis
- **Date and time**: 08/07/2024 10:00
- **Test steps**:
  1. Start the game.
  2. Play the game.
  3. As I play, and hit enemies and structures, I should see my score increase.
  4. Score should be visible to me game (instead of in the console).
- **Expected result**: The score is visible in the game, and increases as I play.
- **Changes made**: To quickly address this issue, I made a hadrcoded div in the `index.html` file that displays the score. I then added a function in the `score.js` file that injects and updates the score in the div as the player plays the game. While this was not ideal, as it should have been done via Phaser itself. The quick fix was necessary to ensure that the player could see their score.
- **Status**: ✅ Implemented


## Test case 2: Win condition

- **Description**: As a player, I want to be able to win the game so that I can feel a sense of accomplishment.
- **Tester**: Batuhan Yumak
- - **Date and time**: 08/07/2024 10:15
- **Preconditions**: The game is running, and I have scored enough points to win.
- **Test steps**:
  1. Start the game.
  2. Play the game.
  3. As I play, I should see my score increase.
  4. Once I reach a certain score, I should see a win screen.
- **Expected result**: The win screen is displayed when the player reaches the winning score.
- **Changes made**: I added a win screen that is displayed when the player reaches the winning score (5000). The win screen displays a message that congratulates the player on winning the game. Once this screen is shown, the game restarts. However in future iterations, the difficulty of the game should increase as the player progresses.
- **Status**: ✅ Implemented


## Test case 3: More power and high arch of aim

- **Description**: As a player, I want to be able to shoot with more power and a higher arch so that I can hit enemies that are further away, or behind obstacles.
- **Tester**: René Goedhart
- **Date and time**: 08/07/2024 10:00
- **Test steps**:
  1. Start the game.
  2. Play the game.
  3. As I play, I should be able to hold down the mouse button to increase the power of my shot.
  4. I should also be able to aim higher by moving the mouse further away from the player character. There shouldnt be a limit or a cap on how high I can aim.
- **Expected result**: The player can shoot with more power and a higher arch, and is able to hit enemies that are further away, or behind obstacles.
- **Changes made**: None at this moment. This feature is not implemented yet.
- **Status**: ❌ Not implemented yet


## Test case 4: More physics in the game

- **Description**: As a player, I want to see more physics in the game so that I can have a more realistic experience. For example with the sturcure falling over, or breaking when hit.
- **Tester**: Brian Langley
- **Date and time**: 08/07/2024 20:00
- **Test steps**:
  1. Start the game.
  2. Play the game.
  3. As I play, I should see more physics in the game. For example, when I hit a structure, it should fall over or break.
  4. I should also see more realistic physics when I hit enemies. For example, they should be pushed back when hit. 
  5. The player character should also be affected by physics. For example, when hit by an enemy, they should be pushed back.There should be some knockback.
  6. I expect to see the structure be more logical and topple over when hit, and the enemies to be pushed back when hit.
- **Expected result**: When the projectile (player character) hits the structure, the structure should fall over or break. When the projectile hits an enemy, the enemy should be pushed back. When the player character is hit by an enemy, they should be pushed back. 
- **Changes made**: None at this moment. This feature is not implemented yet due to complexity necessary to implement [Matter.js](https://brm.io/matter-js/). This would require a complete overwrite of several components in the game.
- **Status**: ❌ Not implemented yet (ticket made for future implementation)

## Test case 5: Mobile touch screen support

- **Description**: As a player, I want to be able to play the game on my mobile device so that I can play the game on the go.
- **Tester**: Brian Langley
- **Date and time**: 08/07/2024 14:15
- **Test steps**:
  1. Open the game on a mobile device.
  2. Play the game.
  3. As the game starts, I should be able to click on a touch device to begin the game, and play it fully; as if I was using a mouse.
- **Expected result**: The game should be fully playable on a mobile device, with touch screen support.
- **Changes made**: None at this moment. This feature is not implemented yet. But its a quick fix, by syimply enabling a touch event listener in the game, with the mouse event listener.
- **Status**: ❌ Not implemented yet (ticket made for future implementation)


# Summary

After having several people test the game, and getting an overall positive feedback, there are still some features that need to be implemented. The game is currently in a MVP state, and needs more features to be added to make it a more enjoyable experience. The game is currently missing the features mentioned above. Once improvements are made, a new testing session will be conducted to ensure that the game is up to par

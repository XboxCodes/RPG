function login(username, password) {
    const userData = loadUserData(username);
    if (userData && userData.password === password) {
        console.log("Login successful");
        // Load player data and apply to game state
    } else {
        console.log("Incorrect username or password");
    }
}


let currentMapImage = ''; // Variable to store the current map image URL
let currentEnemyHealth = 0;
let playerLevel = 1;
let currentEnemy = '';
let currentEnemyAttackRange = [0, 0];
let playerEXP = 0;
let maxPlayerEXP = 100;
let isInHome = false;


function selectMap(mapName) {
    // Hide the home section when a map is selected
    isInHome = false;
    document.getElementById('home-section').style.display = 'none';

    document.getElementById('current-map').innerText = `You are exploring the ${mapName}`;
    const mapImage = document.getElementById('map-image');
    const exploreButton = document.getElementById('explore-button');

    const mapImages = {
        'Forest': 'https://logandtest.neocities.org/images/Forest.png',
        'Cave': 'https://logandtest.neocities.org/images/Cave.png',
        'Desert': 'https://logandtest.neocities.org/images/Desert.png',
        'Swamp': 'https://logandtest.neocities.org/images/Swamp.png',
        'Ocean': 'https://logandtest.neocities.org/images/Ocean.png',
        'Graveyard': 'https://logandtest.neocities.org/images/Graveyard.png',
        'Volcano': 'https://logandtest.neocities.org/images/Volcano.png'
    };


    document.getElementById('fight-message').textContent = "Click 'Explore' to find enemies.";
    document.getElementById('enemy-health').style.display = 'none';
    currentEnemy = '';
    currentEnemyHealth = 0;
    currentEnemyEXP = 0; // Reset EXP for the next battle
}


    exploreButton.textContent = 'Explore';
    exploreButton.classList.remove('attack-mode');
    exploreButton.style.display = 'block';



   // Reset enemy information when selecting a new map
    document.getElementById('fight-message').textContent = "Click 'Fight' to encounter enemies.";
    document.getElementById('enemy-health').style.display = 'none';
    currentEnemy = '';
    currentEnemyHealth = 0;
    currentEnemyEXP = 0;

const maxPlayerHealth = 250;
let playerHealth = maxPlayerHealth;

function goHome() {
    // Display the home section and set the player as being in the home menu
    isInHome = true;
    document.getElementById('home-section').style.display = 'block';
    document.getElementById('fight-message').textContent = "Welcome to the Healing Center!";
    document.getElementById('enemy-health').style.display = 'none';

    // Hide the explore/attack button since we cannot battle in the home menu
    document.getElementById('explore-button').style.display = 'none';
}


function healPlayer() {
    // Restore player's health to full
    playerHealth = maxPlayerHealth;

    // Update the player's health display
    document.getElementById('player-health').textContent = playerHealth;

    // Show a message indicating the player is fully healed
    document.getElementById('fight-message').textContent = "You have been healed to full health!";
}



function exploreOrAttack() {
    // Prevent exploring or attacking while in the home menu
    if (isInHome) {
        document.getElementById('fight-message').textContent = "You cannot explore or attack while at home!";
        return;
    }

    const exploreButton = document.getElementById('explore-button');

    // Check if the button is in explore mode or attack mode
    if (!exploreButton.classList.contains('attack-mode')) {
        startExploration();
    } else {
        attackEnemy();
    }
}

function startExploration() {
    const mapImage = document.getElementById('map-image');
    const fightMessage = document.getElementById('fight-message');
    const enemyHealthDisplay = document.getElementById('enemy-health');
    const currentEnemyHealthDisplay = document.getElementById('current-enemy-health');
    const exploreButton = document.getElementById('explore-button');

    // Ensure the home section is hidden when exploring
    document.getElementById('home-section').style.display = 'none';
    isInHome = false;

    const randomNumber = Math.floor(Math.random() * 30);

    if (randomNumber === 0) {
        currentEnemy = 'Savage Ogre';
        currentEnemyHealth = 130;
        currentEnemyAttackRange = [7, 11];
        currentEnemyEXP = 36;
        mapImage.src = ogreImageUrl;
        fightMessage.textContent = "A Savage Ogre has appeared!";
    } else if (randomNumber === 1) {
        currentEnemy = 'Demented Hen';
        currentEnemyHealth = 70;
        currentEnemyAttackRange = [8, 10];
        currentEnemyEXP = 24;
        mapImage.src = dementedHenImageUrl;
        fightMessage.textContent = "A Demented Hen has appeared!";
    } else if (randomNumber === 2) {
        currentEnemy = 'Venomous Serpent';
        currentEnemyHealth = 125;
        currentEnemyAttackRange = [5, 12];
        currentEnemyEXP = 30;
        mapImage.src = venomousSerpentImageUrl;
        fightMessage.textContent = "A Venomous Serpent has appeared!";
    } else {
        mapImage.src = currentMapImage;
        fightMessage.textContent = "No enemies in sight. Keep exploring!";
        return;
    }

    if (currentEnemy) {
        exploreButton.textContent = 'Attack';
        exploreButton.classList.add('attack-mode');
        enemyHealthDisplay.style.display = 'block';
        currentEnemyHealthDisplay.textContent = currentEnemyHealth;
    }
}



function attackEnemy() {
    const fightMessage = document.getElementById('fight-message');
    const playerDamage = 12;
    const enemyDamage = Math.floor(Math.random() * (currentEnemyAttackRange[1] - currentEnemyAttackRange[0] + 1)) + currentEnemyAttackRange[0];
    const currentEnemyHealthDisplay = document.getElementById('current-enemy-health');
    const playerHealthDisplay = document.getElementById('player-health');

    currentEnemyHealth -= playerDamage;
    fightMessage.textContent = `You attacked ${currentEnemy} for ${playerDamage} damage!`;

    if (currentEnemyHealth <= 0) {
        fightMessage.textContent += ` The ${currentEnemy} has been defeated!`;
        currentEnemyHealthDisplay.textContent = '0';

        // Award EXP to the player based on the defeated enemy
        playerEXP += currentEnemyEXP;
        updatePlayerStats();
        
        resetToExploreMode();
        return;
    }

    currentEnemyHealthDisplay.textContent = currentEnemyHealth;

    playerHealth -= enemyDamage;
    fightMessage.textContent += ` The ${currentEnemy} attacked you for ${enemyDamage} damage!`;
    playerHealthDisplay.textContent = playerHealth;

    if (playerHealth <= 0) {
        fightMessage.textContent += " You have been defeated! Game over.";
        resetToExploreMode();
    }

    console.log(`Player health: ${playerHealth}, Enemy health: ${currentEnemyHealth}`);
}


function updatePlayerStats() {
    const expBar = document.querySelector('.exp-bar');
    const expText = document.querySelector('.exp-text');
    const levelDisplay = document.querySelector('.level-circle');

    // Calculate the percentage of current EXP
    const expPercentage = (playerEXP / maxPlayerEXP) * 100;
    expBar.style.width = `${expPercentage}%`;
    expText.textContent = `EXP: ${playerEXP}/${maxPlayerEXP}`;

    // Level up logic
    if (playerEXP >= maxPlayerEXP) {
        playerEXP -= maxPlayerEXP;
        maxPlayerEXP += 120; // Increase EXP required for the next level
        playerLevel += 1; // Increase the player's level
        playerHealth = maxPlayerHealth; // Heal the player on level up

        document.getElementById('player-health').textContent = playerHealth;
        levelDisplay.textContent = playerLevel; // Update the level display
        fightMessage.textContent = "You leveled up! Your health has been fully restored!";
    }
}




function resetToExploreMode() {
    const exploreButton = document.getElementById('explore-button');
    exploreButton.textContent = 'Explore';
    exploreButton.classList.remove('attack-mode');
    document.getElementById('enemy-health').style.display = 'none';
    currentEnemy = '';
    currentEnemyHealth = 0;
    currentEnemyEXP = 0;
    document.getElementById('map-image').src = currentMapImage;
}


// Sign up function
function signUp(username, password) {
    const data = {
        password: password,
        playerData: { level: 1, exp: 0, gold: 100 } // Example default data
    };
    saveUserData(username, data);
    console.log("Sign-up successful");
}

function saveUserData(username, data) {
    localStorage.setItem(username, JSON.stringify(data));
}


function savePlayerData(userId) {
  const playerData = {
    playerName: document.getElementById('player-name').textContent,
    playerLevel: playerLevel,
    playerEXP: playerEXP,
    maxPlayerEXP: maxPlayerEXP,
    playerHealth: playerHealth,
    maxPlayerHealth: maxPlayerHealth,
    playerGold: parseInt(document.getElementById('player-gold').textContent, 10)
  };

  db.collection('players').doc(userId).set(playerData)
    .then(() => {
      console.log('Player data saved successfully to Firestore.');
    })
    .catch((error) => {
      console.error('Error saving player data to Firestore:', error);
    });
}


function startFight() {
    const mapImage = document.getElementById('map-image');
    const fightMessage = document.getElementById('fight-message');
    const attackButton = document.getElementById('attack-button');

    // Generate a random number between 0 and 29 (30 possible outcomes)
    const randomNumber = Math.floor(Math.random() * 30); // Generates a number between 0 and 29

    // Check the random number for each monster's chance to appear (10% chance each)
    if (randomNumber === 0) {
        // Ogre spawns
        mapImage.src = ogreImageUrl;
        fightMessage.textContent = "An Ogre has appeared!";
    } else if (randomNumber === 1) {
        // Demented Hen spawns
        mapImage.src = dementedHenImageUrl;
        fightMessage.textContent = "A Demented Hen has appeared!";
    } else if (randomNumber === 2) {
        // Venomous Serpent spawns
        mapImage.src = venomousSerpentImageUrl;
        fightMessage.textContent = "A Venomous Serpent has appeared!";
    } else {
        // No monster appears, revert to the stored map image
        mapImage.src = currentMapImage;
        fightMessage.textContent = "No enemies in sight. Keep exploring!";
    }

    // Log for debugging purposes (can be removed in production)
    console.log("Random number generated:", randomNumber);
    console.log("Map image source set to:", mapImage.src);
}

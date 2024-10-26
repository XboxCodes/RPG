function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Add local login logic here if needed
}

let currentMapImage = ''; 
let currentEnemyHealth = 0;
let playerLevel = 1;
let currentEnemy = '';
let currentEnemyAttackRange = [0, 0];
let playerEXP = 0;
let maxPlayerEXP = 100;
let isInHome = false;
const maxPlayerHealth = 250;
let playerHealth = maxPlayerHealth;

// Function to select and display a map
function selectMap(mapName) {
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

    currentMapImage = mapImages[mapName] || '';
    mapImage.src = currentMapImage;
    mapImage.style.display = currentMapImage ? 'block' : 'none';

    exploreButton.textContent = 'Explore';
    exploreButton.classList.remove('attack-mode');
    exploreButton.style.display = 'block';

    document.getElementById('fight-message').textContent = "Click 'Explore' to find enemies.";
    document.getElementById('enemy-health').style.display = 'none';
    currentEnemy = '';
    currentEnemyHealth = 0;
    currentEnemyEXP = 0;
}

function goHome() {
    isInHome = true;
    document.getElementById('home-section').style.display = 'block';
    document.getElementById('fight-message').textContent = "Welcome to the Healing Center!";
    document.getElementById('enemy-health').style.display = 'none';
    document.getElementById('explore-button').style.display = 'none';
}

function healPlayer() {
    playerHealth = maxPlayerHealth;
    document.getElementById('player-health').textContent = playerHealth;
    document.getElementById('fight-message').textContent = "You have been healed to full health!";
}

function exploreOrAttack() {
    if (isInHome) {
        document.getElementById('fight-message').textContent = "You cannot explore or attack while at home!";
        return;
    }

    const exploreButton = document.getElementById('explore-button');
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

    document.getElementById('home-section').style.display = 'none';
    isInHome = false;

    const randomNumber = Math.floor(Math.random() * 30);

    if (randomNumber === 0) {
        currentEnemy = 'Savage Ogre';
        currentEnemyHealth = 130;
        currentEnemyAttackRange = [7, 11];
        currentEnemyEXP = 36;
        mapImage.src = 'https://iili.io/2fmqJDB.webp';
        fightMessage.textContent = "A Savage Ogre has appeared!";
    } else if (randomNumber === 1) {
        currentEnemy = 'Demented Hen';
        currentEnemyHealth = 70;
        currentEnemyAttackRange = [8, 10];
        currentEnemyEXP = 24;
        mapImage.src = 'https://iili.io/2fmfUcG.webp';
        fightMessage.textContent = "A Demented Hen has appeared!";
    } else if (randomNumber === 2) {
        currentEnemy = 'Venomous Serpent';
        currentEnemyHealth = 125;
        currentEnemyAttackRange = [5, 12];
        currentEnemyEXP = 30;
        mapImage.src = 'https://iili.io/2fmqFiF.webp';
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
}

function updatePlayerStats() {
    const expBar = document.querySelector('.exp-bar');
    const expText = document.querySelector('.exp-text');
    const levelDisplay = document.querySelector('.level-circle');
    const fightMessage = document.getElementById('fight-message');

    const expPercentage = (playerEXP / maxPlayerEXP) * 100;
    expBar.style.width = `${expPercentage}%`;
    expText.textContent = `EXP: ${playerEXP}/${maxPlayerEXP}`;

    if (playerEXP >= maxPlayerEXP) {
        playerEXP -= maxPlayerEXP;
        maxPlayerEXP += 120;
        playerLevel += 1;
        playerHealth = maxPlayerHealth;

        document.getElementById('player-health').textContent = playerHealth;
        levelDisplay.textContent = playerLevel;
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

function signUp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = {
        password: password,
        playerData: { level: 1, exp: 0, gold: 100 }
    };
    saveUserData(username, data);
    console.log("Sign-up successful");
}

function saveUserData(username, data) {
    localStorage.setItem(username, JSON.stringify(data));
}

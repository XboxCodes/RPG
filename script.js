// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxYtustDYLAN2YJCmYCpGIe6LWAPdLo18",
    authDomain: "logans-rpg.firebaseapp.com",
    databaseURL: "https://logans-rpg.firebaseio.com",
    projectId: "logans-rpg",
    storageBucket: "logans-rpg.appspot.com",
    messagingSenderId: "1059527936217",
    appId: "1:1059527936217:web:31d68e592d6a0a78df96c8",
    measurementId: "G-CX71SBX9X1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();



function signUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Signup successful for user:", user.email);
            savePlayerData(user.uid); // Save initial player data
        })
        .catch((error) => {
            console.error("Error during sign-up:", error.message);
        });
}

function login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Login successful for user:", user.email);
            loadPlayerData(user.uid); // Load player data after login
        })
        .catch((error) => {
            console.error("Error during login:", error.message);
        });
}

function savePlayerData(userId) {
    const playerData = {
        playerName: document.querySelector('.player-name').textContent,
        playerLevel: playerLevel,
        playerEXP: playerEXP,
        maxPlayerEXP: maxPlayerEXP,
        playerHealth: playerHealth,
        maxPlayerHealth: maxPlayerHealth,
        playerGold: parseInt(document.querySelector('.player-gold').textContent.replace('Gold: ', ''), 10)
    };

    db.collection('players').doc(userId).set(playerData)
        .then(() => {
            console.log("Player data saved successfully.");
        })
        .catch((error) => {
            console.error("Error saving player data:", error);
        });
}

function loadPlayerData(userId) {
    db.collection('players').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                document.querySelector('.player-name').textContent = data.playerName;
                playerLevel = data.playerLevel;
                playerEXP = data.playerEXP;
                maxPlayerEXP = data.maxPlayerEXP;
                playerHealth = data.playerHealth;
                maxPlayerHealth = data.maxPlayerHealth;
                document.querySelector('.player-gold').textContent = `Gold: ${data.playerGold}`;

                updatePlayerStats();
                console.log("Player data loaded successfully.");
            } else {
                console.log("No player data found. Initializing new player data.");
                savePlayerData(userId); // Save default data if no data is found
            }
        })
        .catch((error) => {
            console.error("Error loading player data:", error);
        });
}








function selectMap(mapName) {
    // Update the map name display
    document.getElementById('current-map').innerText = `You are exploring the ${mapName}`;
    const mapImage = document.getElementById('map-image');
    const fightButton = document.getElementById('fight-button');

    // Define the map images
    const mapImages = {
        'Forest': 'https://logandtest.neocities.org/images/Forest.png',
        'Cave': 'https://logandtest.neocities.org/images/Cave.png',
        'Desert': 'https://logandtest.neocities.org/images/Desert.png',
        'Swamp': 'https://logandtest.neocities.org/images/Swamp.png',
        'Ocean': 'https://logandtest.neocities.org/images/Ocean.png',
        'Graveyard': 'https://logandtest.neocities.org/images/Graveyard.png',
        'Volcano': 'https://logandtest.neocities.org/images/Volcano.png'
    };

    // Update the src attribute of the map image based on the selected map
    mapImage.src = mapImages[mapName] || '';
    mapImage.style.display = mapImages[mapName] ? 'block' : 'none';

    // Show the fight button only if a valid map is selected
    if (mapImages[mapName]) {
        fightButton.style.display = 'block';
    } else {
        fightButton.style.display = 'none';
    }
}


const ogreImageUrl = 'https://iili.io/2fmo4Qp.webp';

function selectMap(mapName) {
    // Update the map name display
    document.getElementById('current-map').innerText = `You are exploring the ${mapName}`;
    const mapImage = document.getElementById('map-image');
    const fightButton = document.getElementById('fight-button');

    // Define the map images
    const mapImages = {
        'Forest': 'https://logandtest.neocities.org/images/Forest.png',
        'Cave': 'https://logandtest.neocities.org/images/Cave.png',
        'Desert': 'https://logandtest.neocities.org/images/Desert.png',
        'Swamp': 'https://logandtest.neocities.org/images/Swamp.png',
        'Ocean': 'https://logandtest.neocities.org/images/Ocean.png',
        'Graveyard': 'https://logandtest.neocities.org/images/Graveyard.png',
        'Volcano': 'https://logandtest.neocities.org/images/Volcano.png'
    };

    // Update the map image based on the selected map
    mapImage.src = mapImages[mapName] || '';
    mapImage.style.display = mapImages[mapName] ? 'block' : 'none';

    // Show the fight button only if a valid map is selected
    fightButton.style.display = mapImages[mapName] ? 'block' : 'none';
}




function startFight() {
    // Get the map image element
    const mapImage = document.getElementById('map-image');

    // Generate a random number between 0 and 9 (10 possible outcomes)
    const randomNumber = Math.floor(Math.random() * 10); // This will generate a number between 0 and 9

    // Check if the random number is 0 (10% chance)
    if (randomNumber === 0) {
        // If true, set the image source to the ogre image
        mapImage.src = ogreImageUrl;
        alert("An Ogre has appeared!");
    } else {
        // Otherwise, keep the current map image
        alert("No enemies in sight. Keep exploring!");
    }

    // Log the random number for debugging (remove or comment out in production)
    console.log("Random number generated:", randomNumber);
}



function startFight() {
    // Add your fight logic here.
}

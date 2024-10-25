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

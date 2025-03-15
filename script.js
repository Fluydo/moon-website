const images = document.querySelectorAll('.image');
let lastScrollY = window.scrollY;
const navbar = document.querySelector('nav');
const audioPlayer = document.getElementById("backgroundMusic");
const albumArt = document.getElementById("musicIcon");
const songTitle = document.getElementById("songTitle");
const songAuthor = document.getElementById("songAuthor");
const musicButton = document.getElementById("musicButton");
const musicSVG = musicButton.querySelector("svg");

const songFolders = ["Blessing", "Desolate", "Obsidian", "Nostalgia"];

let lastPlayed = null;

// Lower the volume
audioPlayer.volume = 0.05; // Set volume to 5%

async function selectRandomSong(shouldPlay = false) {
    if (songFolders.length === 0) return;

    let newSong;
    do {
        newSong = songFolders[Math.floor(Math.random() * songFolders.length)];
    } while (newSong === lastPlayed);

    lastPlayed = newSong;

    // Update audio source and album art
    audioPlayer.src = `songs/${newSong}/music.mp3`;
    albumArt.src = `songs/${newSong}/image.png`;

    // Update song title
    songTitle.textContent = newSong;

    // Fetch the author's name from author.txt
    try {
        const response = await fetch(`songs/${newSong}/author.txt`);
        if (response.ok) {
            const author = await response.text();
            songAuthor.textContent = author.trim(); // Display the author's name
        } else {
            songAuthor.textContent = "Unknown Author"; // Handle missing or failed file fetch
        }
    } catch (error) {
        console.error("Error fetching author:", error);
        songAuthor.textContent = "Unknown Author"; // Fallback for errors
    }

    // Load the song
    audioPlayer.load();

    // If shouldPlay is true, start playback
    if (shouldPlay) {
        audioPlayer.play();
        updateSVGToPause(); // Change SVG to pause icon
    }
}

function updateSVGToPlay() {
    musicSVG.innerHTML = `<path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>`;
}

function updateSVGToPause() {
    musicSVG.innerHTML = `<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM192 160l128 0c17.7 0 32 14.3 32 32l0 128c0 17.7-14.3 32-32 32l-128 0c-17.7 0-32-14.3-32-32l0-128c0-17.7 14.3-32 32-32z"/>`;
}

// Change music on button click
musicButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        // Resume playback
        audioPlayer.play();
        updateSVGToPause(); // Change SVG to pause icon
    } else {
        // Pause playback
        audioPlayer.pause();
        updateSVGToPlay(); // Change SVG to play icon
    }
});

// When the audio ends, select and play another random song
audioPlayer.addEventListener("ended", () => {
    selectRandomSong(true); // Select and start playing a new random song
});

// Initial state on page load
window.onload = () => {
    selectRandomSong(); // Load a random song without playing
    updateSVGToPlay(); // Ensure the SVG starts as a play icon
};

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

images.forEach(image => {
    image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;

        image.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });

    image.addEventListener('mouseleave', () => {
        image.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
});

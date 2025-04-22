// Reference to DOM elements
const textElement = document.getElementById('typewriter');
const cursor = document.querySelector('.cursor');
const terminal = document.getElementById('terminal');
const lyricsDisplay = document.getElementById('lyrics');
const background = document.getElementById('background');

// Terminal Text Typing Effect
const terminalText = textElement.textContent;
textElement.textContent = '';
let i = 0;

function typeTerminal() {
  if (i < terminalText.length) {
    textElement.textContent += terminalText[i];
    i++;
    setTimeout(typeTerminal, 25);
  } else {
    cursor.style.display = 'none';
    initiateTransition();
  }
}

typeTerminal();

// Lyrics Data (First Half of "Bad Apple!!" Romaji Lyrics)
const lyrics = [
  "Nagareteku toki no naka de demo",
  "Kedarusa ga hora guruguru mawatte",
  "Watashi kara hanareru kokoro mo",
  "Mienai wa sou shiranai?",
  "Jibun kara ugoku koto mo naku",
  "Toki no sukima ni nagasare tsuzukete",
  "Shiranai wa mawari no koto nado",
  "Watashi wa watashi sore dake",
  "Yume miteru? Nani mo mitenai?",
  "Kataru mo muda na jibun no kotoba",
  "Kanashimu nante tsukareru dake yo",
  "Nani mo kanjizu sugoseba ii no",
  "Tomadou kotoba ataerarete mo",
  "Jibun no kokoro tada uwa no sora",
  "Moshi watashi kara ugoku no naraba",
  "Subete kaeru no nara kuro ni suru"
];

// Function to display lyrics line by line
function displayLyrics() {
  let lineIndex = 0;

  function showNextLine() {
    // Clear previous line
    lyricsDisplay.innerHTML = '';

    if (lineIndex < lyrics.length) {
      const line = document.createElement('div');
      line.className = 'lyrics-line';
      line.textContent = lyrics[lineIndex];
      lyricsDisplay.appendChild(line);

      // Trigger fade-in effect
      setTimeout(() => {
        line.classList.add('active');
      }, 50);

      lineIndex++;
      setTimeout(showNextLine, 3500); // Adjust timing as needed
    } else {
      // After all lines are displayed, fade out the lyrics container
      setTimeout(() => {
        lyricsDisplay.classList.add('fade-out');
        // Optionally, remove the lyrics and background after fade-out
        setTimeout(removeLyricsAndBackground, 1000); // Wait for fade-out to complete
      }, 3000); // Wait before fading out
    }
  }

  showNextLine();
}

// Function to initiate transition after terminal typing
function initiateTransition() {
  // Move terminal off-screen to the right and fade out
  terminal.classList.add('exit');

  // Fade in background
  background.style.opacity = '0.3';

  // Fade in lyrics container
  lyricsDisplay.style.opacity = '1';

  // Start displaying lyrics
  displayLyrics();
}

// Function to remove lyrics and background from DOM
function removeLyricsAndBackground() {
  const lyricsContainer = document.getElementById('lyrics-container');
  const backgroundElement = document.getElementById('background');

  // Fade out the lyrics container and background
  lyricsContainer.style.transition = 'opacity 1s ease';
  backgroundElement.style.transition = 'opacity 1s ease';
  lyricsContainer.style.opacity = '0';
  backgroundElement.style.opacity = '0';

  // After the transition, remove the elements from the DOM
  setTimeout(() => {
    if (lyricsContainer && lyricsContainer.parentNode) {
      lyricsContainer.parentNode.removeChild(lyricsContainer);
    }
    if (backgroundElement && backgroundElement.parentNode) {
      backgroundElement.parentNode.removeChild(backgroundElement);
    }
  }, 1000); // Duration matches the CSS transition duration
}


/* In this project you will learn basic string and array methods by building a music player app. You will be able to play, pause, skip, and shuffle songs. */

// accessing different HTML elements of the music player
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Etude",
    artist: "Corey Christensen",
    duration: "2:50",
    src: "22 Etude.mp3",
  },
  /* {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  }, */
];

const audio = new Audio();

/* Your music player should keep track of the songs, the current song playing, and the time of the current song. To do this, you will need to create a userData object to store this information. 

Since users will be able to shuffle and delete songs from the playlist, you will need to create a copy of the allSongs array without mutating the original. This is where the spread operator comes in handy. */
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id) => {
  /* The find() method retrieves the first element within an array that fulfills the conditions specified in the provided callback function. If no element satisfies the condition, the method returns undefined. */
  const song = userData?.songs.find((song) => song.id === id);
  // This tells the audio element where to find the audio data for the selected song:
  audio.src = song.src;
  // This tells the audio element what to display as the title of the song:
  audio.title = song.title;

  /* Before playing the song, you need to make sure it starts from the beginning. This can be achieved by the use of the currentTime property on the audio object. */

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
    /* An else block handles the song's current playback time. This allows you to resume the current song at the point where it was paused. */
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  /* You need to update the current song being played as well as the appearance of the playButton element. */
  userData.currentSong = song;
  /* use the classList property and the add() method to add the "playing" class to the playButton element. This will look for the class "playing" in the CSS file and add it to the playButton element. To finally play the song, use the play() method on the audio variable. play() is a method from the web audio API for playing an mp3 file. */
  playButton.classList.add("playing");
  highlightCurrentSong();
  /* To ensure the player's display updates whenever a new song begins playing, call the setPlayerDisplay() function within the playSong() function. */
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

const pauseSong = () => {
  /* To store the current time of the song when it is paused, set the songCurrentTime of the userData object to the currentTime of the audio variable. */
  userData.songCurrentTime = audio.currentTime;
  /* Use classList and remove() method to remove the playing class from the playButton, since the song will be paused at this point. */
  playButton.classList.remove("playing");
  audio.pause();
}

const playNextSong = () => {
  // This will check if there's no current song playing in the userData object:
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];
    if (nextSong) {
      playSong(nextSong.id);
    }
  }
}

const playPreviousSong = () => {
  /* This will check if there is currently no song playing. If there isn't any, exit the function using a return: */
  if (userData?.currentSong === null) {
    return; 
  } else {
    const currentSongIndex = getCurrentSongIndex();
    /* To get the previous song, subtract 1 from the currentSongIndex of userData?.songs and assign it to the constant previousSong: */
    const previousSong = userData?.songs[currentSongIndex - 1];
    if (previousSong) {
      playSong(previousSong.id);
    }
  }
}

/* This function is responsible for shuffling the songs in the playlist and performing necessary state management updates after the shuffling: */
const shuffle = () => {
  /* One way to randomize an array of items would be to subtract 0.5 from Math.random() which produces random values that are either positive or negative. This makes the comparison result a mix of positive and negative values, leading to a random ordering of elements. */
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;
  /* You should also re-render the songs, pause the currently playing song, set the player display, and set the play button accessible text again. */
  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText(); 
}

const deleteSong = (id) => {
  if(userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
  } 
  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
}

const setPlayerDisplay = () => {
  const playingSong = document.getElementById('player-song-title');
  const songArtist = document.getElementById('player-song-artist');
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);
  playlistSongElements.forEach((songEl) => {
    // This will remove the attribute for each of the songs:
    songEl.removeAttribute("aria-current");
  });
};

/* To display the songs in the UI (User Interface), you'll need to create a renderSongs function. When the songs are displayed on the page, it should show the title, artist, duration of each song and a delete button. */
const renderSongs = (array) => {
  /* The map() method is used to iterate through an array and return a new array. It's helpful when you want to create a new array based on the values of an existing array. */
  const songsHTML = array
    .map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song" onclick="deleteSong(${song.id})" event.stopPropagation(); onclick="playSong(${song.id})">
      <button class="playlist-song-info">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    // You will need to join the array into a single string by using the join() method.
    .join("");
  
  /* Assign songsHTML to the innerHTML property of the playlistSongs element. This will insert the li element you just created into the ul element in the already provided HTML file. */
  playlistSongs.innerHTML = songsHTML;
  if (userData?.songs.length === 0){
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");
    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    // appendChild() lets you add a node or an element as the child of another element: 
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);
    resetButton.addEventListener("click", ()=>{
      userData.songs = [...allSongs];
      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  } 
};

/* The setPlayButtonAccessibleText function will set the aria-label attribute to the current song, or to the first song in the playlist. And if the playlist is empty, it sets the aria-label to "Play" */
const setPlayButtonAccessibleText = () => {
  // Optional chaining (?.) helps prevent errors when accessing nested properties that might be null or undefined.

  // get the currently playing song or the first song in the playlist: 
  const song = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play");

}

// get the index of each song in the songs property of userData:
const getCurrentSongIndex = () => {
  /* The indexOf() array method returns the first index at which a given element can be found in the array, or -1 if the element is not present. */
  return userData?.currentSong ? userData.songs.indexOf(userData.currentSong) : 0;
}

playButton.addEventListener("click", ()=> {
  if (userData?.currentSong === null) {
    // This will ensure the first song in the playlist is played first:
    playSong(userData?.songs[0].id);
  } else {
    /* This ensures that the currently playing song will continue to play when the play button is clicked: */
    playSong(userData?.currentSong.id);
}})

pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);
shuffleButton.addEventListener("click", shuffle);
/* The "ended" event listener is fired when the playback of a media reaches the end: */
audio.addEventListener("ended", ()=>{
  const currentSongIndex = getCurrentSongIndex();
  // you need to check if there is a next song to play:
  const nextSongExists = userData.songs.length - 1 > currentSongIndex? true : false;
  if(nextSongExists) {
    playNextSong();
    /* If there is no next song in the playlist, reset the currentSong key of userData to null, and its songCurrentTime property to 0. */
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong()
    setPlayerDisplay()
    highlightCurrentSong()
    setPlayButtonAccessibleText()
  }
})

const sortSongs = () => {
  if (!userData?.songs || userData.songs.length === 0) return [];
  return userData.songs.sort((a, b) => a.title.localeCompare(b.title));
};

renderSongs(sortSongs());

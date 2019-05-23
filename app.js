const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  // time select
  const timeSelect = document.querySelectorAll('.time-select button');
  const timeSelectMain = document.getElementsByClassName('time-select')[0];
  const playContainer = document.getElementsByClassName('container')[0];
  const soundPicker = document.getElementsByClassName('sound-picker')[0];

  // Sound
  const sounds = document.querySelectorAll('.sound-picker button');
  // time display
  const timeDisplay = document.querySelector('.time-display');
  const outlineLength = outline.getTotalLength();
  let fakeDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;
  play.addEventListener('click', () => {
    checkPlaying(song);
  });
  sounds.forEach(buttonSound => {
    buttonSound.addEventListener('click', function() {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });
  timeSelect.forEach(buttonTime => {
    buttonTime.addEventListener('click', function() {
      removeClass();
      fakeDuration = this.getAttribute('data-time');
      this.classList.add('active');
      setTimePlay(fakeDuration);
    });
  });

  const removeClass = () => {
    timeSelect.forEach(buttonTime => {
      buttonTime.classList.remove('active');
    });
  };
  const hidePlaying = () => {
    timeSelectMain.classList.add('hidePlayingLeft');
    soundPicker.classList.add('hidePlayingRight');
  };
  const showPlaying = () => {
    timeSelectMain.classList.remove('hidePlayingLeft');
    soundPicker.classList.remove('hidePlayingRight');
  };
  const hidePlayContainer = () => {
    playContainer.classList.add('hidePlayContainer');
  };
  const showPlayContainer = () => {
    playContainer.addEventListener('hover', () => {
      this.classList.remove('hidePlayContainer');
    });
  };
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
      hidePlaying();
      hidePlayContainer();
    } else {
      showPlaying();
      showPlayContainer();
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    setTimePlay(elapsed);
    let process = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = process;
    if (Math.floor(currentTime) >= fakeDuration) {
      setTimePlay(0);
      outline.style.strokeDashoffset = 0;
      song.pause();
      play.src = './svg/play.svg';
      video.pause();
    }
  };
  setTimePlay = elapsed => {
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.innerHTML = `${minutes < 10 ? '0' + minutes : minutes} : ${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  };
};

app();

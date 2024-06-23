  function openSoundModal(maleLink, femaleLink, index, unicodePhrase) {
    var modal = document.getElementById('soundModal');
    modal.style.display = "block";
    var span = document.getElementsByClassName("closeModal")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
      }
    // Close by clicking outside the window.
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    // Fill the sound file, index, unicode fields.
    var sound = document.getElementById("male_sound");
    region = document.getElementById("male_audio");
    if (sound && maleLink) {
      sound.src = maleLink;
      region.style.display = "block";
    } else {
      region.style.display = "none";
    }
    sound = document.getElementById("female_sound");
    region = document.getElementById("female_audio");
    if (sound && femaleLink) {
      sound.src = femaleLink;
      region.style.display = "block";
    } else {
      region.style.display = "none";
    }
    var phrase = document.getElementById("modalUnicode");
    phrase.innerHTML = unicodePhrase;
    var modalIndex = document.getElementById("modalIndex");
    modalIndex.innerHTML = index;
  }

  // Navigate to phrases.
  function getPrevious() {
    indexObj = document.getElementById('index');
    index = parseInt(indexObj.innerText);
    if (index > 1) {
      dataRequest(index - 1, -1);
    }
  }

  function getNext() {
    indexObj = document.getElementById('index');
    index = parseInt(indexObj.innerText);
    if (index >= 0) {
      dataRequest(index + 1, 1);
    }
  }

  // Jump to specific index.
  function goTo(inputArea) {
    indexObj = document.getElementById(inputArea);
    index = parseInt(indexObj.value);
    if (index >= 0) {
      dataRequest(index, 0);
    }
  }

  // Code to request {{language}} data at index with optional filter.
  // Direction indicates previous (-1) or next (+1)
  function dataRequest(index, direction) {
    // Prepare for the call to the backendvar xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Deal with the results
    xmlhttp.onreadystatechange=function() {
      if(xmlhttp.readyState==4) {
        var returned_json = xmlhttp.responseText;
        var index = document.getElementById('index');
        var arabicText = document.getElementById('ArabicText');
        var latinText = document.getElementById('latinText');
        var utext = document.getElementById('UnicodeText');
        var definitionUnicode = document.getElementById('UnicodeDefinition');
        var english = document.getElementById('English');
        var french = document.getElementById('French');
        var newIndex = document.getElementById('newIndex');
        var status = document.getElementById('status');
        var errorMsg = document.getElementById('errorMsg');
        var comment = document.getElementById('comment');
        var dbName = document.getElementById('dbName');
        var updatePhraseKey1 = document.getElementById('updatePhraseKeyStatus');
        var updatePhraseKey2 = document.getElementById('updatePhraseKeyUpload');

        var json_obj = JSON.parse(returned_json);
        if (json_obj.error) {
          // Warn, and don't change values.
          alert(json_obj.error);
          return;
        }
        index.value = index.innerHTML = json_obj.index;
        arabicText.value = arabicText.innerHTML = json_obj.arabicText;
        utext.value = utext.innerHTML = json_obj.unicodeText;
        newIndex.value = newIndex.innerHTML = json_obj.index;
        if (latinText) {
          latinText.value = oldText.innerHTML = json_obj.latinText;
        }
        english.value = english.innerHTML = json_obj.english;
        french.value = french.innerHTML = json_obj.french;
        comment.value = comment.innerHTML = json_obj.comment;
        dbName.value = json_obj.dbName

        updatePhraseKey1.value = json_obj.phraseKey;
        updatePhraseKey2.value = json_obj.phraseKey;

        definitionUnicode.value = definitionUnicode.innerHTML = json_obj.definitionUnicode;

        var warnStatus = setWarningBox(json_obj.utext, json_obj.oldtext);
        if (json_obj.oldtext && !warnStatus) {
          // uText is either empty or same as converted.
          convertToUnicode('oldText', 'UnicodeText', 'old_hex');
        }
        warning_box = document.getElementById('warning');

        var newStatus = json_obj.status;
        if (newStatus == "" || newStatus == "unknown") {
          newStatus = "Unknown";
        }

        status.value = status.innerHTML = newStatus;
        // Reset the status radio button
        setStatusRadioButton("updateStatus", newStatus);

        // Handle voice icons
        var isMaleVoice = json_obj.soundMaleLink;
          if (isMaleVoice) {
            setDisplayState('maleVoice', 'block');
          } else {
            setDisplayState('maleVoice', 'none');
          }
        var isFemaleVoice = json_obj.soundFemaleLink;
        // TODO: Set icons and links for sound output.
        if (isFemaleVoice) {
            setDisplayState('femaleVoice', 'block');
        } else {
            setDisplayState('femaleVoice', 'none');
        }
      }
    }
    // Set up the call, with filtering.
    var filterStatus = getStatusRadioButton("filterStatus");
    if (direction == 0) {
      // Should not filter if a direct "go to".
      filterStatus = "All";
    }
    dbName = document.getElementById('dbName').value;
    var databases = getDatabases();
    var target = "/words/getWords/?index=" + index + "&filterStatus=" +
      filterStatus +
      "&direction=" + direction +
      "&dbName=" + dbName;
    for (var i = 0; i < databases.length; i++) {
      target = target + "&databases=" + databases[i];
    }
    xmlhttp.open("GET", target, true);
    var size = target.length;
    xmlhttp.send(null);
  }
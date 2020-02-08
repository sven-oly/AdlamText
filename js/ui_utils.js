   function onFontSelected(selected, area) {
     var output_text = document.getElementById(area);
     var fontFam = selected.value;
     output_text.style.fontFamily = fontFam;
     setKeyCapsFont(fontFam);
   }

   function setKeyCapsFont(newFontFamily) {
     var keycaps = document.getElementsByClassName("vk-cap");
     for (var i = 0; i < keycaps.length; i++ ) {
       keycaps[i].style.fontFamily = newFontFamily;
     }
   }

    function showCodePoints(src_id, dest_id) {
      var src_field = document.getElementById(src_id);
      var start = src_field.selectionStart;
      var finish = src_field.selectionEnd;
      // obtain the selected text, if any
      var sel = src_field.value.substring(start, finish);
      var code_text;
      if (sel) {
        code_text = uplus(sel, "u+");
      } else {
        code_text = uplus(src_field.value, "");
      }

      var dest_field = document.getElementById(dest_id);
      dest_field.value = code_text;
      document.getElementById(src_id).focus();
    }

 // Keyboard layout selection
function onLayoutSelected(selector, area) {
  var layoutCode = selector.value;
  controller.activateLayout(layoutCode);
  document.getElementById(area).focus();
  var vkbox = document.getElementById('kbd');
}

  function clearText(region) {
    var field = document.getElementById(region);
    field.value = '';
  }

  // When an area is changed, set the hex characters, too.
  function updateHex(inArea, outArea) {
    // Hex on the selected text, if any.
    // obtain the object reference for the <textarea>
    var txtarea = document.getElementById(inArea);
    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    // obtain the selected text
    var sel = txtarea.value.substring(start, finish);

    var inText;
    if (sel) {
      inText = sel;
    } else {
      inText = txtarea.value;
    }

    var hex_output = document.getElementById(outArea);

    var hexString = uplus(inText, "");
    if (hex_output != null) {
      hex_output.value = hexString;
      hex_output.innerHTML = hexString;
    }
    if (sel) {
      // Try to show the selection again.
      txtarea.selectionStart = start;
      txtarea.selectionEnd = finish;
    }
  }

  function toggle(id, toggle) {
    var obj = document.getElementById(id);
    var checkBox = document.getElementById(toggle);
    var showIt = checkBox.checked;
    if (showIt) {
      obj.style.display = 'block';
      } else {
      obj.style.display = 'none';
      }
    }

  // stackoverflow.com/questions/717224/how-to-get-selected-text-in-textarea
  function getSel(areaId, change) {
    // obtain the object reference for the <textarea>
    var txtarea = document.getElementById(areaId);
    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    // obtain the selected text
    var sel = txtarea.value.substring(start, finish);
    // do something with the selected content

    if (change == "lower") {
      newText = lowercaseWord(sel);
    } else
    if (change == 'upper') {
      newText = uppercaseWord(sel, true);
    } else
    if (change == 'capitalize') {
      newText = uppercaseWord(sel, false);
    }
    if (sel != newText) {
    // Replace
      var newText = txtarea.value.substring(0, start) + newText +
        txtarea.value.substring(finish);
      // Replace!
      txtarea.value = newText;
    }
  }

  // Fill regions with text
  function fillUpper(region) {
    var field = document.getElementById(region);
    var text = "\u202e";
    for (var code = 0x1e900; code < 0x1e922; code ++) {
      text += String.fromCodePoint(code) + " ";
    }
    field.value = text;
  }

  function fillLower(region) {
    var field = document.getElementById(region);
    var text = "\u202e";
    for (var code = 0x1e922; code < 0x1e944; code ++) {
      text += String.fromCodePoint(code) + " ";
    }
    field.value = text;
  }


  function fillDigits(region) {
    var field = document.getElementById(region);
    var text = "";
    for (var code = 0x1e950; code < 0x1e95a; code ++) {
      text += String.fromCodePoint(code);
    }
    text += "   " + String.fromCodePoint(0x1e95e) + " ";
    text += String.fromCodePoint(0x1e95f) + " ";
    field.value = text;
  }

    function fillWithLatin(outArea, hexArea) {
    var outObj = document.getElementById(outArea);
    var hex_output = document.getElementById(hexArea);
    text = "ADLAM BSP BH ɓ REF IO DH ɗ\u000a" +
          "YH ƴ WHK YUJ TH C H QH G HY T NQ\u000a" +
          "dj dy j è é ê ë ï î ô ö û â\u000a" +
          "DJ DY J È É Ê Ë Ï Î Ô Ö Û Â\u000a" +
      "V GH GB Z KPA KPa Kpa SHA SHa Sha" +
      "adlam bsp bh ɓ ref io dh ɗ\u000a" +
      "yh ƴ whk yuj ty c h qh g hy t nq \u000a" +
      "v gh gb z kpa sha \u00a0" +
      "AA aa EE ee II ii OO oo UU uu \u000a" +
      "Ñ ñ \u000a" +
      ",./;\'[]\<>?:\{}|_+\u000a!";

    outObj.innerHTML = text;
    outObj.value = text;
    if (hex_output) {
      hex_output.innerHTML = "";
      hex_output.value = "";
    }
  }

  function fillWithSampleAdlam(outArea, hexArea) {
    var outObj = document.getElementById(outArea);

    var text = "ڇبگبثتض ڇبگبثتض ڇبگبثتض ...Àتضك لع لنجسظڇبث لنجسظڇبث لنجسظڇبث ” ùبثب پضخثبث قبغبÃكëڄبث گبصلظ ض ”بثبث ”بقكëڄبث";
    text += "” ù نخظغع ڇضكڇنغع، ڇضكڇنغع، ڇضكڇنغع، پبصبم ́ظصڇن قظكتبكڄن قظكتبكڄن قظكتبكڄن ”ب كíڄنك";
    outObj.innerHTML = text;
    outObj.value = text;

    var hex_output = document.getElementById(hexArea);
    if (hex_output) {
      hex_output.innerHTML = "";
      hex_output.value = "";
    }
  }
// Conversion from old font encodings to Adlam Unicode.
var adlamCaseOffset = 0x22;  // Amount to add to get lower case from upper.
var firstAdlamLower = 0x1e900 + adlamCaseOffset;
var lastAdlamLower = 0x1e921 + adlamCaseOffset;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt#Fixing_charAt()_to_support_non-Basic-Multilingual-Plane_(BMP)_characters

function fixedCharAt(str, idx) {
  var ret = '';
  str += '';
  var end = str.length;

  var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  while ((surrogatePairs.exec(str)) != null) {
    var li = surrogatePairs.lastIndex;
    if (li - 2 < idx) {
      idx++;
    } else {
      break;
    }
  }

  if (idx >= end || idx < 0) {
    return '';
  }

  ret += str.charAt(idx);

  if (/[\uD800-\uDBFF]/.test(ret) && /[\uDC00-\uDFFF]/.test(str.charAt(idx + 1))) {
    // Go one further, since one of the "characters" is part of a surrogate pair
    ret += str.charAt(idx + 1);
  }
  return ret;
}

function adlamCharToUpper(char) {
  var code = char.codePointAt(0);
  if (char >= firstAdlamLower && char <= lastAdlamLower) {
    var upperChar = char - adlamCaseOffset;
    return String.fromCodePoint(upperChar);
  } else {
    return char;
  }
}

function uppercaseWord(word, all) {
  // All == false -> only the first character of the selection
  //     == true -> capitalize the entire selection.
  var out = "";
  if (all) {
    // Convert all characters
    out += word.toUpperCase();
  } else {
    // Only the first until after a space or some punctuation.
    var doCap = true;
    var i = 0;
    do {
      var newChar = fixedCharAt(word, i);
      if (newChar) {
	if (doCap) {
	  out += newChar.toUpperCase();
	  doCap = false;
	} else {
	  out += newChar.toLowerCase();
	}
	// TODO: Add Adlam question mark and exclamation.
	//
	if (newChar == "𞥞" || newChar == "𞥟") {
	  doCap = true;
	}
	if (newChar == " " || newChar == "." || newChar == "?" ||
	    newChar == "!" || newChar == "" || newChar == "؟" ||
	    newChar == "⸮") {
	  //Reset to new word.
	  doCap = true;
	}
      }
	i += 1;
      } while (newChar);
  }
  return out;
}

function lowercaseWord(word) {
  var out = word.toLowerCase();
  return out;
}

function sentenceCaseWord(word) {
  // Only the first until after some punctuation.
  var out = "";
  var doCap = true;
  var i = 0;

   // Skip initial white space.
  var newChar = fixedCharAt(word, i);
  while (newChar && newChar == " ") {
    i += 1;
    out += newChar;
    newChar = fixedCharAt(word, i);
  }

  do {
    newChar = fixedCharAt(word, i);
    if (newChar) {
      var subChar = newChar.toUpperCase();
      // It should be that subChar is in the upper case range.
      if (doCap && (newChar >= "𞤀" && newChar <= "𞥃")) {
	out += subChar;
	doCap = false;
      } else {
	out += newChar.toLowerCase();
      }
      // Adlam punctuation
      if (newChar == "𞥞" || newChar == "𞥟") {
	doCap = true;
      }
      // Ends of sentences.
      if (newChar == "." || newChar == "?" ||
	  newChar == "!" || newChar == "" || newChar == "؟" ||
	  newChar == "⸮") {
	//Reset to new word.
	doCap = true;
      }
    }
    i += 1;
  } while (newChar);
  return out;
}

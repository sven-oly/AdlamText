   // Convert to Unicode
  function convertArabicToUnicode(idIn, outId, hexId, lowerId,
      sentenceCaseId) {
    var inObj = document.getElementById(idIn);
    var outObj = document.getElementById(outId);
    var hexObj = document.getElementById(hexId);
    var lowerObj = document.getElementById(lowerId);
    var sentenceCaseObj = document.getElementById(sentenceCaseId);
    var textOut = convertOtherToUnicode(inObj.value, lowerObj.checked,
      sentenceCaseObj.checked);

    outObj.innerHTML = outObj.value = textOut;
  }

  // Convert to Unicode
  function convertLatinUnicode(idIn, outId, hexId, lowerId,
    sentenceCaseId) {
    var inObj = document.getElementById(idIn);
    var outObj = document.getElementById(outId);
    var hexObj = document.getElementById(hexId);
    var lowerObj = document.getElementById(lowerId);
    var sentenceCaseObj = document.getElementById(sentenceCaseId);
    var textOut = convertLatinToUnicode(
      inObj.value, lowerObj.checked, sentenceCaseObj.checked);
    outObj.innerHTML = outObj.value = textOut;
  }

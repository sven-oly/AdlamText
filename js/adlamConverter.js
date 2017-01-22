// Conversion from old font encodings to Adlam Unicode.
var adlamCaseOffset = 0x22;  // Amount to add to get lower case from upper.
var firstAdlamUpper = 0x1e900;
var lastAdlamUpper = 0x1e921;

var minAdlamU = String.fromCodePoint(firstAdlamUpper);
var maxAdlamU = String.fromCodePoint(lastAdlamUpper);

var adlam_convert_unicode_map = {
  '\u0628': String.fromCodePoint(0x1e900),
  '\u062a': String.fromCodePoint(0x1e901),
  '\u062b': String.fromCodePoint(0x1e902),
  '\u062c': String.fromCodePoint(0x1e903),
  '\u062d': String.fromCodePoint(0x1e904),
  '\u062e': String.fromCodePoint(0x1e905),
  '\u0633': String.fromCodePoint(0x1e906),
  '\u0634': String.fromCodePoint(0x1e907),
  '\u0635': String.fromCodePoint(0x1e908),
  '\u0636': String.fromCodePoint(0x1e909),
  '\u0637': String.fromCodePoint(0x1e90a),
  '\u0638': String.fromCodePoint(0x1e90b),
  '\u0639': String.fromCodePoint(0x1e90c),
  '\u063a': String.fromCodePoint(0x1e90d),
  '\u0641': String.fromCodePoint(0x1e90e),
  '\u0642': String.fromCodePoint(0x1e90f),
  '\u0643': String.fromCodePoint(0x1e910),
  '\u0644': String.fromCodePoint(0x1e911),
  '\u0645': String.fromCodePoint(0x1e912),
  '\u0646': String.fromCodePoint(0x1e913),
  '\u064a': String.fromCodePoint(0x1e914),
  '\u067b': String.fromCodePoint(0x1e915),
  '\u067e': String.fromCodePoint(0x1e916),
  '\u0683': String.fromCodePoint(0x1e917),
  '\u0684': String.fromCodePoint(0x1e918),
  '\u0686': String.fromCodePoint(0x1e919),
  '\u0687': String.fromCodePoint(0x1e91a),
  '\u06a8': String.fromCodePoint(0x1e91b),
  '\u06af': String.fromCodePoint(0x1e904),

  // Diacritics
  '\u0640': String.fromCodePoint(0x1e946),  // ?? Maybe underscore? 
  '\u064b': String.fromCodePoint(0x1e94a),
  '\u064c': String.fromCodePoint(0x1e946),
  '\u064d': String.fromCodePoint(0x1e945),
  '\u064e': String.fromCodePoint(0x1e944),
  '\u064f': String.fromCodePoint(0x1e900),  // TBD: maybe Farsi apostrophe joiner
  '\u0650': String.fromCodePoint(0x1e948),
  '\u0651': String.fromCodePoint(0x1e947),
  '\u0655': String.fromCodePoint(0x1e900),  // TBD
  '\u0658': String.fromCodePoint(0x1e900),  // TBD
  '\u0659': String.fromCodePoint(0x1e900),  // TBD
  '\u065d': String.fromCodePoint(0x1e944),
  '\u065e': String.fromCodePoint(0x1e944),
  '\u06b3': String.fromCodePoint(0x1e945),

  // Digits
  '\u0660': String.fromCodePoint(0x1e950),
  '\u0661': String.fromCodePoint(0x1e951),
  '\u0662': String.fromCodePoint(0x1e952),
  '\u0663': String.fromCodePoint(0x1e953),
  '\u0664': String.fromCodePoint(0x1e954),
  '\u0665': String.fromCodePoint(0x1e955),
  '\u0666': String.fromCodePoint(0x1e956),
  '\u0667': String.fromCodePoint(0x1e957),
  '\u0668': String.fromCodePoint(0x1e958),
  '\u0669': String.fromCodePoint(0x1e959),

  // Punctuation
  '\u0601': String.fromCodePoint(0x1e95e),  // Question mark
  '\u060c': '\u060c',
  '\u060b': ';',
};

function convertOtherToUnicode(textIn, toLower) {
  var textOut = "\u202e";
  for (index = 0; index < textIn.length; index ++) {
    var c = textIn[index];
    var code = textIn.charCodeAt(index);

    var result = adlam_convert_unicode_map[c];

    if (result === undefined) {
      result = c;
    }
    if (toLower && result >= minAdlamU && result <= maxAdlamU) {
      result = String.fromCodePoint(result.codePointAt(i) + adlamCaseOffset);
    }
    textOut += result; 
  }
  return textOut;
}
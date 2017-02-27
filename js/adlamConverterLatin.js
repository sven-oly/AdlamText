// Conversion from old font encodings to Adlam Unicode.
var adlamCaseOffset = 0x22;  // Amount to add to get lower case from upper.
var firstAdlamUpper = 0x1e900;
var lastAdlamUpper = 0x1e921;

var minAdlamU = String.fromCodePoint(firstAdlamUpper);
var maxAdlamU = String.fromCodePoint(lastAdlamUpper);

var adlam_Latin_to_unicode_map = {
  'A': String.fromCodePoint(0x1e900),
  'a': String.fromCodePoint(0x1e922),
  'B': String.fromCodePoint(0x1e904),
  'b': String.fromCodePoint(0x1e926),
  'C': String.fromCodePoint(0x1e915),
  'c': String.fromCodePoint(0x1e937),
  'TY': String.fromCodePoint(0x1e915),
  'Ty': String.fromCodePoint(0x1e915),
  'ty': String.fromCodePoint(0x1e937),
  'D': String.fromCodePoint(0x1e901),
  'd': String.fromCodePoint(0x1e923),
  'E': String.fromCodePoint(0x1e909),
  'e': String.fromCodePoint(0x1e92b),
  'F': String.fromCodePoint(0x1e90a),
  'f': String.fromCodePoint(0x1e92c),
  // TODO: finish this.
  'G': String.fromCodePoint(0x1e918),
  'g': String.fromCodePoint(0x1e93a),
  'H': String.fromCodePoint(0x1e916),
  'h': String.fromCodePoint(0x1e938),
  'I': String.fromCodePoint(0x1e90b),
  'i': String.fromCodePoint(0x1e92d),
  'J': String.fromCodePoint(0x1e914),
  'j': String.fromCodePoint(0x1e936),
  'M': String.fromCodePoint(0x1e903),
  'm': String.fromCodePoint(0x1e925),
  'N': String.fromCodePoint(0x1e910),
  'n': String.fromCodePoint(0x1e932),
  'O': String.fromCodePoint(0x1e90c),
  'o': String.fromCodePoint(0x1e92e),
  'P': String.fromCodePoint(0x1e906),
  'p': String.fromCodePoint(0x1e928),
  'Q': String.fromCodePoint(0x1e919),
  'q': String.fromCodePoint(0x1e93b),
  'R': String.fromCodePoint(0x1e908),
  'r': String.fromCodePoint(0x1e92a),
  'S': String.fromCodePoint(0x1e905),
  's': String.fromCodePoint(0x1e927),
  'T': String.fromCodePoint(0x1e91a),
  't': String.fromCodePoint(0x1e93c),
  'U': String.fromCodePoint(0x1e913),
  'u': String.fromCodePoint(0x1e935),
  'V': String.fromCodePoint(0x1e91c),
  'v': String.fromCodePoint(0x1e93e),
  'W': String.fromCodePoint(0x1e90F),
  'w': String.fromCodePoint(0x1e931),
  'Y': String.fromCodePoint(0x1e912),
  'y': String.fromCodePoint(0x1e934),
  'Z': String.fromCodePoint(0x1e91f),
  'z': String.fromCodePoint(0x1e941),

  'BH': String.fromCodePoint(0x1e907),
  'Bh': String.fromCodePoint(0x1e907),
  'bh': String.fromCodePoint(0x1e929),
  'ɓ': String.fromCodePoint(0x1e907),
  
  'DH': String.fromCodePoint(0x1e90d),
  'Dh': String.fromCodePoint(0x1e90d),
  'dh': String.fromCodePoint(0x1e92f),
  'ɗ': String.fromCodePoint(0x1e90d),

  'YH': String.fromCodePoint(0x1e90e),
  'Yh': String.fromCodePoint(0x1e90e),
  'yh': String.fromCodePoint(0x1e930),
  'ƴ': String.fromCodePoint(0x1e90e),

  'QH': String.fromCodePoint(0x1e917),
  'Qh': String.fromCodePoint(0x1e917),
  'qh': String.fromCodePoint(0x1e939),

  'NY': String.fromCodePoint(0x1e919),
  'Ny': String.fromCodePoint(0x1e919),
  'ny': String.fromCodePoint(0x1e93b),

  'NQ': String.fromCodePoint(0x1e91b),
  'Nq': String.fromCodePoint(0x1e91b),
  'nq': String.fromCodePoint(0x1e93d),

  'GH': String.fromCodePoint(0x1e91d),
  'Gh': String.fromCodePoint(0x1e91d),
  'gh': String.fromCodePoint(0x1e93f),

  'GB': String.fromCodePoint(0x1e91e),
  'Gb': String.fromCodePoint(0x1e91e),
  'gb': String.fromCodePoint(0x1e940),

  'KPA': String.fromCodePoint(0x1e920),
  'KPa': String.fromCodePoint(0x1e920),
  'Kpa': String.fromCodePoint(0x1e920),
  'kpa': String.fromCodePoint(0x1e942),

  'SHA': String.fromCodePoint(0x1e921),
  'SHa': String.fromCodePoint(0x1e921),
  'Sha': String.fromCodePoint(0x1e921),
  'sha': String.fromCodePoint(0x1e943),

 
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
  
  // Other characters from books
  '\u00c0': '\u0027',  // Simple apostrophe
  '\u00c3': '\u2022',
  '\u00ed': '\u0027',
  '\u00f8': String.fromCodePoint(0x01E905),
  '\u00f9': '\u2022',
  '\u0153': String.fromCodePoint(0x01E909),
  '\u0178': String.fromCodePoint(0x01E914),
  '\u0192': String.fromCodePoint(0x01E900),
  '\u0301': String.fromCodePoint(0x01E902),
  '\u03c0': String.fromCodePoint(0x01E914),
  '\u0394': String.fromCodePoint(0x01E901),
  '\u201d': String.fromCodePoint(0x01E903),
  '\u2126': String.fromCodePoint(0x01E90b),
  '\u2211': String.fromCodePoint(0x01E909),
  '\u2248': String.fromCodePoint(0x01E90a),
  '\ufefe': String.fromCodePoint(0x01E944),
  '...': '...'  // TODO: convert
};

// To parse out combinations
var adlam_latin_chars =
  "[bdgqy]h|gb|kpa|sha|ty|ny|nq|[a-zA-Zɓɗƴ]";  // TODO: Prepend multiple characters.
  
function convertLatinToUnicode(textIn, toLower) {
  var parsedText = preParseAdlamLatin(textIn);
  var textOut = "\u202e";
  for (index = 0; index < parsedText.length; index ++) {
    var c = textIn[index];
    var code = textIn.charCodeAt(index);

    var result = adlam_Latin_to_unicode_map[c];

    if (result === undefined) {
      result = c;
    }
    if (toLower && result >= minAdlamU && result <= maxAdlamU) {
      result = String.fromCodePoint(result.codePointAt(0) + adlamCaseOffset);
    }
    textOut += result; 
  }
  return textOut;
}

function preParseAdlamLatin(instring) {
  var regex1 = new RegExp(adlam_latin_chars, "gi");
  var outList = instring.match(regex1);
  return outList;
}
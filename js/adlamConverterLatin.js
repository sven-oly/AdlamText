// Conversion from old font encodings to Adlam Unicode.
var adlamCaseOffset = 0x22;  // Amount to add to get lower case from upper.
var firstAdlamUpper = 0x1e900;
var lastAdlamUpper = 0x1e921;

var minAdlamU = String.fromCodePoint(firstAdlamUpper);
var maxAdlamU = String.fromCodePoint(lastAdlamUpper);

var adlam_Latin_to_unicode_map = {
  'A': String.fromCodePoint(0x1e900),
  'a': String.fromCodePoint(0x1e922),
  'AA': String.fromCodePoint(0x1e900) + String.fromCodePoint(0x1e944),
  'aa': String.fromCodePoint(0x1e922) + String.fromCodePoint(0x1e944),
  'B': String.fromCodePoint(0x1e904),
  'BB': String.fromCodePoint(0x1e904) + String.fromCodePoint(0x1E948),
  'b': String.fromCodePoint(0x1e926),
  'bb': String.fromCodePoint(0x1e926) + String.fromCodePoint(0x1E948),
  'C': String.fromCodePoint(0x1e915),
  'c': String.fromCodePoint(0x1e937),
  'TY': String.fromCodePoint(0x1e915),
  'Ty': String.fromCodePoint(0x1e915),
  'ty': String.fromCodePoint(0x1e937),
  'D': String.fromCodePoint(0x1e901),
  'DD': String.fromCodePoint(0x1e901) + String.fromCodePoint(0x1E948),
  'd': String.fromCodePoint(0x1e923),
  'dd': String.fromCodePoint(0x1e923) + String.fromCodePoint(0x1E948),
  'E': String.fromCodePoint(0x1e909),
  'e': String.fromCodePoint(0x1e92b),
  'EE': String.fromCodePoint(0x1e909) + String.fromCodePoint(0x1e945),
  'ee': String.fromCodePoint(0x1e92b) + String.fromCodePoint(0x1e945),
  'F': String.fromCodePoint(0x1e90a),
  'f': String.fromCodePoint(0x1e92c),
  'G': String.fromCodePoint(0x1e918),
  'g': String.fromCodePoint(0x1e93a),
  'H': String.fromCodePoint(0x1e916),
  'h': String.fromCodePoint(0x1e938),
  'I': String.fromCodePoint(0x1e90b),
  'i': String.fromCodePoint(0x1e92d),
  'II': String.fromCodePoint(0x1e90b) + String.fromCodePoint(0x1e945),
  'ii': String.fromCodePoint(0x1e92d) + String.fromCodePoint(0x1e945),
  'J': String.fromCodePoint(0x1e914),
  'j': String.fromCodePoint(0x1e936),
  'K': String.fromCodePoint(0x1e911),
  'k': String.fromCodePoint(0x1e933),
  'L': String.fromCodePoint(0x1e902),
  'LL': String.fromCodePoint(0x1e902) + String.fromCodePoint(0x1E948),
  'l': String.fromCodePoint(0x1e924),
  'll': String.fromCodePoint(0x1e924) + String.fromCodePoint(0x1E948),
  'M': String.fromCodePoint(0x1e903),
  'm': String.fromCodePoint(0x1e925),
  'N': String.fromCodePoint(0x1e910),
  'n': String.fromCodePoint(0x1e932),
  'NB': String.fromCodePoint(0x1e904),
  'nb': String.fromCodePoint(0x1e926),
  'ND': String.fromCodePoint(0x1e901),
  'nd': String.fromCodePoint(0x1e923),
  'NG': String.fromCodePoint(0x1e914),
  'ng': String.fromCodePoint(0x1e936),
  'NJ': String.fromCodePoint(0x1e918),
  'nj': String.fromCodePoint(0x1e93a),
  'O': String.fromCodePoint(0x1e90c),
  'o': String.fromCodePoint(0x1e92e),
  'OO': String.fromCodePoint(0x1e90c) + String.fromCodePoint(0x1e945),
  'oo': String.fromCodePoint(0x1e92e) + String.fromCodePoint(0x1e945),
  'P': String.fromCodePoint(0x1e906),
  'PP': String.fromCodePoint(0x1e906) + String.fromCodePoint(0x1E948),
  'p': String.fromCodePoint(0x1e928),
  'pp': String.fromCodePoint(0x1e928) + String.fromCodePoint(0x1E948),
  'Q': String.fromCodePoint(0x1e919),
  'q': String.fromCodePoint(0x1e93b),
  'R': String.fromCodePoint(0x1e908),
  'r': String.fromCodePoint(0x1e92a),
  'S': String.fromCodePoint(0x1e905),
  's': String.fromCodePoint(0x1e927),
  'T': String.fromCodePoint(0x1e91a),
  'TT': String.fromCodePoint(0x1e91a) + String.fromCodePoint(0x1E948),
  't': String.fromCodePoint(0x1e93c),
  'tt': String.fromCodePoint(0x1e93c) + String.fromCodePoint(0x1E948),
  'U': String.fromCodePoint(0x1e913),
  'u': String.fromCodePoint(0x1e935),
  'UU': String.fromCodePoint(0x1e913) + String.fromCodePoint(0x1e945),
  'uu': String.fromCodePoint(0x1e935) + String.fromCodePoint(0x1e945),
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
  'Ɓ':  String.fromCodePoint(0x1e907),
  'ƁƁ': String.fromCodePoint(0x1e907) + String.fromCodePoint(0x1E948),
  'ɓ':  String.fromCodePoint(0x1e929),
  'ɓɓ': String.fromCodePoint(0x1e929) + String.fromCodePoint(0x1E948),
  
  'DH': String.fromCodePoint(0x1e90d),
  'Dh': String.fromCodePoint(0x1e90d),
  'dh': String.fromCodePoint(0x1e92f),
  'D\u0309': String.fromCodePoint(0x1e90d),
  'Ɗ':  String.fromCodePoint(0x1e90d),
  'ƊƊ': String.fromCodePoint(0x1e90d) + String.fromCodePoint(0x1E948),
  'd\u0309':  String.fromCodePoint(0x1e92f),
  'ɗ':  String.fromCodePoint(0x1e92f),
  'ɗɗ':  String.fromCodePoint(0x1e92f) + String.fromCodePoint(0x1E948),

  'YH': String.fromCodePoint(0x1e90e),
  'Yh': String.fromCodePoint(0x1e90e),
  'yh': String.fromCodePoint(0x1e930),
  'Ƴ':  String.fromCodePoint(0x1e90e),
  'Y\u0309': String.fromCodePoint(0x1e90e),
  'ƳƳ': String.fromCodePoint(0x1e90e) + String.fromCodePoint(0x1E948),
  'ƴ':  String.fromCodePoint(0x1e930),
  'y\u0309':  String.fromCodePoint(0x1e930),
  'ƴƴ':  String.fromCodePoint(0x1e930) + String.fromCodePoint(0x1E948),

  'QH': String.fromCodePoint(0x1e917),
  'Qh': String.fromCodePoint(0x1e917),
  'qh': String.fromCodePoint(0x1e939),

  'NY': String.fromCodePoint(0x1e919),
  'Ny': String.fromCodePoint(0x1e919),
  'Ñ': String.fromCodePoint(0x1e919),
  'N\u0303': String.fromCodePoint(0x1e919),  // Combining tilde
  'ny': String.fromCodePoint(0x1e93b),
  'ñ': String.fromCodePoint(0x1e93b),
  'n\u0303': String.fromCodePoint(0x1e93b),

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


   '\u019d' : String.fromCodePoint(0x1e919),
   '\u0272' : String.fromCodePoint(0x1e93b),

  // Digits
  '0': String.fromCodePoint(0x1e950),
  '1': String.fromCodePoint(0x1e951),
  '2': String.fromCodePoint(0x1e952),
  '3': String.fromCodePoint(0x1e953),
  '4': String.fromCodePoint(0x1e954),
  '5': String.fromCodePoint(0x1e955),
  '6': String.fromCodePoint(0x1e956),
  '7': String.fromCodePoint(0x1e957),
  '8': String.fromCodePoint(0x1e958),
  '9': String.fromCodePoint(0x1e959),

};

// To parse out combinations
var adlam_latin_chars =
  "aa|ee|ii|oo|uu|" + "bb|ɓɓ|dd|ɗɗ|ll|pp|tt|ƴƴ|" +
    "n\u0303|" + "[ydb]\u0309" +
    "[bdgqy]h|gb|gn|kpa|sha|ty|n[dbgjqy]|[0-9a-zA-ZɓƁɗƊƴƳÑñ\u019d\u0272\u0020\u000a]|" +
    "[\[\]\.\?\/\+,:\'\"\!\"]";  // TODO: Double consonants.
  
function convertLatinToUnicode(textIn, toLower) {
  var parsedText = preParseAdlamLatin(textIn);
  var textOut = "\u202e";
  for (index = 0; index < parsedText.length; index ++) {
    var c = parsedText[index];
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

//------------------ TESTS ------------------
function testAllLatin() {
  var results = {};
  
  result = testDoubleVowels();
  results[result["name"]] = result; 

  result = testDigits();
  results[result["name"]] = result;
  
  result = testDoubleConsonants();
  results[result["name"]] = result;
  
  var result = test1();
  results[result["name"]] = result;

  // TODO: Add more tests. 

  return results;
}

function test1() {
  var text = "ADLAM BSP BH ɓ REF IO DH ɗ YH ƴ WHK YUJ TH C H QH G HY T NQ " +
    "V GH GB Z KPA KPa Kpa SHA SHa Shaadlam";
  var conv = convertLatinToUnicode(text, false);
  var expected = "\u202e" +
    "𞤀𞤁𞤂𞤀𞤃 𞤄𞤅𞤆 𞤇 𞤇 𞤈𞤉𞤊 𞤋𞤌 𞤍 𞤍 𞤎 𞤰 𞤏𞤖𞤑 " +
    "𞤒𞤓𞤔 𞤚𞤖 𞤕 𞤖 𞤗 𞤘 𞤖𞤒 𞤚 𞤛 𞤜 𞤝 𞤞 𞤟 𞤠 𞤠 𞤠 𞤡 𞤡";
  return {"name": "text1",
          "pass": conv == expected,
          "actual": conv,
          "expected": expected};
}

function testDoubleConsonants() {
  var text = "BB bb DD dd LL ll PP pp TT tt ƁƁ ɓɓ ƊƊ ɗɗ ƳƳ ƴƴ Ɓ ɓ Ɗ ɗ Ƴ ƴ";
  var conv = convertLatinToUnicode(text, false);
  var expected = "\u202e" +
    String.fromCodePoint(0x1e904) + String.fromCodePoint(0x1E948) + " " +
    String.fromCodePoint(0x1e926) + String.fromCodePoint(0x1E948) + " " +
    String.fromCodePoint(0x1e901) + String.fromCodePoint(0x1E948) + " " +
    String.fromCodePoint(0x1e923) + String.fromCodePoint(0x1E948) + " " +
    String.fromCodePoint(0x1e902) + String.fromCodePoint(0x1E948) + " " +
    String.fromCodePoint(0x1e924) + String.fromCodePoint(0x1E948) + " " +
    String.fromCodePoint(0x1e906) + String.fromCodePoint(0x1E948) + " " +
    String.fromCodePoint(0x1e928) + String.fromCodePoint(0x1E948) + " " +
    String.fromCodePoint(0x1e91a) + String.fromCodePoint(0x1E948) + " " +
    String.fromCodePoint(0x1e93c) + String.fromCodePoint(0x1E948)
    // TODO: Finish
    ;
;
  return {"name": "testDoubleConsonants",
          "pass": conv == expected,
          "actual": conv,
          "expected": expected};
}

function testDoubleVowels() {
  var text = "AA aa EE ee II ii OO oo UU uu";
  var conv = convertLatinToUnicode(text, false);
  var expected = "\u202e" + 
    String.fromCodePoint(0x1e900) + String.fromCodePoint(0x1e944) + " " +
    String.fromCodePoint(0x1e922) + String.fromCodePoint(0x1e944) + " " +
    String.fromCodePoint(0x1e909) + String.fromCodePoint(0x1e945) + " " +
    String.fromCodePoint(0x1e92b) + String.fromCodePoint(0x1e945) + " " +
    String.fromCodePoint(0x1e90b) + String.fromCodePoint(0x1e945) + " " +
    String.fromCodePoint(0x1e92d) + String.fromCodePoint(0x1e945) + " " +
    String.fromCodePoint(0x1e90c) + String.fromCodePoint(0x1e945) + " " +
    String.fromCodePoint(0x1e92e) + String.fromCodePoint(0x1e945) + " " +
    String.fromCodePoint(0x1e913) + String.fromCodePoint(0x1e945) + " " +
    String.fromCodePoint(0x1e935) + String.fromCodePoint(0x1e945);
  return {"name": "testDoubleVowels",
          "pass": conv == expected,
          "actual": conv,
          "expected": expected};
}


function testDigits() {
  var text = "0123456789";
  var conv = convertLatinToUnicode(text, false);
  var expected = "\u202e𞥐𞥑𞥒𞥓𞥔𞥕𞥖𞥗𞥘𞥙";
  return {"name": "testDigits",
          "pass": conv == expected,
          "actual": conv,
          "expected": expected};
}
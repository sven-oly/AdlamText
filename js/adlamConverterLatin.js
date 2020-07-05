// Conversion from old font encodings to Adlam Unicode.
var adlamCaseOffset = 0x22;  // Amount to add to get lower case from upper.
var firstAdlamUpper = 0x1e900;
var lastAdlamUpper = 0x1e921;

var minAdlamU = String.fromCodePoint(firstAdlamUpper);
var maxAdlamU = String.fromCodePoint(lastAdlamUpper);

// From Jogo Barry, 28-Jan-2019
var new_adlam_Latin_to_unicode_map = {
  'A': '𞤀',
  'a': '𞤢',
  'AA': '𞤀𞥄',
  'Aa': '𞤀𞥄',
  'aa': '𞤢𞥄',
  'B': '𞤄',
  'b': '𞤦',
  'BB': '𞤄𞥆',
  'Bb': '𞤄𞥆',
  'bb': '𞤦𞥆',
  'Ɓ': '𞤇',
  'ɓ': '𞤩',
  'ƁƁ': '𞤇𞥆',
  'Ɓɓ': '𞤇𞥆',
  'ɓƁ': '𞤩𞥆',
  'ɓɓ': '𞤩𞥆',
  'BH': '𞤇',
  'Bh': '𞤇',
  'BBH': '𞤇𞥆',
  'Bbh': '𞤇𞥆',
  'bh': '𞤩',
  'bbh': '𞤩𞥆',
  'C': '𞤕',
  'c': '𞤷',
  'CC': '𞤕𞥆',
  'Cc': '𞤕𞥆',
  'cc': '𞤷𞥆',
  'D': '𞤁',
  'd': '𞤣',
  'DD': '𞤁𞥆',
  'Dd': '𞤁𞥆',
  'dd': '𞤣𞥆',
  'Ɗ': '𞤍',
  'ɗ': '𞤯',
  'ƊƊ': '𞤍𞥆',
  'Ɗɗ': '𞤍𞥆',
  'ɗɗ': '𞤯𞥆',
  'DH': '𞤍',
  'Dh': '𞤍',
  'dH': '𞤯',
  'dh': '𞤯',
  'DDH': '𞤍𞥆',
  'Ddh': '𞤍𞥆',
  'ddh': '𞤯𞥆',
  'E': '𞤉',
  'e': '𞤫',
  'EE': '𞤉𞥅',
  'Ee': '𞤉𞥅',
  'ee': '𞤫𞥅',
  'F': '𞤊',
  'f': '𞤬',
  'FF': '𞤊𞥆',
  'Ff': '𞤊𞥆',
  'ff': '𞤬𞥆',
  'G': '𞤘',
  'g': '𞤺',
  'GG': '𞤘𞥆',
  'Gg': '𞤘𞥆',
  'gg': '𞤺𞥆',
  'GB': '𞤞',
  'gb': '𞥀',
  'GGB': '𞤞𞥆',
  'Ggb': '𞤞𞥆',
  'ggb': '𞥀𞥆',
  'H': '𞤖',
  'h': '𞤸',
  'HH': '𞤖𞥆',
  'Hh': '𞤖𞥆',
  'hh': '𞤸𞥆',
  'I': '𞤋',
  'i': '𞤭',
  'II': '𞤋𞥅',
  'Ii': '𞤋𞥅',
  'ii': '𞤭𞥅',
  'J': '𞤔',
  'j': '𞤶',
  'JJ': '𞤔𞥆',
  'Jj': '𞤔𞥆',
  'jj': '𞤶𞥆',
  'K': '𞤑',
  'k': '𞤳',
  'KK': '𞤑𞥆',
  'Kk': '𞤑𞥆',
  'kk': '𞤳𞥆',
  'KH': '𞤝',
  'kh': '𞤿',
  'KKH': '𞤝𞥆',
  'Kkh': '𞤝𞥆',
  'kkh': '𞤿𞥆',
  'X': '𞤝',
  'x': '𞤿',
  'XX': '𞤝𞥆',
  'Xx': '𞤝𞥆',
  'xx': '𞤿𞥆',
  'L': '𞤂',
  'l': '𞤤',
  'LL': '𞤂𞥆',
  'Ll': '𞤂𞥆',
  'll': '𞤤𞥆',
  'M': '𞤃',
  'm': '𞤥',
  'MM': '𞤃𞥆',
  'Mm': '𞤃𞥆',
  'mm': '𞤥𞥆',
  'N': '𞤐',
  'n': '𞤲',
  'NN': '𞤐𞥆',
  'Nn': '𞤐𞥆',
  'nn': '𞤲𞥆',
  'Ŋ': '𞤛',
  'ŋ': '𞤽',
  'ŊŊ': '𞤛𞥆',
  'Ŋŋ': '𞤛𞥆',
  'ŋŋ': '𞤽𞥆',
  'NH': '𞤛',
  'Nh': '𞤛',
  'nH': '𞤽',
  'nh': '𞤽',
  'NNH': '𞤛𞥆',
  'Nnh': '𞤛𞥆',
  'nnh': '𞤽𞥆',
  'Ñ': '𞤙',
  'ñ': '𞤻',
  'ÑÑ': '𞤙𞥆',
  'Ññ': '𞤙𞥆',
  'ññ': '𞤻𞥆',
  'NY': '𞤙',
  'GN': '𞤙',
  'ny': '𞤻',
  'gn': '𞤻',
  'NNY': '𞤙𞥆',
  'Nny': '𞤙𞥆',
  'nny': '𞤻𞥆',
  'O': '𞤌',
  'o': '𞤮',
  'OO': '𞤌𞥅',
  'Oo': '𞤌𞥅',
  'oo': '𞤮𞥅',
  'P': '𞤆',
  'p': '𞤨',
  'PP': '𞤆𞥆',
  'Pp': '𞤆𞥆',
  'pp': '𞤨𞥆',
  'KP': '𞤠',
  'kp': '𞥂',
  'KKP': '𞤠𞥆',
  'Kkp': '𞤠𞥆',
  'kkp': '𞥂𞥆',
  'Q': '𞤗',
  'q': '𞤹',
  'QQ': '𞤗𞥆',
  'Qq': '𞤗𞥆',
  'qq': '𞤹𞥆',
  'GH': '𞤗',
  'gh': '𞤹',
  'GGH': '𞤗𞥆',
  'Ggh': '𞤗𞥆',
  'ggh': '𞤹𞥆',
  'R': '𞤈',
  'r': '𞤪',
  'RR': '𞤈𞥆',
  'Rr': '𞤈𞥆',
  'rr': '𞤪𞥆',
  'S': '𞤅',
  's': '𞤧',
  'SS': '𞤅𞥆',
  'Ss': '𞤅𞥆',
  'ss': '𞤧𞥆',
  'SH': '𞤡',
  'Sh': '𞤡',
  'sh': '𞥃',
  'sH': '𞥃',
  'SSH': '𞤡𞥆',
  'Ssh': '𞤡𞥆',
  'ssh': '𞥃𞥆',
  'T': '𞤚',
  't': '𞤼',
  'TT': '𞤚𞥆',
  'Tt': '𞤚𞥆',
  'tt': '𞤼𞥆',
  'U': '𞤓',
  'u': '𞤵',
  'UU': '𞤓𞥅',
  'Uu': '𞤓𞥅',
  'uu': '𞤵𞥅',
  'V': '𞤜',
  'v': '𞤾',
  'VV': '𞤜𞥆',
  'Vv': '𞤜𞥆',
  'vv': '𞤾𞥆',
  'W': '𞤏',
  'w': '𞤱',
  'WW': '𞤏𞥆',
  'Ww': '𞤏𞥆',
  'ww': '𞤱𞥆',
  'Y': '𞤒',
  'y': '𞤴',
  'YY': '𞤒𞥆',
  'Yy': '𞤒𞥆',
  'yy': '𞤴𞥆',
  'Ƴ': '𞤎',
  'ƴ': '𞤰',
  'ƳƳ': '𞤎𞥆',
  'Ƴƴ': '𞤎𞥆',
  'ƴƴ': '𞤰𞥆',
  'YH': '𞤎',
  'yh': '𞤰',
  'YYH': '𞤎𞥆',
  'Yyh': '𞤎𞥆',
  'yyh': '𞤰𞥆',
  'Z': '𞤟',
  'z': '𞥁',
  'ZZ': '𞤟𞥆',
  'Zz': '𞤟𞥆',
  'zz': '𞥁𞥆',
  'ND': "𞤐'𞤁",
  'Nd': "𞤐'𞤁",
  'nd': "𞤲'𞤣",
  'MB': "𞤐'𞤄",
  'Mb': "𞤐'𞤄",
  'mb': "𞤲'𞤦",
  'NJ': "𞤐'𞤔",
  'Nj': "𞤐'𞤔",
  'nj': "𞤲'𞤶",
  'NG': "𞤐'𞤘",
  'Ng': "𞤐'𞤘",
  'ng': "𞤲'𞤺",
  'nnd': '𞤲𞤣',
  'mmb': '𞤥𞤦',
  'nnj': '𞤲𞤶',
  'nng': '𞤲𞤺',
  '0': '𞥐',
  '1': '𞥑',
  '2': '𞥒',
  '3': '𞥓',
  '4': '𞥔',
  '5': '𞥕',
  '6': '𞥖',
  '7': '𞥗',
  '8': '𞥘',
  '9': '𞥙',
  '.': '.',
  ',': '⹁',
  ';': '⁏'
  ,'?': '\u061f',  // Arabic question mark
};

// Special punctuation.
/*
  '!': '𞥞',  // At start of sentence only
  '?': '𞥟',  // At start of sentence only
*/

// To parse out combinations. Doubled letters and other combinations
var adlam_latin_chars =
    "bbh|ddh|ggb|ggh|kkh|kkp|mmb|nnd|nng|nnj|nnh|nny|ssh|yyh|" +
  "aa|bb|cc|dd|ee|ff|gg|hh|ii|jj|kk|ll|mm|nn|ññ|oo|pp|qq|rr|ss|tt|uu|vv|ww|xx|yy|zz|" +
    "ɓɓ|ɗɗ|ŋŋ|ƴƴ|" +
    "bh|dh|dj|dy|gn|mb|nd|ng|nj|nh|ny|sh|" +
    "j|è|é|ê|ë|ï|î|Ô|ö|û|â|,|;" +
//    "[\u000A\u0020]n[bdgj]|^n[bdgj]|[\u000A\u0020]mb|^mb" +  // To handle initial nb,nd,ng,nj with apostrophe
    "n\u0303|" + "[ydb]\u0309|" +
    "[bdgqy]h|g[bn]|kpa|ty|\u000a|" + ".";  // n[bdgjqy]


function replacePunctuation(match, textRun) {
    var match;
    switch (match[0]) {
    case '?':
    case '\u061F':
      replacement = '𞥟 ';
      break;
    case '!':
      replacement = '𞥞 ';
      break;
    case ';':
      replacement = '⁏';
      break;
    case ',':
      replacement = '⹁';
      break;
    default:
    case '.':
      replacement = '';
      break;
    }
    return replacement + textRun + match;
};

function splitBySentence(text) {
  if (typeof text != 'string' || text.length == 0) {
     return text;
  }

  separators = /([.!?\u061F] )/g;
  // Insert Adlam exclamation and interrogative if needed, and reinsert the sentence endings.
  // Elements 1, 3, 5, etc. contain the split strings.
  var splits = text.split(separators);
  var index = 0;
  var sentences = [];
  while (index < splits.length -1) {
    sentences.push(replacePunctuation(splits[index+1], splits[index]));
    index += 2;
  }
  // Check for final question or exclamation
  var puncMatch = splits[index].match(/[.!?\u061F]/);
  if (puncMatch) {
    var position =puncMatch.index;
    var lastPart = splits[index].substr(position);
    sentences.push(replacePunctuation(lastPart, splits[index].substr(0, position)));
  } else {
    sentences.push(splits[index]);
  }
   return sentences;
};

function convertLatinToUnicode(textIn, toLower) {
  if (textIn.length == 0)
    return textIn;

  // Get the individual sentences.
  var sentences = splitBySentence(textIn);

  var textOut = "\u202e";

  for (var index in sentences){
  var parsedText = preParseAdlamLatin(sentences[index]);

  for (index = 0; index < parsedText.length; index ++) {
    var c = parsedText[index];
    var result = new_adlam_Latin_to_unicode_map[c];

    if (result === undefined) {
      result = c;
    }
    if (toLower && result >= minAdlamU && result <= maxAdlamU) {
      result = String.fromCodePoint(result.codePointAt(0) + adlamCaseOffset);
    }
    textOut += result;
  }
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
    String.fromCodePoint(0x1e904) + String.fromCodePoint(0x1E946) + " " +
    String.fromCodePoint(0x1e926) + String.fromCodePoint(0x1E946) + " " +
    String.fromCodePoint(0x1e901) + String.fromCodePoint(0x1E946) + " " +
    String.fromCodePoint(0x1e923) + String.fromCodePoint(0x1E946) + " " +
    String.fromCodePoint(0x1e902) + String.fromCodePoint(0x1E946) + " " +
    String.fromCodePoint(0x1e924) + String.fromCodePoint(0x1E946) + " " +
    String.fromCodePoint(0x1e906) + String.fromCodePoint(0x1E946) + " " +
    String.fromCodePoint(0x1e928) + String.fromCodePoint(0x1E946) + " " +
    String.fromCodePoint(0x1e91a) + String.fromCodePoint(0x1E946) + " " +
    String.fromCodePoint(0x1e93c) + String.fromCodePoint(0x1E946)
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

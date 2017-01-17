var macron = "\u0304";
var combiningDotAboveRight = "\u0358";
var osageCaseOffset = 40;  // Amount to add to get lower case from upper.
var firstOsageUpper = 0x104B0;
var lastOsageUpper = 0x104D3;

// TODO 13-Dec-2016:
// 1. Simplify lower/upper conversion using the offset above.
// 2. Create a Python transliteration.
// 3. Simplify the regular expressions. Mostly done 13-Dec.

var osage_private_use_map = {
  '\uf020': ' ',
  '\uf021': '!',
  '\uf022': [String.fromCodePoint(0x104c7)],
  '\uf023': '#',
  '\uf024': '$',
  '\uf025': '%',
  '\uf026': '&',
  '\uf027': "\'",
  '\uf028': '(',
  '\uf029': ')',
  '\uf02a': '*',
  '\uf02b': '+',
  '\uf02c': [String.fromCodePoint(0x104ba)],
  '\uf02d': '-',
  '\uf02e': '.',
  '\uf02f': [String.fromCodePoint(0x104be)],
  '\uf030': '0',
  '\uf031': '1',
  '\uf032': '2',
  '\uf033': '3',
  '\uf034': '4',
  '\uf035': '5',
  '\uf036': '6',
  '\uf037': '7',
  '\uf038': '8',
  '\uf039': '9',
  '\uf03a': ':',
  '\uf03b': [' ', ' '],  // Character is no longer used.
  '\uf03c': '<',
  '\uf03d': '=',
  '\uf03e': '>',
  '\uf03f': [String.fromCodePoint(0x104be)],
  '\uf040': '@',
  '\uf041\uf041': [String.fromCodePoint(0x104b0)+macron],
  '\uf041': [String.fromCodePoint(0x104b0)],

  '\uf041\uf059': [String.fromCodePoint(0x104b1)],
  '\uf042': [String.fromCodePoint(0x104b4)],
  '\uf043': [String.fromCodePoint(0x104b5)],
  '\uf044': [String.fromCodePoint(0x104c8)],
  '\uf045\uf045': [String.fromCodePoint(0x104b7)+macron],
  '\uf045': [String.fromCodePoint(0x104b7)],

  '\uf045\uf05e': [String.fromCodePoint(0x104b7)+combiningDotAboveRight],
  '\uf048': [String.fromCodePoint(0x104b9),],
  // The eh-consonants
  '\uf048\uf043': [String.fromCodePoint(0x104b6)],
  '\uf048\uf04b': [String.fromCodePoint(0x104bd)],
  '\uf048\uf050': [String.fromCodePoint(0x104c5)],
  '\uf048\uf044': [String.fromCodePoint(0x104c9)],
  '\uf048\uf05d': [String.fromCodePoint(0x104cb)],
  
  '\uf049': [String.fromCodePoint(0x104b1)],
  '\uf04a': [String.fromCodePoint(0x104b3)],
  '\uf04b': [String.fromCodePoint(0x104bc)],
  '\uf04c': [String.fromCodePoint(0x104bf)],
  '\uf04d': [String.fromCodePoint(0x104c0)],
  '\uf04e': [String.fromCodePoint(0x104c1)],
  '\uf04f\uf04f': [String.fromCodePoint(0x104c2)+macron],
  '\uf04f': [String.fromCodePoint(0x104c2)],
  '\uf04f\uf05e': [String.fromCodePoint(0x104c2)+combiningDotAboveRight],
  '\uf050': [String.fromCodePoint(0x104c4)],
  '\uf053': [String.fromCodePoint(0x104c6)],
  '\uf054': [String.fromCodePoint(0x104cd)],
  '\uf055\uf055': [String.fromCodePoint(0x104ce)+macron],
  '\uf055': [String.fromCodePoint(0x104ce)],
  '\uf055\uf05e': [String.fromCodePoint(0x104ce)+combiningDotAboveRight],
  '\uf056': [String.fromCodePoint(0x104c7)],
  '\uf057': [String.fromCodePoint(0x104cf)],
  '\uf058': [String.fromCodePoint(0x104d0)],
  '\uf059\uf059': [String.fromCodePoint(0x104bb)+macron],
  '\uf059': [String.fromCodePoint(0x104bb)],
  '\uf059^': [String.fromCodePoint(0x104bb)+combiningDotAboveRight],
  '\uf059\uf059': [String.fromCodePoint(0x104bb)+macron],
  '\uf059\uf05e': [String.fromCodePoint(0x104bb)+combiningDotAboveRight],
  '\uf05a': [String.fromCodePoint(0x104d2)],  // ??
  '\uf05b': [String.fromCodePoint(0x104d3)],  // ??
  '\uf05c': [' ', ' '],  // Character is no longer used.
  '\uf05d': [String.fromCodePoint(0x104ca)],  // ??],
  '\uf05e': [combiningDotAboveRight],  // '^',
  '\uf05f': '_',
  '\uf060': '`',
  '\uf061': [String.fromCodePoint(0x104b2)],  // ??
  '\uf065': [String.fromCodePoint(0x104b8)],  // ??
  '\uf06f': [String.fromCodePoint(0x104c3)],  // ??
  '\uf07b': '{',
  '\uf07c': '|',
  '\uf07d': '}',
  '\uf07e': '~',
  '\uf0b6': '\u00b6',
};

// Handles upper case, too.
var osage_latin_to_unicode_map = {
  // 'a': [String.fromCodePoint(0x104d8), '\uf041'],
  'a': [String.fromCodePoint(0x104b2), '\uf061'],
  'aa': [String.fromCodePoint(0x104d8)+macron, '\uf041\uf041'], // Macron
  'aA': [String.fromCodePoint(0x104d8)+macron, '\uf041\uf041'], // Macron
  'a\'': [String.fromCodePoint(0x104d9), '\uf049'],
  'b':  [String.fromCodePoint(0x104dc), '\uf042'],
  'br': [String.fromCodePoint(0x104dc), '\uf042'],
  'hc': [String.fromCodePoint(0x104de), '\uf043'],
  'c':  [String.fromCodePoint(0x104dd), '\uf043'],
  'ch': [String.fromCodePoint(0x104de), '\uf043'],
  'd':  [String.fromCodePoint(0x104f0), '\uf044'],
  'e':  [String.fromCodePoint(0x104b8), '\uf065'],
  'ee': [String.fromCodePoint(0x104df)+macron, '\uf045\uf045'], // Macron
  'eE': [String.fromCodePoint(0x104df)+macron, '\uf045\uf045'], // Macron
  'g':  [String.fromCodePoint(0x104f9), '\uf059'],
  'h':  [String.fromCodePoint(0x104e1), '\uf048'],
  'hd':  [String.fromCodePoint(0x104f1), '\uf048\uf044'],
  'i':  [String.fromCodePoint(0x104d9), '\uf049'],
  'ii': [String.fromCodePoint(0x104d9)+macron, '\uf049\uf054'], // Macron
  'iI': [String.fromCodePoint(0x104d9)+macron, '\uf049\uf054'], // Macron
  'j':  [String.fromCodePoint(0x104db), '\uf04a'],
  'k':  [String.fromCodePoint(0x104e4), '\uf04b'],
  'hk': [String.fromCodePoint(0x104e5), '\uf048\uf04b'],
  'h]': [String.fromCodePoint(0x104e5), '\uf048\uf04b'],
  'l':  [String.fromCodePoint(0x104e7), '\uf04c'],
  'm':  [String.fromCodePoint(0x104f8), '\uf04d'],
  'n':  [String.fromCodePoint(0x104e9), '\uf04e'],
  'o': [String.fromCodePoint(0x104c3), '\uf06f'],
  'oo': [String.fromCodePoint(0x104ea)+macron, '\uf04f\uf04f'], // Macron
  'oO': [String.fromCodePoint(0x104ea)+macron, '\uf04f\uf04f'], // Macron
  'p':  [String.fromCodePoint(0x104ec), '\uf050'],
  'hp': [String.fromCodePoint(0x104ed), '\uf048\uf04b'],
  's':  [String.fromCodePoint(0x104ee), '\uf053'],
  'sh': [String.fromCodePoint(0x104ef), '\uf022'],
  't':  [String.fromCodePoint(0x104f5), '\uf054'],
  'ht': [String.fromCodePoint(0x104f1), '\uf048\uf04b'],
  'ts': [String.fromCodePoint(0x104f2), '\uf05d'],
  'hts': [String.fromCodePoint(0x104f3), '\uf054'],
  'tsh': [String.fromCodePoint(0x104f4), '\uf054'],
  'u':  [String.fromCodePoint(0x104f6), '\uf055'],
  'uh': [String.fromCodePoint(0x104db), '\uf04a'],
  'uH': [String.fromCodePoint(0x104db), '\uf04a'],
  'uH': [String.fromCodePoint(0x104db), '\uf04a'],
  'uhd': [String.fromCodePoint(0x104f6)+String.fromCodePoint(0x104f1), '\uf055\uf048\uf044'], // Macron
  'uU': [String.fromCodePoint(0x104f6)+macron, '\uf055\uf055'], // Macron
  'v':  [String.fromCodePoint(0x104ef), '\uf056'],
  'w':  [String.fromCodePoint(0x104f7), '\uf057'],
  'x':  [String.fromCodePoint(0x104f8), '\uf058'],
  'y':  [String.fromCodePoint(0x104e3), '\uf059'],
  'yy':  [String.fromCodePoint(0x104e3)+macron, '\uf059\uf059'],
  'yY':  [String.fromCodePoint(0x104e3)+macron, '\uf059\uf059'],
  'z':  [String.fromCodePoint(0x104fa), '\uf05a'],
  'zh': [String.fromCodePoint(0x104fb), '\uf05b'],
  // Upper case input.
  'A': [String.fromCodePoint(0x104b0), '\uf041'],
  'Aa': [String.fromCodePoint(0x104b0)+macron, '\uf041\uf041'], // Macron
  'AA': [String.fromCodePoint(0x104b0)+macron, '\uf041\uf041'], // Macron
  'A\'': [String.fromCodePoint(0x104b1), '\uf049'],
  'B':  [String.fromCodePoint(0x104b4), '\uf042'],
  'Br': [String.fromCodePoint(0x104b4), '\uf042'],
  'BR': [String.fromCodePoint(0x104b4), '\uf042'],
  'Hc':[String.fromCodePoint(0x104b6), '\uf043'],
  'HC':[String.fromCodePoint(0x104b6), '\uf043'],
  'C':  [String.fromCodePoint(0x104b5), '\uf043'],
  'Ch': [String.fromCodePoint(0x104b6), '\uf043'],
  'CH': [String.fromCodePoint(0x104b6), '\uf043'],
  'D':  [String.fromCodePoint(0x104c8), '\uf044'],
  'E':  [String.fromCodePoint(0x104b7), '\uf045'],
  'Ee': [String.fromCodePoint(0x104b7)+macron, '\uf045\uf045'], // Macron
  'EE': [String.fromCodePoint(0x104b7)+macron, '\uf045\uf045'], // Macron
  'G':  [String.fromCodePoint(0x104d1), '\uf059'],
  'H':  [String.fromCodePoint(0x104b9), '\uf048'],
  'Hd': [String.fromCodePoint(0x104f1), '\uf048\uf044'],
  'HD': [String.fromCodePoint(0x104c9), '\uf048\uf044'],
  'H]': [String.fromCodePoint(0x104c9), '\uf048\uf044'],
  'HK': [String.fromCodePoint(0x104c3), '\uf048\uf04b'],
  'I':  [String.fromCodePoint(0x104b1), '\uf049'],
  'Ii': [String.fromCodePoint(0x104b1)+macron, '\uf049\uf049'], // Macron
  'II': [String.fromCodePoint(0x104b1)+macron, '\uf049\uf049'], // Macron
  'J':  [String.fromCodePoint(0x104b3), '\uf04a'],
  'K':  [String.fromCodePoint(0x104bc), '\uf04b'],
  'Hk': [String.fromCodePoint(0x104bd), '\uf048\uf04b'],
  'HK': [String.fromCodePoint(0x104bd), '\uf048\uf04b'],
  'L':  [String.fromCodePoint(0x104bf), '\uf04c'],
  'M':  [String.fromCodePoint(0x104c0), '\uf04d'],
  'N':  [String.fromCodePoint(0x104c1), '\uf04e'],
  'O':  [String.fromCodePoint(0x104c2), '\uf04f'],
  'Oo': [String.fromCodePoint(0x104c2)+macron, '\uf04f\uf04f'], // Macron
  'OO': [String.fromCodePoint(0x104c2)+macron, '\uf04f\uf04f'], // Macron
  'P':  [String.fromCodePoint(0x104c4), '\uf050'],
  'Hp': [String.fromCodePoint(0x104c5), '\uf048\uf04b'],
  'HP': [String.fromCodePoint(0x104c5), '\uf048\uf04b'],
  'S':  [String.fromCodePoint(0x104c6), '\uf053'],
  'Sh': [String.fromCodePoint(0x104c7), '\uf022'],
  'SH': [String.fromCodePoint(0x104c7), '\uf022'],
  'T':  [String.fromCodePoint(0x104cd), '\uf054'],
  'Ht': [String.fromCodePoint(0x104c9), '\uf048\uf04b'],
  'HT': [String.fromCodePoint(0x104c9), '\uf048\uf04b'],
  'Ts': [String.fromCodePoint(0x104ca), '\uf05d'],
  'TS': [String.fromCodePoint(0x104ca), '\uf05d'],
  'Hts': [String.fromCodePoint(0x104cb), '\uf054'],
  'HTs': [String.fromCodePoint(0x104cb), '\uf054'],
  'HTS': [String.fromCodePoint(0x104cb), '\uf054'],
  'Tsh': [String.fromCodePoint(0x104cc), '\uf054'],
  'TSh': [String.fromCodePoint(0x104cc), '\uf054'],
  'TSH': [String.fromCodePoint(0x104cc), '\uf054'],
  'U':  [String.fromCodePoint(0x104ce), '\uf055'],
  'Uh': [String.fromCodePoint(0x104b3), '\uf04a'],
  'UH': [String.fromCodePoint(0x104b3), '\uf04a'],
  'Uu': [String.fromCodePoint(0x104ce)+macron, '\uf055\uf055'], // Macron
  'UU': [String.fromCodePoint(0x104ce)+macron, '\uf055\uf055'], // Macron
  'UHD': [String.fromCodePoint(0x104ce)+String.fromCodePoint(0x104c9), '\uf055\uf048\uf044'],
  'V':  [String.fromCodePoint(0x104c7), '\uf056'],
  'W':  [String.fromCodePoint(0x104cf), '\uf057'],
  'X':  [String.fromCodePoint(0x104d0), '\uf058'],
  'Y':  [String.fromCodePoint(0x104bb), '\uf05a'],
  'Yy':  [String.fromCodePoint(0x104bb)+macron, '\uf05a\uf05a'],
  'YY':  [String.fromCodePoint(0x104bb)+macron, '\uf05a\uf05a'],
  'Z':  [String.fromCodePoint(0x104d2), '\uf05a'],
  'Zh': [String.fromCodePoint(0x104d3), '\uf05b'],  
  'ZH': [String.fromCodePoint(0x104d3), '\uf05b'],  
  ';':  [";", '\uf03b'],  // ??
  '^':  [combiningDotAboveRight, '\uf05e'],
  ',':  [String.fromCodePoint(0x104b9), '\uf02c'],
  '\[': [String.fromCodePoint(0x104d3), '\uf05b'],
  '{': ['{', '\uf05b'],
  '\]': [String.fromCodePoint(0x104ca), '\uf05d'],
  'h\]': [String.fromCodePoint(0x104cb), '\uf048\uf05d'],
  'H\]': [String.fromCodePoint(0x104cb), '\uf048\uf05d'],
  '}': ['}', '\uf05d'],
  '\/': [String.fromCodePoint(0x104be), '\uf03f'],
  '|': ["|", '\uf05c'],
  '\\': ["\\", '\uf05c'],
  '\"': [String.fromCodePoint(0x104be), '\uf056'],
  // TODO: Finish these.
}

var full_map = osage_private_use_map;

var minOsageU = String.fromCodePoint(0x104b0);
var maxOsageU = String.fromCodePoint(0x104d8);
var lowerCaseOffset = 0x28;
var oldOsageDot = '\uf02e';

// Converts from old Osage codepoints to Unicode Standard.
// Converts to lower case if the flag is set.
// Converts Latin characters if flag is set.
// Converts Osage period 0xf02e to empty character if set.
// TODO: Convert to UTF-16.
function oldOsageToUnicode(textIn, convertToLower, convertLatin, clearOsageDot) {
  var convertResult = "";
  var index;
  var outputIsUTF16 = true;

  var parsedInput = preParseOldOsage(textIn);
  if (!parsedInput) {
    return "";
  }
  for (index = 0; index < parsedInput.length; index ++) {
    var c = parsedInput[index];
    if (c == oldOsageDot && clearOsageDot) {
      continue;
    }
    var result = osage_private_use_map[c];
    if (result) {
      if (Array.isArray(result)) {
        out = result[0];  // Upper case.
      } else {
        out = result;  // Only a single character.
      }
    } else {
      // It's not in the map.
      if (convertLatin) {
        result = osage_latin_to_unicode_map[c];
      }
      if (result == null) {
        out = c;
      } else {
        out = result[0];
      }
    }
    convertResult += out;
  }

  if (outputIsUTF16) {
    return OsageStringOut(convertResult, convertToLower);
  } else {
    return convertResult;
  }
}

// Converts to lower case if needed.
function OsageStringOut(text, toLower) {
  var len = text.length;
  var outlist = [];
  for (i = 0; i < len; i ++) {
    var c = text.codePointAt(i);
    if (toLower && c >= firstOsageUpper && c <= lastOsageUpper) {
      c = (c + osageCaseOffset);
    }
    outlist.push(getUnicodeCharacter(c));
  }
  return outlist.join("");
}

// Converts from old Osage codepoints to Unicode Standard.
// Converts to lower case if the flag is set.
// TODO: Convert to UTF-16.
function latinToUnicode(textIn, convertToLower) {
  var convertResult = "";
  var index;
  var outputIsUTF16 = true;

  var parsedInput = preParseLatin(textIn);
  if (!parsedInput) {
    return "";
  }
  for (index = 0; index < parsedInput.length; index ++) {
    var c = parsedInput[index];
    if (convertToLower) {
      c = c.toLowerCase();
    }
    var result = osage_latin_to_unicode_map[c];
    if (result) {
      if (Array.isArray(result)) {
        out = result[0];  // Upper case.
      } else {
        out = result;  // Only a single character.
      }
    } else {
      // It's not in the map.
      out = c;
    }
    convertResult += out;
  }
  if (outputIsUTF16) {
    var convertResultUTF16 = "";
    var u16list = [];
    for (var i = 0; i < convertResult.length; i++) {
      var cp = convertResult.codePointAt(i);
      var utf16Result = getUnicodeCharacter(cp);
      if (typeof utf16Result === 'string') {
        var len16 = utf16Result.length;
          for (var j = 0; j < len16; j ++) {
            var charCode = utf16Result.codePointAt(j);
          }
      }
      u16list.push(utf16Result);
    }
    return u16list.join("");
  } else {
    return convertResult;
  }
}

// Converts from old Osage codepoints to Unicode Standard.
// Converts to lower case if the flag is set.
// TODO: Convert to UTF-16.
function latinToOldOsage(textIn, convertToLower) {
  var convertResult = "";
  var index;
  var outputIsUTF16 = true;
  var out;

  var parsedInput = preParseLatin(textIn);
  if (!parsedInput) {
    return "";
  }

  for (index = 0; index < parsedInput.length; index ++) {
    var c = parsedInput[index].toLowerCase();
    var result = osage_latin_to_unicode_map[c];
    if (result) {
      if (Array.isArray(result)) {
          out = result[1];
      } else {
        out = result;  // Only a single character.
      }
    } else {
      // It's not in the map.
      out = c;
    }
    convertResult += out;
  }
  if (outputIsUTF16) {
    var convertResultUTF16 = "";
    var u16list = [];
    for (var i = 0; i < convertResult.length; i++) {
      var cp = convertResult.codePointAt(i);
      var utf16Result = getUnicodeCharacter(cp);
      if (typeof utf16Result === 'string') {
        var len16 = utf16Result.length;
          for (var j = 0; j < len16; j ++) {
            var charCode = utf16Result.codePointAt(j);
          }
      }
      u16list.push(utf16Result);
    }
    return u16list.join("");
  } else {
    return convertResult;
  }
}

// Parsing of Latin combinations.
// vowel + ^, double vowels, dotted, pre-aspirated, single letters, non-letters
// Removed 'uh'
var osage_latin_chars =
  "h\]|[aeouy]\f05e|aa|ee|ii|oo|uu|yy|a\'|ts\'|br|[cs]h|hch|hts|h[cdkpt]|iu|tsh|t[hs]|t|zh|[a-eg-pst-z]|[\'\|\\/\;,\\^]|\\|/|6|\;|,|\\S|\\s";

// Use regular expression to greedily process input string, producing list of strings
// to be converted. E.g., 'htathanh' should give {"ht", "a", "th", "n", "h"}
function preParseLatin(instring) {
  var regex1 = new RegExp(osage_latin_chars, "gi");
  var outList = instring.match(regex1);
  return outList;
}

// For converting input to sets of connected characters.
// Vowels + ^, double vowels, pre-aspirated consonants, single characters.
var old_osage_chars =
  "[\\^\uf05e]|\uf041\uf041|\uf045\uf045|\uf04f\uf04f|\uf055\uf055|\uf059\uf059|\uf041\uf059|\uf048[\uf043\uf04b\uf050\uf044\uf05d]|[\uf021-\uf045\uf048-\uf061\uf065\uf06f\uf07b-\uf07e\uf0b6]|";

function preParseOldOsage(instring) {
  if (typeof instring == 'string') {
    var combined_chars = old_osage_chars + osage_latin_chars;
    var regex2 = new RegExp(combined_chars, "gi");
    var outList = instring.match(regex2);
    return outList;
  }
  return null;
}

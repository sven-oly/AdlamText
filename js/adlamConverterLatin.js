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
  'Aa': String.fromCodePoint(0x1e900) + String.fromCodePoint(0x1e944),
  'aa': String.fromCodePoint(0x1e922) + String.fromCodePoint(0x1e944),
  'aA': String.fromCodePoint(0x1e922) + String.fromCodePoint(0x1e944),

  'B': String.fromCodePoint(0x1e904),
  'b': String.fromCodePoint(0x1e926),
  'BB': String.fromCodePoint(0x1e904) + String.fromCodePoint(0x1E946),
  'Bb': String.fromCodePoint(0x1e904) + String.fromCodePoint(0x1E946),
  'bb': String.fromCodePoint(0x1e926) + String.fromCodePoint(0x1E946),
  'bB': String.fromCodePoint(0x1e926) + String.fromCodePoint(0x1E946),

  'C': String.fromCodePoint(0x1e915),
  'c': String.fromCodePoint(0x1e937),
  'CC': String.fromCodePoint(0x1e915) + String.fromCodePoint(0x1E946),
  'Cc': String.fromCodePoint(0x1e915) + String.fromCodePoint(0x1E946),
  'cc': String.fromCodePoint(0x1e937) + String.fromCodePoint(0x1E946),
  'cC': String.fromCodePoint(0x1e937) + String.fromCodePoint(0x1E946),

  'D': String.fromCodePoint(0x1e901),
  'd': String.fromCodePoint(0x1e923),
  'DD': String.fromCodePoint(0x1e901) + String.fromCodePoint(0x1E946),
  'Dd': String.fromCodePoint(0x1e901) + String.fromCodePoint(0x1E946),
  'dd': String.fromCodePoint(0x1e923) + String.fromCodePoint(0x1E946),
  'dD': String.fromCodePoint(0x1e923) + String.fromCodePoint(0x1E946),

  'dj': '𞤶',
  'dJ': '𞤶',
  'Dj': '𞤔',
  'DJ': '𞤔',
  'dy': '𞤶',
  'dY': '𞤶',
  'Dy': '𞤔',
  'DY': '𞤔',

  'E': String.fromCodePoint(0x1e909),
  'e': String.fromCodePoint(0x1e92b),
  'EE': String.fromCodePoint(0x1e909) + String.fromCodePoint(0x1e945),
  'Ee': String.fromCodePoint(0x1e909) + String.fromCodePoint(0x1e945),
  'ee': String.fromCodePoint(0x1e92b) + String.fromCodePoint(0x1e945),
  'eE': String.fromCodePoint(0x1e92b) + String.fromCodePoint(0x1e945),

  'è': '𞤫',
  'é': '𞤫',
  'È': '𞤉',
  'É': '𞤉',

  'ê': '𞤫𞥅',
  'ë': '𞤫𞥅',
  'Ê': '𞤉𞥅',
  'Ë': '𞤉𞥅',

  'î': '𞤭𞥅',
  'Î': '𞤋𞥅',
  'ï': '𞤭𞥅',
  'Ï': '𞤋𞥅',

  'ô': '𞤮',
  'Ô': '𞤌',
  'ö': '𞤮',
  'Ö': '𞤌',

  'û': '𞤵𞥅',
  'Û': '𞤓𞥅',

  'â': '𞤢',
  'Â': '𞤀',
  
  'F': String.fromCodePoint(0x1e90a),
  'f': String.fromCodePoint(0x1e92c),
  'FF': String.fromCodePoint(0x1e90a) + String.fromCodePoint(0x1E946),
  'Ff': String.fromCodePoint(0x1e90a) + String.fromCodePoint(0x1E946),
  'ff': String.fromCodePoint(0x1e92c) + String.fromCodePoint(0x1E946),
  'fF': String.fromCodePoint(0x1e92c) + String.fromCodePoint(0x1E946),

  'G': String.fromCodePoint(0x1e918),
  'g': String.fromCodePoint(0x1e93a),
  'GG': String.fromCodePoint(0x1e918) + String.fromCodePoint(0x1E946),
  'Gg': String.fromCodePoint(0x1e918) + String.fromCodePoint(0x1E946),
  'gg': String.fromCodePoint(0x1e93a) + String.fromCodePoint(0x1E946),
  'gG': String.fromCodePoint(0x1e93a) + String.fromCodePoint(0x1E946),

  'GN': String.fromCodePoint(0x1e918),
  'Gn': String.fromCodePoint(0x1e918),
  'gn': String.fromCodePoint(0x1e93a),
  'gN': String.fromCodePoint(0x1e93a),

  'H': String.fromCodePoint(0x1e916),
  'h': String.fromCodePoint(0x1e938),
  'HH': String.fromCodePoint(0x1e916) + String.fromCodePoint(0x1E946),
  'Hh': String.fromCodePoint(0x1e916) + String.fromCodePoint(0x1E946),
  'hh': String.fromCodePoint(0x1e938) + String.fromCodePoint(0x1E946),
  'hH': String.fromCodePoint(0x1e938) + String.fromCodePoint(0x1E946),

  'I': String.fromCodePoint(0x1e90b),
  'i': String.fromCodePoint(0x1e92d),
  'II': String.fromCodePoint(0x1e90b) + String.fromCodePoint(0x1e945),
  'Ii': String.fromCodePoint(0x1e90b) + String.fromCodePoint(0x1e945),
  'ii': String.fromCodePoint(0x1e92d) + String.fromCodePoint(0x1e945),
  'iI': String.fromCodePoint(0x1e92d) + String.fromCodePoint(0x1e945),

  'J': String.fromCodePoint(0x1e914),
  'j': String.fromCodePoint(0x1e936),
  'JJ': String.fromCodePoint(0x1e914) + String.fromCodePoint(0x1E946),
  'Jj': String.fromCodePoint(0x1e914) + String.fromCodePoint(0x1E946),
  'jj': String.fromCodePoint(0x1e936) + String.fromCodePoint(0x1E946),
  'jj': String.fromCodePoint(0x1e936) + String.fromCodePoint(0x1E946),

  'K': String.fromCodePoint(0x1e911),
  'k': String.fromCodePoint(0x1e933),
  'KK': String.fromCodePoint(0x1e911) + String.fromCodePoint(0x1E946),
  'Kk': String.fromCodePoint(0x1e911) + String.fromCodePoint(0x1E946),
  'kk': String.fromCodePoint(0x1e933) + String.fromCodePoint(0x1E946),
  'kK': String.fromCodePoint(0x1e933) + String.fromCodePoint(0x1E946),

  'L': String.fromCodePoint(0x1e902),
  'l': String.fromCodePoint(0x1e924),
  'LL': String.fromCodePoint(0x1e902) + String.fromCodePoint(0x1E946),
  'Ll': String.fromCodePoint(0x1e902) + String.fromCodePoint(0x1E946),
  'll': String.fromCodePoint(0x1e924) + String.fromCodePoint(0x1E946),
  'lL': String.fromCodePoint(0x1e924) + String.fromCodePoint(0x1E946),

  'M': String.fromCodePoint(0x1e903),
  'm': String.fromCodePoint(0x1e925),
  'MM': String.fromCodePoint(0x1e903) + String.fromCodePoint(0x1E946),
  'Mm': String.fromCodePoint(0x1e903) + String.fromCodePoint(0x1E946),
  'mm': String.fromCodePoint(0x1e925) + String.fromCodePoint(0x1E946),
  'mM': String.fromCodePoint(0x1e925) + String.fromCodePoint(0x1E946),
  ' MB': String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e904),
  ' Mb': String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e904),
  ' mb': String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1E926),
  ' mB': String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1E926),
  '\u000aMB': "\u000a" + String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e904),
  '\u000aMb': "\u000a" + String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e904),
  '\u00a0mb': "\u000a" + String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1E926),
  '\u000amB': "\u000a" + String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1E926),

  'N': String.fromCodePoint(0x1e910),
  'n': String.fromCodePoint(0x1e932),
  'NN': String.fromCodePoint(0x1e910) + String.fromCodePoint(0x1E946),
  'Nn': String.fromCodePoint(0x1e910) + String.fromCodePoint(0x1E946),
  'nn': String.fromCodePoint(0x1e932) + String.fromCodePoint(0x1E946),
  'nN': String.fromCodePoint(0x1e932) + String.fromCodePoint(0x1E946),

  'NB': + String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e904),
  'Nb': + String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e904),
  'nb': String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e926),
  'nB': String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e926),
  ' NB': " " + String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e904),
  '\u000aNB': "\u000a" + String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e904),
  ' Nb': " "+ String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e926),
  '\u000aNb': "\u000a" +String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e926),
  ' nb':  " "+ String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e926),
  '\u000anb':  "\u000a" +String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e926),
  ' nB':  " "+ String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e926),
  '\u000anB':  "\u000a" +String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e926),

  'ND':  String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e901),
  'nD':  String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e901),
  'Nd':  String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e923),
  'nd':  String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e923),
  ' ND':  " "+ String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e901),
  ' nD':  " "+ String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e901),
  ' Nd':  " "+ String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e923),
  ' nd':  " "+ String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e923),
  '\u000aND':  "\u000a" +String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e901),
  '\u000anD':  "\u000a" +String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e901),
  '\u000aNd':  "\u000a" +String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e923),
  '\u000and':  "\u000a" +String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e923),

  'NG':  String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e918),
  'nG':  String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e918),
  'Ng':  String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e93a),
  'ng':  String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e93a),
  ' NG':  " "+ String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e918),
  ' nG':  " "+ String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e918),
  ' Ng':  " "+ String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e93a),
  ' ng':  " "+ String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e93a),
  '\u000aNG':  "\u000a" +String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e918),
  '\u000anG':  "\u000a" +String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e918),
  '\u000aNg':  "\u000a" +String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e93a),
  '\u000ang':  "\u000a" +String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e93a),

  'NJ': String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e914),
  'nJ': String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e914),
  'Nj': String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e936),
  'nj': String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e936),
  ' NJ':  " "+ String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e914),
  ' nJ':  " "+ String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e914),
  ' Nj':  " "+ String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e936),
  ' nj':  " "+ String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e936),
  '\u000aNJ':  "\u000a" +String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e914),
  '\u000anJ':  "\u000a" +String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e914),
  '\u000aNj':  "\u000a" +String.fromCodePoint(0x1e910) + "\'" + String.fromCodePoint(0x1e936),
  '\u000anj':  "\u000a" +String.fromCodePoint(0x1e932) + "\'" + String.fromCodePoint(0x1e936),

  'O': String.fromCodePoint(0x1e90c),
  'o': String.fromCodePoint(0x1e92e),
  'OO': String.fromCodePoint(0x1e90c) + String.fromCodePoint(0x1e945),
  'Oo': String.fromCodePoint(0x1e90c) + String.fromCodePoint(0x1e945),
  'oo': String.fromCodePoint(0x1e92e) + String.fromCodePoint(0x1e945),
  'oO': String.fromCodePoint(0x1e92e) + String.fromCodePoint(0x1e945),

  'P': String.fromCodePoint(0x1e906),
  'p': String.fromCodePoint(0x1e928),
  'PP': String.fromCodePoint(0x1e906) + String.fromCodePoint(0x1E946),
  'Pp': String.fromCodePoint(0x1e906) + String.fromCodePoint(0x1E946),
  'pp': String.fromCodePoint(0x1e928) + String.fromCodePoint(0x1E946),
  'pP': String.fromCodePoint(0x1e928) + String.fromCodePoint(0x1E946),

  'Q': String.fromCodePoint(0x1e919),
  'q': String.fromCodePoint(0x1e93b),
  'QQ': String.fromCodePoint(0x1e919) + String.fromCodePoint(0x1E946),
  'Qq': String.fromCodePoint(0x1e919) + String.fromCodePoint(0x1E946),
  'qq': String.fromCodePoint(0x1e93b) + String.fromCodePoint(0x1E946),
  'qQ': String.fromCodePoint(0x1e93b) + String.fromCodePoint(0x1E946),

  'R': String.fromCodePoint(0x1e908),
  'r': String.fromCodePoint(0x1e92a),
  'RR': String.fromCodePoint(0x1e908) + String.fromCodePoint(0x1E946),
  'Rr': String.fromCodePoint(0x1e908) + String.fromCodePoint(0x1E946),
  'rr': String.fromCodePoint(0x1e92a) + String.fromCodePoint(0x1E946),
  'rR': String.fromCodePoint(0x1e92a) + String.fromCodePoint(0x1E946),

  'S': String.fromCodePoint(0x1e905),
  's': String.fromCodePoint(0x1e927),
  'SS': String.fromCodePoint(0x1e905) + String.fromCodePoint(0x1E946),
  'Ss': String.fromCodePoint(0x1e905) + String.fromCodePoint(0x1E946),
  'ss': String.fromCodePoint(0x1e927) + String.fromCodePoint(0x1E946),
  'sS': String.fromCodePoint(0x1e927) + String.fromCodePoint(0x1E946),

  'T': String.fromCodePoint(0x1e91a),
  't': String.fromCodePoint(0x1e93c),
  'TT': String.fromCodePoint(0x1e91a) + String.fromCodePoint(0x1E946),
  'Tt': String.fromCodePoint(0x1e91a) + String.fromCodePoint(0x1E946),
  'tt': String.fromCodePoint(0x1e93c) + String.fromCodePoint(0x1E946),
  'tT': String.fromCodePoint(0x1e93c) + String.fromCodePoint(0x1E946),

  'TY': String.fromCodePoint(0x1e915),
  'Ty': String.fromCodePoint(0x1e915),
  'ty': String.fromCodePoint(0x1e937),
  'tY': String.fromCodePoint(0x1e937),

  'U': String.fromCodePoint(0x1e913),
  'u': String.fromCodePoint(0x1e935),
  'UU': String.fromCodePoint(0x1e913) + String.fromCodePoint(0x1e945),
  'Uu': String.fromCodePoint(0x1e913) + String.fromCodePoint(0x1e945),
  'uu': String.fromCodePoint(0x1e935) + String.fromCodePoint(0x1e945),
  'uU': String.fromCodePoint(0x1e935) + String.fromCodePoint(0x1e945),

  'V': String.fromCodePoint(0x1e91c),
  'v': String.fromCodePoint(0x1e93e),
  'VV': String.fromCodePoint(0x1e91c) + String.fromCodePoint(0x1E946),
  'Vv': String.fromCodePoint(0x1e91c) + String.fromCodePoint(0x1E946),
  'vv': String.fromCodePoint(0x1e93e) + String.fromCodePoint(0x1E946),
  'vV': String.fromCodePoint(0x1e93e) + String.fromCodePoint(0x1E946),

  'W': String.fromCodePoint(0x1e90F),
  'w': String.fromCodePoint(0x1e931),
  'WW': String.fromCodePoint(0x1e90F) + String.fromCodePoint(0x1E946),
  'Ww': String.fromCodePoint(0x1e90F) + String.fromCodePoint(0x1E946),
  'ww': String.fromCodePoint(0x1e931) + String.fromCodePoint(0x1E946),
  'wW': String.fromCodePoint(0x1e931) + String.fromCodePoint(0x1E946),

  'Y': String.fromCodePoint(0x1e912),
  'y': String.fromCodePoint(0x1e934),
  'YY': String.fromCodePoint(0x1e912) + String.fromCodePoint(0x1E946),
  'Yy': String.fromCodePoint(0x1e912) + String.fromCodePoint(0x1E946),
  'yy': String.fromCodePoint(0x1e934) + String.fromCodePoint(0x1E946),
  'yY': String.fromCodePoint(0x1e934) + String.fromCodePoint(0x1E946),

  'Z': String.fromCodePoint(0x1e91f),
  'z': String.fromCodePoint(0x1e941),
  'ZZ': String.fromCodePoint(0x1e91f) + String.fromCodePoint(0x1E946),
  'Zz': String.fromCodePoint(0x1e91f) + String.fromCodePoint(0x1E946),
  'zz': String.fromCodePoint(0x1e941) + String.fromCodePoint(0x1E946),
  'zZ': String.fromCodePoint(0x1e941) + String.fromCodePoint(0x1E946),

  'BH': String.fromCodePoint(0x1e907),
  'Bh': String.fromCodePoint(0x1e907),
  'bh': String.fromCodePoint(0x1e929),
  'Ɓ':  String.fromCodePoint(0x1e907),
  'ƁƁ': String.fromCodePoint(0x1e907) + String.fromCodePoint(0x1E946),
  'ɓ':  String.fromCodePoint(0x1e929),
  'ɓɓ': String.fromCodePoint(0x1e929) + String.fromCodePoint(0x1E946),
  
  'DH': String.fromCodePoint(0x1e90d),
  'Dh': String.fromCodePoint(0x1e90d),
  'dh': String.fromCodePoint(0x1e92f),
  'dH': String.fromCodePoint(0x1e92f),
  'D\u0309': String.fromCodePoint(0x1e90d),
  'Ɗ':  String.fromCodePoint(0x1e90d),
  'ƊƊ': String.fromCodePoint(0x1e90d) + String.fromCodePoint(0x1E946),
  'Ɗɗ': String.fromCodePoint(0x1e90d) + String.fromCodePoint(0x1E946),
  'd\u0309':  String.fromCodePoint(0x1e92f),
  'ɗ':  String.fromCodePoint(0x1e92f),
  'ɗɗ':  String.fromCodePoint(0x1e92f) + String.fromCodePoint(0x1E946),
  'ɗƊ':  String.fromCodePoint(0x1e92f) + String.fromCodePoint(0x1E946),

  'YH': String.fromCodePoint(0x1e90e),
  'Yh': String.fromCodePoint(0x1e90e),
  'yh': String.fromCodePoint(0x1e930),
  'yH': String.fromCodePoint(0x1e930),
  'Ƴ':  String.fromCodePoint(0x1e90e),
  'Y\u0309': String.fromCodePoint(0x1e90e),
  'ƳƳ': String.fromCodePoint(0x1e90e) + String.fromCodePoint(0x1E946),
  'Ƴy': String.fromCodePoint(0x1e90e) + String.fromCodePoint(0x1E946),
  'ƴ':  String.fromCodePoint(0x1e930),
  'y\u0309':  String.fromCodePoint(0x1e930),
  'ƴƴ':  String.fromCodePoint(0x1e930) + String.fromCodePoint(0x1E946),
  'ƴƳ':  String.fromCodePoint(0x1e930) + String.fromCodePoint(0x1E946),

  'QH': String.fromCodePoint(0x1e917),
  'Qh': String.fromCodePoint(0x1e917),
  'qh': String.fromCodePoint(0x1e939),
  'qH': String.fromCodePoint(0x1e939),

  'NY': String.fromCodePoint(0x1e919),
  'Ny': String.fromCodePoint(0x1e919),
  'Ñ': String.fromCodePoint(0x1e919),
  'N\u0303': String.fromCodePoint(0x1e919),  // Combining tilde
  'ny': String.fromCodePoint(0x1e93b),
  'nY': String.fromCodePoint(0x1e93b),
  'ñ': String.fromCodePoint(0x1e93b),
  'n\u0303': String.fromCodePoint(0x1e93b),

  'NQ': String.fromCodePoint(0x1e91b),
  'Nq': String.fromCodePoint(0x1e91b),
  'nq': String.fromCodePoint(0x1e93d),
  'nQ': String.fromCodePoint(0x1e93d),

  'GH': String.fromCodePoint(0x1e91d),
  'Gh': String.fromCodePoint(0x1e91d),
  'gh': String.fromCodePoint(0x1e93f),
  'gH': String.fromCodePoint(0x1e93f),

  'GB': String.fromCodePoint(0x1e91e),
  'Gb': String.fromCodePoint(0x1e91e),
  'gb': String.fromCodePoint(0x1e940),
  'gB': String.fromCodePoint(0x1e940),

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
  
  // Punctuation
  '!': String.fromCodePoint(0x1e95e),
  '?': String.fromCodePoint(0x1e95f),
  ',': '\u060c',
  ';': '\u061b',
 
  // Special for return adding RTL marker
  '\u000a' : '\u000a\u202e',
};

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
  'ny': '𞤻',
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
  ',': ',',
  '?': '\u061f',  // Arabic question mark
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
    "bh|dj|dy|gn|mb|nd|ng|nj|nh|ny|sh|" +
    "j|è|é|ê|ë|ï|î|Ô|ö|û|â|" +
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
    default:
    case '.':
      replacement = '';
      break;
    }
    return replacement + textRun + match;
};

function splitBySentence(text) {
  if (text.length == 0 || typeof text != 'string') {
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
    // var result = adlam_Latin_to_unicode_map[c];

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

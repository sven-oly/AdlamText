// Fulani (Fulde) virtual keyboard prototype, using Adlam script.
// Craig Cornelius, December 2016
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// TODO: Complete this keyboard definition.

// Unicode output

var FUL_UNICODE_LAYOUT = {
  'id': 'ful',
  'title': '𞤆𞤵𞤤𞤢𞤪/𞤊𞤵𞤤𞤬𞤵𞤤𞤣𞤫',
  'direction': 'rtl',
  'mappings': {
    '': {
      '': '{{\u0640}}' +
	  '{{\uD83A\uDD51}}{{\uD83A\uDD52}}{{\uD83A\uDD53}}{{\uD83A\uDD54}}' +
	   '{{\uD83A\uDD55}}{{\uD83A\uDD56}}{{\uD83A\uDD57}}{{\uD83A\uDD58}}' +
	   '{{\uD83A\uDD59}}{{\uD83A\uDD50}}-=' +
	'{{\uD83A\udd3B}}{{\uD83A\udd31}}{{\uD83A\udd2B}}{{\uD83A\udd2a}}' +
	  '{{\uD83A\udd3c}}{{\uD83A\udd34}}{{\uD83A\udd35}}{{\uD83A\udd2d}}' +
	  '{{\uD83A\udd2e}}{{\uD83A\udd28}}{{\uD83A\udd3d}}{{\uD83A\udd39}}' +
	  '{{}}' +
	'{{\uD83A\udd22}}{{\uD83A\udd27}}{{\uD83A\udd23}}{{\uD83A\udd2c}}' +
	  '{{\uD83A\udd3a}}{{\uD83A\udd38}}{{\uD83A\udd36}}{{\uD83A\udd33}}' +
	  '{{\uD83A\udd24}}\u204f{{\'}}' +
	'{{\uD83A\udd2f}}{{\uD83A\udd30}}{{\uD83A\udd37}}{{\uD83A\udd29}}' +
	  '{{\uD83A\udd26}}{{\uD83A\udd32}}{{\uD83A\udd25}}\u2e41' +
	  '{{.}}{{/}}'
    },
    's': {
      '': '~{{!}}@#$%{{\uD83A\udd48}}&*()_+' +  // OK
      '{{\uD83A\udd19}}{{\uD83A\udd0F}}{{\uD83A\udd09}}{{\uD83A\udd08}}' +
	'{{\uD83A\udd1A}}{{\uD83A\udd12}}{{\uD83A\udd13}}{{\uD83A\udd0B}}' +
	'{{\uD83A\udd0C}}{{\uD83A\udd06}}{{\uD83A\udd1b}}{{\uD83A\udd17}}' +
	'{{|}}' +
      '{{\uD83A\udd00}}{{\uD83A\udd05}}{{\uD83A\udd01}}{{\uD83A\udd0A}}' +
	'{{\uD83A\udd18}}{{\uD83A\udd16}}{{\uD83A\udd14}}{{\uD83A\udd11}}' +
	'{{\uD83A\udd02}}{{:}}{{"}}' +
      '{{\uD83A\udd0D}}{{\uD83A\udd0E}}{{\uD83A\udd15}}{{\uD83A\udd07}}' +
	'{{\uD83A\udd04}}{{\uD83A\udd10}}{{\uD83A\udd03}}{{<}}' +
	'{{>}}{{\u061f}}'
    },
   'c': {  // alt-control
      '': '{{\uD83A\uDD5E}}1234567890^{{}}' +
	'{{\uD83A\udd46}}{{\uD83A\udd47}}{{\uD83A\udd45}}{{\uD83A\udd47}}' +
	  '{{\uD83A\udd48}}{{\uD83A\udd49}}{{\uD83A\udd4a}}{{}}' +
	  '{{}}{{\uD83A\uDD42}}[]\\' +
	  '{{\uD83A\udd44}}{{\uD83A\uDD43}}{{}}{{}}' +
	     '{{}}{{\uD83A\uDD3f}}{{}}{{}}' +
	     '{{}}{{}}{{}}' +
	  '{{\uD83A\uDD41}}{{}}{{}}{{\uD83A\uDD3e}}' +
	     '{{\uD83A\uDD40}}{{}}{{}}{{}}' +
	     '{{}}{{\uD83A\udd5f}}'
    },
   'sc': {  // shift-alt-control
      '': '`{{\uD83A\uDD5e}}€{{\u00be}}¼½†‡·„‚—±' +
	'{{}}{{}}{{}}{{}}' +
	  '{{}}{{}}{{}}{{}}' +
	  '{{}}{{\uD83A\uDD20}}[]\\' +
	  '{{}}{{\uD83A\uDD21}}{{}}{{}}' +
	     '{{}}{{\uD83A\uDD1d}}{{}}{{}}' +
	     '{{}}{{}}{{}}' +
	  '{{\uD83A\uDD1f}}{{}}{{}}{{\uD83A\uDD1c}}' +
	     '{{\uD83A\uDD1e}}{{}}{{}}{{}}' +
	     '{{}}{{?}}'
    },
    'l': {  // caps lock. qwerty
      '': '`1234567890-=' +
	  'qwertyuiop[]\\' +
	  'asdfghjkl;\'' +
	  'zxcvbnm,./'
    },
    'sl': {  // shift-caps lock. QWERTY
      '': '~!@#$%^&*()_+' +
	  'QWERTYUIOP{}|' +
	  'ASDFGHJKL:"' +
	  'ZXCVBNM<>?'
    }
  },
  'transform': {
    '\uD83A\udd00\uD83A\udd00': '\uD83A\udd00\uD83A\udd44',  // Alif lengthener
    '\uD83A\udd00\uD83A\udd22': '\uD83A\udd00\uD83A\udd44',  // Alif lengthener
    '\uD83A\udd22\uD83A\udd22': '\uD83A\udd22\uD83A\udd44',
    '\uD83A\udd22\uD83A\udd00': '\uD83A\udd22\uD83A\udd44',
    '\uD83A\udd09\uD83A\udd09': '\uD83A\udd09\uD83A\udd45',  // Vowel lengthener
    '\uD83A\udd09\uD83A\udd2b': '\uD83A\udd09\uD83A\udd45',
    '\uD83A\udd2b\uD83A\udd2b': '\uD83A\udd2b\uD83A\udd45',
    '\uD83A\udd2b\uD83A\udd09': '\uD83A\udd2b\uD83A\udd45',
    '\uD83A\udd0b\uD83A\udd0b': '\uD83A\udd0b\uD83A\udd45',
    '\uD83A\udd0b\uD83A\udd2d': '\uD83A\udd0b\uD83A\udd45',
    '\uD83A\udd2d\uD83A\udd2d': '\uD83A\udd2d\uD83A\udd45',
    '\uD83A\udd2d\uD83A\udd0b': '\uD83A\udd2d\uD83A\udd45',
    '\uD83A\udd0c\uD83A\udd0c': '\uD83A\udd0c\uD83A\udd45',
    '\uD83A\udd0c\uD83A\udd2e': '\uD83A\udd0c\uD83A\udd45',
    '\uD83A\udd2e\uD83A\udd2e': '\uD83A\udd2e\uD83A\udd45',
    '\uD83A\udd2e\uD83A\udd0c': '\uD83A\udd2e\uD83A\udd45',
    '\uD83A\udd13\uD83A\udd13': '\uD83A\udd13\uD83A\udd45',
    '\uD83A\udd13\uD83A\udd35': '\uD83A\udd13\uD83A\udd45',
    '\uD83A\udd35\uD83A\udd35': '\uD83A\udd35\uD83A\udd45',
    '\uD83A\udd35\uD83A\udd13': '\uD83A\udd35\uD83A\udd45',
    '\uD83A\udd01\uD83A\udd01': '\uD83A\udd01\ud83a\udd46',  // Double consonants CAPS ->
    '\uD83A\udd02\uD83A\udd02': '\uD83A\udd02\ud83a\udd46',  // Constant modifier
    '\uD83A\udd03\uD83A\udd03': '\uD83A\udd03\ud83a\udd46',
    '\uD83A\udd04\uD83A\udd04': '\uD83A\udd04\ud83a\udd46',  // BA
    '\uD83A\udd05\uD83A\udd05': '\uD83A\udd05\ud83a\udd46',
    '\uD83A\udd06\uD83A\udd06': '\uD83A\udd06\ud83a\udd46',
    '\uD83A\udd07\uD83A\udd07': '\uD83A\udd07\ud83a\udd46',
    '\uD83A\udd08\uD83A\udd08': '\uD83A\udd08\ud83a\udd46',
    '\uD83A\udd0a\uD83A\udd0a': '\uD83A\udd0a\ud83a\udd46',
    '\uD83A\udd0a\uD83A\udd0a': '\uD83A\udd0a\ud83a\udd46',
    '\uD83A\udd0d\uD83A\udd0d': '\uD83A\udd0d\ud83a\udd46',
    '\uD83A\udd0e\uD83A\udd0e': '\uD83A\udd0e\ud83a\udd46',
    '\uD83A\udd0f\uD83A\udd0f': '\uD83A\udd0f\ud83a\udd46',
    '\uD83A\udd10\uD83A\udd10': '\uD83A\udd10\ud83a\udd46',
    '\uD83A\udd11\uD83A\udd11': '\uD83A\udd11\ud83a\udd46',
    '\uD83A\udd12\uD83A\udd12': '\uD83A\udd12\ud83a\udd46',
    '\uD83A\udd12\uD83A\udd34': '\uD83A\udd12\ud83a\udd46',
    '\uD83A\udd14\uD83A\udd14': '\uD83A\udd14\ud83a\udd46',
    '\uD83A\udd14\uD83A\udd36': '\uD83A\udd14\ud83a\udd46',
    '\uD83A\udd15\uD83A\udd15': '\uD83A\udd15\ud83a\udd46',
    '\uD83A\udd15\uD83A\udd37': '\uD83A\udd15\ud83a\udd46',
    '\uD83A\udd16\uD83A\udd16': '\uD83A\udd16\ud83a\udd46',
    '\uD83A\udd16\uD83A\udd38': '\uD83A\udd16\ud83a\udd46',
    '\uD83A\udd17\uD83A\udd17': '\uD83A\udd17\ud83a\udd46',
    '\uD83A\udd18\uD83A\udd18': '\uD83A\udd18\ud83a\udd46',
    '\uD83A\udd19\uD83A\udd19': '\uD83A\udd19\ud83a\udd46',
    '\uD83A\udd1a\uD83A\udd1a': '\uD83A\udd1a\ud83a\udd46',
    '\uD83A\udd1b\uD83A\udd1b': '\uD83A\udd1b\ud83a\udd46',
    '\uD83A\udd1c\uD83A\udd1c': '\uD83A\udd1c\ud83a\udd46',
    '\uD83A\udd1d\uD83A\udd1d': '\uD83A\udd1d\ud83a\udd46',
    '\uD83A\udd1e\uD83A\udd1e': '\uD83A\udd1e\ud83a\udd46',
    '\uD83A\udd1f\uD83A\udd1f': '\uD83A\udd1f\ud83a\udd46',
    '\uD83A\udd20\uD83A\udd20': '\uD83A\udd20\ud83a\udd46',
    '\uD83A\udd21\uD83A\udd21': '\uD83A\udd21\ud83a\udd46',

    '\uD83A\udd23\uD83A\udd23': '\uD83A\udd23\ud83a\udd46',  // Lower case
    '\uD83A\udd24\uD83A\udd24': '\uD83A\udd24\ud83a\udd46',
    '\uD83A\udd25\uD83A\udd25': '\uD83A\udd25\ud83a\udd46',
    '\uD83A\udd26\uD83A\udd26': '\uD83A\udd26\ud83a\udd46',
    '\uD83A\udd27\uD83A\udd27': '\uD83A\udd27\ud83a\udd46',
    '\uD83A\udd28\uD83A\udd28': '\uD83A\udd28\ud83a\udd46',
    '\uD83A\udd29\uD83A\udd29': '\uD83A\udd29\ud83a\udd46',
    '\uD83A\udd2a\uD83A\udd2a': '\uD83A\udd2a\ud83a\udd46',
    '\uD83A\udd2c\uD83A\udd2c': '\uD83A\udd2c\ud83a\udd46',
    '\uD83A\udd2f\uD83A\udd2f': '\uD83A\udd2f\ud83a\udd46',
    '\uD83A\udd30\uD83A\udd30': '\uD83A\udd30\ud83a\udd46',
    '\uD83A\udd31\uD83A\udd31': '\uD83A\udd31\ud83a\udd46',
    '\uD83A\udd32\uD83A\udd32': '\uD83A\udd32\ud83a\udd46',
    '\uD83A\udd33\uD83A\udd33': '\uD83A\udd33\ud83a\udd46',
    '\uD83A\udd34\uD83A\udd34': '\uD83A\udd34\ud83a\udd46',
    '\uD83A\udd34\uD83A\udd12': '\uD83A\udd34\ud83a\udd46',
    '\uD83A\udd36\uD83A\udd36': '\uD83A\udd36\ud83a\udd46',
    '\uD83A\udd37\uD83A\udd37': '\uD83A\udd37\ud83a\udd46',
    '\uD83A\udd38\uD83A\udd38': '\uD83A\udd38\ud83a\udd46',
    '\uD83A\udd39\uD83A\udd39': '\uD83A\udd39\ud83a\udd46',
    '\uD83A\udd3a\uD83A\udd3a': '\uD83A\udd3a\ud83a\udd46',
    '\uD83A\udd3b\uD83A\udd3b': '\uD83A\udd3b\ud83a\udd46',
    '\uD83A\udd3c\uD83A\udd3c': '\uD83A\udd3c\ud83a\udd46',
    '\uD83A\udd3d\uD83A\udd3d': '\uD83A\udd3d\ud83a\udd46',
    '\uD83A\udd3e\uD83A\udd3e': '\uD83A\udd3e\ud83a\udd46',
    '\uD83A\udd3f\uD83A\udd3f': '\uD83A\udd3f\ud83a\udd46',
    '\uD83A\udd40\uD83A\udd40': '\uD83A\udd40\ud83a\udd46',
    '\uD83A\udd41\uD83A\udd41': '\uD83A\udd41\ud83a\udd46',
    '\uD83A\udd42\uD83A\udd42': '\uD83A\udd42\ud83a\udd46',
    '\uD83A\udd43\uD83A\udd43': '\uD83A\udd43\ud83a\udd46',

    // Typing letter again undoes the lengthener.
    '\uD83A\udd00\uD83A\udd44\u001d?\ud83a\udd00' : '\uD83A\udd00\ud83a\udd00',
    '\uD83A\udd22\uD83A\udd44\u001d?\ud83a\udd22' : '\uD83A\udd22\ud83a\udd22',
    }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(FUL_UNICODE_LAYOUT);

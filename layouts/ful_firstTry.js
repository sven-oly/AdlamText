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
  'id': 'ful_first',
  'title': 'Adlam for Unicode Unicode - based on QWERTY sounds',
  'direction': 'rtl',
  'mappings': {
    '': {
      '': '{{\u0640}}' +
          '{{\uD83A\uDD51}}{{\uD83A\uDD52}}{{\uD83A\uDD53}}{{\uD83A\uDD54}}' +
           '{{\uD83A\uDD55}}{{\uD83A\uDD56}}{{\uD83A\uDD57}}{{\uD83A\uDD58}}' +
           '{{\uD83A\uDD59}}{{\uD83A\uDD50}}-=' +
        '{{\uD83A\uDD39}}{{\uD83A\uDD31}}{{\uD83A\uDD2B}}{{\uD83A\uDD2A}}' +
	      '{{\uD83A\uDD3C}}{{\uD83A\uDD34}}{{\uD83A\uDD35}}{{\uD83A\uDD2D}}' +
	      '{{\uD83A\uDD2E}}{{\uD83A\uDD28}}[]\\' +
        '{{\uD83A\uDD22}}{{\uD83A\uDD27}}{{\uD83A\uDD23}}{{\uD83A\uDD2C}}' +
	      '{{\uD83A\uDD3A}}{{\uD83A\uDD38}}{{\uD83A\uDD36}}{{\uD83A\uDD33}}' +
	      '{{\uD83A\uDD24}}' + ';\'' +
        '{{\uD83A\uDD41}}{{\uD83A\uDD3F}}{{}}' +
          '{{\uD83A\uDD3E}}{{\uD83A\uDD26}}{{\uD83A\uDD32}}{{\uD83A\uDD25}}' +
          ',./'
    },
    's': {
      '': '{{\u0640}}{{\uD83A\uDD5E}}{{\uD83A\uDD44}}{{\uD83A\uDD45}}' +
        '{{\uD83A\uDD46}}{{\uD83A\uDD47}}{{\uD83A\uDD48}}{{\uD83A\uDD49}}' +
        '{{\uD83A\uDD4A}}' +
        '()_+' +
      '{{\uD83A\uDD17}}{{\uD83A\uDD0F}}{{\uD83A\uDD09}}{{\uD83A\uDD08}}' +
	    '{{\uD83A\uDD1A}}{{\uD83A\uDD12}}{{\uD83A\uDD13}}{{\uD83A\uDD0B}}' +
	    '{{\uD83A\uDD0C}}{{\uD83A\uDD06}}{}|' +
      '{{\uD83A\uDD00}}{{\uD83A\uDD05}}{{\uD83A\uDD01}}{{\uD83A\uDD0A}}' +
	    '{{\uD83A\uDD18}}{{\uD83A\uDD16}}{{\uD83A\uDD14}}{{\uD83A\uDD11}}' +
	    '{{\uD83A\uDD02}}:"' +
      '{{\uD83A\uDD1F}}{{\uD83A\uDD1D}}{{}}' +
	    '{{\uD83A\uDD1c}}{{\uD83A\uDD04}}{{\uD83A\uDD10}}{{\uD83A\uDD03}}<>' +
	    '{{\uD83A\uDD5F}}'
    },
   'c': {  // alt-control
      '': '`{{¡}}@#$%^&*()_+' +
        '{{}}{{}}{{}}{{}}{{}}' +
          '{{\uD83A\uDD30}}{{}}{{}}' +
          '{{}}{{}}{}\\' +
	  '{{}}{{\uD83A\uDD43}}{{\uD83A\uDD2F}}{{}}' + 
	     '{{\uD83A\uDD40}}{{}}{{}}' +
	     '{{\uD83A\uDD42}}{{}}{{}}{{}}' +
	  '{{}}{{}}{{\uD83A\uDD37}}{{}}' +
	     '{{\uD83A\uDD29}}{{\uD83A\uDD3b}}{{\uD83A\uDD3d}}{{}}{{}}{{}}'
    },
   'sc': {  // shift-alt-control
      '': '~/€{{\u00be}}¼½†‡·„‚—±' +
        '{{}}{{}}{{}}{{}}{{}}' +
          '{{\uD83A\uDD0E}}{{}}{{}}' +
          '{{}}{{}}{}\\' +
	  '{{}}{{\uD83A\uDD21}}{{\uD83A\uDD0D}}{{}}' + 
	     '{{\uD83A\uDD1E}}{{}}{{}}' +
	     '{{\uD83A\uDD20}}{{}}{{}}{{}}' +
	  '{{}}{{}}{{\uD83A\uDD15}}{{}}' +
	     '{{\uD83A\uDD07}}{{\uD83A\uDD19}}{{\uD83A\uDD1B}}{{}}{{}}{{}}'
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
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(FUL_UNICODE_LAYOUT);

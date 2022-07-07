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


var AR_LAYOUT = {
  'id': 'ar',
  'title': 'Arabic',
  'mappings': {
    ',c': {
      '': '\u0630\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660-=' +
         '\u0636\u0635\u062B\u0642\u0641\u063A\u0639\u0647\u062E\u062D\u062C\u062F\\' +
          '\u0634\u0633\u064A\u0628\u0644\u0627\u062A\u0646\u0645\u0643\u0637' +
          '\u0626\u0621\u0624\u0631{{\u0644\u0627}}\u0649\u0629\u0648\u0632\u0638'
    },
    's,sc': {
      '': '\u0651!@#$%^&*()_+' +
          '\u064E\u064B\u064F\u064C{{\u0644\u0625}}\u0625\u2018\u00F7\u00D7\u061B\u003C\u003E\u007C' +
           '\u0650\u064D[]{{\u0644\u0623}}\u0623\u0640\u060C\u002F\u003A\"' +
          '\u007E\u0652{}' + '{{\u0644\u0622}}\u0622\u2019\u002C\u002E\u061F'
    },
    'l,cl': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:\"\'' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(AR_LAYOUT);
ar = AR_LAYOUT;
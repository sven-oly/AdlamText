#!/usr/bin/ python3

# 22-June-2024. Converted to Python3 and Flask

from flask import Flask, render_template, stream_with_context, request, Response, send_file

# from userDB import getUserInfo

import json
import logging
import os
import sys
import urllib


import adlam
import convert


# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)


fontList = ['Noto Sans Adlam 2019', 'Noto Sans Adlam 2019 Bold', 'Noto Sans Adlam 2017',  'Adlam CWC', 'Aissata Unicode', 'Noto Sans Adlam Unjoined', 'Pulaar Unicode']
oldFontsList = ['Aissata Arabic', 'Fuuta Arabic', 'Pulaar Arabic']

LanguageCode = 'adlam'

unicode_font_list = [
  {'family': 'NotoSansAdlamApril',
   'longName': 'Noto Sans Adlam 2020 (joined)',
   'source': '/fonts/April2020/NotoSansAdlamNew-Regular.ttf',
   },
  {'family': 'NotoSansAdlamBoldApril',
   'longName': 'Noto Sans Adlam 2020 bold (joined)',
   'source': '/fonts/April2020/NotoSansAdlamNew-Bold.ttf',
   },
  {
    'family': 'MSAdlamDisplay',
    'longName': 'MS Adlam Display',
    'source': '/fonts/Fulfulde/ADLaMDisplay-Regular.ttf',
  },
  { 'family': 'NotoSansAdlam2019',
    'longName': 'Noto Sans Adlam 2019 (joined)',
    'source': '/fonts/new/NotoSansAdlamNew-Regular.ttf',
  },
  { 'family': 'NotoSansAdlamBold2019UnJoined',
    'longName': 'Noto Sans Adlam 2019 (unjoined)',
    'source': '/fonts/new/NotoSansAdlamUnjoinedNew-Regular.ttf',
  },
  { 'family': 'NotoSansAdlam2019Bold',
    'longName': 'Noto Sans Adlam Bold 2019 (joined)',
    'source': '/fonts/new/NotoSansAdlamNew-Bold.ttf',
  },
  { 'family': 'NotoSansAdlam2010UnjoinedBold',
    'longName': 'Noto Sans Adlam 2019 (unjoined)',
    'source': '/fonts/new/NotoSansAdlamUnjoinedNew-Bold.ttf',
  },
  { 'family': 'NotoSansAdlam2017',
    'longName': 'Noto Sans Adlam 2017 (joined)',
    'source': '/fonts/NotoSansAdlam-Regular.ttf',
  },
  { 'family': 'NotoSansAdlam2017extended',
    'longName': 'Noto Sans Adlam 2017 (unjoined)',
    'source': '/fonts/NotoSansAdlamUnjoined-Regular.ttf',
  },
  { 'family': 'AissataUnicode',
    'longName': 'Aissata Unicode',
    'source': '/fonts/Fulfulde - Aissata.ttf'
  },
  {'family': 'PulaarUnicode',
   'longName': 'Pulaar Unicode',
   'source': '/fonts/Fulfulde-PulaarUnicode.ttf'
   }
]

encoding_font_list = [
    {
      'font_path':'/fonts/Fulfulde-PulaarUnicode.ttf',
      'font_name':'Aissata',
      'display_name': 'Aissata',
    },
  {
    'font_path': '/fonts/extendedNotoSansAdlam-Regular.ttf',
    'font_name': 'Latin',
    'display_name': 'Latin',
  },
  ]

# List of the individual javascript converters.
converters = [
  '/static/js/adlamConverterArabic.js',
  '/static/js/adlamConverterLatin.js',
]

kb_list = [
  {'shortName': 'ff_adlam',
   'longName': 'Fulfulde Adlam'
  },
]

links = [
  {
    'target': '/',
    'text': 'Main',
    'ref': '/',
    'linkText': 'Main',
  },
  {
    'target': '/keyboard/',
    'text': 'Keyboard',
    'ref': '/keyboard/',
    'linkText': 'Keyboard',
  },
  {
    'target': '/convert/',
    'text': 'Convert text',
    'ref': '/convert/',
    'linkText': 'Convert text',
},
  {
    'target': 'http://www.unicode.org/charts/PDF/U1E900.pdf',
    'text': 'Adlam Unicode',
    'ref': 'http://www.unicode.org/charts/PDF/U1E900.pdf',
    'linkText': 'Adlam Unicode'
},
  {
    'target': 'http://www.unicode.org/L2/L2014/14219r-n4628-adlam.pdf',
    'text': 'Unicode Proposal',
    'ref': 'http://www.unicode.org/L2/L2014/14219r-n4628-adlam.pdf',
    'linkText': 'Unicode Proposal'
},
  {
    'target': 'https://www.theatlantic.com/technology/archive/2016/11/the-alphabet-that-will-save-a-people-from-disappearing/506987/',
    'text': 'Atlantic Adlam article',
    'ref': 'https://www.theatlantic.com/technology/archive/2016/11/the-alphabet-that-will-save-a-people-from-disappearing/506987/',
    'linkText': 'Atlantic Adlam article'
},
{'target': 'https://www.loc.gov/catdir/cpso/romanization/adlam37.pdf',
 'text': 'Adlam romanization',
 'linkText': 'Adlam romanization',
 'ref': 'https://www.loc.gov/catdir/cpso/romanization/adlam37.pdf',
  },
  {
    'text': 'Adlam to Latin transliteration',
    'target': 'https://www.loc.gov/catdir/cpso/romanization/adlam37.pdf',
    'linkText': 'Adlam to Latin transliteration',
    'ref': 'https://www.loc.gov/catdir/cpso/romanization/adlam37.pdf',
    },
]

Language = "Fulfulde"
# TODO: Fill this in with RTL
Language_native = ''

Script = "Adlam"

class langInfo():
  def __init__(self):
    self.LanguageCode = 'ff'
    self.Language = 'Fulfulde'
    self.Language_native = u'Pular'
    self.lang_list = ['ff']

    if sys.maxunicode >= 0x10000:
      self.diacritic_list = [chr(x) for x in range(0x1E944, 0x1E94B)]
      self.base_consonant = chr(0x1e900)
    else:
      self.diacritic_list = [chr(0xd83a) + chr(0xdd00 + x) for x in range(0x44, 0x4b)]
      self.base_consonant = u'\ud83a\udd0e'

    self.encoding_font_list = encoding_font_list

    self.kb_list = kb_list
    self.links = links

    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    # For dictionary
    self.dictionaryLang1 = "English"
    self.dictionaryLang2 = self.Language
    self.kb1 = 'en'
    self.kb2 = self.kb_list[0]['shortName']

    self.dictionaryNData = [
      {'langName': self.Language, 'kbShortName': 'ful', 'kbLongName': 'Fulfulde',
       'languageCode': 'ff',
       'direction': 'rtl',
       'font': { 'family': 'NotoSansAdlam',
         'longName': 'Noto Sans Adlam',
         'source': '/fonts/April2020/NotoSansAdlamNew-Regular.ttf'},
      },
      {'langName': 'English', 'kbShortName': 'en', 'kbLongName': 'English',
       'languageCode': 'en',
       'font': {'family': 'NotoSansLatin',
                'longName': 'Noto Sans',
                'source': '/fonts/NotoSans-Regular.ttf'
                },
       'helptext': 'Instructions'
       },
      {'langName': 'Arabic', 'kbShortName': 'ar', 'kbLongName': 'Arabic',
       'languageCode': 'ar',
       'direction': 'rtl',
       'font': {'family': 'NotoSansArabic',
                'longName': 'Noto Sans Arabic UI',
                'source': '/fonts/NotoSansArabicUI-Regular.ttf'
                },
       'helptext': 'Instructions'
       },
    ]

class adlamCharData():
  def __init__(self, v):
    self.charcode = v
    self.charType = ''
    self.charName = ''
    if v in adlam.adlamProperties:
      self.charType = adlam.adlamProperties[v][1]
      self.charName = adlam.adlamProperties[v][0].replace("ADLAM ", "").replace("LETTER ", "").lower()

    # Handle small and large character spaces.
    caseOffset = 0x22
    if self.charType == "Ll":
      caseOffset = -caseOffset

    self.hextext = '%x' % v
    if sys.maxunicode <= 65535:
      # UTF-16: \uD83A\uDD1A
      if self.charType == 'Mn':
        # Punctuation
        self.unicodeChar =  chr(0x20) + chr(0xa0) + chr(v - 0x1e900 + 0xDD00) + ' '
      else:
        self.unicodeChar = chr(0xd83a) + chr(v - 0x1e900 + 0xDD00) + ' '
      self.otherCase = chr(0xd83a) + chr(v - 0x1e900 + 0xDD00 + caseOffset) + ' '
    else:
      if self.charType == 'Mn':
        self.unicodeChar =  chr(0x20) + chr(0xa0) + chr(v)
      else:
        self.unicodeChar = chr(v)
      self.otherCase = chr(v + caseOffset)

    self.asciiCode = 0
    if v in convert.reverseConvert:
      self.pulaarCode = convert.reverseConvert[v]
    else:
      if v - 0x22 in convert.reverseConvert:
        self.pulaarCode = convert.reverseConvert[v - 0x22];  # For lower case
      else:
        self.pulaarCode = 0
    self.pulaarHex = '%x' % self.pulaarCode
    self.pulaarChar = chr(self.pulaarCode)

    if self.charType == 'Lu' or self.charType == 'Ll':
      self.isLetter = True
      self.mixedCase = self.unicodeChar + self.otherCase + self.otherCase
    else:
      self.isLetter = False
      self.mixedCase = self.unicodeChar

# Unicode characters for Adlam
ranges = [*range(0x1e900, 0x1e94b)]
ranges.extend(range(0x1e950, 0x1e95a))
ranges.extend(range(0x1e95e, 0x1e960))

@app.route('/')
def MainHandler():
  # user_info = getUserInfo(self.request.url)
  # user = users.get_current_user()

  adlamText= ''
  for index in (ranges):
    if sys.maxunicode <= 65535:
      # UTF-16: \uD83A\uDD1A
      adlamText +=chr(0xd83a) + chr(index - 0x1e900 + 0xDD00) + ' '
    else:
      adlamText += chr(index) + ' '
          
  return  render_template(
    'index.html',
    fontFamilies = fontList,
    adlamText = adlamText,
    links = links,
    # user_nickname = user_info[1],
    # user_logout = user_info[2],
    # user_login_url = user_info[3],
    # editOrAdmin = user_info[4],
    unicodeFonts = unicode_font_list
  )


@app.route('/keyboard/')
def KeyboardHandler():
  #user = users.get_current_user()
  #user_info = getUserInfo(self.request.url)

  return render_template(
    'keyboard.html',
    fontFamilies = fontList,
    # user_nickname = user_info[1],
    # user_logout = user_info[2],
    # user_login_url = user_info[3],
    # editOrAdmin = user_info[4],
    unicodeFonts = unicode_font_list,
    links = links
    )


@app.route('/convert/')
def ConvertHandler():
    return render_template(
      'words.html',
      fontFamilies = fontList,
      keylayouts = ['ful'],
      oldFontFamilies = oldFontsList,
      unicodeFonts = unicode_font_list,
      converterJS = '/static/js/' + LanguageCode + 'Converter.js',
      language = Language,
      encoding_list = encoding_font_list,
      unicode_list = unicode_font_list,
      kb_list = kb_list,
      links = links,
      converters = converters,
    )

 
if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True, threaded=True)
# [END gae_python37_app]
 

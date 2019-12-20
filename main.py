#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
from userDB import getUserInfo

import json
import logging
import os
import urllib
import webapp2
import sys

import adlam
import convert

#from fpdf import FPDF

from google.appengine.api import users

from google.appengine.ext.webapp import template

fontList = ['Noto Sans Adlam 2019', 'Noto Sans Adlam 2017',  'Adlam CWC', 'Aissata Unicode', 'Noto Sans Adlam Unjoined', 'Pulaar Unicode']
oldFontsList = ['Aissata Arabic', 'Fuuta Arabic', 'Pulaar Arabic']

LanguageCode = 'adlam'

unicode_font_list = [
  { 'family': 'Noto Sans Adlam 2019',
    'longName': 'Noto Sans Adlam 2019 (joined)',
    'source': '/fonts/fonts2019/NotoSansAdlam-Regular.ttf',
  },
  { 'family': 'Noto Sans Adlam 2019',
    'longName': 'Noto Sans Adlam 2019 (unjoined)',
    'source': '/fonts/fonts2019/NotoSansAdlamUnjoined-Regular.ttf',
  },
  { 'family': 'Noto Sans Adlam',
    'longName': 'Noto Sans Adlam Bold 2019 (joined)',
    'source': '/fonts/fonts2019/NotoSansAdlam-Bold.ttf',
  },
  { 'family': 'Noto Sans Adlam',
    'longName': 'Noto Sans Adlam Bold 2019 (unjoined)',
    'source': '/fonts/fonts2019/NotoSansAdlamUnjoined-Bold.ttf',
  },
  { 'family': 'Noto Sans Adlam 2017',
    'longName': 'Noto Sans Adlam 2017 (joined)',
    'source': '/fonts/NotoSansAdlam-Regular.ttf',
  },
  { 'family': 'Noto Sans Adlam 2017 extended',
    'longName': 'extended Noto Sans Adlam 2017 (includes ASCII, etc)',
    'source': '/fonts/extendedNotoSansAdlam-Regular.ttf',
  },
  { 'family': 'Aissata Unicode',
    'longName': 'Aissata Unicode',
    'source': '/fonts/Fulfulde - Aissata.ttf'
  },
  {'family': 'Pulaar Unicode',
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
  '/js/adlamConverterArabic.js',
  '/js/adlamConverterLatin.js',
]

kb_list = []

links = []

Language = "Fulfulde"
# TODO: Fill this in with RTL
Language_native = ''

Script = "Adlam"

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
        self.unicodeChar =  unichr(0x20) + unichr(0xa0) + unichr(v - 0x1e900 + 0xDD00) + ' '
      else:
        self.unicodeChar = unichr(0xd83a) + unichr(v - 0x1e900 + 0xDD00) + ' '
      self.otherCase = unichr(0xd83a) + unichr(v - 0x1e900 + 0xDD00 + caseOffset) + ' '
    else:
      if self.charType == 'Mn':
        self.unicodeChar =  unichr(0x20) + unichr(0xa0) + unichr(v)
      else:
        self.unicodeChar = unichr(v)
      self.otherCase = unichr(v + caseOffset)

    self.asciiCode = 0
    if v in convert.reverseConvert:
      self.pulaarCode = convert.reverseConvert[v]
    else:
      if v - 0x22 in convert.reverseConvert:
        self.pulaarCode = convert.reverseConvert[v - 0x22];  # For lower case
      else:
        self.pulaarCode = 0
    self.pulaarHex = '%x' % self.pulaarCode
    self.pulaarChar = unichr(self.pulaarCode)

    if self.charType == 'Lu' or self.charType == 'Ll':
      self.isLetter = True
      self.mixedCase = self.unicodeChar + self.otherCase + self.otherCase
    else:
      self.isLetter = False
      self.mixedCase = self.unicodeChar

# Unicode characters
ranges = range(0x1e900, 0x1e94b)
ranges.extend(range(0x1e950, 0x1e95a))
ranges.extend(range(0x1e95e, 0x1e960))

class MainHandler(webapp2.RequestHandler):
    def get(self):
      user_info = getUserInfo(self.request.url)
      user = users.get_current_user()

      adlamText= ''
      for index in (ranges):
        if sys.maxunicode <= 65535:
          # UTF-16: \uD83A\uDD1A
          adlamText +=unichr(0xd83a) + unichr(index - 0x1e900 + 0xDD00) + ' '
        else:
          adlamText += unichr(index) + ' ' 

      template_values = {
        'fontFamilies': fontList,
        'adlamText': adlamText,
        'user_nickname': user_info[1],
        'user_logout': user_info[2],
        'user_login_url': user_info[3],
        'editOrAdmin': user_info[4],
      }
      path = os.path.join(os.path.dirname(__file__), 'index.html')
      self.response.out.write(template.render(path, template_values))


class KeyboardHandler(webapp2.RequestHandler):
    def get(self):
      user = users.get_current_user()
      user_info = getUserInfo(self.request.url)

      template_values = {
        'fontFamilies': fontList,
        'user_nickname': user_info[1],
        'user_logout': user_info[2],
        'user_login_url': user_info[3],
        'editOrAdmin': user_info[4],
      }
      path = os.path.join(os.path.dirname(__file__), 'keyboard.html')
      self.response.out.write(template.render(path, template_values))

# Show data from word list converted for human verification
class WordHandler(webapp2.RequestHandler):
    def get(self):
      user = users.get_current_user()
      user_info = getUserInfo(self.request.url)
      template_values = {'fontFamilies': fontList,
        'oldFontFamilies': oldFontsList,
        'keylayouts': ['ful'],
      }
      path = os.path.join(os.path.dirname(__file__), 'words.html')
      self.response.out.write(template.render(path, template_values))

class Download(webapp2.RequestHandler):
    def get(self):
        infile = self.request.get("infile", "")
        outfile = self.request.get("outfile", "")
        template_values = {
          'infile': infile,
          'outfile': outfile,
          'language': Language,
        }

        path = os.path.join(os.path.dirname(__file__), 'downloads.html')
        self.response.out.write(template.render(path, template_values))


# Run tests to verify converted data
class ConvertTestHandler(webapp2.RequestHandler):

  def get(self):
    user = users.get_current_user()
    user_info = getUserInfo(self.request.url)
    template_values = {'fontFamilies': fontList,
      'editOrAdmin': user_info[4],
      'oldFontFamilies': oldFontsList,
    }
    path = os.path.join(os.path.dirname(__file__), 'convertTest.html')
    self.response.out.write(template.render(path, template_values))


# Show data from word list converted for human verification
class DownloadHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {
          'language': Language,
          'language_native': Language_native,
          'unicode_font_list': unicode_font_list,
      }
      path = os.path.join(os.path.dirname(__file__), 'downloads.html')
      self.response.out.write(template.render(path, template_values))


# Test creating PDF file
class tryPDFHandler(webapp2.RequestHandler):
  def get(self):
    user = users.get_current_user()
    user_info = getUserInfo(self.request.url)

    logging.info('PDFFFFFFFF: tryPDFHandler')
    #pdf = FPDF()
    #outfilename = 'testAdlam.pdf'
    #logging.info('  **** pdf obj = %s' % pdf)
    #pdf.add_page()
    #pdf.set_font('Arial', 'B', 16)
    #pdf.cell(40, 10, 'Hello Adlam!')
    #logging.info('  pdf = %s' % pdf)
    #pdf.set_font('Noto Sans Adlam', 'R', 18)
    pdfResult = 'test'
    #pdfResult = pdf.output(outfilename, 'S')
    #pdf.close()
    logging.info('  pdfResult = %s' % pdfResult)
    self.response.headers['Content-Type'] = 'application/pdf'
    self.response.headers['Content-Disposition'] = 'attachment; filename=testAdlam.pdf'
    self.response.out.write(pdfResult)

class EncodingRules(webapp2.RequestHandler):
  def get(self):

    template_values = {
        'converterJS': '/js/' + LanguageCode + 'Converter.js',
        'language': Language,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'kb_list': kb_list,
        'links': links,
      'converters': converters,
    }
    path = os.path.join(os.path.dirname(__file__), 'fontsView.html')
    self.response.out.write(template.render(path, template_values))

class FontCompareHandler(webapp2.RequestHandler):
  def get(self):

    sortType = self.request.get('sort', 'interleave')
    privateDir = self.request.get('privateDir', None)
    privateFile = self.request.get('privateFile', None)
    logging.info('Private dir and file = %s/%s' % (privateDir, privateFile))

    charData = []
    if sortType == 'interleave':
      adlamCodeList = adlam.adlamAlphaInterleave()
    else:
      adlamCodeList = adlam.adlamByCodepoint()

    for r in adlamCodeList:
      charInfo = adlamCharData(r)
      charData.append(charInfo)

    template_values = {
        'converterJS': '/js/' + LanguageCode + 'Converter.js',
        'language': Language,
        'encoding_list': encoding_font_list,
        'unicode_list': unicode_font_list,
        'links': links,
        'charData': charData,  ## The characters
        'converters': converters,
        'encoding_fonts': encoding_font_list,
        'unicode_fonts': unicode_font_list,
        'stdBase': '/img/StdFont_',
        'proposedBase': '/img/EbrimaFont_',
        'privateDir': privateDir,
    }
    if privateDir and privateFile:
      path = os.path.join(os.path.dirname(__file__), privateDir, privateFile)
      path = os.path.join(os.path.dirname(__file__), privateFile)
      logging.info('**** path = %s' % path)
    else:
      path = os.path.join(os.path.dirname(__file__), 'fontCompare.html')
    self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/keyboard/', KeyboardHandler),
    ('/fontCompare/', FontCompareHandler),
    ('/downloads/', DownloadHandler),
    ('/encodingrules/', EncodingRules),
    ('/words/', WordHandler),
    ('/convertTest/', ConvertTestHandler),

    ('/tryPDF/', tryPDFHandler),

], debug=True)

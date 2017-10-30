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

#from fpdf import FPDF

from google.appengine.api import users

from google.appengine.ext.webapp import template

fontList = ['Noto Sans Adlam',  'Adlam CWC', 'Aissata Unicode', 'Noto Sans Adlam Unjoined', 'Pulaar Unicode']
oldFontsList = ['Aissata Arabic', 'Fuuta Arabic', 'Pulaar Arabic']

unicode_font_list = [
  { 'family': 'Noto Sans Adlam',
    'longName': 'Noto Sans Adlam (joined)',
    'source': '/fonts/NotoSansAdlam-Regular.ttf',
  },
  { 'family': 'Noto Sans Adlam',
    'longName': 'extended Noto Sans Adlam (includes ASCII, etc)',
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

Language = "Fulfulde"
# TODO: Fill this in with RTL
Language_native = ''

Script = "Adlam"


class MainHandler(webapp2.RequestHandler):
    def get(self):
      user_info = getUserInfo(self.request.url)
      user = users.get_current_user()

      adlamText= ''
      ranges = range(0x1e900, 0x1e94b)
      ranges.extend(range(0x1e950, 0x1e95a))
      ranges.extend(range(0x1e95e, 0x1e960))
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


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/keyboard/', KeyboardHandler),
    ('/downloads/', DownloadHandler),
    ('/words/', WordHandler),
    ('/convertTest/', ConvertTestHandler),

    ('/tryPDF/', tryPDFHandler),

], debug=True)

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
import json
import logging
import os
import urllib
import webapp2
import sys

#from fpdf import FPDF

from google.appengine.ext.webapp import template

fontList = ['Noto Sans Adlam',  'Adlam CWC', 'Aissata Unicode', 'Noto Sans Adlam Unjoined']
oldFontsList = ['Aissata Arabic', 'Fuuta Arabic', 'Pulaar Arabic']

Language = "Fulfulde"
Script = "Adlam"


class MainHandler(webapp2.RequestHandler):
    def get(self):
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
        
      template_values = {'fontFamilies': fontList,
        'adlamText': adlamText,
      }
      path = os.path.join(os.path.dirname(__file__), 'index.html')
      self.response.out.write(template.render(path, template_values))


class KeyboardHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {'fontFamilies': fontList,
      }
      path = os.path.join(os.path.dirname(__file__), 'keyboard.html')
      self.response.out.write(template.render(path, template_values))

# Show data from word list converted for human verification
class WordHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {'fontFamilies': fontList,
        'oldFontFamilies': oldFontsList,
        'keylayouts': ['ful'],
      }
      path = os.path.join(os.path.dirname(__file__), 'words.html')
      self.response.out.write(template.render(path, template_values))


# Run tests to verify converted data
class ConvertTestHandler(webapp2.RequestHandler):
    def get(self):
      template_values = {'fontFamilies': fontList,
        'oldFontFamilies': oldFontsList,
      }
      path = os.path.join(os.path.dirname(__file__), 'convertTest.html')
      self.response.out.write(template.render(path, template_values))

# Test creating PDF file
class tryPDFHandler(webapp2.RequestHandler):
  def get(self):
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
#    ('/', KeyboardHandler),
    ('/keyboard/', KeyboardHandler),
    ('/words/', WordHandler),
    ('/convertTest/', ConvertTestHandler),

    ('/tryPDF/', tryPDFHandler),

], debug=True)

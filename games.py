# -*- coding: utf-8 -*-
#!/usr/bin/env python
#

import re
import main

import wordsearch

from userDB import getUserInfo

import userDB

import json
import logging
import os
import urllib
import webapp2

from google.appengine.api import users
from google.appengine.ext.webapp import template


class WordSearchHandler(webapp2.RequestHandler):
  def get(self):
    logging.info('games WordSearchHandler')

    user_info = getUserInfo(self.request.url)
    user = users.get_current_user()
    rawWordList = self.request.get('words', '')

    #wordList = re.findall(r"[\w']+", rawWordList)
    #logging.info('games WordSearchHandler wordList = %s' % wordList)
    #grid, answers, words = wordsearch.generateWordsGrid(wordList)

    #logging.info('games WordSearchHandler grid = %s' % grid)
    #logging.info('games WordSearchHandler answers = %s' % answers)
    #logging.info('games WordSearchHandler words = %s' % words)

    template_values = {
      'user_nickname': user_info[1],
      'user_logout': user_info[2],
      'user_login_url': user_info[3],
      'language': main.Language,
      'fontFamilies': main.unicode_font_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'wordsearch.html')
    self.response.out.write(template.render(path, template_values))


class GenerateWordSearchHandler(webapp2.RequestHandler):
  def get(self):
    #logging.info('games GenerateWordSearchHandler')
    user_info = getUserInfo(self.request.url)
    user = users.get_current_user()

    rawWordList = self.request.get('words', '')
    # logging.info('games WordSearchHandler rawWordList = %s' % rawWordList)


    wordList = rawWordList.replace(",", " ").replace("\r", " ").replace("\t", " ").split()
    # logging.info('games WordSearchHandler wordList = %s' % wordList)

    grid, answers, words, grid_width = wordsearch.generateWordsGrid(wordList)

    if not grid:
      message = 'Cannot create grid'
    else:
      message = 'Created a grid of size %s' % grid_width

    #logging.info('games WordSearchHandler grid = %s' % grid)
    #logging.info('games WordSearchHandler answers = %s' % answers)
    #logging.info('games WordSearchHandler words = %s' % words)

    template_values = {
      'user_nickname': user_info[1],
      'user_logout': user_info[2],
      'user_login_url': user_info[3],
      'language': main.Language,
      'fontFamilies': main.unicode_font_list,
      'grid': grid,
      'answers': answers,
      'words': words,
      'grid_width': grid_width,
    }
    self.response.out.write(json.dumps(template_values))


class CrosswordHandler(webapp2.RequestHandler):
  def get(self):
    logging.info('games CrosswordHandler')

    user_info = getUserInfo(self.request.url)
    user = users.get_current_user()

    template_values = {
      'user_nickname': user_info[1],
      'user_logout': user_info[2],
      'user_login_url': user_info[3],
      'language': main.Language,
      'fontFamilies': main.unicode_font_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'crossword.html')
    self.response.out.write(template.render(path, template_values))


class GenerateCrosswordHandler(webapp2.RequestHandler):
  def get(self):
    logging.info('games GenerateCrosswordHandler')
    user_info = getUserInfo(self.request.url)
    user = users.get_current_user()

    rawWordList = self.request.get('words', '')
    logging.info('games CrossWordHandler rawWordList = %s' % rawWordList)

    wordList = rawWordList.replace(",", " ").replace("\r", " ").replace("\t", " ").split()
    logging.info('games CrossWordHandler wordList = %s' % wordList)
    logging.info('games CrossWordHandler CALLING')

    grid, answers, words, grid_width = wordsearch.generateCrosswordsGrid(wordList)

    if not grid:
      message = 'Cannot create grid'
    else:
      message = 'Created a grid of size %s' % grid_width

    logging.info('games WordSearchHandler grid = %s' % grid)
    logging.info('games WordSearchHandler answers = %s' % answers)
    logging.info('games WordSearchHandler words = %s' % words)

    template_values = {
      'user_nickname': user_info[1],
      'user_logout': user_info[2],
      'user_login_url': user_info[3],
      'language': main.Language,
      'fontFamilies': main.unicode_font_list,
      'grid': grid,
      'answers': answers,
      'words': words,
      'grid_width': grid_width,
    }
    self.response.out.write(json.dumps(template_values))


class TestHandler(webapp2.RequestHandler):
  def get(self):
    logging.info('games TestHandler')

app = webapp2.WSGIApplication([
    ('/games/wordsearch/', WordSearchHandler),
    ('/games/crossword/', CrosswordHandler),
    ('/games/generatewordsearch/', GenerateWordSearchHandler),
    ('/games/generatecrossword/', GenerateCrosswordHandler),
    ('/games/test/', TestHandler),
], debug=True)

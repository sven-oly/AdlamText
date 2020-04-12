# -*- coding: utf-8 -*-
#!/usr/bin/env python

import main
from userDB import getUserInfo

import csv
import json
import logging
import os
import StringIO

import urllib
import webapp2

from google.appengine.api import users

# Help from http://nealbuerger.com/2013/12/google-app-engine-import-csv-to-datastore/
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.ext import db
from google.appengine.ext.webapp import template

# dbName will allow multiple sets of information to be stored and retrieved by that
# value. Added 14-Mar-2017

class PhraseDB(db.Model):
  index = db.IntegerProperty()
  dbName = db.StringProperty(u'')
  lastUpdate = db.DateTimeProperty(auto_now=True, auto_now_add=True)
  englishPhrase = db.StringProperty(multiline=True)
  frenchPhrase = db.StringProperty(multiline=True)
  phraseLatin = db.StringProperty(u'')
  phraseArabic = db.StringProperty(u'')
  phraseUnicode = db.StringProperty(u'')  # This is the main data in the language.
  definitionUnicode = db.StringProperty(u'')
  status = db.StringProperty('')
  comment = db.StringProperty('')
  reference = db.StringProperty('')  # Reference number or other identifier

  # Pointing to sound files by URL:
  soundFemaleLink = db.TextProperty('')
  soundMaleLink = db.TextProperty('')
  soundLinks = db.ListProperty(str, verbose_name='sound_files', default=[])


# The set of registered db names.
class DbName(db.Model):
  dbName = db.StringProperty(u'')
  lastUpdate = db.DateTimeProperty(auto_now=True, auto_now_add=True)
  default = db.StringProperty(u'')
  isTestDB = db.StringProperty('')


# Sound file info uploaded.
class UserSound(db.Model):
  lastUpdate = db.DateTimeProperty(auto_now=True, auto_now_add=True)
  user = db.StringProperty('')
  blob_key = db.StringProperty('')


# Show data from word list converted for human verification
class WordConvert(webapp2.RequestHandler):
  def get(self):
    user_info = getUserInfo(self.request.url)
    template_values = {'fontFamilies': main.fontList,
      'oldFontFamilies': main.oldFontsList,
      'keylayouts': ['ful'],
      'editOrAdmin': user_info[4],
    }
    template_values = {
      'fontFamilies': main.fontList,
      'keylayouts': ['ful'],
      'links': main.links,
      'oldFontFamilies': main.oldFontsList,
      'user_nickname': user_info[1],
      'user_logout': user_info[2],
      'user_login_url': user_info[3],
      'editOrAdmin': user_info[4],
      'unicodeFonts': main.unicode_font_list,
    }
    path = os.path.join(os.path.dirname(__file__), 'words.html')
    self.response.out.write(template.render(path, template_values))


# Retrieves data at a given index and dbName via AJAX.
class GetWordsHandler(webapp2.RequestHandler):
  def post(self):
    self.response.headers['Content-Type'] = 'text/plain'

    print 'GetWordsHandler received.'
    self.response.out.write('GetWordsHandler received.\n')

  def get(self):

    #logging.info('GetWordsHandler called')
    user_info = getUserInfo(self.request.url)
    index = int(self.request.get('index', '1'))
    filterStatus = self.request.get('filterStatus', 'All')
    direction = int(self.request.get('direction', '0'))
    dbName = self.request.get('dbName', '')
    databases = self.request.GET.getall('databases')

    phraseKey = self.request.get('phraseKey', None)
    #logging.info('phraseKey = %s' % phraseKey)
    if phraseKey:
      keyForPhrase = db.Key(encoded=phraseKey)
    else:
      keyForPhrase = None

    if keyForPhrase:
      # Get the pharse result from the key.
      result = db.get(keyForPhrase)
      logging.info('+++ Got object from key')
    else:
      qdb = DbName.all()
      dbNames = [p.dbName for p in qdb.run()]

      q = PhraseDB.all()

      selectByDB = True
      #logging.info('GetWordsHandler DBNAME = %s' % dbName)
      if 'All' in databases or '*All*' in databases:
        logging.info('*All* in databases = %s' % databases)
        selectByDB = False

      if databases:
        q.filter('dbName IN', databases)
        logging.info('GetWordsHandler FILTER by databases = %s' % databases)

      if filterStatus != 'All' and filterStatus != 'all':
        # Set up to get g phrase with required status and index >= query index.
        #logging.info('FILTERING WITH status = %s, index >= %d' % (filterStatus, index))
        q.filter('status =', filterStatus)
        if selectByDB and databases:
          q.filter('dbName IN', databases)
          logging.info('GetWordsHandler FILTER WITH DATABASES: %s' % databases)
      if direction < 0:
        q.filter('index <=', index)
        q.order('-index')
      else:
        q.filter('index >=', index)
        q.order('index')

      results = q.run()  # Use get_multi for more than one?
      #logging.info(' RESULTS ITERATOR = %s' % results)
      try:
        result = results.next()
        #logging.info(' RESULT = %s' % result)
      except:
        result = None
      # END OF QUERY FOR RESULT.

    if result:
      index = result.index
      dbName = result.dbName
      arabicText = result.phraseArabic
      latinText = result.phraseLatin
      utext = result.phraseUnicode
      definitionUnicode = result.definitionUnicode
      english = result.englishPhrase
      french = result.frenchPhrase
      status = result.status
      comment = result.comment
      errorMsg = ''
      phraseKey = str(result.key())
    else:
      errorMsg = 'No phrase found'
      phraseKey = ''
      oldtext = utext = english = french = latinText = arabicText = status = ''
      definitionUnicode = ''
      comment = ''

    obj = {
        'language': main.Language,
        'dbNames': dbNames,
        'index': index,
        'dbName': dbName,
        'phraseKey': phraseKey,
        'arabicText': arabicText,
        'latinText': latinText,
        'unicodeText': utext,
        'english': english,
        'french': french,
        'definitionUnicode': definitionUnicode,
        'status': status,
        'error': errorMsg,
        'comment': comment,
        'user_nickname': user_info[1],
        'user_logout': user_info[2],
        'user_login_url': user_info[3],
        # 'soundMaleLink': result.soundMaleLink,
        #'soundFemaleLink': result.soundFemaleLink,
    }
    # logging.info('^^^^^^^ obj = %s' % obj)
    self.response.out.write(json.dumps(obj))

# Show data from word list converted for human verification
class WordReviewHandler(webapp2.RequestHandler):
    def get(self):
      user_info = getUserInfo(self.request.url)
      logging.info('+++ WordReviewHandler')
      fontList = []

      oldtext = self.request.get('oldtext', '')
      arabicText = self.request.get('arabicText', '')
      dbName = self.request.get('dbName', '')
      utext = self.request.get('utext', '')
      english = self.request.get('english', '')
      french = self.request.get('french', '')
      index = int(self.request.get('index', 1))
      comment = self.request.get('comment', '')
      dbName = self.request.get('dbName', '')
      phraseKey = self.request.get('phraseKey', '')
      status = ''
      soundFemaleLink = ''
      soundMaleLink = ''

      debugMode = self.request.get('debug', '')

      if phraseKey:
        keyForPhrase = db.Key(encoded=phraseKey)
        logging.info('+++ Key for Phrase = %s' % keyForPhrase)
      else:
        keyForPhrase = None

      result = None
      currentEntries = 0
      if keyForPhrase:
        result = db.get(keyForPhrase)
      else:
        # No phraseKey found. Need to search
        q = PhraseDB.all()
        for p in q.run():
          currentEntries += 1
        q.filter("index >=", index)
        logging.info('*** Filtering by >= %s' % index)
        if dbName:
          logging.info("dbName filter by %s" % dbName)
          q.filter("dbName", dbName)
        results = q.run()
        try:
          result = results.next()
        except StopIteration:
          result = None

      logging.info('Review results= %s' % results)
      dbq = DbName.all()
      dbNameList = [p.dbName for p in dbq.run()]

      if result:
        index = result.index
        oldtext = result.phraseLatin
        dbName = result.dbName
        utext = result.phraseUnicode
        english = result.englishPhrase
        definitionUnicode = result.definitionUnicode
        french = result.frenchPhrase
        status = result.status
        comment = result.comment
        soundFemaleLink = result.soundFemaleLink
        soundMaleLink = result.soundMaleLink
        phraseKey = str(result.key())

      editOrAdmin = user_info[4]

      #logging.info('q = %s' % result)
      template_values = {
        'editOrAdmin': editOrAdmin,
        'language': main.Language,
        'index': index,
        'dbName': dbName,
        'phraseKey': phraseKey,
        'dbNames': dbNameList,
        'numEntries': currentEntries,
        'oldtext': oldtext,
        'utext': utext,
        'english': english,
        'french': english,
        'comment': comment,
        'status': status,
        'result': result,
        'fontFamilies': main.unicode_font_list,
        'user_nickname': user_info[1],
        'user_logout': user_info[2],
        'user_login_url': user_info[3],
        'isAdmin': user_info[4],
        'soundFemaleLink': soundFemaleLink,
        'soundMaleLink': soundMaleLink,
        'showSounds': True,
        'editOrAdmin': user_info[4],
        'updatePage': True,
        'debugMode': debugMode,
      }
      logging.info('WORDS = %s' % template_values)
      path = os.path.join(os.path.dirname(__file__), 'word_review.html')
      self.response.out.write(template.render(path, template_values))


# Put a new phrase in the database.
class AddNewPhrase(webapp2.RequestHandler):

    def get(self):
      # logging.info('AddNewPhrase')
      user_info = getUserInfo(self.request.url)

      template_values = {
        'fontFamilies': main.fontList,
        'editOrAdmin': user_info[4],
        'language': main.Language,
        'user_nickname': user_info[1],
        'user_logout': user_info[2],
        'user_login_url': user_info[3],
        'isAdmin': user_info[4],
        'showSounds': True,
        'editOrAdmin': user_info[4],
        'updatePage': False,
        'addPhrasePage': True,
      }

      path = os.path.join(os.path.dirname(__file__), 'word_review.html')
      self.response.out.write(template.render(path, template_values))


# Show simple interface for CSV upload.
class SolicitUpload(webapp2.RequestHandler):
  def get(self):
    # upload_url = blobstore.create_upload_url('upload')
    upload_url = '/words/uploadCSV/'

    user_info = getUserInfo(self.request.url)

    #logging.info('$$$$$$$$$ upload_url %s' % upload_url)
    q = DbName.all()
    dbNameList = [p.dbName for p in q.run()]
    logging.info('dbNameList = %s' % dbNameList)

    template_values = {
      'language': main.Language,
      'upload_url':upload_url,
      'dbNames': dbNameList,
      'editOrAdmin': user_info[4],
    }
    path = os.path.join(os.path.dirname(__file__), 'wordsUpload.html')
    self.response.out.write(template.render(path, template_values))

# Add entries in the uploaded CSV to the data store.
# TODO: check for duplicates.
class ProcessUpload(webapp2.RequestHandler):
  def post(self):
    fileInfo = self.request.get('file')
    self.response.out.write(fileInfo)

    logging.info('$$$$$$$$$ fileInfo = %s' % fileInfo)

    # Update with new data.
    # TODO: check for duplicates
    q = PhraseDB.all()
    numEntries = 0
    for p in q.run():
      numEntries += 1
    #logging.info('### Starting at index %d' % numEntries)
    self.response.out.write('### Starting at index %d' % numEntries)
    startIndex = numEntries + 1
    currentIndex = startIndex
    stringReader = unicode_csv_reader(StringIO.StringIO(fileInfo))
    for row in stringReader:
      entry = processRow(currentIndex, row)
      currentIndex += 1
      numEntries += 1
      self.response.out.write(entry)

    #logging.info('### StartIndex = %d. %d new entries added' % (startIndex, numEntries - startIndex))
    self.response.out.write('### StartIndex = %d. %d new entries added' % (startIndex, numEntries - startIndex))
    q = PhraseDB.all()
    currentEntries = 0
    for p in q.run():
      currentEntries += 1
    self.response.out.write('!!! Current entries now = %d.' %
      (currentEntries))


# Clear out the entire phrase data store, or part of it (eventually)
class ClearWords(webapp2.RequestHandler):
  def get(self):
    confirmClear = self.request.get('confirmClear', False)
    dbName = self.request.get('dbName', '')
    if not confirmClear:
      self.response.out.write('!!! Clearing DB %s not confirmed. No changes made.' %
        dbName)
      return

    logging.info('CLEAR DB %s' % dbName)

    q = PhraseDB.all()
    numEntries = 0
    nullCount = 0
    numDeleted = 0
    # TODO: repeat until all are deleted.
    for p in q.run():
      numEntries += 1
      if not p.index:
        nullCount += 1
      if dbName == '*All*' or p.dbName == dbName:
        PhraseDB.delete(p)
        numDeleted += 1

    self.response.out.write('!!! Delete %d null index entries.' % nullCount)
    self.response.out.write('!!! Deleted %d entries for DB %s total.' % (
      numDeleted, dbName))


# Rename all entries in a DB to a new DB
class RenameDB(webapp2.RequestHandler):
  def get(self):
    confirmRename = self.request.get('confirmRename', False)
    oldDbName = self.request.get('oldDbName', '')
    newDbName = self.request.get('newDbName', '')
    if not confirmRename:
      self.response.out.write('!!! Renaming DB %s to %s not confirmed. No changes made.' %
                              (oldDbName, newDbName))
      return

    logging.info('RENAME DB %s to %s' % (oldDbName, newDbName))

    q = PhraseDB.all()
    numEntries = 0
    nullCount = 0
    numRenamed = 0
    for p in q.run():
      numEntries += 1
      if p.dbName == oldDbName:
        p.dbName = newDbName
        p.put()
        numRenamed += 1

    self.response.out.write('!!! Renamed %d entries from %s to %s.' % (
      numRenamed, oldDbName, newDbName))


# Updates the status of an entry and sets the Unicode field.
class UpdateStatus(webapp2.RequestHandler):
  def get(self):
    index = int(self.request.get('index', '1'))
    dbName = self.request.get('dbName', '')
    newStatus = self.request.get('newStatus', 'Unknown')
    unicodePhrase = self.request.get('unicodePhrase', '')
    definitionUnicode = self.request.get('definitionUnicode', '')
    old_phrase = self.request.get('oldData', '')
    arabicText = self.request.get('arabicText', '')
    dbName = self.request.get('dbName', '')
    utext = self.request.get('utext', '')
    english = self.request.get('english', '')
    french = self.request.get('french', '')

    comment = self.request.get('comment', '')
    dbName = self.request.get('dbName', '')
    phraseKey = self.request.get('phraseKey', '')
    status = None

    #logging.info("_+_+_+ Update unicodePhrase = %s" % unicodePhrase)
    #logging.info('_+_+_+_+_+_+_+ Update index = %d, phraseKey = %s' % (index, phraseKey))
    # To get the database object more easily
    if phraseKey:
      keyForPhrase = db.Key(encoded=phraseKey)
    else:
      keyForPhrase = None
    #logging.info("_+_+_+ Update keyForPhrase = %s" % keyForPhrase)


    if keyForPhrase:
      result = db.get(keyForPhrase)
      logging.info('+++ Got object from key')
    else:
      q = PhraseDB.all()
      q.filter("index =", index)
      results = q.run()
      try:
        result = results.next()
        #logging.info('+++ Object from INDEX = %s = %s' % (index, result))
      except StopIteration:
        #logging.info('+++ Cannot get result from INDEX = %s' % index)
        result = None

    if result:
      result.status = newStatus;
      result.comment = comment
      if dbName:
        result.dbName = dbName
      if old_phrase:
        result.phraseLatin = old_phrase
      if unicodePhrase:
        logging.info("_+_+_+ Resetting unicodePhrase = %s" % unicodePhrase)
        result.phraseUnicode = unicodePhrase
      if arabicText:
          result.phraseArabic = arabicText
      if english:
        result.englishPhrase = english
      if french:
        result.frenchPhrase = french
      if definitionUnicode:
        result.definitionUnicode = definitionUnicode
      if comment:
        result.comment = comment
      status = result.status
      logging.info("_+_+_+ Resetting phrase")
      result.put()

    # Send update back to client
    obj = {
      'language': main.Language,
      'index': index,
      'status' : status,
      'phraseLatin' :  old_phrase,
    }
    self.response.out.write(json.dumps(obj))


class AddPhrase(webapp2.RequestHandler):
  def get(self):
    arabicText = self.request.get('arabicText', '')
    latinText = self.request.get('latinText', '')
    dbName = self.request.get('dbName', '')
    utext = self.request.get('uText', '')
    engText = self.request.get('engText', '')
    frenchText = self.request.get('frenchText', '')
    comment = self.request.get('comment', '')
    definitionUnicode = self.request.get('definitionUnicode', '')

    # Check if this already exists.
    q = PhraseDB.all()
    q.filter('phraseUnicode =', utext)
    result = q.get()

    if result:
      logging.info('Lookup result = %s, %s, %s' % (result.index,
                                                 result.phraseUnicode,
                                                 result.englishPhrase))

    #logging.info('AddPhrase: %s, eng = %s' % (arabicText, engText) )
    if result:
      # It's a duplicate. Return warning.
      message = 'This message already exists at index %s' % result.index
      entry = result
    else:
      # It's not there so get new index and store.
      q = PhraseDB.all()
      maxIndex = 0
      for p in q.run():
        if p.index > maxIndex:
          maxIndex = p.index
      entry = PhraseDB(index=maxIndex + 1,
                       dbName=dbName,
                       englishPhrase=engText,
                       frenchPhrase=frenchText,
                       phraseLatin=latinText,
                       phraseUnicode=utext,
                       definitionUnicode=definitionUnicode,
                       phraseArabic=arabicText,
                       comment=comment,
                       soundFemaleLink='',
                       soundMaleLink='',
                       status='Unknown')
      entry.put()
      message = 'New message added at index %s' % entry.index

    response = {
      'new_index': entry.index,
      'message': message,
    }
    self.response.out.write(json.dumps(response))


class DeletePhrase(webapp2.RequestHandler):
  def get(self):
    phraseKey = self.request.get('phraseKey', '')

    logging.info("_+_+_+ Delete phraseKey = %s" % phraseKey)
    # To get the database object more easily
    result = None
    message = "Delete not done"
    entry = None

    if phraseKey:

      keyForPhrase = db.Key(encoded=phraseKey)
      p = db.get(keyForPhrase)
      new_index = -1
      phraseKey = None


      if p:
        this_index = p.index

        PhraseDB.delete(p)
        result = True
        new_index = -1  # Nothing found
        if p:
          message = "Delete message OK. Reload page."

          # Now find the next or previous, if present.
          try:
            q = PhraseDB.all()
            q.filter("index >", this_index)
            q.order('index')
            results = q.run()
            result = results.next()
            entry = q.get()
            new_index = result.index
            logging.info('DELETE: next index = %s, new entry = %s' % (new_index, result.index))
          except:
            # Check for the previous index.
            try:
              q = PhraseDB.all()
              q.filter("index <", this_index)
              q.order('-index')
              results = q.run()
              result = results.next()
              entry = q.get()
              new_index = result.index
              logging.info('DELETE: previous index = %s, new entry = %s' % (new_index, result.index))
            except:
              logging.info('DELETE: no new entry found!')
              # Nothing found
              result = None
              new_index = -1

      if result:
        phraseKey = str(result.key())
        entry = {'index': result.index,
                 'dbName': result.dbName,
                 'arabicText': result.phraseArabic,
                 'latinText': result.phraseLatin,
                 'phraseUnicode': result.phraseUnicode,
                 'definitionUnicode': result.definitionUnicode,
                 'english': result.englishPhrase,
                 'french': result.frenchPhrase,
                 'status': result.status,
                 'comment': result.comment,
                 'soundFemaleLink': result.soundFemaleLink,
                 'soundMaleLink': result.soundMaleLink,
        }

      response = {
        #'result': result,
        'entry': entry,
        'message': message,
        'new_index': new_index,
        'phraseKey': phraseKey,
      }
      self.response.out.write(json.dumps(response))


# Return entries based on the criteria given.
def getDBItemsFiltered(databases, selectAllDB, filterStatus, orderBy=None):
  logging.info('!!! getDBItemsFiltered selectAllDB %s' % selectAllDB)

  q = PhraseDB.all()
  if filterStatus:
    logging.info('!!! getDBItemsFiltered filterStatus %s' % filterStatus)
    q.filter('status =', filterStatus)
  if not selectAllDB or databases:
    logging.info('!!! getDBItemsFiltered databases %s' % databases)
    if type(databases) is not list:
      databases = [databases]
    q.filter('dbName IN', databases)
  if orderBy:
    logging.info('!!! getDBItemsFiltered orderBy %s' % orderBy)
    q.order(orderBy)

  numEntries = 0
  entries = []
  nullIndexCount = 0
  for p in q.run():
    numEntries += 1

    if not p.index:
      nullIndexCount += 1

    entries.append(p)

  logging.info('!!! getDBItemsFiltered has %d entries' % numEntries)
  return entries


# Returns items from database.
class GetPhrases(webapp2.RequestHandler):
  def get(self):
    user_info = getUserInfo(self.request.url)

    filterStatus = self.request.get('filterStatus', '')
    sortCriteria = self.request.get('sortCriteria', 'index')
    databases = self.request.GET.getall('databases')

    if databases == '*All*' or '*All*' in databases:
      selectAllDB = True
      databases = []
    else:
      selectAllDB = False

    logging.info('GetPhrases. Sort by %s. selectAllDB: %s' % (sortCriteria, selectAllDB))

    if sortCriteria == 'alpha':
      sortCriteria = 'phraseUnicode'
    entries = getDBItemsFiltered(databases, selectAllDB, filterStatus, sortCriteria)

    # Return all available databases.
    dbq = DbName.all()
    dbNames = [p.dbName for p in dbq.run()]
    dbNameListChecked = []
    for db in dbNames:
      setcheck = db in databases
      dbNameListChecked.append({'dbName':db, 'checked':setcheck})

    # TODO: Make this default to be user-specific.
    try:
      defaultDB = dbNames[0]
    except:
      defaultDB = None

    template_values = {
      'language': main.Language,
      'entries': entries,
      'dbNames': dbNames,
      'dbNameListChecked': dbNameListChecked,
      'databases': databases,
      'dbName': defaultDB,
      'filter': filterStatus,
      'selectAllDB': selectAllDB,
      'user_nickname': user_info[1],
      'user_logout': user_info[2],
      'user_login_url': user_info[3],
      'isAdmin': user_info[4],
    }

    path = os.path.join(os.path.dirname(__file__), 'phrasesList.html')
    self.response.out.write(template.render(path, template_values))


# Returns items from database as CSV file or TSV file.
class DownloadPhrasesCSV(webapp2.RequestHandler):
  def get(self):
    user_info = getUserInfo(self.request.url)
    logging.info('GetPhrasesCSV')

    filterStatus = self.request.get('filterStatus', '')
    sortCriteria = self.request.get('sortCriteria', 'index')
    outfileName = self.request.get('outfileName', 'database.csv')

    delimiter = self.request.get('delimiter', ',')  # This may set up TSV or other types.

    databases = self.request.GET.getall('databases')


    if databases == None or databases == '*All*' or '*All*' in databases:
      selectAllDB = True
      databases = []
    else:
      selectAllDB = False

    logging.info('filterStatus = %s' % filterStatus)
    logging.info('sortCriteria = %s' % sortCriteria)
    logging.info('outfileName = %s' % outfileName)
    logging.info('delimiter = %s' % delimiter)
    logging.info('databases = %s' % databases)

    if sortCriteria == 'alpha':
      sortCriteria = 'phraseUnicode'
    entries = getDBItemsFiltered(databases, selectAllDB, filterStatus, sortCriteria)
    logging.info('GetPhrasesCSV WRITING %s entries' % entries)

    output_type = 'csv'
    if delimiter == 'comma':
      delimiter = ','
    if delimiter == 'tab':
      delimiter='\t'
      output_type = 'tsv'
    self.response.headers['Content-Type'] = 'application/%s' % output_type

    self.response.headers['Content-Disposition'] = str('attachment; filename="%s"' % outfileName)
    writer = csv.writer(self.response.out, delimiter=delimiter)
    # Headers
    writer.writerow(['index',
                     'Adlam unicode',
                     'definition',
                     'phrase Arabic',
                     'english Phrase',
                     'french Phrase',
                     'status',
                     'dbName',
                     'comment'])
    for entry in entries:
      logging.info('GetPhrasesCSV WRITING index = %s' % entry.index)
      new_row = [entry.index,
                 entry.phraseUnicode.encode('utf-8') if entry.phraseUnicode else "",
                 entry.definitionUnicode.encode('utf-8') if entry.definitionUnicode else "",
                 entry.phraseArabic.encode('utf-8') if entry.phraseArabic else "",
                 entry.englishPhrase.encode('utf-8') if entry.englishPhrase else "",
                 entry.frenchPhrase.encode('utf-8') if entry.frenchPhrase else "",
                 entry.status.encode('utf-8') if entry.status else "",
                 entry.dbName.encode('utf-8') if entry.dbName else "",
                 entry.comment.encode('utf-8') if entry.comment else "",
                 ]
      writer.writerow(new_row)


# To handle UTF-8 input.
def unicode_csv_reader(unicode_csv_data, dialect=csv.excel, **kwargs):
    # csv.py doesn't do Unicode; encode temporarily as UTF-8:
    csv_reader = csv.reader(utf_8_encoder(unicode_csv_data),
                            dialect=dialect, **kwargs)
    for row in csv_reader:
        # decode UTF-8 back to Unicode, cell by cell:
        yield [unicode(cell, 'utf-8') for cell in row]

def utf_8_encoder(unicode_csv_data):
    for line in unicode_csv_data:
        yield line.encode('utf-8')

def processRow(index, row):
  english, latin = row
  # TODO: dbName
  entry = PhraseDB(index=index,
                   englishPhrase=english,
                    phraseLatin=latin,
                    phraseUnicode='',
                   status="Unknown",
                   soundFemaleLink='',
                   soundMaleLink='',
                   )
  entry.put()
  return entry


class ProcessCSVUpload(webapp2.RequestHandler):
# http://stackoverflow.com/questions/2970599/upload-and-parse-csv-file-with-google-app-engine
  def post(self):
    user_info = getUserInfo(self.request.url)

    csv_file = self.request.POST.get('file')
    logging.info('ProcessCSVUpload csv_file = %s' % csv_file)
    dbName = self.request.POST.get('dbName', '')
    indexColumn = self.request.POST.get('indexColumn', '')
    arabicColumn = self.request.POST.get('arabicColumn', 'B')
    englishColumn = self.request.POST.get('englishColumn', 'D')
    commentColumn = self.request.POST.get('commentColumn', '')
    unicodeColumn = self.request.POST.get('unicodeColumn', '')
    definitionColumn = self.request.POST.get('definitionColumn', '')
    statusColumn = self.request.POST.get('statusColumn', '')
    referenceColumn = self.request.POST.get('referenceColumn', '')
    skipLines = int(self.request.POST.get('skipLines', '1'))
    skipEmptyLines = self.request.POST.get('skipEmptyLines', False)
    maxLines = int(self.request.POST.get('maxLines', -1))

    logging.info('unicodeColumn = %s' % unicodeColumn)

    logging.info('skip Empty Lines = %s' % skipEmptyLines)
    columns = [arabicColumn, englishColumn, commentColumn, unicodeColumn]

    self.response.out.write('File %s to dbName: %s \n' % (csv_file, dbName))
    self.response.out.write('Columns: %s %s %s\n' % (arabicColumn, englishColumn, commentColumn))
    self.response.out.write('Skip lines = %d\n' % skipLines)
    self.response.out.write('Skip empty lines = %s\n' % skipEmptyLines)
    self.response.out.write('maxLines = %s\n' % maxLines)

    fileReader = csv.reader(csv_file.file)
    lineNum = 0
    numProcessed = 0
    # Spreadsheet to index map. Update if more than 7 columns
    columnMap = {
      'A' : 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6,
      'a' : 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6,
    }

    # TODO: find maxIndex from existing entries in dbName
    maxIndex = 0
    emptyLines = 0

    entries = []
    for row in fileReader:
      # row is now a list containing all the column data in that row
      if lineNum < skipLines:
        x = 1
        #self.response.out.write('Skipping line %d :  %s\n' % (lineNum, row))
      else:
        x = 0
        #self.response.out.write('%3d: %s \n' % (lineNum, row))

        try:
          indexValue = int(row[columnMap[indexColumn]])
        except:
          indexValue = maxIndex + 1
        try:
          englishPhrase = row[columnMap[englishColumn]].strip()
        except:
          englishPhrase = ''
        try:
          phraseArabic = row[columnMap[arabicColumn]].strip()
        except:
          phraseArabic = ''
        try:
          comment = row[columnMap[commentColumn]].strip()
        except:
          comment = ''
        try:
          utext = row[columnMap[unicodeColumn]].strip()
        except:
          utext = ''
        try:
          reference = row[columnMap[referenceColumn]].strip()
        except:
          reference = ''
        try:
          status = row[columnMap[statusColumn]].strip()
        except:
          status = ''
        try:
          definitionUnicode = row[columnMap[definitionColumn]].strip()
        except:
          definitionUnicode = ''

        # Each line must at least include the primary text for the language.
        if (skipEmptyLines and not utext):
          emptyLines += 1
          continue
        try:
          entry = PhraseDB(
            index=indexValue,
            dbName=dbName,
            phraseUnicode=utext.decode('utf-8'),
            definitionUnicode= definitionUnicode,
            englishPhrase=englishPhrase.decode('utf-8'),
            phraseArabic= phraseArabic,
            comment=comment,
            reference=reference,
            soundFemaleLink='',
            soundMaleLink='',
            status= status)
          entry.put()
          entries.append(entry)
          numProcessed += 1
          maxIndex += 1
        except Exception as err:
          y = 1
          self.response.out.write('  Cannot set item %d: %s. Error=%s\n' % (lineNum, row, err))


        if maxLines > 0 and numProcessed > maxLines:
          self.response.out.write('\n Stopped after maximum %d processed' % (numProcessed))
          break

      lineNum += 1

    self.response.out.write('\n %d lines processed\n' % (numProcessed))

    template_values = {
      'language': main.Language,
      'dbname': dbName,
      'skipLines': skipLines,
      'columns': columns,
      'numberLoaded': numProcessed,
      'entries': entries,
      'emptyLines': emptyLines,
      'editOrAdmin': user_info[4],
    }
    path = os.path.join(os.path.dirname(__file__), 'DBUploadResults.html')
    self.response.out.write(template.render(path, template_values))

app = webapp2.WSGIApplication([
    ('/words/convert/', WordConvert),
    ('/words/review/', WordReviewHandler),
    ('/words/getWords/', GetWordsHandler),
    ('/words/getPhrases/', GetPhrases),
    ('/words/phraselist/', GetPhrases),
    ('/words/updateStatus/', UpdateStatus),
    ('/words/addPhrase/', AddPhrase),
    ('/words/deletePhrase/', DeletePhrase),
    ('/words/downloadCSV/', DownloadPhrasesCSV),
    ('/words/addNewPhrase/', AddNewPhrase),

], debug=True)


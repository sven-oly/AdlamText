# -*- coding: utf-8 -*-
#!/usr/bin/env python

# Functions that handle database management

import main
import words
from userDB import getUserInfo
from words import DbName

import csv
import json
import logging
import os
import StringIO

import urllib
import webapp2

from google.appengine.ext import db
from google.appengine.api import users
from google.appengine.ext.webapp import template


# Clear out the entire phrase data store, or part of it (eventually)
class ResetDBEntries(webapp2.RequestHandler): 
  def get(self):
    user_info = getUserInfo(self.request.url)

    # TODO: Get from request
    oldDbName = ''
    newDbName = 'Approved Words'   
    q = words.PhraseDB.all()
    numEntries = 0
    numReset = 0
    # TODO: repeat until all are reset.
    for p in q.run():
      numEntries += 1
      if p.dbName is None or p.dbName == oldDbName:
        p.dbName = newDbName
        p.put()
        numReset += 1
    # TODO: delete them, with message.
    self.response.out.write('!!! Total DB entries = %d.' % numEntries)
    self.response.out.write('!!! Reset dbname from >%s< to >%s< for %d entries total.' % (
        oldDbName, newDbName, numReset))
        

# Show simple interface for CSV upload and other management.
class ManageHandler(webapp2.RequestHandler):
  def get(self):
    # upload_url = blobstore.create_upload_url('upload')
    upload_url = '/db/uploadCSV/'

    user_info = getUserInfo(self.request.url)

    #logging.info('$$$$$$$$$ upload_url %s' % upload_url)
    q = DbName.all()
    dbNameList = [p.dbName for p in q.run()]
    logging.info('dbNameList = %s' % dbNameList)

    template_values = {
      'language': main.Language,
      'upload_url':upload_url,
      'dbNames': dbNameList,
    }
    path = os.path.join(os.path.dirname(__file__), 'manage.html')
    self.response.out.write(template.render(path, template_values))


class ManageDbName(webapp2.RequestHandler):
  def get(self):
    user_info = getUserInfo(self.request.url)

    submitType =  self.request.get('deleteDB', '')
    dbName = self.request.get('dbName', '')
    clear = self.request.get('clear', '')
    confirmDelete = self.request.get('confirmDelete', None)
    confirmAdd = self.request.get('confirmAdd', None)
    
    q = words.DbName.all()
    if submitType == "deleteDB" and dbName:
      if not confirmDelete:
        self.response.out.write('Deleting db Name = %s is not confirmed.\n' % dbName)
        return
      # Wipe out DB
      for p in q.run():
        pName = p.dbName
        if dbName == "*ALL*" or dbName == pName:
          words.DbName.delete(p)
          self.response.out.write('Deleted db Name = %s.\n' % dbName)
      return
      
    # No name -> return list of all.
    if not dbName:
      nameList = []
      for p in q.run():
        nameList.append(p.dbName)
      self.response.out.write('db Names = %s.\n' % nameList)
      return

    q.filter("dbName =", dbName)
    result = q.get()
    
    if not confirmAdd:
      self.response.out.write('Adding db Name = %s is not confirmed.\n' % dbName)
      return

    if result:
      self.response.out.write('db Name = %s is already defined.\n' % dbName)
    else:
      entry = words.DbName(dbName=dbName);
      entry.put()
      self.response.out.write('db Name = %s has been added.\n' % dbName)


# Rename all entries in a DB to a new DB
class RenameDB(webapp2.RequestHandler):
  def get(self):
    user_info = getUserInfo(self.request.url)

    confirmRename = self.request.get('confirmRename', False)
    oldDbName = self.request.get('oldDbName', '')
    newDbName = self.request.get('newDbName', '')
    if not confirmRename:
      self.response.out.write('!!! Renaming DB %s to %s not confirmed. No changes made.' %
                              (oldDbName, newDbName))
      return

    logging.info('RENAME DB %s to %s' % (oldDbName, newDbName))

    q = words.PhraseDB.all()
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


class ProcessCSVUpload(webapp2.RequestHandler):
# http://stackoverflow.com/questions/2970599/upload-and-parse-csv-file-with-google-app-engine

  def post(self):

    #self.response.headers['Content-Type'] = 'text/plain'
    csv_file = self.request.POST.get('file')
    logging.info('ProcessCSVUpload csv_file = %s' % csv_file)
    dbName = self.request.POST.get('dbName', '')
    indexColumn = self.request.POST.get('indexColumn', '')
    arabicColumn = self.request.POST.get('arabicColumn', 'B')
    englishColumn = self.request.POST.get('englishColumn', 'D')
    commentColumn = self.request.POST.get('commentColumn', '')
    unicodeColumn = self.request.POST.get('unicodeColumn', '')
    referenceColumn = self.request.POST.get('referenceColumn', '')
    skipLines = int(self.request.POST.get('skipLines', '1'))
    skipEmptyLines = self.request.POST.get('skipEmptyLines', False)
    maxLines = int(self.request.POST.get('maxLines', -1))

    logging.info('unicodeColumn = %s' % unicodeColumn)

    logging.info('skip Empty Lines = %s' % skipEmptyLines)
    columns = [arabicColumn, englishColumn, commentColumn, unicodeColumn]

    self.response.out.write('File %s to dbName: %s \n' % (csv_file, dbName))
    self.response.out.write('Columns: %s %s %s\n' % (unicodeColumn, englishColumn, commentColumn))
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

    # TODO: find maxIndex from existing entries in dbNam
    maxIndex = 0
    emptyLines = 0

    entries = []
    for row in fileReader:
      self.response.out.write('row %d: %s\n' % (lineNum, row))
      # row is now a list containing all the column data in that row
      if lineNum >= skipLines:
        self.response.out.write('%3d: %s \n' % (lineNum, row))

        try:
          indexValue = int(row[columnMap[indexColumn]])
        except:
          indexValue = maxIndex + 1
        try:
          englishPhrase = row[columnMap[englishColumn]].strip()
        except:
          englishPhrase = ''
        try:
          arabicPhrase = row[columnMap[arabicColumn]].strip()
        except:
          arabicPhrase = ''
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
        # Add Latin transformation if needed.
        phraseLatin = ''

        logging.info('    Eng: >%s<E \n' % (englishPhrase))
        logging.info('    Arab: >%sO< \n' % (arabicPhrase))
        logging.info('    Com: >%s<C \n' % (comment))
        logging.info('    Uni: >%s<Y\n' % (utext))

        if (skipEmptyLines and not englishPhrase and not arabicPhrase and not utext):
          emptyLines += 1
          logging.info('skipping a line: %s' % lineNum)
          self.response.out.write('--- Skipping empty line %d: %s' % (lineNum, row))
          continue
        try:
          logging.info('making new entry: %s' % englishPhrase)
          entry = words.PhraseDB(
            index=indexValue,
            dbName=dbName,
            englishPhrase=englishPhrase,
            phraseArabic=arabicPhrase.decode('utf-8'),
            phraseLatin=phraseLatin,
            phraseUnicode=utext.decode('utf-8'),
            comment=comment,
            reference=reference,
            soundFemaleLink='',
            soundMaleLink='',
            status='Unknown')
          entry.put()
          entries.append(entry)
          numProcessed += 1
          maxIndex += 1
        except Exception as err:
          y = 1
          logging.info('Exception in entry to DB: %s' % err)
          self.response.out.write('  Cannot set item %d: %s. Error=%s\n' % (lineNum, row, err))

      lineNum += 1

      if maxLines > 0 and numProcessed > maxLines:
        self.response.out.write('\n Stopped after maximum %d processed' % (numProcessed))
        break

      self.response.out.write('\n %d lines processed\n' % (numProcessed))


app = webapp2.WSGIApplication([
    ('/db/manage/', ManageHandler),
    ('/db/handleDB/', ManageDbName),
    ('/db/renameDB/', RenameDB),
    ('/db/clear/', ManageDbName),
    ('/db/uploadCSV/', ProcessCSVUpload),

], debug=True)

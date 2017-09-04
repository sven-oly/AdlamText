# -*- coding: utf-8 -*-
#!/usr/bin/env python

# Functions that handle database management

import main
import words
from userDB import getUserInfo

import csv
import json
import logging
import os
import StringIO

import urllib
import webapp2

from google.appengine.api import users

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

        

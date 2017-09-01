# -*- coding: utf-8 -*-
#!/usr/bin/env python
#

# Testing blobstorage upload for sound files, data, etc.
# Started 7-June-2017

# Based on https://cloud.google.com/appengine/docs/standard/python/blobstore/


from userDB import getUserInfo

import database
import main
import userDB
import words

import json
import logging
import os
import urllib
import webapp2

from google.appengine.api import users
from google.appengine.ext.webapp import template

import cloudstorage as gcs

from google.appengine.api import app_identity
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.ext import db

from google.appengine.ext.webapp import template

from google.appengine.ext import ndb
from google.appengine.ext.ndb import msgprop


# Sound datastore objects.
class SoundUploadDB(db.Model):
  lastUpdate = db.DateTimeProperty(auto_now=True, auto_now_add=True)
  soundKey = db.StringProperty(u'')
  phraseDBkey = db.StringProperty(u'')
  uploadingUser = db.StringProperty(u'')
  filename = db.StringProperty(u'')
  public_url = db.StringProperty(u'')
  selectVoice = db.StringProperty(u'')


# Reference: https://cloud.google.com/appengine/docs/standard/python/blobstore/#Python_Uploading_a_blob
class CreateAndReadFileHandler(webapp2.RequestHandler):

    def get(self):
        user_info = getUserInfo(self.request.url)

        app_id = app_identity.get_application_id()
        bucket_name = app_identity.get_default_gcs_bucket_name()

        upload_url = blobstore.create_upload_url('/sound/upload/',
                                                 gs_bucket_name=bucket_name)
        logging.info('CreateAndReadFileHandler bucket_name: %s' % bucket_name)
        logging.info('CreateAndReadFileHandler upload_url: %s' % upload_url)

        selectVoice = self.request.get('selectVoice', '')
        phraseKey = self.request.get('phraseKey', '')
        filename = self.request.get('file', '')

        if phraseKey:
          keyForPhrase = db.Key(encoded=phraseKey)
          logging.info('+++ Key for Phrase = %s' % keyForPhrase)
        else:
          keyForPhrase = None

        result = None
        if keyForPhrase:
          result = db.get(keyForPhrase)
          logging.info('+++ Got object from key %s' % result)
          logging.info('  index %d, English = %s' % (result.index, result.englishPhrase))
          logging.info('            Osage = %s' % (result.osagePhraseUnicode))


        template_values = {
          'language': main.Language,
          'upload_url': upload_url,
          'filename': filename,
          'phraseKey': phraseKey,
          'phrase_record': result,
          'app_id': app_id,
          'voice': selectVoice,
        }
        path = os.path.join(os.path.dirname(__file__), 'addSound.html')
        self.response.out.write(template.render(path, template_values))

        # [START SoundUploadHandler]

# Key idea: inherit from both, so other parameters can be obtained.
class SoundUploadHandler(blobstore_handlers.BlobstoreUploadHandler,
                         webapp2.RequestHandler):
    def post(self):
          try:
            logging.info('SOUND UPLOAD handler!')
            upload_list = self.get_uploads()
            logging.info(' get_uploads = (%d) %s' %
                         (len(upload_list), upload_list))
            items = self.request.POST.items()
            logging.info('ITEMS = %s' % items)

            app_id = app_identity.get_application_id()
            logging.info('+++++++++++ APP_ID = %s' % app_id)

            selectVoice = self.request.POST['selectVoice']
            logging.info('selectVoice = >%s<' % items)

            try:
              phraseKey = self.request.POST['phraseKey']
            except Exception as err:
              phraseKey = None
              logging.info('SOUND UPLOAD handler phraseKey. err = %s!' % err)

            if phraseKey:
              keyForPhrase = db.Key(encoded=phraseKey)
              logging.info('+++ Key for Phrase = %s' % keyForPhrase)
            else:
              keyForPhrase = None

            logging.info('Getting phrase from key %s' % keyForPhrase)
            result = None
            try:
              if keyForPhrase:
                result = db.get(keyForPhrase)
                logging.info('+++ Got object from key %s' % result)
                logging.info('  index %d, English = %s' % (
                    result.index, result.englishPhrase))
            except:
              logging.info('---- Cannot get object from key %s' % result)

            # This is the BlobInfo object
            try:
              upload = upload_list[0]
              logging.info(' upload =  %s' % (upload))
              logging.info(' ####### upload key =  %s' % (upload.key()))
              logging.info(' ####### upload content type =  %s' % (upload.content_type))
              logging.info('      filename =  %s' % (upload.filename))
              logging.info('      type =  %s' % (type(upload)))
              logging.info('      gs_object_name =  %s' % (upload.gs_object_name))
              public_object_name = upload.gs_object_name
            except Exception as err:
              logging.info('SOUND UPLOAD handler upload block. err = %s!' % err)

            try:
              user = users.get_current_user().user_id(),
              logging.info('SOUND UPLOAD: upload = %s, user = %s, key=%s' %
                           (upload, user, upload.key()))
            except Exception as err:
              user = None
              logging.info('SOUND UPLOAD get user error. err = %s!' % err)
              user = 'default_user'

            try:
              self.redirect('/sound/uploadresults/' +
                            '?%s&%s&%s&%s&%s&%s&%s' %
                            ('key=%s' % upload.key(),
                             'public_object_name=%s' % public_object_name,
                             'filename=%s' % upload.filename,
                             'app_id=%s' % app_id,
                             'phraseKey=%s' % phraseKey,
                             'selectVoice=%s' % selectVoice,
                             'user=%s' % user))
            except Exception as err:
              logging.info('SOUND UPLOAD fail redirect: %s' % err)
              self.error(500)

          except Exception as err:
            logging.info('SOUND UPLOAD top failure: %s' % err)
            self.error(500)
            # [END SoundUploadHandler]


class SoundUploadResults(webapp2.RequestHandler):
    def get(self):
      logging.info('@@@@@@@ SoundUploadResults: all params=%s' %
                   self.request.GET)
      sound_key = self.request.get('key', "NO_KEY")
      logging.info('@@@@@@@ SoundUploadResults: key=%s' % sound_key)

      phraseKey = self.request.get('phraseKey', None)
      user = self.request.get('user', None)
      logging.info('phraseKey = %s' % phraseKey)

      app_id = self.request.get('app_id', 'NO APP_ID')
      logging.info('app_id = %s' % app_id)

      filename = self.request.get('filename', 'NO FILENAME')
      selectVoice = self.request.get('selectVoice', None)
      logging.info('selectVoice = %s' % selectVoice)

      public_obj_name = self.request.get('public_object_name', None)
      logging.info('+++ public_obj_name = %s' % public_obj_name)

      logging.info('+++ BASENAME = %s' % os.path.basename(public_obj_name))

      baseName = os.path.basename(public_obj_name)

      baseSoundURL = 'https://osagelanguagetools.appspot.com.storage.googleapis.com'
      # Add info to the phrase and sound objects.
      if baseName:
        soundURL = '%s/%s' % (baseSoundURL, baseName)
      else:
        soundURL = 'NONE'
      logging.info('!!!!!!!!!!!!!!!! soundURL = %s' % soundURL)

      keyForPhrase = None
      result = None
      if phraseKey:
        keyForPhrase = db.Key(encoded=phraseKey)
        logging.info('+++ Key for Phrase = %s' % keyForPhrase)

      if keyForPhrase:  # Update the phrase database object
        result = db.get(keyForPhrase)
        logging.info('+++ Got object from key %s' % result)
        logging.info('  index %d, English = %s' % (result.index, result.englishPhrase))
        logging.info('            Osage = %s' % (result.osagePhraseUnicode))

        if selectVoice == u'male_voice':
          result.soundMaleLink = soundURL
          logging.info(' MMMM update >%s<' % result.soundMaleLink)
          result.put()
        else:
          result.soundFemaleLink = soundURL
          logging.info(' FFFF update >%s<' % result.soundFemaleLink)
          result.put()

      if not blobstore.get(sound_key):
        logging.info('ERROR!!!')
        self.error(404)

      # Keep track of these
      newSound = SoundUploadDB(soundKey=sound_key,
                               phraseDBkey=phraseKey,
                               uploadingUser=user,
                               filename=filename,
                               public_url=soundURL,
                               selectVoice=selectVoice)
      newSound.put()
      logging.info('SSSS new sound key = %s' % newSound.key())

      template_values = {
        'phraseKey': phraseKey,
        'public_obj_name': public_obj_name,
        'public_url': soundURL,
        'sound_key': sound_key,
        'soundDBkey': newSound.key(),
        'filename': filename,
        'selectVoice': selectVoice,
        'user': user,
        'app_id': app_id,
      }
      path = os.path.join(os.path.dirname(__file__), 'soundResults.html')
      self.response.out.write(template.render(path, template_values))
#-------------------------------------------

# This handler creates a file in Cloud Storage using the cloudstorage
# client library and then serves the file back using the Blobstore API.
class CreateAndServeFileHandler(blobstore_handlers.BlobstoreDownloadHandler):

  def get(self):
    # Get the default Cloud Storage Bucket name and create a file name for
    # the object in Cloud Storage.
    bucket = app_identity.get_default_gcs_bucket_name()

    # Cloud Storage file names are in the format /bucket/object.
    filename = '/{}/blobstore_serving_demo'.format(bucket)

    # Create a file in Google Cloud Storage and write something to it.
    with gcs.open(filename, 'w') as filehandle:
      filehandle.write('abcde\n')

    # In order to read the contents of the file using the Blobstore API,
    # you must create a blob_key from the Cloud Storage file name.
    # Blobstore expects the filename to be in the format of:
    # /gs/bucket/object
    blobstore_filename = '/gs{}'.format(filename)
    blob_key = blobstore.create_gs_key(blobstore_filename)

    # BlobstoreDownloadHandler serves the file from Google Cloud Storage to
    # your computer using blob_key.
    self.send_blob(blob_key)


# This datastore model keeps track of which users uploaded which sounds.
  lastUpdate = db.DateTimeProperty(auto_now=True, auto_now_add=True)
  # TODO

class UserSound(db.Model):
  user = ndb.StringProperty()
  blob_key = ndb.BlobKeyProperty()
  lastUpdate = db.DateTimeProperty(auto_now=True, auto_now_add=True)


class SoundUploadFormHandler(webapp2.RequestHandler):
  def get(self):
    # [START upload_url]
    upload_url = blobstore.create_upload_url('/sound/upload/')
    # [END upload_url]
    # [START upload_form]
    # To upload files to the blobstore, the request method must be "POST"
    # and enctype must be set to "multipart/form-data".
    self.response.out.write("""
<html><body>
<h2>Sound Upload</h2>
<form action="{0}" method="POST" enctype="multipart/form-data">
  Upload File: <input type="file" name="file"><br>
  <input type="submit" name="submit" value="Submit">
</form>
</body></html>""".format(upload_url))
    # [END upload_form]


# [START ViewSoundHandler]
class ViewSoundHandler(blobstore_handlers.BlobstoreDownloadHandler):
  def get(self, sound_key):
    logging.info(' VIEW SOUND HANDLER: %s' % sound_key)
    if not blobstore.get(sound_key):
      self.error(404)
    else:
      self.send_blob(sound_key)
# [END ViewSoundHandler]

# https://cloud.google.com/appengine/docs/standard/python/googlecloudstorageclient/read-write-to-cloud-storage
class SoundListHandler(webapp2.RequestHandler):
  def get(self):
    bucket_name = os.environ.get('BUCKET_NAME',
                                 app_identity.get_default_gcs_bucket_name())

    self.response.headers['Content-Type'] = 'text/plain'
    self.response.write('Demo GCS Application running from Version: '
                      + os.environ['CURRENT_VERSION_ID'] + '\n')
    self.response.write('Using bucket name: ' + bucket_name + '\n\n')

    self.response.write('Listbucket results:\n')

    bucket = '/' + bucket_name
    page_size = 100
    stats = gcs.listbucket(bucket + '/', max_keys=page_size)
    self.response.write('Stats for #%s entries\n' % stats)
    while True:
      count = 0
      for stat in stats:
        count += 1
        self.response.write('Item #%d' % count)
        self.response.write('\n')
        self.response.write(repr(stat))
        self.response.write('\n')
        self.response.write('Count = %d\n' % count)

      if count != page_size or count == 0:
        self.response.write('Breaking = %d\n' % count)
        break



# Shows all available sound files + keys
class SoundDataViewerHandler(webapp2.RequestHandler):
  def get(self):
    q = UserSound.all()

    for p in q.run():
      self.response.out.write(
          '!!! sound_key=: %s  user = %s.' % (p.blob_key, p.user))

# [END all]


# New on 18-July-2017
class SoundUploadUI(webapp2.RequestHandler):
  def get(self):
    phraseKey = self.request.get('phraseKey', '')
    logging.info('phrasekey = %s' % phraseKey)

    phraseObj = db.get(phraseKey)
    logging.info('phraseObj = %s' % phraseObj)

    # To start, show the phrase info.
    template_values = {
      'language': main.Language,
      'phraseObj': phraseObj,
      'phraseKey': phraseKey,
    }
    path = os.path.join(os.path.dirname(__file__), 'phraseSoundSelector.html')
    self.response.out.write(template.render(path, template_values))
# [END SoundUploadHandler]

# Start the upload to Cloud Storage
class SoundFileUploadHandler(webapp2.RequestHandler):
  def post(self):
    phraseKey = self.request.get('phraseKey', '')
    filename = self.request.get('name', '')
    logging.info('phrasekey = %s' % phraseKey)
    logging.info('filename = %s' % filename)

    phraseObj = db.get(phraseKey)
    logging.info('phraseObj = %s' % phraseObj)

    # Create a Cloud Storage client.
    client = gcs.Client()

    # Get the bucket that the file will be uploaded to.
    bucket = gcs.get_bucket(CLOUD_STORAGE_BUCKET)

    # To start, show the phrase info.
    template_values = {
      'language': main.Language,
      'phraseObj': phraseObj,
      'phraseKey': phraseKey,
    }
    path = os.path.join(os.path.dirname(__file__), 'phraseSoundSelector.html')
    self.response.out.write(template.render(path, template_values))
# [END SoundUploadHandler]


# show all the sounds registered.
class AllSoundsDB(webapp2.RequestHandler):
  def get(self):
    q = SoundUploadDB.all()
    sounds = q.run()
    count = 0
    for s in sounds:
      count += 1
    template_values = {
        'count': count,
        'sounds': q,
    }

    path = os.path.join(os.path.dirname(__file__), 'allsounds.html')
    self.response.out.write(template.render(path, template_values))

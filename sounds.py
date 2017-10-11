# -*- coding: utf-8 -*-
# !/usr/bin/env python
#

import json
import logging
import os
import urllib
import webapp2
import sys

import blobstorage
import userDB

from google.appengine.api import users

from google.appengine.ext.webapp import template

app = webapp2.WSGIApplication([
    ('/sound/showupload/', blobstorage.SoundUploadFormHandler),
    ('/sound/view/', blobstorage.ViewSoundHandler),
    ('/sound/listall/', blobstorage.SoundListHandler),
    ('/sound/viewall/', blobstorage.SoundDataViewerHandler),
    ('/sound/uploadtodbitem/', blobstorage.SoundUploadUI),
    ('/sound/uploadSoundForPhrase/', blobstorage.SoundFileUploadHandler),

    ('/sound/start/', blobstorage.CreateAndReadFileHandler),
    ('/sound/upload/', blobstorage.SoundUploadHandler),
    ('/sound/uploadresults/', blobstorage.SoundUploadResults),

    ('/sound/uploadresults/', blobstorage.SoundUploadResults),
    ('/sound/soundsdb/', blobstorage.AllSoundsDB),
    ('/sound/delete/', blobstorage.RemoveSoundHandler),

], debug=True)

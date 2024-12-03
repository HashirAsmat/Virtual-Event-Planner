const { google } = require('googleapis');

const {GOOGLE_CLIENT_SECRET,GOOGLE_CLIENT_ID} = require('../config/index'); 

exports.oauth2client = new google.auth.OAuth2(GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,'postmessage')

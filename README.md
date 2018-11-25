RESTful API in Node and Express

A minimal, secure RESTFUL api for NodeJS. This project includes api authentication , get stats , count , search of battles.
JWT token includes all the apis for auth. Import sample data from seeds folder.


Installation

 git clone git@github.com:sandeep33-k/battle-node-api
 npm install
 node start


API Endpoints

GET http://localhost:5000/api/v1/authorize?username=battle_dev_user&password=BaTtL@User01&grant=api
GET http://localhost:5000/api/v1/list
GET http://localhost:5000/api/v1/count
GET http://localhost:5000/api/v1/stats
GET http://localhost:5000/api/v1/search?king=Robb Stark&location=Winterfell&type=ambush


Authentication
	Please make authoize API call to create JWT token. Kindly add JWT token in header as x-access-token  for allow  access to rest of the api calls.

SAMPLE CURL :
 
curl -X GET \
  http://localhost:5000/api/v1/battle/stats \
  -H 'x-access-token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDM1ODQyODA0NjEsImlzcyI6IkJhdHRsZSBOb2RlIEFQSSIsIm5hbWUiOiJiYXR0bGVfZGV2X3VzZXIiLCJ1c2VySWQiOiJ2d3BmbzZoamV1OTE1NDI5Nzk0ODA0NjEiLCJ1c2VySWRFbmNyeXB0IjoiZmNhMjI5ODE2ZTgxNDBjZDYyMzA0ZWYzNzNiZTQ1OTVkZWFmYTliZDgyNDFmYmViNTNhZDYyZTlkMjVhOTcyZiJ9.8jyowOG_hRMLhd1W9OlCgm6JIel2smUCOmkM8nvLYKU'
	







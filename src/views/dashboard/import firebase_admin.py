import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
import csv
import requests
import json

# Use a service account
cred = credentials.Certificate('C:/Users/Bashaar/Documents/U Of T/RCFTA/rcopen team extractor/RC Open/account creation/frontend/firebase.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

values = []
teams = {}
with open('C:/Users/Bashaar/Documents/U Of T/RCFTA/rcopen team extractor/RC Open/account creation/frontend/namesAndTeamnames.csv', mode='r', encoding="utf8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row)
        values.append(row)
        teams[row['teamname']] = []
        

    for row in values:
        teams[row['teamname']].append(row['uid'])

    for team, ids in teams.items():

        db.collection('limits').document(team).set({
            'id': ids, 
            'statements':75,
        })
        
        
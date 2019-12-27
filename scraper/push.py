import csv
import requests

import sys
csv.field_size_limit(sys.maxsize)

with open('products.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for i, row in enumerate(readCSV):
        if i == 0:
            continue
        song = {
            "title": row[0],
            "artist": row[1],
            "genre": "null",
            "album": "null",
            "albumImageUrl": "null",
            "youtubeID": "null",
            "lyrics": row[3],
            "tab": row[2]
        }

        URL = "http://localhost:8081/songs"
        requests.post(URL, json=song)

import re
from selenium.webdriver.chrome.options import Options
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver

import csv
import sys
csv.field_size_limit(sys.maxsize)

keywords, genres, album, albumImageUrls, youtubeIDs = [], [],[],[],[]
# fetch artist and song
with open('products.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for i, row in enumerate(readCSV):
        if i == 0:
            continue
        temp = row[0].rstrip().strip() + " " + row[1].rstrip().strip()
        keywords.append(re.sub(r'([^\s\w]|_)+', '', temp).replace(" ", "+"))

# for i in range(len(keywords)):

BASE_URL = "https://www.google.com/search?q="
options = Options()
options.headless = True
options.add_argument('--no-sandbox')
driver = webdriver.Chrome('/Users/nhanle/chromedriver', options=options)
link = BASE_URL + keywords[0]
print(link)
driver.get(link)
content = driver.page_source
soup = BeautifulSoup(content, 'html.parser')

#LrzXr kno-fv
# for item in soup.find_all('span', attrs={'jsname': 'YS01Ge'}):
#     lines.append(item.text)
# lyrics.append('\n'.join(lines))
# driver.close()

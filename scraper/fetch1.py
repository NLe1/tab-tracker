from selenium.webdriver.chrome.options import Options
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver



BASE_URL = 'https://www.ultimate-guitar.com/explore?type[]=Tabs&&page='
songs, artists, links, tabs, lyrics = [], [], [], [], []

# getting the songs, artists, and links
for i in range(1, 100):
    options = Options()
    options.headless = True
    driver = webdriver.Chrome('/Users/nhanle/chromedriver', options=options)
    print(BASE_URL + f"{i}")
    driver.get(BASE_URL + f"{i}")

    content = driver.page_source
    soup = BeautifulSoup(content, 'html.parser')
    # loop through each div row
    for item in soup.find_all('div', attrs={'class': 'pZcWD'}):
        res = item.findAll('a')
        if len(res) > 0:
            # get songs and artist name
            artists.append(res[0].text)
            songText = res[1].text
            # get rid of the (ver $number)
            if '(' in songText:
                songText = songText[:songText.index('(')]
            songs.append(songText)
            links.append(res[1]['href'])

    driver.close()

print("GETTING THE TABS ....")

for i, link in enumerate(links):
    options = Options()
    options.headless = True
    options.add_argument('--no-sandbox')
    driver = webdriver.Chrome('/Users/nhanle/chromedriver', options=options)
    print(link)
    driver.get(link)
    content = driver.page_source
    soup = BeautifulSoup(content, 'html.parser')
    lines = []
    for item in soup.find_all('span', attrs={'class': '_1zlI0'}):
        lines.append(item.text)
    tabs.append('\n'.join(lines))
    driver.close()

for i in range(len(songs)):
    song, artist = songs[i], artists[i]
    BASE_URL = "https://www.google.com/search?q="
    options = Options()
    options.headless = True
    options.add_argument('--no-sandbox')
    driver = webdriver.Chrome('/Users/nhanle/chromedriver', options=options)
    link = BASE_URL + f"{'+'.join(song.split(' '))}" + \
        "+" + "lyrics"
    print(link)
    driver.get(link)
    content = driver.page_source
    soup = BeautifulSoup(content, 'html.parser')
    lines = []
    for item in soup.find_all('span', attrs={'jsname': 'YS01Ge'}):
        lines.append(item.text)
    lyrics.append('\n'.join(lines))
    driver.close()


df = pd.DataFrame({'Song': songs, 'Artist': artists,
                   'Tabs': tabs, 'Lyrics': lyrics})
df.to_csv('products.csv', index=False, encoding='utf-8')

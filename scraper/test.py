from selenium.webdriver.chrome.options import Options
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver

# options = Options()
# options.headless = True
# options.add_argument('--no-sandbox')
# driver = webdriver.Chrome('/Users/nhanle/chromedriver', options=options)
driver = webdriver.Chrome('/Users/nhanle/chromedriver')

driver.get("https://images.google.com/")
driver.find_element_by_css_selector(
    "input.gLFyf.gsfi").send_keys("The Beatles album")
driver.find_element_by_css_selector("button.Tg7LZd").click()

content = driver.page_source
soup = BeautifulSoup(content, 'html.parser')

print(soup.find('img', {
    'class': 'rg_i Q4LuWd tx8vtf'
})['src'])

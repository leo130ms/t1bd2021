# Pre-requisitos:
#    - Verificar se Python estah instalado: python --version
#    - Caso nao esteja instalado: https://www.python.org/downloads/
#    - Instalar biblioteca Selenium (https://selenium-python.readthedocs.io/index.html)
# 	 - Baixar biblioteca ChromeDriver no mesmo diretorio (https://chromedriver.chromium.org/home)
# Para rodar: python example.py

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# start web browser
options = webdriver.ChromeOptions()
options.add_argument("--headless")
browser = webdriver.Chrome('./chromedriver', options=options)

# get source
browser.get("https://dbis-uibk.github.io/relax/api/local/uibk/local/0?query=UiBqb2luIFMgam9pbiBU")
html = browser.page_source
print(html)

# close web browser
browser.close()
browser.quit()

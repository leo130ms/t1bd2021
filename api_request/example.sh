# Pre-requisitos:
#    - Verificar se Chrome estah instalado (Ubuntu): google-chrome --version
#    - Caso não esteja instalado: https://linuxize.com/post/how-to-install-google-chrome-web-browser-on-ubuntu-18-04/
# Para rodar: ./example.sh

# Ubuntu
chrome='google-chrome'
html=`$chrome --headless --disable-gpu --verbose --dump-dom https://dbis-uibk.github.io/relax/api/local/uibk/local/0?query=UiBqb2luIFMgam9pbiBU`;
echo $html;

// Pre-requisitos:
//    - Verificar se Node estah instalado: node --version
//    - Caso não esteja instalado: https://nodejs.org/en/download/
//    - Instalar biblioteca Puppeteer (https://github.com/puppeteer/puppeteer)
// Para rodar: node example.js

const puppeteer = require('puppeteer');

let getAPIData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://dbis-uibk.github.io/relax/api/local/uibk/local/0?query=amh2YmtqYmRoamtmYmprYWpobGJrdg==');
  const html = await page.evaluate(() => document.documentElement.outerHTML);
  await browser.close();
  return html;
}



getAPIData().then((html) => {
    /*
    if(html){
      console.log(html);
    }
    else{
      console.log('Error');
    }
    */
    let verificarConsulta = true; // alterar para chamada
    if(verificarConsulta){
      if (html.search('true')!=(-1)){
        console.log('1');
      }
      else if(html.indexOf('false')!=(-1)){
        console.log('0');
      }
    }
});

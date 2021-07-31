// Pre-requisitos:
//    - Verificar se Node estah instalado: node --version
//    - Caso não esteja instalado: https://nodejs.org/en/download/
//    - Instalar biblioteca Puppeteer (https://github.com/puppeteer/puppeteer)
// Para rodar: node example.js

const puppeteer = require('puppeteer');


let getAPIData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const myArgs = process.argv.slice(2);
  
  let relax_host = myArgs[0];
  let relax_port = myArgs[1];
  //let relax_port = '';
  let relax_database = myArgs[2];
  let consultaFile = myArgs[3];

  const fs = require('fs');
  const consulta = fs.readFileSync(consultaFile, 'utf8');

  //console.log(consulta);

  let buff = new Buffer(consulta);
  let query64 = buff.toString('base64');

  //--- Monta URL ---//
  const url = relax_host.concat(':', relax_port, '/relax/api/',relax_database, '?query=', query64);
  //para testar com o exemplo do github, que não aceita porta
  //const url = relax_host.concat(relax_port, '/relax/api/',relax_database, '?query=', query64);
  
  //console.log(url);

  //teste com a url direto
  //await page.goto('https://dbis-uibk.github.io/relax/api/local/uibk/local/0?query=UiBqb2luIFMgam9pbiBU');
  //teste com query inválida mas codificada corretamente
  //await page.goto('https://dbis-uibk.github.io/relax/api/local/uibk/local/0?query=amh2YmtqYmRoamtmYmprYWpobGJrdg==');
  //teste com url
  await page.goto(url);
 
  const html = await page.evaluate(() => document.documentElement.outerHTML);
  await browser.close();
  return html;
}



getAPIData().then((html) => {
  //printa a página se precisar  
  /*
    if(html){
      console.log(html);
    }
    else{
      console.log('Error');
    }
    */
    let verificarConsulta = true; // alterar para forma de chamada
    if(verificarConsulta){
      if (html.search('true')!=(-1)){
        console.log('1');
      }
      else if(html.search('false')!=(-1)){
        console.log('0');
      }
    }
});
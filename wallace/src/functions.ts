const html2json = require('html2json').html2json;
const puppeteer = require('puppeteer');


export function readFile(file: string){
    const fs = require('fs');
    try {
        const data = fs.readFileSync(file, 'utf8')
        return data;
    } 
    catch (err) {
        console.log(`Error! Problema na leitura do arquivo ${file}`);
        process.exit();
    }
}

export async function verificarConsulta(url: string, query: string) {
    console.log("Executando rotina 'verificarConsulta'...");
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();        
        await page.goto(`${url}?query=${query}`);
        const html = await page.evaluate(() => document.documentElement.outerHTML);
        const json = html2json(html);
        const validResponse = json.child[0].child[2].child[1].child[0].child[0].child[0].text;

        if(validResponse == 'true'){
            console.log('1');
        } else{
            console.log('0');            
        }

        await browser.close();
    }
    catch (err) {
        console.log('0');
        process.exit(); 
    }
}

export async function executarECompararConsulta(url: string, submission: string, key: string){
    console.log("Executando rotina 'executarECompararConsulta'...");
    try{
        const browser = await puppeteer.launch();

        const page = await browser.newPage();        
        await page.goto(`${url}?query=${submission}`);
        const html = await page.evaluate(() => document.documentElement.outerHTML);
        const json = html2json(html);
        const validResponseSubmission = json.child[0].child[2].child[1].child[0].child[0].child[0].text;
        const responseSubmission = json.child[0].child[2].child[1].child[0].child[2].child[0].text;
        
        const page2 = await browser.newPage();        
        await page2.goto(`${url}?query=${key}`);
        const html2 = await page.evaluate(() => document.documentElement.outerHTML);
        const json2 = html2json(html2);
        const validResponseKey = json.child[0].child[2].child[1].child[0].child[0].child[0].text;
        const responseKey = json2.child[0].child[2].child[1].child[0].child[2].child[0].text;
        
        if(validResponseSubmission === 'true' && validResponseKey === 'true' && responseSubmission != responseKey){
            console.log('0');
        } else if(validResponseSubmission === 'true' && validResponseKey === 'true' && responseSubmission === responseKey){
            console.log('1');            
        } else {
            console.log('2');            
        }
        
        await browser.close();
    }
    catch (err) {
        console.log('2');
        process.exit();        
    }
}

export async function executarECompararConsultaPRO(url: string, submission: string, key: string, chkCols: number, chkOrder: number){
    console.log("Executando rotina 'executarECompararConsultaPRO'...");    
    try{
        const browser = await puppeteer.launch();

        const page = await browser.newPage();        
        await page.goto(`${url}?query=${submission}`);
        const html = await page.evaluate(() => document.documentElement.outerHTML);
        const json = html2json(html);
        const validResponseSubmission = json.child[0].child[2].child[1].child[0].child[0].child[0].text;
        const responseSubmission = json.child[0].child[2].child[1].child[0].child[2].child[0].text;
        const responseSubmissionJSON = JSON.parse(responseSubmission);
        
        const page2 = await browser.newPage();        
        await page2.goto(`${url}?query=${key}`);
        const html2 = await page.evaluate(() => document.documentElement.outerHTML);
        const json2 = html2json(html2);
        const validResponseKey = json.child[0].child[2].child[1].child[0].child[0].child[0].text;
        const responseKey = json2.child[0].child[2].child[1].child[0].child[2].child[0].text;
        const responseKeyJSON = JSON.parse(responseKey);

        let containedLines = responseKeyJSON._rows.length;
        if(chkOrder == 0){
            
            containedLines = 0;
            for(let i = 0; i < responseKeyJSON._rows.length; i++){
                for(let j = 0; j < responseSubmissionJSON._rows.length; j++){
    
                    if(responseSubmissionJSON._rows[j].toString() == responseKeyJSON._rows[i].toString()){
                        containedLines ++;
                        break;                    
                    }  
                }
            }
        }

        let sameNames: boolean = true;
        if(chkCols == 0){

            for(let i = 0; i < responseSubmissionJSON._schema._names.length; i++){
                if(responseSubmissionJSON._schema._names[i] != responseKeyJSON._schema._names[i]){
                    sameNames = false;
                    break;                    
                }  
            }
        }
        
        if((validResponseSubmission === 'true') && 
           (validResponseKey === 'true') &&
           (responseSubmission === responseKey || chkOrder == 0 || chkCols == 0) && 
           (containedLines == responseKeyJSON._rows.length) &&
           (sameNames) ){
            console.log('1');
        } else {
            console.log('0');            
        }
        
        await browser.close();
    }
    catch (err) {
        console.log('0');
        process.exit(); 
    }
}
import { readFile, verificarConsulta, executarECompararConsulta, executarECompararConsultaPRO } from './functions';

let relaxHost: string;
let relaxPort: string;
let relaxDatabase: string;
let urlRequest: string;
let submission: string;
let submissionBase64: string;
let key: string = '';
let keyBase64: string;

if(process?.argv?.length < 6){
    console.log("Error! Número de parâmetros em linha de comando menor do que o esperado.");
    process.exit();
}

if(process.argv[5].includes('.txt')){
    submission = readFile(process.argv[5]);
} else {
    submission = process.argv[5];
}

if(process?.argv?.length >= 7){
    if(process.argv[6].includes('.txt')){
        key = readFile(process.argv[6]);
    } else {
        key = process.argv[6];
    }

}

relaxHost = process.argv[2];
relaxPort = process.argv[3];
relaxDatabase = process.argv[4];

urlRequest = `${relaxHost}:${relaxPort}/relax/api/${relaxDatabase}`;

submissionBase64 = Buffer.from(submission).toString('base64');
keyBase64 = Buffer.from(key).toString('base64');

if(process?.argv?.length == 6){
    verificarConsulta(urlRequest, submissionBase64);
} else if(process?.argv?.length == 7){
    executarECompararConsulta(urlRequest, submissionBase64, keyBase64);
} else {
    let chkCols: number = process.argv[7] == '0' ? 0 : 1;
    let chkOrder: number = process.argv[8] == '0' ? 0 : 1;
    executarECompararConsultaPRO(urlRequest, submissionBase64, keyBase64, chkCols, chkOrder);
}
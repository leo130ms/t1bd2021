<?php 

// Pre-requisitos:
//    - Verificar se PHP estah instalado: php --version
//    - Caso não esteja instalado: https://www.php.net/manual/en/install.php
//    - Instalar biblioteca Chrome PHP (https://github.com/chrome-php/chrome)
// Para rodar: php example.php

require_once("vendor/autoload.php");

use HeadlessChromium\BrowserFactory;

$browserFactory = new BrowserFactory();

// starts headless chrome
$browser = $browserFactory->createBrowser();

try {
    // creates a new page and navigate to an url
    $page = $browser->createPage();
    $page->navigate('https://dbis-uibk.github.io/relax/api/local/uibk/local/0?query=UiBqb2luIFMgam9pbiBU')->waitForNavigation();

    // evaluate script in the browser
    $evaluation = $page->evaluate('document.documentElement.innerHTML');

    // wait for the value to return and get it
    $value = $evaluation->getReturnValue();
} finally {
    // bye
    $browser->close();
}

echo $value;

?>
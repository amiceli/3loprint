<?php

use Dompdf\Dompdf;

require_once __DIR__ . '/vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('./view/');
$twig = new Twig_Environment($loader, array(
    'cache' => './cache',
    'auto_reload' => true
));

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

$klein = new \Klein\Klein();

$klein->respond('GET', '/', function () use ($twig) {
    return $twig->render('app.twig', array('DEV' => getenv('DEV')));
});

$klein->respond('GET', '/pdf/[:link]', function ($request, $response) {
    $link = $request->param('link');

    $response->file("./public/pdf/$link.pdf");
});

$klein->respond('POST', '/generate', function ($request, $response, $service) use ($twig) {
    $postIts = json_decode($request->body())->postIts;

    $html = $twig->render('index.twig', array('postIts' => $postIts->postIts));

    $dompdf = new Dompdf();
    $dompdf->loadHtml($html);
    $dompdf->setPaper('A4', 'landscape');
    $dompdf->render();

    $output = $dompdf->output();
    $name = time();

    file_put_contents("public/pdf/$name.pdf", $output);

    return "$name";
});

$klein->dispatch();

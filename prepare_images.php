<?php

$baseUrl = 'http://lorempixel.com';
$categories = ['abstract', 'city', 'people', 'transport', 'animals', 'food', 'nature', 'business', 'nightlife',
    'sports', 'cats', 'fashion', 'technics'];
$size = '240';
$number = 1;

$savePath = __DIR__ . '/images';

foreach ($categories as $category) {
    for ($number = 1; $number <= 10; $number++) {
        if (file_exists("$savePath/$category/$number.jpg")) {
            continue;
        }

        $url = "$baseUrl/$size/$size/$category/$number/";

        $file = file_get_contents($url);
        if ($file === false) {
            continue 2;
        }
        if (!file_exists("$savePath/$category")) {
            if (!mkdir("$savePath/$category", 0755) && !is_dir("$savePath/$category")) {
                throw new \RuntimeException(sprintf('Directory "%s" was not created', "$savePath/$category"));
            }
        }
        file_put_contents("$savePath/$category/$number.jpg", $file);
    }
}

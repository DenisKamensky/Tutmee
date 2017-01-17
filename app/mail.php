<?php

$recepient = "dmitriy.shpa@tutmee.ru";
$sitename = "тестовая верстка";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$text = trim($_POST["text"]);
$message = "Имя: $name \nТелефон: $phone \nТекст: $text";

$pagetitle = "Новое письмо с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
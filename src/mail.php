<?php

require_once('phpmailer/PHPMailerAutoload.php');

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$city = $_POST['user_city'];
$product = $_POST['product_input'];

$utm_source = $_POST['utm_source'];
$utm_medium = $_POST['utm_medium'];
$utm_campaign = $_POST['utm_campaign'];
$utm_content = $_POST['utm_content'];
$utm_term = $_POST['utm_term'];



$mail->isSMTP();  
$mail->Host = 'smtp.yandex.ru';
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'zakaz@prod.art'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'yfnnmvwtqchqcbke'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('zakaz@prod.art'); // от кого будет уходить письмо?
$mail->addAddress('zakaz@prod.art');   
$mail->isHTML(true);

$mail->Subject = 'Заявка с Лендинга prod.art';
$mail->Body = '  <hr><br> Имя : '.$name ; 
$mail->Body .= ' <br>телефон : '.$phone;
$mail->Body .= ' <br>Почта : '.$email;
$mail->Body .= ' <br> Город : '.$city;
$mail->Body .= ' <br> Продукт : '.$product;
if (!empty($utm_source)) {
    $mail->Body .= ' <hr><br> UTM Источник трафика: : '. $utm_source;
}
if (!empty($utm_medium)) {
    $mail->Body .= ' <br> UTM Тип трафика: ' . $utm_medium;
}
if (!empty($utm_campaign)) {
   $mail->Body .=  '<br> UTM Название кампании: '. $utm_campaign;
}
if (!empty($utm_content)) {
    $mail->Body .= ' <br> UTM Контент: ' . $utm_content;
}
if (!empty($utm_term)) {
    $mail->Body .=  '<br> UTM Ключевые слова:'. $utm_term;
}
$mail->Body .= ' <hr><br> URL реферера: ' . $_SERVER['HTTP_REFERER'];
$mail->AltBody = '';




$clientMail = new PHPMailer;
$clientMail->CharSet = 'UTF-8';


$letter = file_get_contents('letter.html');

$clientMail->isSMTP();
$clientMail->Host = 'smtp.yandex.ru';
$clientMail->SMTPAuth = true;                               // Enable SMTP authentication
$clientMail->Username = 'zakaz@prod.art'; // Ваш логин от почты с которой будут отправляться письма
$clientMail->Password = 'kaguibsmowxmhbup'; // Ваш пароль от почты с которой будут отправляться письма
$clientMail->SMTPSecure = 'ssl';
$clientMail->Port = 465; 
$clientMail->setFrom('zakaz@prod.art');
$clientMail->addAddress($email);
$clientMail->Subject = "Prod.art - Продукт как Искусство!";
$clientMail->Body = $letter;
$clientMail->isHTML(true);
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: /after_form.html');
}
if(!$clientMail->send()) {
    echo 'Error';
} else {
    header('location: /after_form.html');
}
?>
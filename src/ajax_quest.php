<?php
$ploshaddoma = $_POST["ploshaddoma"];
$remont = $_POST["remont"];
$vibordom = $_POST["vibordom"];
$phone = $_POST["phone"];
$date = date('Y-m-d');
$token = "1868717483:AAGn3vDpgSCBGudobdJL1w6WwWgtZQajlIU";
$chat_id = "-1001783219858";
$arr = array(
   'Заявка с сайта' => '',
   'Пожелания по ремонту: ' => $vibordom,
   'Клиент хочет: ' => $remont,
   'Площадь дома: ' => $ploshaddoma,
   'Телефон для связи: ' => $phone
);

foreach ($arr as $key => $value) {
   $txt .= "<b>" . $key . "</b> " . $value . "%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

$true = $sendToTelegram;
$data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);
echo $data_json;

$link = new mysqli("localhost", "i95009gc_str", "klipSD2", "i95009gc_str");
$link->query("INSERT INTO my_client(phone, vibordom, remont, ploshad_doma, date) VALUES (\"$phone\", \"$vibordom\", \"$remont\", \"$ploshaddoma\", '$date')");
$link->close();

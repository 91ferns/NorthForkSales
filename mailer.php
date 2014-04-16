<?php

$name = (isset($_POST['FullName']) && !empty($_POST['FullName'])) ? $_POST['FullName'] : false;
$co = (isset($_POST['Company']) && !empty($_POST['Company'])) ? $_POST['Company'] : false;
$message = (isset($_POST['Message']) && !empty($_POST['Message'])) ? $_POST['Message'] : false;
$email = (isset($_POST['Email']) && !empty($_POST['Email'])) ? $_POST['Email'] : false;

$headers = array(sprintf("Reply-to: %s", $email), "From: mailer@northforksales.com");

mail( "jhamlett@northforksales.com", "New Message from ".$name, $message."\n\nCompany: ".$co, implode("\r\n", $headers ) );

header("Location: /?msg=sent");exit;

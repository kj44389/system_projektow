<?php

$json = file_get_contents('php://input');
$data = json_decode($json);
$con = mysqli_connect('localhost','root','','projekt');
if (!$con) {
	die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"projekt");
mysqli_set_charset($con, "utf8");
$sql="SELECT * FROM `uzytkownicy` WHERE `e-mail` = '".$data->email."' AND `Haslo` = '".$data->pass."'";
$result = mysqli_query($con,$sql);
$return_arr = array();
while($row = mysqli_fetch_array($result)){
	$uid = $row['Id_Uzytkownika'];
	$name = $row['imie'];
	$surname = $row['nazwisko'];
	$return_arr[] = array('uid' => $uid,
	'name' =>   $name,
	'surname' => $surname,
);
}
echo json_encode($return_arr);
mysqli_close($con);

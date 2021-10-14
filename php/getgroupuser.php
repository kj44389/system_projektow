<?php

$json = file_get_contents('php://input');
$data = json_decode($json);
$con = mysqli_connect('localhost','root','','projekt');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"projekt");
mysqli_set_charset($con, "utf8");
$return_arr = array();
 $sql="SELECT * FROM `uzytkownicy_grupa` WHERE `Id_Uzytkownika` = '".$data->uid."'";
 $result = mysqli_query($con,$sql);
  while($row = mysqli_fetch_array($result)){
    $id_grupy = $row['Id_Grupy'];
    $return_arr[] = array('gid' => $id_grupy,
                      );
  }


echo json_encode($return_arr);
mysqli_close($con);
?>

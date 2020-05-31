<?php
  $data = json_decode($_POST['data']);
  $con = mysqli_connect('localhost','root','','projekt');
  if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
  }
  mysqli_select_db($con,"projekt");
  mysqli_set_charset($con, "utf8");
  $sql="INSERT INTO `zadania_uzytkownicy` (`Id_Uzytkownika`, `Id_zadania`) VALUES ('".$data->uid."', '".$data->tid."')";
  $result = mysqli_query($con,$sql);
  mysqli_close($con);
?>

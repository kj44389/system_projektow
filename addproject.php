<?php
  $data = json_decode($_POST['data']);
  $con = mysqli_connect('localhost','root','','projekt');
  if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
  }
  mysqli_select_db($con,"projekt");
  mysqli_set_charset($con, "utf8");
  $gid = intval($data->gid);
  $sql="INSERT INTO `projekt` (`Id_Projektu`, `Nazwa_Projektu`, `data_rozpoczecia`, `data_zakonczenia`, `status`, `Opis_Projektu`, `id_Grupy`) VALUES (NULL, '".$data->name."', '".$data->dr."', NULL, '0', '".$data->descr."', '".$gid."')";
  $result = mysqli_query($con,$sql);
  mysqli_close($con);
  ?>

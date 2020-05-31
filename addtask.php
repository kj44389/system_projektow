<?php
  $data = json_decode($_POST['data']);
  $con = mysqli_connect('localhost','root','','projekt');
  if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
  }
  mysqli_select_db($con,"zadania");
  mysqli_set_charset($con, "utf8");
  $sql="INSERT INTO `zadania` (`Id_zadania`, `Nazwa_Zadania`, `Status`, `Data_zakonczenia`, `Data_rozpoczecia`, `Opis_zadania`, `Nr_Kolejnosci`) VALUES (NULL, '".$data->name."', 0, NULL, '".$data->dr."', '".$data->descr."', 1)";
  $result = mysqli_query($con,$sql);
  mysqli_close($con);
?>

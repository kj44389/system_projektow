<?php
  //$json = json_decode([{"tid":"3"},{"tid":"5"}]);
  $data = $_POST['data'];
  $con = mysqli_connect('localhost','root','','projekt');
  if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
  }
  $data = implode( ", ", $data );
  mysqli_select_db($con,"projekt");
  mysqli_set_charset($con, "utf8");
  $sql="SELECT * FROM `zadania` WHERE `Id_zadania` IN($data)";
  $result = mysqli_query($con,$sql);
  $return_arr = array();


  while($row = mysqli_fetch_array($result)){
    $nazwa = $row['Nazwa_Zadania'];
    $status = $row['Status'];
    $data_rozpoczecia = $row['Data_rozpoczecia'];
    $data_zakonczenia = $row['Data_zakonczenia'];
    $opis = $row['Opis_zadania'];
    $return_arr[] = array('nazwa' => $nazwa,
                              'status' =>   $status,
                              'data_rozpoczęcia' => $data_rozpoczecia,
                              'data_zakonczenia' => $data_zakonczenia,
                              'opis' =>  $opis
                      );
  }
  echo json_encode($return_arr);
  mysqli_close($con);
  ?>

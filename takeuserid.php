<?php
  $data = json_decode($_POST['data']);
  $con = mysqli_connect('localhost','root','','projekt');
  if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
  }
  mysqli_select_db($con,"projekt");
  mysqli_set_charset($con, "utf8");
  $sql="SELECT * FROM `uzytkownicy` WHERE `imie` = '".$data->name."' AND `nazwisko` = '".$data->surname."'";
  $result = mysqli_query($con,$sql);
  $return_arr = array();


  while($row = mysqli_fetch_array($result)){
      $uid = $row['Id_Uzytkownika'];
      $return_arr[] = array('uid' => $uid
                        );
  }
  echo json_encode($return_arr);
  mysqli_close($con);
  ?>

<?php

$data = $_POST['data'];

$con = mysqli_connect('localhost','root','','projekt');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

$data = implode( ", ", $data );

mysqli_select_db($con,"projekt");
mysqli_set_charset($con, "utf8");
$sql="SELECT * FROM `projekt` WHERE `id_Grupy` IN($data) AND `data_zakonczenia` IS NULL";
$result = mysqli_query($con,$sql);
$return_arr = array();


while($row = mysqli_fetch_array($result)){
    $pid = $row['Id_Projektu'];
    $nazwa_projektu = $row['Nazwa_Projektu'];
    $data_rozpoczecia = $row['data_rozpoczecia'];
    $status = $row['status'];
    $gid = $row['id_Grupy'];

    $return_arr[] = array('pid' => $pid,
                              'nazwa_projektu' =>   $nazwa_projektu,
                              'data_rozpoczęcia' => $data_rozpoczecia,
                              'status' => $status,
                              'gid' =>  $gid
                      );
}
echo json_encode($return_arr);
mysqli_close($con);
?>

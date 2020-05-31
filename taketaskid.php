<?php
$data = json_decode($_POST['data']);
$con = mysqli_connect('localhost','root','','projekt');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}
mysqli_select_db($con,"projekt");
mysqli_set_charset($con, "utf8");
$sql="SELECT * FROM `zadania` WHERE `Nazwa_Zadania` = '".$data->name."'";
$result = mysqli_query($con,$sql);
$return_arr = array();


while($row = mysqli_fetch_array($result)){
    $tid = $row['Id_zadania'];
    $return_arr[] = array('tid' => $tid
                      );
}
echo json_encode($return_arr);
mysqli_close($con);
?>

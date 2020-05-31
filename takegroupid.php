<?php
$data = json_decode($_POST['data']);
$con = mysqli_connect('localhost','root','','projekt');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}
mysqli_select_db($con,"projekt");
mysqli_set_charset($con, "utf8");
$sql="SELECT * FROM `projekt` WHERE `Id_Projektu` = '".$data->pid."'";
$result = mysqli_query($con,$sql);
$return_arr = array();

while($row = mysqli_fetch_array($result)){
    $gid = $row['id_Grupy'];
    $return_arr[] = array('gid' => $gid
                      );
}
echo json_encode($return_arr);
mysqli_close($con);
?>

<?php
if($_POST[username]=='')
{
    exit("无");
}

$username=$_POST[username];
//print_r($username);
$file = fopen("./userdata.txt", "r");
$exist = 0; //0代表不存在
$i = 0;
while(!feof($file))
{
  $datas = fgets($file);
  if(substr_count($datas,$username)>0)
  {
      print_r(json_decode($datas)->plate);
      $exist++;
      break;
  }
  $i++;
}
if($exist==0)
{
    print_r("无");
}
//echo("ok");
?>
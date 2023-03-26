<?php
$username=$_POST[username];
$lock_id=$_POST[lock_id];
$plate=$_POST[plate];

$exist = 0; //0代表不存在
$line = 0;

function delTargetLine($filePath, $target)
{
    $result = null;
    $fileCont = file_get_contents($filePath);
    $targetIndex = strpos($fileCont, $target); #查找目标字符串的坐标
    if ($targetIndex !== false) {
        #找到target的前一个换行符
        $preChLineIndex = strrpos(substr($fileCont, 0, $targetIndex + 1), "\n");
        #找到target的后一个换行符
        $AfterChLineIndex = strpos(substr($fileCont, $targetIndex), "\n") + $targetIndex;
        if ($preChLineIndex !== false && $AfterChLineIndex !== false) {
            #重新写入删掉指定行后的内容
            $result = substr($fileCont, 0, $preChLineIndex + 1) . substr($fileCont, $AfterChLineIndex + 1);
            file_put_contents($filePath, $result);
            //$fp = fopen($filePath, "w+");
            //fwrite($fp, $result);
            //fclose($fp);
        }
    }
}

$file = fopen("./userdata.txt", "r");
$i = 0;
while(!feof($file))
{
  $datas = fgets($file);
  if(substr_count($datas,$username)>0)
  {
      $exist++;
      $line = $i;
      //print_r($line);
  }
  $i++;
  //$datas = json_decode(fgets($file)); //fgets()函数从文件指针中读取一行
  //print_r($datas);
}
  
if($exist==0)
{
    $data = array('username' => $username, 'lock_id' => $lock_id, 'plate' => $plate);
    $json_data = json_encode($data, JSON_UNESCAPED_UNICODE);
    //将数组添加到指定的text文件中
    file_put_contents("./userdata.txt",$json_data."\r\n",FILE_APPEND);
}
if($exist>0)
{
    $i = 0;
    while($i<=$line)
    {
      if($i==$line)
      {
          $data = fgets(fopen("./userdata.txt", "r"));
          delTargetLine("./userdata.txt",$username);
          $newdata = array('username' => $username, 'lock_id' => $lock_id, 'plate' => $plate);
          $json_data = json_encode($newdata, JSON_UNESCAPED_UNICODE);
          //将数组添加到指定的text文件中
          file_put_contents("./userdata.txt",$json_data."\r\n",FILE_APPEND);
          //print_r();
          break;
      }
      $i++;
    }
    
}


echo("ok");
?>
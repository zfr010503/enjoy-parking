<!-- 
   Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
-->
<!DOCTYPE html>
<html>
<head>
  <title>智能地锁实时监控</title>
  
  
  <style>
    html{
        background-color: #f2f9ff;
        margin: 0;
    }
    .flex-container {
      display: flex;
      flex-wrap: wrap;
    }
    .flex-container > div {
      text-align: center;
      margin: 10px;
      border-radius: 4px;
      background-color: #fff;
      padding: 10px;
      box-shadow: 1px 1px 3px 0px #dedede;
    }
  </style>
</head><body>
<h2>智能地锁监控</h2>
<?php
echo "<div style='color:gray'>（刷新网页可查看最新上传图片）</div></br>";
  // Image extensions
  $image_extensions = array("png","jpg","jpeg","gif");
  // Check delete HTTP GET request - remove images
  if(isset($_GET["delete"])){
    $imageFileType = strtolower(pathinfo($_GET["delete"],PATHINFO_EXTENSION));
    if (file_exists($_GET["delete"]) && ($imageFileType == "jpg" ||  $imageFileType == "png" ||  $imageFileType == "jpeg") ) {
      echo "File found and deleted: " .  $_GET["delete"];
      unlink($_GET["delete"]);
    }
    else {
      echo '找不到文件 - <a href="./index.php">刷新</a>';
    }
  }
  // Target directory
  $dir = './';
  if (is_dir($dir)){
    echo '<div class="flex-container">';
    $count = 1;
    $files = scandir($dir);
    rsort($files);
    foreach ($files as $file) {
      if ($file != '.' && $file != '..' && $file != 'index.php'&& $file != 'getpicture.php'&& $file != 'parkinglot.webp') {?>
        <div>
          <a href="<?php echo $dir . $file; ?>">
            <img src="<?php echo $dir . $file; ?>" style="width: 350px;" alt="" title=""/>
          </a>
          <p><a href="./index.php?delete=<?php echo $dir . $file; ?>">删除</a> - <?php echo $file; ?></p>
       </div>
<?php
       $count++;
      }
    }
  }
  if($count==1) { echo "<p>No images found</p>"; } 
?>
  </div>
</body>
</html>
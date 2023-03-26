
<div>
  <h1 style="text-align: center;">智能地锁实时监控</h1>
</div>
<div>
<?php
echo "<div style='color:gray; text-align: center;' >（返回再进入可查看最新上传图片）</div></br>";
  // Target directory
  //$dir = 'http://47.106.193.22/uploads/';
  $dir = './';
  $url = 'http://47.106.193.22/uploads/';
  if (is_dir($dir)){
    echo '<div class="flex-container" style="display: flex;flex-wrap: wrap;">';
    $count = 1;
    $files = scandir($dir);
    rsort($files);
    foreach ($files as $file) {
      if ($file != '.' && $file != '..' && $file != 'index.php'&& $file != 'getpicture.php' && $file != 'parkinglot.webp') {?>
        <div style="
        text-align: center;
        margin:10px;
        border-radius: 8px;
        padding: 10px;
        background-color: #fff;
        box-shadow: 1px 1px 3px 0px #dedede;
        ">
            <img src="<?php echo $url . $file; ?>" style="width: 100%;;" alt="" title=""/>
       </div>
<?php
       $count++;
      }
    }
  }
  if($count==1) { echo "<p>地锁还没有更新图片</p>"; } 
?>
 </div>
</div>
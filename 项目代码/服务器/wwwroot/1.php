
<?php
function get_token($url = '', $param = '') 
    {
        if (empty($url) || empty($param)) {
            return false;
        }
        
        $postUrl = $url;
        $curlPost = $param;
        $curl = curl_init();//初始化curl
        curl_setopt($curl, CURLOPT_URL,$postUrl);//抓取指定网页
        curl_setopt($curl, CURLOPT_HEADER, 0);//设置header
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
        curl_setopt($curl, CURLOPT_POST, 1);//post提交方式
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
        $data = curl_exec($curl);//运行curl
        curl_close($curl);
        
        return $data;
    }

	$url = 'https://aip.baidubce.com/oauth/2.0/token';
    $post_data['grant_type']       = 'client_credentials';
    $post_data['client_id']      = 'ucLO4tZinctGi4CPGKVUy0pp';
    $post_data['client_secret'] = 'ORHXBGIER9rC8O9jnbarUzoGcCUuyyVh';
    $o = "";
    foreach ( $post_data as $k => $v ) 
    {
    	$o.= "$k=" . urlencode( $v ). "&" ;
    }
    $post_data = substr($o,0,-1);
    
    $res = get_token($url, $post_data);

    // var_dump($res);
    
    $access_token = json_decode($res)->access_token;
    
    // var_dump($access_token);

/**
* 发起http post请求(REST API), 并获取REST请求的结果
* @param string $url
* @param string $param
* @return - http response body if succeeds, else false.
*/
function request_post($url = '', $param = '')
    {
        if (empty($url) || empty($param)) {
            return false;
        }
    
        $postUrl = $url;
        $curlPost = $param;
        // 初始化curl
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $postUrl);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        // 要求结果为字符串且输出到屏幕上
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        // post提交方式
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
        // 运行curl
        $data = curl_exec($curl);
        curl_close($curl);
    
        return $data;
    }

    $token = $access_token;
    $url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/license_plate?access_token=' . $token;
    $img = file_get_contents('./uploads/2022.05.19_19:53:39_640x480.jpg');
    $img = base64_encode($img);
    $bodys = array(
        'image' => $img
    );
    $res = request_post($url, $bodys);
    
    $licence_plate = json_decode($res)->words_result->number;
    
    // var_dump($licence_plate);

?>
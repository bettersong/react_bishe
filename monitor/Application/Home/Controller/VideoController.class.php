<?php
/**
 * Created by PhpStorm.
 * User: songy
 * Date: 2019/8/3
 * Time: 22:21
 */

namespace Home\Controller;

use Think\Controller;
use Think\Model;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class videoController extends Controller
{
    public function saveVideoAPI(){
        $movie = $_POST['videoData'];
//        $data['movie'] = $_POST['videoData'];
//        $data['time'] = $_POST['savetime'];
//        $model = new Model('video_list');
//        $res = $model->add($data);
//        echo $res;
        echo json_encode($movie);
    }
    public function getVideoAPI(){
        $model = new Model('video_list');
        $res = $model->select();
        echo json_encode($res);
    }
}



<?php
/**
 * Created by PhpStorm.
 * User: songy
 * Date: 2019/8/5
 * Time: 21:51
 */

namespace Home\Controller;


use Think\Controller;
use Think\Model;
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class MytestController extends Controller {
    public function myTestAPI(){
        $model = new Model('mytest');
        $res = $model->select();
        echo json_encode($res);
    }
}
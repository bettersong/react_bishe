<?php
/**
 * Created by PhpStorm.
 * User: songy
 * Date: 2019/8/11
 * Time: 19:34
 */

namespace Home\Controller;


use Think\Controller;
use Think\Model;
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class LinkController extends Controller
{
    public function getLinkDataAPI(){
        $model = new Model('link_data');
        $res = $model -> select();
        echo json_encode($res);
    }
}
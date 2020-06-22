<?php
/**
 * Created by PhpStorm.
 * User: songy
 * Date: 2019/7/30
 * Time: 12:37
 */

namespace Home\Controller;


use Think\Controller;
use Think\Model;
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class LoginController extends Controller
{
    public function login(){
        $username = $_POST['username'];
        $password = $_POST['password'];
        $user = new Model('user');
        $res = $user->where("username='$username' AND password = '$password'")->find();
        if($res == null){
            echo 0;
        }else{
            echo 1;
        }
    }
    public function getUserMsgAPI(){
        $username = $_POST['username'];
        $model = new Model('user');
        $res = $model->where("username='$username'")->find();
        echo json_encode($res);
    }
    public function updateUserMsgAPI(){
        $userInfo = json_decode($_POST['userInfo']);
        $data['id'] = $userInfo -> id;
        $data['username'] = $userInfo -> username;
        $data['gender'] = $userInfo -> gender;
        $data['telephone'] = $userInfo -> telephone;
        $data['email'] = $userInfo -> email;
        $data['city'] = $userInfo -> city;
        $data['photo'] = $userInfo -> photo;
        $model = new Model('user');
        $res = $model->save($data);
        echo $res;
    }
}
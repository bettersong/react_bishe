<?php
/**
 * Created by PhpStorm.
 * User: songy
 * Date: 2019/7/31
 * Time: 12:54
 */

namespace Home\Controller;

use Think\Controller;
use Think\Model;
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
class WarnningDataController extends Controller
{
//    查询
    public function getWarnningDataAPI(){
        $model = new Model('warn_message');
        $warn_message = $model->order('id desc')->select();
        $data['warn_message'] = $warn_message;  //警报信息
        $model2 = new Model('co2_data');
        $data['co2_data'] = $model2->select();    //co2数据
        $model3 = new Model('pm_data');
        $data['pm_data'] = $model3->select();     //pm2.5数据
        $model4 = new Model('temp_data');
        $data['temp_data'] = $model4->select();   //温度数据
        $model5 = new Model('humi_data');
        $data['humi_data'] = $model5->select();   //湿度数据
        echo json_encode($data);
    }
//    添加
    public function addWarnDataAPI(){
        $data['equipment'] = $_POST['equipment'];
        $data['warncontent'] = $_POST['warncontent'];
        $data['warnlever'] = $_POST['warnlever'];
        $data['warntime'] = $_POST['warntime'];
        $data['warnstate'] = '未处理';
        if($data['warnlever'] == 'Ⅴ'){
            $data[warnclass] = 'red';
        }else if($data['warnlever'] == 'Ⅳ'){
            $data[warnclass] = 'orange';
        }else if($data['warnlever'] == 'Ⅲ'){
            $data[warnclass] = 'yellow';
        }else if($data['warnlever'] == 'Ⅱ'){
            $data[warnclass] = 'blue';
        }else if($data['warnlever'] == 'Ⅰ'){
            $data[warnclass] = 'green';
        }
        $model = new Model('warn_message');
        $res = $model->add($data);
        echo $res;
    }
//    批量删除或单个删除
    public function bandDeleteAPI(){
        $ids = json_decode($_POST['ids']);
        echo json_encode($ids);
       //判断ids是否为数组
        if(is_array($ids)){
            $where = 'id in('.implode(',',$ids).')';
        }else{
            $where = 'id='.$ids;
        }
        $model = new Model('warn_message');
        $res = $model->where($where)->delete();
        echo $res;
    }
//    保存编辑
    public function saveEditAPI(){
        $data['id'] = $_POST['id'];
        $data['warncontent'] = $_POST['warncontent'];
        $data['warnstate'] = $_POST['warnstate'];
        $model = new Model('warn_message');
        $res = $model->save($data);
        echo $res;
    }
//    按时间段统计数据
    public function getDataByDateAPI(){
//
        echo json_encode(date('Y-m-d'));

    }
}
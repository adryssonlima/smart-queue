<?php 

namespace app\controllers;

use yii\web\Controller;
use Yii;
class CenarioController extends Controller
{
	public function actionIndex()
	{
		return $this->render('index');
	}
	
	public function actionTeste()
	{
		$data = Yii::$app->request->post();
		$x = json_encode($data);
		echo $x;
	}
	
}

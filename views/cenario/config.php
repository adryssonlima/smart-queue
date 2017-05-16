<?php
/* @var $this yii\web\View */

$this->title = 'Cenário';
/*
$this->registerJsFile ( '@web/js/bootstrap-toggle.js', [ 
		'depends' => [ 
				\yii\web\JqueryAsset::className () 
		] 
]);
*/
$this->registerCssFile("@web/css/bootstrap-toggle.min.css");

$this->registerJsFile ( '@web/js/cenario.js', [ 
		'depends' => [ 
				\yii\web\JqueryAsset::className () 
		] 
]);

$this->registerJsFile ( '@web/js/classes.js', [
		'depends' => [
				\yii\web\JqueryAsset::className ()
		]
]);	

$this->registerJsFile ( '@web/js/aplicacao.js', [
		'depends' => [
				\yii\web\JqueryAsset::className ()
		]
]);	

?>


<div class="panel panel-primary">
	<div class="panel-heading" data-toggle="collapse" data-target="#configuracao">
    	<h3 class="panel-title">Configurações</h3>
  	</div>
  	<div id="configuracao" class="panel-collapse collapse in">
	  	<div class="panel-body">
	    	<form id="formConfig" action="cenario/teste" method="post">
				<div class="row form-group">
					<div class="col-md-6">
						<label for="nBarb">Barbeiros</label> 
						<select id="nBarb" name="nBarb" class="form-control">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="nFila">Filas</label> 
						<select id="nFila" name="nFila" class="form-control">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</select>
					</div>
				</div>

				<div id="barbeiros" class="row">
					<div class="col-md-3">
						<div class="form-group">
							<label for="b1">Barbeiro 1</label>
							<select id="b1" name="politica1" class="sb form-control input-sm">
								<option value="FIFO">FIFO</option>
								<option value="RR">Tempo Compartilhado</option>
								<option value="RTOS">Tempo Real</option>
								<option value="SJF">SJF (Menor Tempo)</option>
							</select>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<button style="width: 100%" type="submit" class="btn btn-info">Montar cenário</button>
					</div>
				</div>
			</form>
	  	</div>
	</div>
</div>
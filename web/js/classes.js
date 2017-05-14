class Barbearia 
{	
	constructor()
	{
		this.barbeiros = [];
		this.filas= [];
	}
	
	addB(tipo, id, quantum)
	{
		switch(tipo)
		{
			case "FIFO":
				this.barbeiros.push(new Fifo(id));
				break;	
			case "RR":
				this.barbeiros.push(new Rr(id, quantum));
				break;
			case "RTOS":
				this.barbeiros.push(new Rtos(id));
				break;
			case "SJF":
				this.barbeiros.push(new Sjf(id));
		}
	}

	addF(id, prioridade)
	{
		this.filas.push(new Fila(id, prioridade));
	}
	
	cortar(id)
	{
		this.barbeiros[id].cortar();
	}

	montaCenario(data)
	{
		var html;
	    //barbeiros
		for(var i=0, html=""; i<data.nBarb; i++)
		{
			var quantum = eval('data.qb'+(i+1)) ? eval('data.qb'+(i+1)) : " - "; 
			this.addB(eval('data.politica'+(i+1)), i+1, quantum);
	        
			html += "<div class='row'>";
			html += "<img src='web/img/bDormindo.png' class='img-responsive' alt='Responsive image'>";
			html += "<span class='label label-info'><span class='glyphicon glyphicon-cog' aria-hidden='true'></span> "+eval('data.politica'+(i+1))+"</span><br>";
			html += "<span class='label label-warning'><span class='glyphicon glyphicon-time' aria-hidden='true'></span> "+quantum+"</span>";
	        html += "</div>";	
		}
		$('#barb').html(html);
	    //filas
	    for(var i=0, html=""; i<data.nFila; i++)
	    {
	        html += "<div class='row'>";
	        for(var j=0; j<5; j++)
	        {
	            html += "<div class='col-md-2'>";
	            html += "<img src='web/img/cVazia.png' class='img-responsive' alt='Responsive image'>";
	            //html += "<div class='row' align='center'>";
	            html += "<span class='label label-danger'>";
	            html += "<span class='glyphicon glyphicon-user' aria-hidden='true'></span> user  |  ";
	            html += "<span class='glyphicon glyphicon-time' aria-hidden='true'></span> time";
	            html += "</span>";
	            //html += "</div>";
	            html += "</div>";
	        }
	        html += "</div>";
	    }
	    $('#filas').html(html);
	}
};

class Fila
{
	constructor(id, prioridade)
	{
		this.id = id;
		this.prioriade = prioridade;
		this.cadeiras = [5];
	}

	addCliente()
	{
		
	}
}

class Barbeiro
{
	constructor(id)
	{
		this.id = id;
		this.cliente = null;
		this.interval;
	}
	
	cortar() 
	{
		console.log("sou fifo");
		this.interval = setInterval(function(){
			$('#mtime').html(this.cliente_time-=1);
		}.bind(this), 1000);

		setTimeout(function(){
			clearInterval(this.interval);
		}.bind(this), 5000);
	}

	atualizar()
	{
		if(this.cliente == null)
		{
			$('#barb'+this.id).html("ta livre");
		}
		else
		{
			$('#barb'+this.id).html("ta ocupado");
		}
	}
}

class Fifo extends Barbeiro
{
	constructor(id)
	{
		super(id);
	}
}

class Rr extends Barbeiro
{
	constructor(id, quantum)
	{
		super(id);
		this.quantum = quantum;
	}

	cortar()
	{
		console.log("sou rr");
	}
}

class Sjf extends Barbeiro
{
	constructor(id)
	{
		super(id);
	}

	cortar()
	{
		console.log("sou sjf");
	}
}

class Rtos extends Barbeiro
{
	constructor(id)
	{
		super(id);
	}

	cortar()
	{
		console.log("sou rtos");
	}
}
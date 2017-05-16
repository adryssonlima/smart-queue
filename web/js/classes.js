class Barbearia 
{	
	constructor()
	{
		this.barbeiros = [];
		this.filas = [];
		this.cont = 1;
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
	
	addCliente(fila, tempo)
	{
		this.filas[fila].addCliente(this.cont, tempo);
		this.cont++;
		this.verifica(fila);
	}

	verifica(fila)
	{
		var pFila = this.filas[fila].prioridade;
		for(var i=0; i<this.barbeiros.length; i++)
		{
			if(this.barbeiros[i] instanceof Rtos && this.barbeiros[i].cliente != null)
				if(this.barbeiros[i].cliente.prioridade < pFila)
				{
					var botao = $('button[idbarb="'+this.barbeiros[i].id+'"]');
					this.trocaContexto(this.barbeiros[i].id);
					this.cortar(this.barbeiros[i].id-1, botao);
				}
		}
	}

	cortar(id, botao)
	{
		if(this.barbeiros[id] instanceof Sjf)
			this.barbeiros[id].cliente = this.pegaMCliente();
		else
			this.barbeiros[id].cliente = this.pegaCliente();
		
		if(this.barbeiros[id].cliente)
		{
			this.atualizaBarbeiro(id);
			this.barbeiros[id].cortar(botao, this);
			return true;
		}
		return false;
	}

	pegaMCliente()
	{
		for(var i=0; i<this.filas.length; i++)
		{
			if(this.filas[i].cadeiras.length > 0)
			{
				var cliente = this.filas[i].pegaMCliente();
				this.atualizaFila(i);
				return cliente;
			}
		}
	}

	pegaCliente()
	{
		for(var i=0; i<this.filas.length; i++)
		{
			if(this.filas[i].cadeiras.length > 0)
			{
				var cliente = this.filas[i].pegaCliente();
				this.atualizaFila(i);
				return cliente;
			}
		}
	}

	finalizar(id, botao)
	{
		this.barbeiros[id].finalizar(botao);
	}

	atualizaFila(fila)
	{
		this.filas[fila].atualizar();
	}

	trocaContexto(idBarb, botao)
	{
		var cliente = this.barbeiros[idBarb-1].cliente;
		var idFila = this.filas.length - cliente.prioridade;
		this.filas[idFila].devolveCliente(cliente);
		this.barbeiros[idBarb-1].finalizar(botao);
	}

	atualizaBarbeiro(id)
	{
		this.barbeiros[id].atualizar();
	}

	montaCenario(data)
	{
		var html;
	    //barbeiros
	    $('#barb').empty();
		for(var i=0, html=""; i<data.nBarb; i++)
		{
			var quantum = eval('data.qb'+(i+1)) ? eval('data.qb'+(i+1)) : " - "; 
			this.addB(eval('data.politica'+(i+1)), i+1, quantum);
	        html = ""
			html += "<div class='row'>";
			html += "<div id='barb"+(i+1)+"'></div>";
			html += "<span class='label label-info'><span class='glyphicon glyphicon-cog' aria-hidden='true'></span> "+eval('data.politica'+(i+1))+"</span><br>";
			html += "<span class='label label-warning'><span class='glyphicon glyphicon-time' aria-hidden='true'></span> "+quantum+"</span>";
			html += "<button idBarb='"+(i+1)+"' type='button' name='btnBarb' class='btn btn-success btn-xs'>Cortar</button>";
	        html += "</div>";	
	        $('#barb').append(html);
	        this.atualizaBarbeiro(i);
		}
		
	    //filas
	    $('#filas').empty();
	    for(var i=0; i<data.nFila; i++)
	    {
	    	html = "";
	        html += "<div class='row'>";
	        html += "<div id='prioridade"+(data.nFila-i)+"'>"+(data.nFila-i)+"</div>";
	        html += "<div id='fila"+(i+1)+"'>";
	        html += "</div>";
	        html += "<div class='col-md-2'>";
	        html += "<div class='input-group input-group-sm'>";
  			html += "<span btn='"+(i)+"' class='btn input-group-addon addCliente' id='sizing-addon3'>+Cliente</span>";
  			html += "<input type='number' min='1' class='form-control' value='1' aria-describedby='sizing-addon3'>";
			html += "</div>";
	        html += "</div>";
	        html += "</div>";
	        $('#filas').append(html);
	        this.addF(i+1, data.nFila-i);
	        this.atualizaFila(i);
	    }   
	}
};

class Fila
{
	constructor(id, prioridade)
	{
		this.id = id;
		this.prioridade = prioridade;
		this.cadeiras = [];
	}

	addCliente(id, tempo)
	{
		this.cadeiras.push(new Cliente(id, tempo, this.prioridade));
	}

	devolveCliente(cliente)
	{
		this.cadeiras.push(cliente);
		this.atualizar();
	}

	atualizar()
	{
		var html = "";
		for(var i=0; i<5; i++)
        {
        	var img = this.cadeiras[i] == null ? "web/img/cVazia.png" : "web/img/cOcupada.png";

            html += "<div class='col-md-2'>";
            html += "<img src='"+img+"' class='img-responsive' alt='Responsive image'>";
            
            if(this.cadeiras[i])
            {
	            html += "<span class='label label-danger'>";
	            html += "<span class='glyphicon glyphicon-user' aria-hidden='true'></span> "+this.cadeiras[i].id+"  |  ";
	            html += "<span class='glyphicon glyphicon-time' aria-hidden='true'></span> "+this.cadeiras[i].tempo+"";
	            html += "</span>";
            }
            html += "</div>";
        }
        $('#fila'+this.id).html(html);
	}

	pegaMCliente()
	{
		var menor = this.cadeiras[0];
		for(var i=0; i<this.cadeiras.length; i++)
		{
			if(parseInt(this.cadeiras[i].tempo) < parseInt(menor.tempo))
				menor = this.cadeiras[i];
		}
		var pos = this.cadeiras.indexOf(menor);
		this.cadeiras.splice(pos,1);
		return menor;
	}

	pegaCliente()
	{
		return this.cadeiras.shift();
	}
}

class Cliente
{
	constructor(id, tempo, prioridade)
	{
		this.id = id;
		this.tempo = tempo;
		this.prioridade = prioridade;
	}
}

class Barbeiro
{
	constructor(id)
	{
		this.id = id;
		this.cliente = null;
		this.interval;
		this.timeOut;
	}
	
	finalizar(botao)
	{
		clearInterval(this.interval);
		clearTimeout(this.timeOut);
		this.cliente = null;
		this.atualizar();
		if(botao)
		{
			botao.toggleClass('btn-success').toggleClass('btn-danger');
        	botao.hasClass('btn-success') ? botao.text("Cortar") : botao.text("Finalizar");
		}	
	}

	cortar(botao) 
	{
		this.interval = setInterval(function(){
			$('#tb'+this.id).html(this.cliente.tempo-=1);
		}.bind(this), 1000);
		this.timeOut = setTimeout(function(){
			clearInterval(this.interval);
			this.finalizar(botao);
		}.bind(this), this.cliente.tempo*1000);
	}

	atualizar()
	{
		var img = this.cliente == null ? "web/img/bDormindo.png" : "web/img/bCortando.png";
		var html = "";
		if(this.cliente)
		{
			html += "<img src='"+img+"' class='img-responsive' alt='Responsive image'>";
			html += "<span class='label label-danger'>";
	        html += "<span class='glyphicon glyphicon-user' aria-hidden='true'></span> "+this.cliente.id+"  |  ";
	        html += "<span class='glyphicon glyphicon-time' aria-hidden='true'></span> <k id='tb"+this.id+"'>"+this.cliente.tempo+"</k>";
	        html += "</span>";
	    }
	    else
	    {
	    	html += "<img src='"+img+"' class='img-responsive' alt='Responsive image'>";
	    }
	    $('#barb'+this.id).html(html);
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

	cortar(botao, b)
	{
		this.interval = setInterval(function(){
			$('#tb'+this.id).html(this.cliente.tempo-=1);
			if(this.cliente.tempo<=0)
				this.finalizar(botao);
		}.bind(this), 1000);
		this.timeOut = setTimeout(function(){
			clearInterval(this.interval);
			b.trocaContexto(this.id, botao);

		}.bind(this), this.quantum*1000);
	}
}

class Sjf extends Barbeiro
{
	constructor(id)
	{
		super(id);
	}
}

class Rtos extends Barbeiro
{
	constructor(id)
	{
		super(id);
	}

}
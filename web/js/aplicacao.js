$('form#formConfig').on('submit', function(e){
	e.preventDefault();
	var dados = $(this).serialize();
	dados = "{"+'"'+dados+'"'+"}";
	dados = dados.replace(/=/g,'":"').replace(/&/g,'","');
	dados = JSON.parse(dados);
    console.log(dados);
    
    var b = new Barbearia();
    b.montaCenario(dados);

	for(var i=0; i<b.barbeiros.length; i++)
    {
        b.barbeiros[i].cortar();
    }
});




console.log("eita");
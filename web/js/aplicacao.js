$('form#formConfig').on('submit', function(e){
	e.preventDefault();

    var dados = $(this).serialize();
	dados = "{"+'"'+dados+'"'+"}";
	dados = dados.replace(/=/g,'":"').replace(/&/g,'","');
	dados = JSON.parse(dados);
    
    var b = new Barbearia();
    b.montaCenario(dados);

    $('#configuracao').toggleClass('in');

    $('.addCliente').on('click', function(){
        var fila = $(this).attr('btn');
        var tempo = $(this).parent().find('input').val();
        b.addCliente(fila, tempo);
        b.atualizaFila(fila);
    });

    $('button[name="btnBarb"]').click(function(){
        var botao = $(this);
        var valor = botao.text();
        var id = botao.attr('idBarb');
        
        if(valor == "Cortar" && b.cortar(id-1, botao))
        {
            botao.toggleClass('btn-success').toggleClass('btn-danger');
            botao.hasClass('btn-success') ? botao.text("Cortar") : botao.text("Finalizar");
        }    
        else
        {
            if(b.barbeiros[id-1].cliente != null)
            {
                b.finalizar(id-1, botao);
            }        
        }
    });
});
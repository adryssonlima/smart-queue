$('#nBarb').on('change', function(){
	var qnt = $(this).val();
	var html = "";
	for(i=1; i<=qnt; i++){
		html += "<div class='col-md-3'>";
		html += "<div class='form-group'>";
		html += "<label for='b"+i+"'>Barbeiro "+i+"</label>";
		html += "<select id='b"+i+"' name='politica"+i+"' class='sb form-control input-sm'>";
		html += "<option value='FIFO'>FIFO</option>";
		html += "<option value='RR'>Tempo Compartilhado</option>";
		html += "<option value='RTOS'>Tempo Real</option>";
		html += "<option value='SJF'>SJF (Menor Tempo)</option>";
		html += "</select>";
		html += "</div>";
		html += "</div>";
	}
	$('#barbeiros').html(html);

	$('.sb').on('change', function(){
		var id = $(this).attr('id');
		var politica = $(this).val();
		if(politica == "RR")
		{
			var html = "";
			html += "<div id='"+id+"div'>";
			html += "<label for='q"+id+"'>Quantum</label>";
    		html += "<input type='text' class='form-control input-sm' name='q"+id+"' value='1' id='q"+id+"'>";
    		html += "</div>";
			$(this).parent().append(html);
		}
		else
		{
			$(this).parent().find("#"+id+"div").remove();
		}
	});
});
	//POG para resolver
	$('.sb').on('change', function(){
		var id = $(this).attr('id');
		var politica = $(this).val();
		if(politica == "RR")
		{
			var html = "";
			html += "<div id='"+id+"div'>";
			html += "<label for='q"+id+"'>Quantum</label>";
    		html += "<input type='text' class='form-control input-sm' name='q"+id+"' value='1' id='q"+id+"'>";
    		html += "</div>";
			$(this).parent().append(html);
		}
		else
		{
			$(this).parent().find("#"+id+"div").remove();
		}
	});



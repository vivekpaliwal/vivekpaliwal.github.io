$(document).ready(function(){

	$(".buttonStyle").hide();

	$("form[name='user']").on('submit',function(e){
		e.preventDefault();
		var box=("<input type='checkbox' name='mark'>"+"</input>")
		$('ul').append("<li>"+ $("input[name='task']").val()+box+ '</li>');
		$("input[name='task']").val("");
		$(".buttonStyle").show();
		
	});

	$("form[name='user']").on('change','input[name=mark]',function(){
		var $this=$(this);
		var $parent=$this.parent();
		if($this.is(':checked')){
			$parent.css('text-decoration','line-through');
		}
		else{
			$parent.css('text-decoration','none');
		}
			

	});
	$("form[name='user']").on('click','input[name=delete]',function(){
		$("ul").empty();
	});
	$("form[name='user']").on('click','input[name=check]',function(){
		$("input[name='mark']").prop("checked",true);
	});
	$("form[name='user']").on('click','input[name=uncheck]',function(){
			$("input[name='mark']").prop("checked",false);
	});


});
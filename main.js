$(function(){
	var timeout;
	$('.container').hover(
    function() {
    	var self = this;
       	timeout = setTimeout(function(){
       		if($(self).is(":hover")){
            	$(self).find('.bottom').slideDown('fast');
            }
        },500);
    },
    function(){
        clearTimeout(timeout);
       $(this).find('.bottom').slideUp('fast');
    }
);

})
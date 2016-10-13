$(document).ready(function(){
	jQuery(function($){
		var $slider=$(".slider");
		var $slide="li";
		var $fadetime=1000;
		var $pause=2000;

		function slides(){
			return $slider.find($slide);
		}

		slides().fadeOut();

		slides().first().addClass("active");
		slides().first().fadeIn($fadetime);

		$interval= setInterval(function(){
			var $i =$slider.find($slide + ".active").index();

			slides().eq($i).removeClass("active");
			slides().eq($i).fadeOut($fadetime);
				var lan=slides().length ;
			 if (lan == $i + 1){
			 	$i=-1
			 }
			
			slides().eq($i+1).fadeIn($fadetime);
			slides().eq($i+1).addClass("active");
		},$fadetime+$pause
		);
	});
});
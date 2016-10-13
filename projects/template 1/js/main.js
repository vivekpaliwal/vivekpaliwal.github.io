(function (w){
	function Main(id,step){
		this.slider = new w.my.Slider(id,step);
	}
	var t1 = new Main("#big",1);
})(window);

(function(){
	$( window ).scroll(function() {
  			if($(this).scrollTop() >= 3600 && $('.wrapper').width() === 995){
  				$('.community').removeClass('hidden').addClass('animated fadeInUp');
  			}
  			if($(this).scrollTop() >= 4200 && $('.wrapper').width() === 695){
  				$('.community').removeClass('hidden').addClass('animated fadeInUp');
  			}
		});
})();

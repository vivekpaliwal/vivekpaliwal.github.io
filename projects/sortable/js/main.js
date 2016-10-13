(function(w){
	function Main () {
		this.view = new w.trello.View();
		this.controller = new w.trello.Controller(this.view);
	}

	w.trello = w.trello || {};

	var t = new Main();
})(window);
(function (w){
	function View(){
		this.$container = $("#container");
		this.$newListLink = $(".newListLink");
		this.$newListForm = $(".newListForm");
		this.taskInputTemplate = Handlebars.compile($("#taskInputTemplate").html());
		this.taskTemplate = Handlebars.compile($("#taskTemplate").html());
		this.listTemplate = Handlebars.compile($("#listTemplate").html());
	}
	View.prototype.bind = function(cmd,callback){
		var self = this;
		switch(cmd) {
			case "newListLink" :
			this.$newListLink.on("click",function(e){
				callback(e.target);
			});
			break;
			case "newListInput" :
			this.$newListForm.find("input").on("keypress",function(e){
				var value = $(this).val();
				if(e.which === 13 && value ){
					callback($(this).data('action'),value);
				}
			});
			break;
			case "inputFormClick" :
			this.$newListForm.find("button").on("click",function(e){
				var value = self.$newListForm.find("input").val();
				callback($(this).data('action'),value);
			});
			break;
			case "clickOnAddCard" :
			this.$container.find('.list a').on("click",function(e){
				var target = e.target;
				callback(target,$(target).data("action"));
			});
			break;
			case "makeListSortable" :
			this.$container.find('.tasks').sortable({
				connectWith : "ul",
				containment : self.$container,
				helper : 'clone',
				appendTo : self.$container,
				zIndex: 9999,
				cursor : 'move'
			});
			break;
			case "cardInput" :
			this.$container.find('.newTaskForm').on('click','button',function(e) {
				var $target = $(e.target);
				callback($target,$target.data('action'),$target.parents('.newTaskForm').find('input').val());
			}).end().on('keypress', 'input', function(e) {
				var val = $(this).val(),$target = $(e.target);
				if(e.which == 13 && val){
					callback($target,$target.data('action'),val);
				}
			});
			break;
		}
	}
	View.prototype.render = function(cmd,parameter){
		switch(cmd){
			case "toggleLinkVisibility" : 
			this.$newListLink.toggleClass('hidden');
			break;
			case "toggleInputFormVisibility" :
			this.$newListForm.toggleClass('hidden');
			break;
			case "appendList" :
			$(this.listTemplate({
				title : parameter
			})).insertBefore("#addNewList");
			break;
			case "clearInput" :
			this.$newListForm.find("input").val("");
			break;
			case "addCardInputTemplate" :
			$(parameter).parent("div").next('div').find('.tasks').prepend(this.taskInputTemplate());

			break;
			case "hideAddCard" :
			$(parameter).toggleClass('hidden');
			break;
			case "addCardToList" :
			$(parameter.listButton).closest('ul').prepend(this.taskTemplate({
				taskValue : parameter.task
			}));
		}
	};
	View.prototype.giveFocusToInput = function (target,action) {
		var $parent = $(target).parent('div');
		if(action === "addCard"){
			$parent.next('div').find('input').focus();
		}
		else{
			$parent.parent('div').find("input").focus();
		}
	};
	View.prototype.removeAllTaskForms = function(){
		this.$container.find(".newTaskForm").remove();
	};
	View.prototype.removeCardInput = function (target) {
		$(target).closest('li.newTaskForm').remove();
	};
	View.prototype.showAddCard = function (target) {
		if($(target).data('action') === "addCard"){
			this.$container.find('.list a').removeClass('hidden');
		}
		else{
			$(target).parents('.list').find('a').toggleClass('hidden');
		}
	}
	w.trello = w.trello || {};
	trello.View = View;
})(window);
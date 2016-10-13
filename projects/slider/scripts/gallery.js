
function initialize() {
	var data = {
		urls: [
			"images/1.jpg",
			"images/2.jpg",
			"images/3.jpg",
			"images/4.jpg",
			"images/5.jpg",
			"images/6.jpg",
			"images/7.jpg",
			"images/8.jpg",
			"images/9.jpg"
		]
	}
	var buttonNo = {
		buttonNo:['1','2','3','4','5','6','7','8','9']
	}


	var galleryObj = new Gallery(data);
	var fwdButtonObj = new ForwardButton();
	var bwdButtonObj = new BackwardButton();
	var currentbuttonsObj = new Buttons(buttonNo);
}

function Gallery(data) {
	var self = this;
	$('body').on('showNext', function() {
		self.showNext();
	});
	$('body').on('showPrevious', function() {
		self.showPrevious();
	});
	$('body').on('showImage',function(event,data){
		self.showDirect(data); 
	})
	$('body').on('activeImage',function(event,data){
		self.currentImage = parseInt(data);
	});
	this.init(data);
}
Gallery.prototype = {
	scrollBy: 0,
	scrollLength:432,
	currentImage:1,
	init:function(data){
		var scrollLength = this.scrollLength;
		var self = this;
		Handlebars.registerHelper('list', function(items, options) {
		var out = '<div class="frame"><div class="panel">';
		for (var i = 0, l = items.length; i < l; i++) {
			out += options.fn(items[i]);
		}
		self.scrollLimit = (l-1)*scrollLength;
		return out + '</div></div>'
	});
	var template = Handlebars.compile($('#template').html());
	var htmlContent = $(template(data));

	$('body').prepend(htmlContent);
	},
	showNext: function() {
		$('body').trigger('ImagesAvailble/left')
		if (this.scrollBy < this.scrollLimit) {
			$('.frame').scrollTop(this.scrollBy += this.scrollLength);
			this.currentImage +=1;
			$('body').trigger('button/active',[this.currentImage]);
		}else{
			$('body').trigger('ImagesNotAvailble/right')
		}
		if(this.scrollBy==0){
		$('body').trigger('bwdButton/hide')
		}
	},
	showPrevious: function() {
		if (this.scrollBy > 0) {
			$('.frame').scrollTop(this.scrollBy -= this.scrollLength);
			this.currentImage-=1;
			$('body').trigger('button/active',[this.currentImage]);
		}
		 if(this.scrollBy == 0){
			$('body').trigger('bwdButton/hide')
		}
		if(this.scrollBy <3456){
			$('body').trigger('ImageAvailable/right')
		}
	},
	showDirect:function(imageNo){
		var scrollValue = (imageNo-1) * this.scrollLength;
		$('.frame').scrollTop(scrollValue);
		this.scrollBy = scrollValue;
	}
}
function ForwardButton() {
	var self= this;
	this.bindClickEvent();
	$('body').on('ImageAvailable/right',function(){
		self.show();
	});
	$('body').on('ImagesNotAvailble/right',function(){
		self.hide();
	});
}
ForwardButton.prototype = {
	bindClickEvent: function() {
		$('button.forward').on('click', function() {
			$('body').trigger('showNext')
		})
	},
	show:function(){
		$('button.forward').show(500);
	},
	hide:function(){
		$('button.forward').hide(500);
	}
}
function BackwardButton() {
	var self= this;
	this.bindClickEvent();
	$('body').on('ImagesAvailble/left',function(){
		self.show();
	});
	$('body').on('ImagesNotAvailble/left',function(){
		self.hide();
	});
}
BackwardButton.prototype = {
	bindClickEvent: function() {
		$('button.backward').on('click', function() {
			$('body').trigger('showPrevious')
		})
	},
	show:function(){
		$('button.backward').show(800);
		

	},
	hide:function(){
		$('button.backward').hide(800);
	}
}

function Buttons(data){
	var self = this;
	this.init(data);
	$('body').on('button/active',function(event , imageNo){
		self.activeButton(imageNo);
	});
	self.activeButton(1);
}
Buttons.prototype={
	init: function(data) {
		Handlebars.registerHelper('list', function(items, options) {
			var out = '<div class="imageChoose">';
			for (var i = 0, l = items.length; i < l; i++) {
				out += options.fn(items[i]);
			}
			return out + '</div>'
		});
		var template = Handlebars.compile($('#templateButtons').html());
		this.buttonsObj = $(template(data));
		$('body').append(this.buttonsObj);
		$('body').trigger('ImagesNotAvailble/left')
	},
	activeButton:function(imageNo){
		var activeButton = 'button#'+imageNo;
		$(activeButton).attr('class','active')
		var otherButtons = $(activeButton).siblings('button')
			$.each(otherButtons , function(a,b){
				$(b).attr("class",'none')
			})
	}
}
initialize();
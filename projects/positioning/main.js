 $("#abso").bind('click', function(event) {

     var parent = this.parentElement;
     handler(parent, "absolute");

 });
 $("#rela").bind('click', function(event) {
     var parent = this.parentElement;
     handler(parent, "relative");
 });
 $("#fixe").bind('click', function(event) {
     var parent = this.parentElement;
     handler(parent, "fixed");

 });

 function handler(parent, box) {
     var top = parent.childNodes[3].childNodes[1].children[0].cells[1].childNodes[0].value + "px"
     var left = parent.childNodes[3].childNodes[1].children[1].cells[1].childNodes[0].value + "px";
     var right = parent.childNodes[3].childNodes[1].children[2].cells[1].childNodes[0].value + "px";
     var bottom = parent.childNodes[3].childNodes[1].children[3].cells[1].childNodes[0].value + "px";
     var zindex = parent.childNodes[3].childNodes[1].children[4].cells[1].childNodes[0].value;
     if (box == "absolute") {
         position("#absolute");
     }
     if (box == "relative") {
         position("#relative");
     }
     if (box == "fixed") {
         position("#fixed");
     }

     function position(selector) {
         $(selector).css({
             top: top,
             left: left,
             right: right,
             bottom: bottom,
             zIndex: zindex,
         });
         $(document).scrollTop(0);
     }
 }
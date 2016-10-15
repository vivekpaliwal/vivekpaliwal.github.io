 $("#abso").bind('click', function(event) {

     var parent = $(this).parent();
     handler(parent, "absolute");

 });
 $("#rela").bind('click', function(event) {
     var parent = $(this).parent();
     handler(parent, "relative");
 });
 $("#fixe").bind('click', function(event) {
     var parent = $(this).parent();
     handler(parent, "fixed");

 });

 function handler(parent, box) {
     var top =parent.find(".topValue").val() + "px"
     var left =parent.find(".leftValue").val() + "px";
     var right =parent.find(".rightValue").val() + "px";
     var bottom =parent.find(".bottomValue").val() + "px";
     var zindex =parent.find(".zindexValue").val();
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
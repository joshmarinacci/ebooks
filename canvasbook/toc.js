$("#fchapter").click(function(){
	var toc = document.getElementById("toc");
	if(toc.style.visibility == "visible") {
		toc.style.visibility = "hidden";
	} else {
		toc.style.visibility = "visible";
	}
});

$("#toc").append('<li><a href="toc.html">Table Of Contents</a></li>');
$("#toc").append('<li><a href="chapter1.html"><b>Chapter 1</b> : Overview</a></li>');
$("#toc").append('<li><a href="chapter2.html"><b>Chapter 2</b> : Hands On: Graphs and Charts</a></li>');
$("#toc").append('<li><a href="chapter3.html"><b>Chapter 3</b> : Advanced Drawing</a></li>');


/* font resize commands */
$("#set-font-small").click(function(e) {
    $("body").css('font-size','10pt');
});
$("#set-font-med").click(function(e) {
    $("body").css('font-size','13pt');
});
$("#set-font-large").click(function(e) {
    $("body").css('font-size','18pt');
});


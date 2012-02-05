$("#fchapter").click(function(){
	var toc = document.getElementById("toc");
	if(toc.style.visibility == "visible") {
		toc.style.visibility = "hidden";
	} else {
		toc.style.visibility = "visible";
	}
});

$("#toc").append('<li><a href="toc.html">Table Of Contents</a></li>');
$("#toc").append('<li><a href="chapter1.html">Chapter 1 : Overview</a></li>');
$("#toc").append('<li><a href="chapter2.html">Chapter 2 : Building Charts</a></li>');


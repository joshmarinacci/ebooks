$("#fchapter").click(function(){
	var toc = document.getElementById("toc");
	if(toc.style.visibility == "visible") {
		toc.style.visibility = "hidden";
	} else {
		toc.style.visibility = "visible";
	}
});

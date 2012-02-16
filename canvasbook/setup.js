$(document).ready(function() {
    
/* ==== add the footer ==== */
$("body").append("<ul id='footer'>"
    //+"<li><b>HTML Canvas Deep Dive</b></li>"
    +"<li><a href='#' id='nextchapter'>next &gt;</a></li>"
    +"<li><a href='#' id='prevchapter'>&lt; prev</a></li>"
    +"<li class='fontsize'>"
        +"<a id='set-font-small'>A</a> "
        +"<a id='set-font-med'>A</a> "
        +"<a id='set-font-large'>A</a>"
    +"</li>"
    +"<li><b id='fchapter'>Chapter N</b></li>"
    +"</ul>"
    );
    
        
/* ==== add the toc ==== */
$("body").append('<ul id="toc"></ul>');

var toc = [
    { src:"title.html", name: "Cover and Introduction"},
    { src:"toc.html", name: "Table Of Contents"},
    { src:"chapter1.html", name: "Chapter 1 : Basic Drawing"},
    { src:"chapter2.html", name: "Chapter 2 : Charts and Graphs"},
    /*
    { src:"chapter3.html", name: "Chapter 3 : Advanced Drawing"},
    { src:"chapter4.html", name: "Chapter 4 : Animation"},
    { src:"chapter5.html", name: "Chapter 5 : Space N Vaders Game"},
    { src:"chapter6.html", name: "Chapter 6 : Advanced Graphics ++"},
    { src:"chapter7.html", name: "Chapter 7 : Real World Usage"},
    { src:"chapter8.html", name: "Chapter 8 : Mobile Devices and Performance Optimizations"},*/
    { src:"end.html", name: "Appendix and Back Matter"},
];

console.log("url = " + document.location);
setupTOC(toc);

for(var i=0; i<toc.length; i++) {
	var loc = ""+document.location;
	if(loc.indexOf(toc[i].src) >= 0) {
		console.log("found it");
		if(i > 0) {
			$("#prevchapter").attr("href",toc[i-1].src);
		}
		if(i < toc.length-1) {
			$("#nextchapter").attr("href",toc[i+1].src);
		}
	}
	console.log("sub = " + (""+document.location).indexOf(toc[i].src));
	if((""+document.location).indexOf("foo.html") > 0) {
		console.log("on foo");
	}
}

$("#fchapter").text($("h1").text());
console.log("h1 = " + $("h1").text());


/* add the glossary */
$(document).ready(function () {
	$(document).click(function() {
		var pop = $("#glossary_popup");
		pop.hide();
	});
	$("#glossary_popup").hide();
	$(".glossary").click(function(e) {
		//e.preventDefault();
		e.stopPropagation();
		var th = $(this);
		var pop = $("#glossary_popup");
		$("#glossary_popup h4").text(th.text());
		$("#glossary_popup p").text(th.attr("title"));
	    var scrolltop = $("body").scrollTop();
	    
	    var yoff = th.offset().top-scrolltop;
		yoff += th.height();
		yoff += 20;

	    var xoff = th.offset().left;
	    xoff += th.width()/2;
		xoff = xoff - pop.width()/2;
		
		pop.toggle();
		pop.css("top",yoff+"px");
		pop.css("left",xoff+"px");
	});
});


/* restyle the pre code */
$(document).ready(function(){
	$("pre code").each(function(){
		var text = $(this).text();
		var lines = text.split("\n"); 
		var newText = "";
		for(var i=0; i<lines.length; i++) {
			var line = lines[i];
			line = line.replace(/</g,'&lt;');
			line = line.replace(/>/g,'&gt;');
			newText += "<span>"+line+" </span>";
		}
		
		$(this).html(newText);
		
	});
});


    
    

});


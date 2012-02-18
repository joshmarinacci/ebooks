$(document).ready(function() {
    
/* ==== add the footer ==== */
/*
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
*/    
        
/* ==== add the toc ==== */
//$("body").append('<ul id="toc"></ul>');


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
	$(".wrap code").each(function(){
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


function setupTOC(toc) {
    for(var i =0; i<toc.length; i++) {
        $("#toc").append('<li><a href="'+toc[i].src+'">'+toc[i].name+'</a></li>');
    }

    $("#fchapter").click(function(){
        var toc = document.getElementById("toc");
        if(toc.style.visibility == "visible") {
            toc.style.visibility = "hidden";
        } else {
            toc.style.visibility = "visible";
        }
    });
    
    
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

}




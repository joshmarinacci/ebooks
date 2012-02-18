function setupTOC(toc) {
    for(var i =0; i<toc.length; i++) {
        $("#toc").append('<li><a href="#" onclick="gotoPage('+i+');">'+toc[i].name+'</a></li>');
    }

    $("#fchapter").click(function(){
        var toc = document.getElementById("toc");
        if(toc.style.visibility == "visible") {
            toc.style.visibility = "hidden";
        } else {
            toc.style.visibility = "visible";
        }
    });
    
    $("#set-font-med").addClass('selected');
    
    
    /* font resize commands */
    $("#set-font-small").click(function(e) {
        $("#content").css('font-size','10pt');
        $("#set-font-small").addClass('selected');
        $("#set-font-med").removeClass('selected');
        $("#set-font-large").removeClass('selected');
    });
    $("#set-font-med").click(function(e) {
        $("#content").css('font-size','13pt');
        $("#set-font-small").removeClass('selected');
        $("#set-font-med").addClass('selected');
        $("#set-font-large").removeClass('selected');
    });
    $("#set-font-large").click(function(e) {
        $("#content").css('font-size','18pt');
        $("#set-font-small").removeClass('selected');
        $("#set-font-med").removeClass('selected');
        $("#set-font-large").addClass('selected');
    });

}




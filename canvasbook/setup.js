$(document).ready(function() {
    
    /* ==== add the footer ==== */
    $("body").append("<ul id='footer'>"
        +"<li><b id='fchapter'>Chapter N</b></li>"
        +"<li><b>HTML Canvas Deep Dive</b></li>"
        +"<li class='fontsize'>"
            +"<a id='set-font-small'>A</a> "
            +"<a id='set-font-med'>A</a> "
            +"<a id='set-font-large'>A</a>"
        +"</li>"
        +"</ul>"
        );
    
        
    /* ==== add the toc ==== */
    $("body").append('<ul id="toc"></ul>');

    var toc = [
        { src:"toc.html", name: "Table Of Contents"},
        { src:"chapter1.html", name: "Chapter 1 : Basic Drawing"},
        { src:"chapter2.html", name: "Chapter 2 : Charts and Graphs"},
        { src:"chapter3.html", name: "Chapter 3 : Advanced Drawing"},
        { src:"chapter4.html", name: "Chapter 4 : Animation"},
        { src:"chapter5.html", name: "Chapter 5 : Space N Vaders Game"},
        { src:"chapter6.html", name: "Chapter 6 : Advanced Graphics ++"},
        { src:"chapter7.html", name: "Chapter 7 : Real World Usage"},
        { src:"chapter8.html", name: "Chapter 8 : Mobile Devices and Performance Optimizations"},
    ];
    
    setupTOC(toc);
    
    $("#fchapter").text($("h1").text());
    console.log("h1 = " + $("h1").text());
    
    

});


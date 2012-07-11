//npm install jsdom
//node toolkit/bin/make_toc.js canvasbook/toc.html canvasbook

var jsdom = require("jsdom");
var fs = require("fs");
var step = require('step');
var util = require('util');

//console.log(process.argv);
if(process.argv.length != 4) {
    console.log("node build_site.js <sourcedir> <outdir>");
    process.exit();
}


var src = process.argv[2];
console.log(" source dir = " + src);
var out = process.argv[3];
console.log(" output dir = " + out);

var tocout = fs.createWriteStream(out+"/toc.html");

//parse chapters
var files = fs.readdirSync(src,this);
files = files.filter(function(file,i,a) {
    return /chapter.*html/.test(file);
}).sort();

console.log(files);

var chapter_header = fs.readFileSync(__dirname+"/../templates/chapter_header.html","utf8");
var chapter_footer = fs.readFileSync(__dirname+"/../templates/chapter_footer.html","utf8");

//for each chapter
for(var i=0; i<files.length; i++) {
    var file = files[i];
    console.log("processing = " + file);
    var fd = fs.createWriteStream(out+"/"+file);
    var body = fs.readFileSync(src+"/"+file);
    //  add standard header 
    fd.write(chapter_header);
    fd.write("<div class='chapnav'>");
    if(i > 0) {
        fd.write("<a id='prevchap' href='"+files[i-1]+"'>previous</a>");
    }
    if(i+1 < files.length) {
        fd.write("<a id='nextchap' href='"+files[i+1]+"'>next</a>");
    }
    fd.write("<div/>");
    fd.write(body);
    // add standard footer
    fd.write(chapter_footer);
    //  save to disk
    fd.end();
}


//  add to toc 
//generate toc to outdir

var fd = fs.createWriteStream(out+"/toc.html");
fd.write(chapter_header);
fd.write('<div id="header"><h2>Chapter 1</h2><h1>Basic Drawing</h1></div>');
fd.write('<div id="content">');
fd.write("<ul>\n");
for(var i=0; i<files.length; i++) {
    fd.write("<li><a href='"+files[i]+"'>"+files[i]+"</a></li>\n");
}
fd.write("</ul>\n");
fd.write('</div">');
fd.write(chapter_footer);
fd.end();

/*
//process each file
function proc(filename) {
    jsdom.env(basedir+'/'+filename, [__dirname+'/../scripts/jquery.js'], function(errors, window) {
        console.log("inside jsdom " + filename);
        try {
            p("<li><h3><a href='"+filename+"'>"+window.$("h1").text()+"</a></h3></li>");
            p("<ul>");
            var sections = window.$("h3");
            //console.log("section count = " + sections.length);
            for(var i=0; i<sections.length; i++) {
                //console.log("section = " + sections[i]);
                var s = window.$(sections[i]);
                var a = s.find('a');
                if(a.length == 0) continue;
                //console.log("text = " + s.find('a').text());
                //console.log("id = " + s.find('a').attr("id"));
                p("<li><a href='"+filename+"#"+a.attr("id")+"'>"+a.text()+"</a></li>");
            }
            p("</ul>");
        } catch (e) {
            console.log("e = " + e);
        }
        
        if(files.length > 0) {
            proc(files.shift());
        } else {
            endTOC();
        }
    });
}

proc(files.shift());
*/
/*
function endTOC() {
    p(footer);
    fd.end();
    console.log("closed the toc");
}
*/
    
function p(s) {
    fd.write(s);
    fd.write("\n");
}
/*
function processFile(file,filename,callback) {
    console.log("processing file: " + file);
    jsdom.env(file, [__dirname+'/../scripts/jquery.js'], function(errors, window) {
        if(errors) {
            console.log("errors = " + errors);
        }
        try {
            p("<li><h3><a href='"+filename+"'>"+window.$("h1").text()+"</a></h3></li>");
            p("<ul>");
            var sections = window.$("h3");
            //console.log("section count = " + sections.length);
            for(var i=0; i<sections.length; i++) {
                //console.log("section = " + sections[i]);
                var s = window.$(sections[i]);
                var a = s.find('a');
                if(a.length == 0) continue;
                //console.log("text = " + s.find('a').text());
                //console.log("id = " + s.find('a').attr("id"));
                p("<li><a href='"+filename+"#"+a.attr("id")+"'>"+a.text()+"</a></li>");
            }
            p("</ul>");
        } catch (e) {
            console.log("e = " + e);
        }
        callback({name:filename});
    });
}

*/



//npm install jsdom
//node toolkit/bin/make_toc.js canvasbook/toc.html canvasbook

var jsdom = require("jsdom");
var fs = require("fs");
var step = require('step');
var util = require('util');


console.log(" " + __dirname);
console.log('args = ' + process.argv);
var outfile = process.argv[2];
console.log("writing to file: " + outfile);
var basedir = process.argv[3];
console.log("using basedir " + basedir);

var fd = fs.createWriteStream(outfile);
var header = fs.readFileSync(__dirname+"/header.html","utf8");
var footer = fs.readFileSync(__dirname+"/footer.html","utf8");
console.log("fd = " + fd);

p(header);

//get list of files, sorted and filtered
var files = fs.readdirSync(basedir,this);
files = files.filter(function(file,i,a) {
    return /chapter.*html/.test(file);
}).sort();


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

function endTOC() {
    p(footer);
    fd.end();
    console.log("closed the toc");
}
    
function p(s) {
    fd.write(s);
    fd.write("\n");
}

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





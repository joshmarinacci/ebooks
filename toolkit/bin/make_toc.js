//npm install jsdom

var jsdom = require("jsdom");
var fs = require("fs");
var step = require("step");

console.log('args = ' + process.argv);
var toolkitdir = process.argv[2];
console.log('resources dir = ' + toolkitdir);
var outfile = process.argv[3];
console.log("writing to file: " + outfile);
var basedir = process.argv[4];
console.log("using basedir " + basedir);

var fd = fs.createWriteStream(outfile);

var header = fs.readFileSync(toolkitdir+"/bin/header.html","utf8");
var footer = fs.readFileSync(toolkitdir+"/bin/footer.html","utf8");



function p(s) {
    fd.write(s);
    //console.log(s);
}

step(
    function printHeader() {
        //p("header");
        p(header);
        return null;
    },
    function readDir() {
        //p("reading");
        fs.readdir(basedir,this);
    },
    function readFiles(err,files) {
        var group = this.group();
        files.forEach(function(filename) {
            //only do files that end in .html
            if(/chapter.*html/.test(filename)){
                processFile(basedir+"/"+filename,filename,group());
            }
        });
    },
    function printFooter() {
        //p("done with all");
        p(footer);
        fd.close();
    }
);


    

function processFile(file,filename,callback) {
    console.log("processing file: " + file);
    jsdom.env(file, [toolkitdir+'/scripts/jquery.js'], function(errors, window) {
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
        callback();
    });
}





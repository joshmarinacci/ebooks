//npm install -d

var jsdom = require("jsdom");
var fs = require("fs");
var step = require('step');
var util = require('util');
var wrench = require('wrench');

//console.log(process.argv);
if(process.argv.length != 4) {
    console.log("node build_site.js <sourcedir> <outdir>");
    process.exit();
}


var toc = [];

var src = process.argv[2];
console.log(" source dir = " + src);
var out = process.argv[3];
console.log(" output dir = " + out);
fs.mkdir(out, 0777);

var tocout = fs.createWriteStream(out+"/toc.html");

//parse chapters
var files = fs.readdirSync(src,this);
files = files.filter(function(file,i,a) {
    return /^chapter.*html/.test(file);
}).sort();

console.log(files);

var chapter_header = fs.readFileSync(__dirname+"/../templates/chapter_header.html","utf8");
var chapter_footer = fs.readFileSync(__dirname+"/../templates/chapter_footer.html","utf8");

parseChapters(files);

//END main

function generateSite() {
    //console.log(toc);
    copyChapters();
    generateTOC();
    copyToolkit();
    copyResources();
}


function copyChapters() {
    for(var i=0; i<toc.length; i++) {
        var file = toc[i].filename;
        var fd = fs.createWriteStream(out+"/"+file);
        var body = fs.readFileSync(src+"/"+file);
        //  add standard header 
        fd.write(chapter_header);
        fd.write("<div class='chapnav top'>\n");
        if(i > 0) {
            fd.write("<a class='prevchap' href='"+toc[i-1].filename+"'>previous</a>\n");
        }
        fd.write("<span>&nbsp;</span>\n");
        if(i+1 < toc.length) {
            fd.write("<a class='nextchap' href='"+toc[i+1].filename+"'>next</a>\n");
        }
        fd.write("</div>\n");
        fd.write(body);
        // add standard footer
        
        fd.write("<div class='chapnav bottom'>\n");
        if(i > 0) {
            fd.write("<a class='prevchap' href='"+toc[i-1].filename+"'>previous</a>\n");
        }
        fd.write("<span>&nbsp;</span>\n");
        if(i+1 < toc.length) {
            fd.write("<a class='nextchap' href='"+toc[i+1].filename+"'>next</a>\n");
        }
        fd.write("</div>\n");
        
        fd.write(chapter_footer);
        //  save to disk
        fd.end();
    }
}

function copyToolkit() {
    //copy over the toolkit
    fs.mkdir(out+'/toolkit', 0777);
    wrench.copyDirSyncRecursive('style', out+'/toolkit/style');
    wrench.copyDirSyncRecursive('fonts', out+'/toolkit/fonts');
    wrench.copyDirSyncRecursive('scripts', out+'/toolkit/scripts');
    function p(s) {
        fd.write(s);
        fd.write("\n");
    }
}

function copyResources() {
    //copy over other files from the master book
    wrench.copyDirSyncRecursive(src+'/examples', out+'/examples');
    wrench.copyDirSyncRecursive(src+'/images', out+'/images');
}

function generateTOC() {
    var fd = fs.createWriteStream(out+"/toc.html");
    fd.write(chapter_header);
    fd.write('<div id="header"><h2>HTML Canvas Deep Dive</h2><h1>Table of Contents</h1></div>');
    fd.write('<div id="content">');
    fd.write("<ol id='toc'>\n");
    for(var i=0; i<toc.length; i++) {
        var ch = toc[i];
        fd.write("<li><h3>"
            +(i+1)
            +" <a href='"+ch.filename+"'>"+ch.name+"</a></h3></li>\n");
        fd.write("<ul>\n");
        for(var j=0; j<ch.sections.length; j++) {
            var sec = ch.sections[j];
            fd.write("<li>"
                +"<a href='"+ch.filename+"#"+sec.id+"'>"
                +sec.name
                +"</a></li>\n");
        }
        fd.write("</ul>\n");
    }
    fd.write("</ol>\n");
    fd.write('</div">');
    fd.write(chapter_footer);
    fd.end();
}

function parseChapters(files) {
    procJDOM(files.shift());
}


function procJDOM(file) {
    //console.log("invoking jsdom");
    var ff = (src+''+file);
    //console.log("file = " + ff);
    //console.log("dirname = " + __dirname);
    var jq = __dirname+'/../scripts/jquery.js';
    //console.log('jq = ' + jq);
    var chapter = {
        filename: file,
        sections: [],
        sectionids:{},
    };
    toc.push(chapter);
    try {
    jsdom.env(ff, [jq], function(errors, window) {
        try {
            //console.log("inside jsdom " + file);
            var sections = window.$("h3");
            //console.log("chap name = " + window.$("h1").text());
            chapter.name = window.$("h1").text();
            //console.log("section count = " + sections.length);
            for(var i=0; i<sections.length; i++) {
                //console.log("section = " + sections[i]);
                var s = window.$(sections[i]);
                var a = s.find('a');
                if(a.length == 0) {
                    console.log("WARNING. Section without an anchor in chapter: " + chapter.name);
                    continue;
                }
                //console.log(file+ " id = "+a.attr("id")+" text = "+a.text());
                var id = a.attr('id');
                if(chapter.sectionids[id]) {
                    console.log("WARNING. Section with duplicate id: " + id + " in chapter " + chapter.name);
                }
                chapter.sections.push({
                        id:id,
                        name:a.text(),
                });
                chapter.sectionids[id] = id;
            }
            if(files.length > 0) {
                procJDOM(files.shift());
            } else {
                generateSite();
            }
        } catch (e) {
            console.log("e = " + e);
        }
        
    });  
    } catch (ee) {
        console.log("ee = " + ee);
    }
}

//npm install jsdom
//node toolkit/bin/make_toc.js canvasbook/toc.html canvasbook

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


var src = process.argv[2];
console.log(" source dir = " + src);
var out = process.argv[3];
console.log(" output dir = " + out);
fs.mkdir(out, 0777);

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


//copy over the toolkit
fs.mkdir(out+'/toolkit', 0777);
wrench.copyDirSyncRecursive('style', out+'/toolkit/style');
wrench.copyDirSyncRecursive('fonts', out+'/toolkit/fonts');
wrench.copyDirSyncRecursive('scripts', out+'/toolkit/scripts');
function p(s) {
    fd.write(s);
    fd.write("\n");
}

//copy over other files from the master book
wrench.copyDirSyncRecursive(src+'/examples', out+'/examples');
wrench.copyDirSyncRecursive(src+'/images', out+'/images');


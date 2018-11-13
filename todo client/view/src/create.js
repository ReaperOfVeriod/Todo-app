'use strict';
const ipc = require('electron').ipcRenderer;
const http = require('http');

function sendCreatePost() {
    let name = document.getElementById('name').value;
    let status = document.getElementById('status').value;


    var postheaders = {
        'Content-Type' : 'application/json',
    };

    // the post options
    var optionspost = {
        host : 'localhost',
        port : 3000,
        path : '/tasks',
        method : 'POST',
        headers : postheaders
    };

    let formData = JSON.stringify({
        "name" : name,
        "status" : status,
    });

    let reqPost = http.request(optionspost, function(res) {
        res.on('data', function(d) {
            process.stdout.write(d);
        });
    });

    console.log(formData);
    reqPost.write(formData);
    reqPost.end();
    reqPost.on('error', function(e){
        console.error(e);
    });
    ipc.send('close-create');
}
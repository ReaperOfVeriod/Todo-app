'use strict';

const ipc = require('electron').ipcRenderer;
const http = require('http');

function reqData() {
    const options = {
        host: 'localhost',
        port: '3000',
        path: '/tasks',
        method: 'GET'
    };   

    http.get(options, function (res) {
        var json = '';
        res.on('data', function (chunk) {
            json += chunk;
        });
        res.on('end', function () {
            if (res.statusCode === 200) {
                try {
                    var data = JSON.parse(json);
                    //console.log(data);
                    for (var i = 0, len = data.length; i < len; i++) {
                        console.log(data[i]);
                        let id = data[i]._id;
                        let name = data[i].name;
                        let createdDate = data[i].Created_date;

                        let tbody = document.getElementById("tbody");
                        tbody.insertAdjacentHTML('afterbegin', '<td id="_id"></td>' + `\n` + '<td id="name"></td>' + `\n` + '<td id="createdDate"></td>');

                        document.getElementById("_id").innerHTML = id;
                        document.getElementById("name").innerHTML = name;
                        document.getElementById("createdDate").innerHTML = createdDate;
                    }
                } catch (e) {
                    console.log('Error parsing JSON!');
                }
            } else {
                console.log('Status:', res.statusCode);
            }
        });
    }).on('error', function (err) {
        console.log('Error:', err);
    });
}

function updateTask() {
    ipc.send('open-child');
}
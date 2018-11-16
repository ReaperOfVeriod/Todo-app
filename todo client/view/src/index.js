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
                        //console.log(data[i]);
                        let id = data[i]._id;
                        let name = data[i].name;
                        let createdDate = data[i].Created_date;
                        let status = data[i].status;
                        let uniqueName = `delete` + [i];

                        let tbody = document.getElementById("tbody");
                        tbody.insertAdjacentHTML('afterbegin', '<td id="_id"></td>' + `\n` + `<td id="name"></td>` + `\n` + `<td id="createdDate"></td>` + `\n` + `<td id="status"></td>` + `\n` + `<td><button id="edit" class="btn btn-secondary"></button>` + `\n` + `<button id="delete" value="" name="" onclick="deleteRow(this)" class="btn btn-danger delButton"></button></td>`);

                        document.getElementById("_id").innerHTML = id;
                        document.getElementById("name").innerHTML = name;
                        document.getElementById("createdDate").innerHTML = createdDate;
                        document.getElementById('status').innerHTML = status;
                        document.getElementById('edit').innerHTML = 'Edit';
                        document.getElementById('delete').innerHTML = 'Delete';
                        document.getElementById('delete').value = id;
                        document.getElementById('delete').name = uniqueName;
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

function createTask() {
    ipc.send('open-Create');
}

function updateTask() {
    ipc.send('open-child');
}

function refreshIndex() {
    ipc.send('refresh-index');
}

function deleteRow(btn) {
    const deleteID = btn.value;
    // console.log(deleteID);
    const data = JSON.stringify({
        todo: 'find a batter way for this shit'
    })
    
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: `/tasks/${deleteID}`,
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
        }
    }
    
    const req = http.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)
    
        res.on('data', (d) => {
        process.stdout.write(d)
        })
    })
    
    req.on('error', (error) => {
        console.error(error)
    })
    
    req.write(data)
    req.end()
    refreshIndex()
}


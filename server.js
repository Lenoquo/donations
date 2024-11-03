const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    console.log(req.url, req.method);

    if (req.url == '/') {
        fs.readFile('./main.html',(err,data) => {
            res.end(data);
        })
    }

    if (req.url == '/style.css') {
        fs.readFile('./style.css',(err,data) => {
            res.end(data)
        })
    }

    if (req.url == '/index.js') {
        fs.readFile('./index.js',(err,data) => {
            res.end(data)
        })
    }

    if (req.url == '/favicon.ico') {
        fs.readFile('./Untitled.png',(err,data) => {
            res.end(data)
        })
    }

    if (req.url == '/boing') {
        let body = '';
        req.on('data',chunk => {body += chunk}); // every time a chunk of data is received, it is added to the body

        req.on('end',()=>{
            update_data(body);
            res.writeHead(200, {'Content-Type': 'text/plain'});
        });
        res.end();
    }

    if (req.url === '/getdata' && req.method === 'GET') {
        const data = fs.readFileSync('./stuff.txt','utf8');
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end(data);
    }

}).listen(3000, () => {
    console.log('server is up and running');
});



function update_data(x) {

    donation = JSON.parse(x); // this turns it into an object
    
    let data = JSON.parse(fs.readFileSync('./stuff.txt','utf8')); // this reads the data from the textfile as an object

    data[donation.name] += parseInt(donation.amount);  // oh shit bruh

    data = JSON.stringify(data); // turns data back to a string

    fs.writeFileSync('./stuff.txt',data,{encoding:'utf8',flag:'w'}); // writes said string to the ""database""
}
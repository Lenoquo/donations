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
        fs.readFile('./icon.png',(err,data) => {
            res.end(data)
        })
    }

    // POST request to add donation data to database
    if (req.url == '/boing') {
        let body = '';
        req.on('data',chunk => {body += chunk}); // every time a chunk of data is received, it is added to the body

        req.on('end',()=>{
            update_data(body);
            res.writeHead(200, {'Content-Type': 'text/plain'});
        });
        res.end();
    }

    // GET request to retrieve information from database
    if (req.url.startsWith('/getdata') && req.method === 'GET') {
        let data = JSON.stringify(retrieve_data(req.url));
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end(data);
    }

    // reset the database
    if (req.url == '/reset') {
        console.log('one reset please!')
        names.forEach(name => {
            fs.writeFileSync(`./data/${name}.txt`,'0',{encoding:'utf8',flag:'w'});
        })
        res.end()
    }

}).listen(3000, () => {
    console.log('server is up and running');
});

const names = ['nobody','Alice','Bob','Carlos',
    'Darla','Ellen','Franklin','Georgia','Hector','Iago'];

// taking values from html page and stores them in correct database
function update_data(x) {

    donation = JSON.parse(x); // this turns it into an object

    let current_total = parseInt(fs.readFileSync(`./data/${donation.name}.txt`,'utf-8'));

    let new_total = current_total + parseInt(donation.amount) +''; // +'' turns int to string

    fs.writeFileSync(`./data/${donation.name}.txt`,new_total,{encoding:'utf8',flag:'w'});
}


function retrieve_data(url) {
    let name = url.split('/').slice(-1)[0]; //gets just the name out of the url
    let amount = parseInt(fs.readFileSync(`./data/${name}.txt`,'utf-8'));
    return {name,amount}
}
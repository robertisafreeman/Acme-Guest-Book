const http = require('http');
const fs = require('fs');

const readFile = (file) => {
    return new Promise((res, rej)=> {
        fs.readFile(file, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data.toString());
            };
        });
    });
};

const server = http.createServer( async (req, res)=> {
    try{
        const guests = (await readFile('./users.json'));
        res.write(guests);
        res.end();
    }
    catch(ex){
        res.statusCode = 500;
        res.write(ex.message);
        res.end();
    }
});

server.listen(3000);


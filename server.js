const http = require('http');
const fs = require('fs');

const readFile = (file) => {
    return new Promise((res, rej)=> {
        fs.readFile(file, (err, data) => {
            if(err) {
                rej(err);
            } else {
                res(data.toString());
            };
        });
    });
};

const server = http.createServer( async (req, res)=> {
    console.log("this is what req is" + req.url);

    try{
        if(req.url === '/'){
            const guests = await readFile('./index.html');
            res.write(guests);
            res.end();
        } else if (req.url === '/api/users'){
            const guests = await readFile('./users.json');
        res.write(guests);
        res.end();
        }

    }
    catch(ex){
        res.statusCode = 500;
        res.write(ex.message);
        res.end();
    }
});

server.listen(3000);


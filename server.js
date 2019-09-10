const http = require('http');
const fs = require('fs');

const readFileJSON = (file) => {
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
    console.log(req.url)
    try{
        const guests = await readFileJSON('./users.json');
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


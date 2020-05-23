const http = require('http'),
      fs = require('fs'),
      path = require('path');

var folder = "/haiku";
      
var server = http.createServer(function (req, res) {
    if (req.url == `${folder}`) {
        res.writeHead(301, {Location: `${folder}/`});
        res.end();
    }
    else if (req.url == `${folder}/`) {
        fs.readFile('./public/index.html', function (err, html) {
            if (err) { throw err; }
            res.writeHead(200, { 'Content-Type': 'text/html' }); 
            res.write(html);
            res.end();
        });
    }
    else if (req.url == `${folder}/app.js`) {
        fs.readFile('./public/app.js', 'utf8', function (err, js) {
            if (err) { throw err; }
            res.writeHead(200, { 'Content-Type': 'application/javascript' }); 
            res.write(js);
            res.end();
        });
    }
    else if (req.url == `${folder}/styles.css`) {
        fs.readFile('./public/styles.css', 'utf8', function (err, css) {
            if (err) { throw err; }
            res.writeHead(200, { 'Content-Type': 'text/css' }); 
            res.write(css);
            res.end();
        });
    }
    else if (req.url == `${folder}/data`) {
        fs.readFile('./public/data.json', 'utf8', function (err, json) {
            if (err) { throw err; }
            
            const obj = JSON.parse(json);
            const l1 = obj["grammarRules"]["l1"].random().split(" ");
            const l2 = obj["grammarRules"]["l2"].random().split(" ");
            const l3 = obj["grammarRules"]["l3"].random().split(" ");

            const dict = obj["dictionary"];
            let s1 = s2 = s3 = "";

            try {
                l1.forEach(w => { s1 += dict[w].random() + " "; });
                l2.forEach(w => { s2 += dict[w].random() + " "; });
                l3.forEach(w => { s3 += dict[w].random() + " "; });
            }
            catch(err)
            {
                console.log(err);
            }
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ p1: s1, p2: s2, p3: s3 }));
            res.end();
        }); 
    }
    else if (req.url == `${folder}/background`) {
        let backgrounds = [];
        const directoryPath = path.join(__dirname, 'public/backgrounds');
  
        fs.readdir(directoryPath, function (err, files) {
            if (err) { throw err; }
            files.forEach(file => backgrounds.push(file)); 

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ background: backgrounds.random() }));  
            res.end();  
        });
    }
    else if (req.url.startsWith(`${folder}/backgrounds/`)) {
        let filename = /[^/]*$/.exec(req.url)[0];
        fs.readFile('./public/backgrounds/' + filename, function (err, img) {
            if (err) { throw err; }
            res.writeHead(200, { 'Content-Type': 'image/jpeg' }); 
            res.write(img);
            res.end();
        });
    }
    else
        res.end('Invalid Request!');
});

Array.prototype.random = function() {
    return this[Math.floor((Math.random()*this.length))];
  }

  const port = process.env.PORT || 1337;
  server.listen(port);
  
  console.log("Server running at http://localhost:%d", port);
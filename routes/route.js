
module.exports = function(app, main) 
{
     
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

    app.post('/send',(req, res) =>
    {
         // получили req.body.bit 
        res.send(req.body.id || {}); 
    });
    app.post('/receive', (req, res) =>
    {
        res.send(req.body.id || {}); 
    });
    app.post('/start', (req, res) =>
    {
       var result = main.jsonKeys;//Main();
       var secretCode = main.secretCode;
       res.send(secretCode);
         // console.log(result);
    });


}
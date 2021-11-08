
module.exports = function(app, main) 
{
     
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

    app.post('/send',(req, res) =>
    {
        var id = req.body.id;
        var toAddress = req.body.addressTo;
        var amount = req.body.amount;
    
       var resTransactions = main.SendCoin(id, toAddress, amount);
       resTransactions.then(val =>{res.send(val || {});});
         // получили req.body.id
       // res.send(resTransactions || {}); 
    });

    app.post('/receive', (req, res) =>
    {
        var address = main.GetAddress(req.body.id);
        address.then(val =>{res.send(val || {});});
       // res.send(address || {});//req.body.id || {}); 
    });

    app.post('/start', (req, res) =>
    {
       //var result = main.jsonKeys;
       var secretCode = main.secretCode;
       res.send(secretCode);
    });

     app.post('/balanceAll', (req, res) => 
     {
          var result = main.GetBalance();//require('../manager/getBalance').GetBalance();
           result.then(val =>{res.send(val);});
     });
}
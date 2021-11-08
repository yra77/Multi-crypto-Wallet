
const bitWallet = require ("./Tokens/bitcoin");
const liteWallet = require ("./Tokens/litecoin");
const dogeWallet = require ("./Tokens/doge");
const solanaWallet = require ("./Tokens/solana");
const etherWallet = require ("./Tokens/ethereum");
 const tetherWallet = require ("./Tokens/tether");
 const shibainuWallet = require ("./Tokens/shiba_inu");
 const bep20Wallet = require ("./Tokens/bep20Tokens");
const fs = require('fs');


exports.jsonKeys = [];
exports.balance = [];
exports.secretCode = '';

module.exports.SendCoin = async (id, toAddress, amount) =>
{
    var walletKey = '';
    var privateKey = '';
    var resTransactions = '';
   
     switch (id) 
     {
       case 'bitcoin':
            walletKey = this.jsonKeys[0]['bitcoin']['address'];
            privateKey = this.jsonKeys[0]['bitcoin']['privateKey'];
           resTransactions = await bitWallet.Send(walletKey, privateKey, toAddress, amount);
         break;
         case 'litecoin':
          walletKey = this.jsonKeys[1]['litecoin']['address'];
          privateKey = this.jsonKeys[1]['litecoin']['privateKey'];
         resTransactions = await liteWallet.Send(walletKey, privateKey, toAddress, amount);
       break;
       case 'dogecoin':
        walletKey = this.jsonKeys[2]['dogecoin']['address'];
        privateKey = this.jsonKeys[2]['dogecoin']['privateKey'];
       resTransactions = await dogeWallet.Send(walletKey, privateKey, toAddress, amount);
     break;
           case 'solana':
                  walletKey = this.jsonKeys[3]['solana']['address'];
                 privateKey = this.jsonKeys[3]['solana']['privateKey'];
               resTransactions = await solanaWallet.Send(walletKey, privateKey, toAddress, amount);
           break;
                case 'ethereum':
                   walletKey = this.jsonKeys[4]['ethereum']['address'];
                    privateKey = this.jsonKeys[4]['ethereum']['privateKey'];
                   resTransactions = await etherWallet.Send(walletKey, privateKey, toAddress, amount);
                 break;
                 case 'tether':
                  walletKey = this.jsonKeys[4]['ethereum']['address'];
                   privateKey = this.jsonKeys[4]['ethereum']['privateKey'];
                  resTransactions = await tetherWallet.Send(walletKey, privateKey, toAddress, amount);
                break;
                case 'shiba_inu':
                  walletKey = this.jsonKeys[4]['ethereum']['address'];
                   privateKey = this.jsonKeys[4]['ethereum']['privateKey'];
                  resTransactions = await shibainuWallet.Send(walletKey, privateKey, toAddress, amount);
                break;
                case 'bnb':
                  walletKey = this.jsonKeys[5]['bep20']['address'];
                   privateKey = this.jsonKeys[5]['bep20']['privateKey'];
                  resTransactions = await bep20Wallet.SendBNB(walletKey, privateKey, toAddress, amount);
                break;
                case 'busd':
                  walletKey = this.jsonKeys[5]['bep20']['address'];
                   privateKey = this.jsonKeys[5]['bep20']['privateKey'];
                  resTransactions = await bep20Wallet.SendBep20(walletKey, privateKey, toAddress, amount);
                break;
                
       default:
         break;
     }

     return resTransactions;
}

module.exports.GetAddress = async (id)=>
{
     if(id == 'tether' || id == 'shiba_inu')
         id = 'ethereum';

     if(id == 'busd' || id == 'bnb')
        id = 'bep20';
   var res = '';
  for(let i = 0; i < this.jsonKeys.length; i++)
  {
     if(id ==  Object.keys(this.jsonKeys[i])[0])
     {
         res = this.jsonKeys[i][id]['address'];
         break;
     }  //console.log(this.jsonKeys[i][id]['address']);
  }
  
   return res;
}

module.exports.GetBalance = async ()=>
{
  this.balance = [];
   if(this.jsonKeys.length > 1)
   {
        this.balance.push({"bitcoin" : await bitWallet.GetBalance(this.jsonKeys[0]['bitcoin']['address'])});
        this.balance.push({"litecoin" : await liteWallet.GetBalance(this.jsonKeys[1]['litecoin']['address'])});
        this.balance.push({"dogecoin" : await dogeWallet.GetBalance(this.jsonKeys[2]['dogecoin']['address'])});
        this.balance.push({"solana" : await solanaWallet.GetBalance(this.jsonKeys[3]['solana']['address'])});
        this.balance.push({"ethereum" : Number(await etherWallet.GetBalance(this.jsonKeys[4]['ethereum']['address']))});
        this.balance.push({"shiba_inu" : Number(await shibainuWallet.GetBalance(this.jsonKeys[4]['ethereum']['address']))});
        this.balance.push({"tether" : Number(await tetherWallet.GetBalance(this.jsonKeys[4]['ethereum']['address']))});
        this.balance.push({"bnb" : Number(await bep20Wallet.GetBalanceBNB(this.jsonKeys[5]['bep20']['address']))});
      this.balance.push({"busd" : Number(await bep20Wallet.GetBalanceBep20(this.jsonKeys[5]['bep20']['address']))});
       // console.log(this.balance);
       return this.balance;
   }
} 

CreateKeys = async (str)=>
{
    this.jsonKeys.push(await bitWallet.CreateKeys(str));
    this.jsonKeys.push(await liteWallet.CreateKeys(str));
    this.jsonKeys.push(await dogeWallet.CreateKeys(str));
    this.jsonKeys.push(await solanaWallet.CreateKeys(str.toString()));
    this.jsonKeys.push(await etherWallet.CreateKeys(str.toString()));
    this.jsonKeys.push(await bep20Wallet.CreateKeys(str.toString()));
   // console.log(jsonKeys);
}

function MakeRandomStr(length) 
{
    var result           = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) 
    {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}

module.exports.Main = ()=>
{
    const path = './phrase.txt'
    //var str = '';

  if (fs.existsSync(path))
  {
    this.secretCode = fs.readFileSync(path);
  }
  else
  {
    this.secretCode = MakeRandomStr(64);
   // console.log(this.secretCode);
     fs.writeFileSync(path, this.secretCode);
  }

    CreateKeys(this.secretCode);
}
 



 





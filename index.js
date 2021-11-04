
const bitWallet = require ("./Tokens/bitcoin");
const liteWallet = require ("./Tokens/litecoin");
const dogeWallet = require ("./Tokens/doge");
const solanaWallet = require ("./Tokens/solana");
const etherWallet = require ("./Tokens/ethereum");
 const tetherWallet = require ("./Tokens/tether");
 const shibainuWallet = require ("./Tokens/shiba_inu");
 const bep20Wallet = require ("./Tokens/bep20Tokens");
const fs = require('fs');


var jsonKeys = [];

CreateKeys = async (str)=>
{
    jsonKeys.push((await bitWallet.CreateKeys(str)));
    jsonKeys.push(await liteWallet.CreateKeys(str));
    jsonKeys.push(await dogeWallet.CreateKeys(str));
    jsonKeys.push(await solanaWallet.CreateKeys(str.toString()));
    jsonKeys.push(await etherWallet.CreateKeys(str.toString()));
    jsonKeys.push(await bep20Wallet.CreateKeys(str.toString()));
    console.log(jsonKeys);
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

function Main()
{
    const path = './phrase.txt'
    var str = '';

  if (fs.existsSync(path))
  {
     str = fs.readFileSync(path);
  }
  else
  {
     str = MakeRandomStr(64);
    console.log(str);
     fs.writeFileSync(path, str);
  }

    CreateKeys(str);
   
}
 
Main();

//bitcoin
//KxZSgGSSLe8KfA8bGeGRAiokgAZFuknDonGgpCsdvpPdmUHUfJxA
//1Phgx6V5cUPyakMPj3RkE22pZNL5MNcsdu

//liteWallet.SendLitecoin('mjUENykcbTXcmifEdwe8JFVZ7FHkK3Xgx9', 0.2);
//dogeWallet.SendDogecoin('njbokcv2GT6torfxgUhz99zguNk8zUmEq7', 100);

//for solana
// const FROM_SECRET_KEY =  new Uint8Array([
//   64,116,167,111,196,119,102,134,61,88,54,0,51,88,47,19,93,101,188,177,46
//  ,91,218,245,90,170,47,229,26,91,71,45,2,51,86,150,241,90,137,55,201,72,204
//  ,28,237,103,182,95,236,230,54,74,15,89,115,66,186,10,16,105,118,31,109,45
// ]);
// var from = web3.Keypair.fromSecretKey(FROM_SECRET_KEY);//1989995000
// const toAddress = new web3.PublicKey('DKR1dcVynm47Fi6zQdP3KevJ6vGYqDRAr9hHenVTriWT');// 510000000

 //solanaWallet.SendSolana(from, toAddress, 0.5);
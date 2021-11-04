const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const contractABI = require('../ABI/erc20_ABI').abi;


let contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const etherAddress = '0xDAf789294f9927B9B5A07Aba267d8840930D8dB9';
const toAddress =    '0x2823589Ae095D99bD64dEeA80B4690313e2fB519';
const privateKey = '0x9aaf3cac8c11992b4b86787cf08ccdb628796cff2f72ee7b61e35704c347d3d8';

//0x60A1aE9127E556401533E2Df8746649c153dA448
//0xd6836600de660f6820b828b30736a4937800d6a449c5a9935ef8c254ce19bf25

const web3 = new Web3('https://ropsten.infura.io/v3/dc0b759838f44e9fa4c4ae26d541d6e8');//mainnet
//const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // testnet
//const web3 = new Web3('https://bsc-dataseed1.binance.org:443');// mainnet

const contract = new web3.eth.Contract(contractABI, contractAddress);


module.exports.GetBalance = async(address)=>
{
      const balance = await contract.methods.balanceOf(address).call(); 
   return balance;
}

module.exports.AmountFee = async()=>
{      
     return web3.utils.fromWei((await web3.eth.getGasPrice()*21000).toString(), 'ether');     
}

module.exports.SendTether = async(etherAddress, privateKey, toAddress, amount)=>
{
    var gasprice = await web3.eth.getGasPrice();
    const count = await web3.eth.getTransactionCount(etherAddress);
    amount = web3.utils.toHex(0,000000000000000000);

    this.AmountFee().then(gasPrice =>{console.log("This fee = " + gasPrice + " eth.");});

    var rawTransaction = 
    { 
        "from": etherAddress, 
        "gasPrice": web3.utils.toHex(gasprice), 
        "gasLimit": web3.utils.toHex(100000), 
        "to": contractAddress, 
        "value": "0x0", 
        "data": contract.methods.transfer(toAddress, amount).encodeABI(), 
        "nonce": web3.utils.toHex(count) 
    };

    var transaction = new Tx(rawTransaction, {chain:'ropsten'});
    var privKeyBuffer = new Buffer.from(privateKey.substring(2,66), 'hex');
    transaction.sign(privKeyBuffer);

    const result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
    .catch(function (e) 
    {
            console.log(e.message);
    })
    if(result)
    {
        console.log(`transactionhash ${result.transactionHash}`);
    }
    
}

// this.SendTether(etherAddress, privateKey, toAddress, 0).catch(function (e) 
// {
//    console.log(e.message)
// })

//this.GetBalance(etherAddress);
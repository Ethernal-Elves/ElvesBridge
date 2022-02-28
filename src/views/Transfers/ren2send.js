const ethers = require('ethers');
const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');
const Web3 = require('web3');

const polyElvesAddress = "0x4deab743f79b582c9b1d46b4af61a69477185dd5"
const polyElvesABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"action","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Action","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseRewards","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"creatureCount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"creatureHealth","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"expPoints","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"minLevel","type":"uint256"}],"name":"AddCamp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"bool","name":"subtract","type":"bool"}],"name":"BalanceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"BloodThirst","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"campaign","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sector","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Campaigns","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"sentinel","type":"uint256"}],"name":"CheckIn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sentinel","type":"uint256"}],"name":"ElfTransferedIn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"}],"name":"LastKill","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"renAmount","type":"uint256"}],"name":"RenTransferOut","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"renAmount","type":"uint256"}],"name":"RenTransferedIn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"INIT_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_LEVEL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REGEN_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TIME_CONSTANT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint16","name":"baseRewards_","type":"uint16"},{"internalType":"uint16","name":"creatureCount_","type":"uint16"},{"internalType":"uint16","name":"expPoints_","type":"uint16"},{"internalType":"uint16","name":"creatureHealth_","type":"uint16"},{"internalType":"uint16","name":"minLevel_","type":"uint16"},{"internalType":"uint16","name":"maxLevel_","type":"uint16"}],"name":"addCamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"attributes","outputs":[{"internalType":"uint256","name":"hair","type":"uint256"},{"internalType":"uint256","name":"race","type":"uint256"},{"internalType":"uint256","name":"accessories","type":"uint256"},{"internalType":"uint256","name":"sentinelClass","type":"uint256"},{"internalType":"uint256","name":"weaponTier","type":"uint256"},{"internalType":"uint256","name":"inventory","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"auth","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"bankBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"bool","name":"rollItems_","type":"bool"},{"internalType":"bool","name":"useitem_","type":"bool"},{"internalType":"address","name":"owner","type":"address"}],"name":"bloodThirst","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"camps","outputs":[{"internalType":"uint32","name":"baseRewards","type":"uint32"},{"internalType":"uint32","name":"creatureCount","type":"uint32"},{"internalType":"uint32","name":"creatureHealth","type":"uint32"},{"internalType":"uint32","name":"expPoints","type":"uint32"},{"internalType":"uint32","name":"minLevel","type":"uint32"},{"internalType":"uint32","name":"campMaxLevel","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256","name":"renAmount","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"checkIn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"renAmounts","type":"uint256[]"},{"internalType":"bytes[]","name":"renSignatures","type":"bytes[]"},{"internalType":"uint256[]","name":"timestamps","type":"uint256[]"},{"internalType":"address[]","name":"owners","type":"address[]"}],"name":"checkOutRen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"elves","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"action","type":"uint256"},{"internalType":"uint256","name":"healthPoints","type":"uint256"},{"internalType":"uint256","name":"attackPoints","type":"uint256"},{"internalType":"uint256","name":"primaryWeapon","type":"uint256"},{"internalType":"uint256","name":"level","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"renAmount","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"encodeRenForSignature","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"flipActiveStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipTerminal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address","name":"owner","type":"address"}],"name":"forging","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getSentinel","outputs":[{"internalType":"uint256","name":"sentinel","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getToken","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint8","name":"action","type":"uint8"},{"internalType":"uint8","name":"healthPoints","type":"uint8"},{"internalType":"uint8","name":"attackPoints","type":"uint8"},{"internalType":"uint8","name":"primaryWeapon","type":"uint8"},{"internalType":"uint8","name":"level","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"race","type":"uint8"},{"internalType":"uint8","name":"accessories","type":"uint8"},{"internalType":"uint8","name":"sentinelClass","type":"uint8"},{"internalType":"uint8","name":"weaponTier","type":"uint8"},{"internalType":"uint8","name":"inventory","type":"uint8"}],"internalType":"struct DataStructures.Token","name":"token","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"healer","type":"uint256"},{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"heal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"healers","type":"uint256[]"},{"internalType":"uint256[]","name":"targets","type":"uint256[]"},{"internalType":"address","name":"owner","type":"address"}],"name":"healMany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isGameActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isTerminalOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address","name":"owner","type":"address"}],"name":"merchant","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"sentinel","type":"uint256[]"}],"name":"modifyElfDNA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"oldSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address","name":"owner","type":"address"}],"name":"passive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"sentinel","type":"uint256[]"}],"name":"prismBridge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address","name":"owner","type":"address"}],"name":"returnPassive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256","name":"campaign_","type":"uint256"},{"internalType":"uint256","name":"sector_","type":"uint256"},{"internalType":"bool","name":"rollWeapons_","type":"bool"},{"internalType":"bool","name":"rollItems_","type":"bool"},{"internalType":"bool","name":"useitem_","type":"bool"},{"internalType":"address","name":"owner","type":"address"}],"name":"sendCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"sentinels","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setAccountBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_owners","type":"address[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"setAccountBalances","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_inventory","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"adds_","type":"address[]"},{"internalType":"bool","name":"status","type":"bool"}],"name":"setAuth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint8","name":"_primaryWeapon","type":"uint8"},{"internalType":"uint8","name":"_weaponTier","type":"uint8"},{"internalType":"uint8","name":"_attackPoints","type":"uint8"},{"internalType":"uint8","name":"_healthPoints","type":"uint8"},{"internalType":"uint8","name":"_level","type":"uint8"},{"internalType":"uint8","name":"_inventory","type":"uint8"},{"internalType":"uint8","name":"_race","type":"uint8"},{"internalType":"uint8","name":"_class","type":"uint8"},{"internalType":"uint8","name":"_accessories","type":"uint8"}],"name":"setElfManually","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_validator","type":"address"}],"name":"setValidator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"supported","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address","name":"owner","type":"address"}],"name":"synergize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"usedRenSignatures","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"}]
const polyValidatorKey = "0de75b4bca5473783fd57631ee91112ced623e81d38fea625d1004b4ae16e152";


exports.handler = async function(event) {

//const { body } = event.request;
const credentials = { ... event };
const provider = new DefenderRelayProvider(event);
const web3 = new Web3(provider);
const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
const polyElves = new ethers.Contract(polyElvesAddress, polyElvesABI, signer);

//body.
let ra = "1700000000"
let ts = "1646011571"
let csa = web3.utils.toChecksumAddress("0xCcB6D1e4ACec2373077Cb4A6151b1506F873a1a5");

let mh = web3.utils.soliditySha3(ra, csa, ts)
let st = web3.eth.accounts.sign(mh, polyValidatorKey);

let tx
let mined
let gasLimit = {gasLimit: 1000000}

tx = await polyElves.checkOutRen([ra], [st.signature], [ts], [csa], gasLimit);
mined = await tx.wait();




return {tx:tx, receipt:mined, mh:mh}
}


if(confirmedArray.length > 0) {
   
    let body = asset === "ren" ? {asset: asset, param1: param1, param2: param2, param3: param3, param4: param4} 
                                 : {asset: asset, param1: param1, param2: param2}

                            await Moralis.Cloud.httpRequest({
                                  method: 'POST',
                                  url: bridge,
                                  headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                  },
                                  body: body
                                }).then(function(httpResponse) {

                                  if(httpResponse.data.status === "success"){
	
                                    confirmedArray.map((item, index) => {
                                        item.set("defenderStatus", httpResponse.data.status)
                                      	item.set("defenderTxHash", httpResponse.data.result)
                                        item.set("status", "initiated")
                                        item.save() 
                                  })
                                  }

                                }, function(httpResponse) {

                                  confirmedArray.map((item, index) => {
            
                                    item.set("status", "error")
                                    item.save() 
                                  })
                              

                                });
    
      
   
  }
  

  Moralis.Cloud.afterSave("ElvesRenTransferOut", async(request) =>{
    //Wait for checkin to be initiated in Polygon then create transfer signature
        const confirmed = request.object.get("confirmed");  
        const renAmount = request.object.get("renAmount");
        const timestamp =  request.object.get("timestamp") 
        const walletAddress = request.object.get("from")
        const txHash = request.object.get("transaction_hash")
        
     if (confirmed) {
       
       logger.info("RenOutofETH!")
       
       const RenTransfers = Moralis.Object.extend("RenTransfers");
        
       let query = new Moralis.Query(RenTransfers);  
        query.equalTo("from", walletAddress);
        query.equalTo("timestamp", timestamp);
        const res = await query.first();
      
        if(!res){   
            
            const RenTransfers = Moralis.Object.extend("RenTransfers");
            const transferObject = new RenTransfers();

            let body = {renAmount: renAmount, from: walletAddress, timestamp: timestamp}  
            
            transferObject.set("from", walletAddress);
            transferObject.set("timestamp", timestamp);
            transferObject.set("renAmount", renAmount);
            transferObject.set("txHash", txHash);
            transferObject.set("transferTo", "polygon");
            transferObject.set("status", "pending");                 
        
            await Moralis.Cloud.httpRequest({
                method: 'POST',
                url: renCheckOut,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: body
              }).then(function(httpResponse) {

                if(httpResponse.data.status === "success"){
                  
                    transferObject.set("defenderStatus", httpResponse.data.status)
                    transferObject.set("defenderTxHash", httpResponse.data.result)
                   
                
                }

              }, function(httpResponse) {

                    transferObject.set("status", "error")
                    transferObject.set("error", httpResponse.data.error)
                    transferObject.save()                 

              });

              await transferObject.save();  //Save transfer object
    
      }
     }
      
    });
    
    
    
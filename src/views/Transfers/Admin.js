import React, { useEffect, useState, useMemo } from "react"
import Loader from "../../components/Loader"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { actionString, campaigns } from "../home/config"
import Countdown from 'react-countdown';
import {elvesAbi, getCampaign, elvesContract, etherscan,
    checkIn, checkOut, checkOutRen, usedRenSignatures,
    sendCampaign, sendPassive, returnPassive, unStake, merchant, forging,
    heal, lookupMultipleElves, getCurrentWalletConnected, checkRenTransfersIn} from "../../utils/interact"
import SentinelTransfers from "./SentinelTransfers"
import TransfersToPolygon from "./TransfersToPolygon"
import "./style.css"
import RenTransfers from "./RenTransfers";


const Admin = () => {
    const [loading, setLoading] = useState(true)
    const { Moralis } = useMoralis();
    const [walletSwtich, setWalletSwtich] = useState()
    const [transferChain, setTransferchain] = useState("polygon")
    const [wallet, setWallet] = useState("0xccb6d1e4acec2373077cb4a6151b1506f873a1a5")
    const [notStatus, setNotStatus] = useState("completed")

    

 

    const handleWalletChange = (e) => {
        setWallet(e.target.value)
    }

    




    return (
        
        <div className="dark-1000 h-full d-flex flex-column profile">           

        
<div className="d-flex">      
        <div className="column">     
  
                    <div className="flex justify-center p-2">
                     
                      
                        <div>
                            <label>address</label>
                            <input type="text" value={wallet} onChange={(e)=>{setWallet(e.target.value)}}/>
                            <label>transfer to</label>
                            <input type="text" value={transferChain} onChange={(e)=>{setTransferchain(e.target.value)}}/>
                            <label>not status</label>
                            <input type="text" value={notStatus} onChange={(e)=>{setNotStatus(e.target.value)}}/>
                        </div>
                              
                            
      </div>   

                   
            {wallet && <>
               <SentinelTransfers notStatus={notStatus} address={wallet} transferTo={transferChain} limit={20} />
             
               </>}
            <br/>
            <br/>
            <br/>
           
         
</div>

</div>
        </div>
        
     
    ) 
}

export default Admin
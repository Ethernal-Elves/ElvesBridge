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


const Transfers = () => {
    const [loading, setLoading] = useState(true)
    const { Moralis } = useMoralis();
    
    const [transferChain, setTransferchain] = useState("polygon")
    const [wallet, setWallet] = useState("")
    const [walletSwtich, setWalletSwtich] = useState(wallet)
    const [toggleView, setToggleView] = useState(true)
    const [admin, setAdmin] = useState("")

    


    useEffect(async () => {
        const {address} = await getCurrentWalletConnected()
        setWallet(address)
        
        
    }, [])

    const toggleTabs = () => {
        setToggleView(!toggleView)  
        if(!toggleView){
            setTransferchain("polygon")
        }else{
            setTransferchain("eth")
        }
       

    }

    




    return (
        
        <div className="dark-1000 h-full d-flex flex-column profile">           

        
<div className="d-flex">      
        <div className="column">     
  
                    <div className="flex justify-center p-2">
                            <button
                            /*disabled={!isButtonEnabled.unstake}*/
                            className="btn btn-blue"
                            onClick={toggleTabs}
                        >
                            Toggle Chain
                        </button>  

                      
      
                              
                            
      </div>   

                   
            {wallet && <>
               <SentinelTransfers notStatus={"completed"} address={wallet} transferTo={transferChain} limit={10} />
                <RenTransfers notStatus={"completed"} address={wallet} transferTo={transferChain} limit={10} />
               </>}
            <br/>
            <br/>
            <br/>
           
         
</div>

</div>
        </div>
        
     
    ) 
}

export default Transfers
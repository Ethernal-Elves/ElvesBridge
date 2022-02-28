import React from "react"
import { useState, useEffect } from "react"
import {withdrawTokenBalance, getCurrentWalletConnected, withdrawSomeTokenBalance, balanceOf} from "../utils/interact"
import {useMoralis, useChain} from "react-moralis"
import Modal from "../components/Modal"

const Withdraw = () => {

  const { Moralis } = useMoralis();
  const { account } = useChain();
  const [tooltip, setTooltip] = useState("");
  const [balance, setBalance] = useState(0);
  const [polyBalance, setPolyBalance] = useState(0);
  const [balanceToClaim, setBalanceToClaim] = useState(0);
  const [miren, setMiren] = useState(0);
  const [modal, setModal] = useState(false);
  


const getRenBalance = async (address) => {

 let allbalances = await balanceOf(address);

 console.log(allbalances)

  
  setBalance(allbalances.contractRen/1000000000000000000);
  setMiren(allbalances.miren/1000000000000000000);
  setPolyBalance(allbalances.polyMiren/1000000000000000000);

}


const claimCustomAmount = async () => {
      
  const params = {amount: Moralis.Units.ETH(balanceToClaim)}
  await withdrawSomeTokenBalance(params)
                  
}


useEffect( () => {
  const init = async () => {
    const {address, status} = await getCurrentWalletConnected();
    address &&  await getRenBalance(address)
  }

  init();
  
},[])


  
    return (
      <>
    <div className="search">
    <button onClick={() => setModal(!modal)}>REN</button>
    </div>
       <Modal show={modal}> 
      
       <h1>REN Balances</h1>
 
       
                <p>REN credits in Eth: {balance} {balanceToClaim > 0 && `- ${balanceToClaim}`}</p>
                <p>REN credits in polygon: {polyBalance}</p>
                <p>REN in wallet: {miren} </p>


           
       </Modal>
      </>
    
    )
}

export default Withdraw
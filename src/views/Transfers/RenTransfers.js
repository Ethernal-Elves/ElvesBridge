import React, { useEffect, useState, useMemo } from "react"
import Loader from "../../components/Loader"
import { useMoralis, useMoralisQuery } from "react-moralis"
import {checkIn, checkOut, checkOutRen, usedRenSignatures,
    sendCampaign, sendPassive, returnPassive, unStake, merchant, forging,
    heal, lookupMultipleElves, getCurrentWalletConnected, checkRenTransfersIn} from "../../utils/interact"



const RenTransfers = ({address, transferTo}) => {
    const [loading, setLoading] = useState(true)
    const { Moralis } = useMoralis();
    const [status, setStatus] = useState("")
   
    const [nftData, setNftData] = useState([])
    const [alert, setAlert] = useState({show: false, value: null})

   
    const resetVariables = async () => {        

        fetch()

    }

    const [clicked, setClicked] = useState([]);

    const toggle = (id) => {
        if (clicked.includes(id)) {
            setClicked(clicked.filter(item => item !== id))
        } else {
            setClicked([...clicked, id])
        }

        if(clicked.length === 1) {
            
        }else{
            
        }
    }


    const handleClick = async (nft) => {
        
        if(nft.attributes.status === "completed" || nft.attributes.status === "initiated"){
        }else{
            toggle(nft.id)
        }
        
        console.log(clicked)
    }
    

    const { data, error, isLoading, fetch } = useMoralisQuery(
      "RenTransfers",
      query =>
        query
          .equalTo("from", address)
          .equalTo("transferTo", transferTo)
          .notEqualTo("status", "completed")
          .limit(10),
      [address, transferTo],
     
    );


    const checkOutRen = async () => {

        let renTransfers = []
        let updateRenStatusArray = []
        
        data.map((item, index) => {

        
            if (clicked.includes((item.id))) {

                renTransfers.push(item.attributes.renAmount)
                
            }

        })

        
    
    if(renTransfers.length > 0){

        if(transferTo === "polygon"){          
                 
           
                   
          let params =  {objectIds:renTransfers, owner:address, asset:"ren"}
                    
            try{
                const response = await Moralis.Cloud.run("confirmPendingPolygon", params);
                console.log(response, params)
                    }catch(error){
                        console.log(error)
                    }
                        
            }else
            
            {

                   renTransfers.map(async (tx)=>{
            
                            let sigUsed = await usedRenSignatures(tx.renSignature)
                            
                            if(parseInt(sigUsed) === 1){
                                console.log("is true. very naice.")
                                setAlert({show: true, value: {title: "Signature used", content: ("This transaction signature has already been used")}})
                                return
                            }
            
                        
                            const params2 =  {renAmount:tx.renAmount , signature:tx.renSignature, timestamp:tx.timestamp}
            
                            console.log(params2)
                            let {success, status, txHash} = await checkOutRen(params2)     
                            
                            if(success){
            
                                updateRenStatusArray.map((item, index) => {
                                    item.set("status", "initiated")
                                    item.save()
                                })
                    
                    }       
                        
                  
            
                        })
                    
                    }

                    resetVariables()  
                    setAlert({show: true, value: {title: "Tx Sent", content: (status)}})

                }                
     
                      
        }

    


        const showAlert = ({title, content}) => {

            return (
                <div className="alert">
                    <h3>{title}</h3>
                    <pre>{content}</pre>
                    <button className="btn btn-red" onClick={()=>setAlert({show: false})}>close</button>
                </div>
            )
        }



    return (
        
        <>

<div className="flex justify-center p-2">
                            <button
                            /*disabled={!isButtonEnabled.unstake}*/
                            className="btn-whale"
                            onClick={checkOutRen}
                        >
                            Confirm Transfers to {transferTo}
                        </button>   

                        <button className="btn-whale" onClick={() => fetch}>Speed up transfer</button>

                            
                            </div>    
                      
   
    
        <div className="collection-panel">
             <div className="collection-selection" >
                 
                    
  <div className="table-whale">      
      <table style={{width: '100%'}}>
      <thead style={{textAlign: "left"}}>
        <tr>
        <th>Id</th>
        <th>Transfer Initiated On</th>
        <th>Ren Amount</th>
        <th>Status</th>
        <th>Transfer To</th>
       
        </tr>
      </thead>
      <tbody>
     

            {!isLoading && data.map((line, index) => {

                const date = new Date(line.attributes.timestamp * 1000)
                const dateString = date.toString()

                let rowSelected = clicked.includes((line.id)) ? "rowSelected" : ""

                
                return( <tr key={index} className={`${rowSelected} row`} onClick={()=> handleClick((line))}  > 
                   <td>
                     {line.id}
                    </td>
                    <td>
                        {dateString}
                    </td>
                    <td>{line.attributes.renAmount/1000000000000000000}</td>                   
                    <td>{line.attributes.status}</td>
                    <td>{line.attributes.transferTo}</td>
                </tr>)
            })}
       
                </tbody>
                </table>
                </div>
                </div>

     
</div>
      
      




{alert.show && showAlert(alert.value)}



        </>
        
     
    ) 
}

export default RenTransfers
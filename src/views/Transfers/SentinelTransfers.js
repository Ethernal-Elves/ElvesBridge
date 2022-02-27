import React, { useEffect, useState, useMemo } from "react"
import Loader from "../../components/Loader"
import { useMoralis, useMoralisQuery } from "react-moralis"
import {checkIn, checkOut, checkOutRen, usedRenSignatures,
    sendCampaign, sendPassive, returnPassive, unStake, merchant, forging,
    heal, lookupMultipleElves, getCurrentWalletConnected, checkRenTransfersIn} from "../../utils/interact"



const SentinelTransfers = () => {
    const [loading, setLoading] = useState(true)
    const { Moralis } = useMoralis();
    const [status, setStatus] = useState("")

    const [clicked, setClicked] = useState([]);

    const [nftData, setNftData] = useState([])
    const [alert, setAlert] = useState({show: false, value: null})
    const [sigButton, setSigButton] = useState(false)
   
    const resetVariables = async () => {
        
        setClicked([])
        setNftData([])
        fetch()

    }
    
   
    const handleClick = async (id) => {

        if (clicked.includes(id)) {
            setClicked(clicked.filter(item => item !== id))
        } else {
            setClicked([...clicked, id])
        }

        if(clicked.length === 1) {
            setSigButton(true)
        }else{
            setSigButton(false)
        }
       
    }    

               /* query.equalTo("from", address);
                query.equalTo("transferTo", "polygon");
                query.notEqualTo("status", "completed");  
*/
const address = "0xccb6d1e4acec2373077cb4a6151b1506f873a1a5"
const transferTo = "polygon"

    const { data, error, isLoading, fetch } = useMoralisQuery(
      "SentinelTransfers",
      query =>
        query
          .equalTo("from", address)
         // .equalTo("transferTo", "eth")
         // .notEqualTo("status", "completed")
          .limit(10),
      [address],
     
    );

   console.log(data)

    const checkOutElf = async () => {

        let tokenIdsArry = []
        let sentinelArry = []
        let signatureArry = []
        let authCodesArry = []

        let updateElfStatusArray = []

        data.map((item, index) => {
            
            if (clicked.includes((item.id))) {

                tokenIdsArry.push(item.attributes.tokenId)
                sentinelArry.push(item.attributes.sentinel)
                signatureArry.push(item.attributes.signature)
                authCodesArry.push(item.attributes.authCode)
                updateElfStatusArray.push(item)
                
            }


        })
        
      if(tokenIdsArry.length > 0){
  
        let params =  {ids:tokenIdsArry , sentinel:sentinelArry, signature:signatureArry, authCode:authCodesArry}
        let {success, status, txHash} = await checkOut(params)
        
        if(success){

            updateElfStatusArray.map((item, index) => {
                item.set("status", "initiated")
                item.save()
            })

            resetVariables()  

        }                 
 
        setAlert({show: true, value: {title: "Tx Sent", content: (status)}})
      }

      let params =  {objectIds:tokenIdsArry, owner:address, asset:"elves"}
        
      let response 
      console.log(params)
      try{
        setLoading(true)
        setStatus("1. Sending gasless tx to confirm elf transfers. Don't close window or refresh.")
        response = await Moralis.Cloud.run("confirmPendingPolygon", params);
        console.log(response)
      }catch(error){
          console.log(error)
      }

     
        resetVariables()  
        
                      
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


<div className="d-flex">      
                    <div className="column">             

                            <div className="flex justify-center p-2">
                            <button
                            /*disabled={!isButtonEnabled.unstake}*/
                            className="btn-whale"
                            onClick={checkOutElf}
                        >
                            Confirm Transfers
                        </button>   
                            
                            </div>      
    
        <div className="collection-panel">
             <div className="collection-selection" >
                 
                    
  <div className="table-whale">      
      <table style={{width: '100%'}}>
      <thead style={{textAlign: "left"}}>
        <tr>
        <th>Id</th>
        <th>Transfer Initiated On</th>
        <th>
            <div className="flex">
                <span>Sentinel State</span>
                
            </div>
        </th>
        <th>Token Id</th>
        <th>Status</th>
        <th>Transfer To</th>
       
        </tr>
      </thead>
      <tbody>
     

            {!isLoading && data.map((line, index) => {

                const date = new Date(line.attributes.timestampCreated * 1000)
                const dateString = date.toString()

                let rowSelected = clicked.includes((line.id)) ? "rowSelected" : ""

          
                return( <tr key={index} className={`${rowSelected} row`} onClick={()=> handleClick((line.id))}  > 
                   <td>
                     {line.id}
                    </td>
                    <td>
                        {dateString}
                    </td>
                    <td>
                     {line.attributes.sentinel && String(line.attributes.sentinel).substring(0, 10) +
                    "..." +
                    String(line.attributes.sentinel).substring(68)}
                    </td>
                    <td>{line.attributes.tokenId}</td>                   
                    <td>{line.attributes.status}</td>
                    <td>{line.attributes.transferTo}</td>
                </tr>)
            })}
       
                </tbody>
                </table>
                </div>
                </div>

     
</div>
</div>

     
</div>
      
      




{alert.show && showAlert(alert.value)}



        </>
        
     
    ) 
}

export default SentinelTransfers
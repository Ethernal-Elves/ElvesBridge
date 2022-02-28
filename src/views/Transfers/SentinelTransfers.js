import React, { useEffect, useState, useMemo } from "react"
import Loader from "../../components/Loader"
import { useMoralis, useMoralisQuery } from "react-moralis"
import {checkIn, checkOut, checkOutRen, usedRenSignatures,
    sendCampaign, sendPassive, returnPassive, unStake, merchant, forging,
    heal, lookupMultipleElves, getCurrentWalletConnected, checkRenTransfersIn} from "../../utils/interact"



const SentinelTransfers = ({address, transferTo, notStatus, limit}) => {
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const { Moralis } = useMoralis();
    const [status, setStatus] = useState("")
   
    const [nftData, setNftData] = useState([])
    const [transfersData, setTransfersData] = useState([])
    const [alert, setAlert] = useState({show: false, value: null})

   
    const resetVariables = async () => {        

        let hi = "hi"
   

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
    

    /*const { data, error, isLoading, fetch } = useMoralisQuery(
      "SentinelTransfers",
      query =>
        query
          .equalTo("from", address)
          .equalTo("transferTo", transferTo)
          .notEqualTo("status", notStatus)
          .limit(limit),
      [address, transferTo, notStatus, limit],
     
    );*/

   const getElvesfromMoralis = async (address) => {

        setLoading(true)
        setLoadingText("Getting elves from Moralis")
        setClicked([])
        let array = []
        let results 

        await Moralis.enableWeb3()
        
        const Elves = Moralis.Object.extend("SentinelTransfers");
        
        let query = new Moralis.Query(Elves);  

        query
            .equalTo("from", address)
            .equalTo("transferTo", transferTo)
            .notEqualTo("status", notStatus)
            .limit(limit)

        results = await query.find()

        console.log(results)
          
        results.map((elf) => {
            
            array.push(elf.attributes.tokenId)
        })   

        setLoadingText("Locating elves on chain")
        const elves = await lookupMultipleElves({array: array, chain: transferTo})        
        

        setNftData(elves)
        setTransfersData(results)
        setLoading(false)

    }

    
    useEffect(() => {
        getElvesfromMoralis(address)
    }, [address, transferTo, notStatus, limit])

        



    const checkOutElf = async () => {
        setLoading(true)
        setLoadingText("Sending tx")
        let tokenIdsArry = []
        let sentinelArry = []
        let signatureArry = []
        let authCodesArry = []
        let objectIds = []

        let updateElfStatusArray = []

        transfersData.map((item) => {
            
            if (clicked.includes((item.id))) {

                tokenIdsArry.push(item.attributes.tokenId)
                sentinelArry.push(item.attributes.sentinel)
                signatureArry.push(item.attributes.signature)
                authCodesArry.push(item.attributes.authCode)
                objectIds.push(item.id)
                updateElfStatusArray.push(item)
                
            }


        })

                
      if(tokenIdsArry.length > 0){

        if(transferTo === "polygon"){

            let params =  {objectIds:objectIds, owner:address, asset:"elves"}
            console.log(params)
            try{
              setLoading(true)
              setStatus("1. Sending gasless tx to confirm elf transfers. Don't close window or refresh.")
              const response = await Moralis.Cloud.run("confirmPendingPolygon", params);
              console.log(response)
              const tx = JSON.parse(response.tx);
              const txHash = tx.tx.hash

              const status = <>Check out your transaction on <a target="_blank" href={`https://polygonscan.com/tx/${txHash}`}>Polyscan</a> </>

                setAlert({show: true, value: {title: "Tx Sent", content: (status)}})

              
            }catch(error){
                console.log(error)
            }
      
            
        }
        
        else{

                    let params =  {ids:tokenIdsArry , sentinel:sentinelArry, signature:signatureArry, authCode:authCodesArry}
                    let {success, status, txHash} = await checkOut(params)
                    
                    if(success){

                        updateElfStatusArray.map((item, index) => {
                            item.set("status", "initiated")
                            item.save()
                        })

                    
                        setAlert({show: true, value: {title: "Tx Sent", content: (status)}})
                    }
        }
 
        
      }
    
     
        resetVariables()  
       setLoading(false)
                      
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



    return !loading ? (
        
        <>

<div className="flex justify-center p-2">
                            <button
                            /*disabled={!isButtonEnabled.unstake}*/
                            className="btn-whale"
                            onClick={checkOutElf}
                        >
                            Confirm Transfers to {transferTo}
                        </button>   

                        <button className="btn-whale" onClick={resetVariables}>Speed up transfer</button>

                            
                            </div>    
                      
   
    
        <div className="collection-panel">
             <div className="collection-selection" >
                 
                    
  <div className="table-whale">      
      <table style={{width: '100%'}}>
      <thead style={{textAlign: "left"}}>
        <tr>
        <th>Id</th>
        <th>Transfer Created On</th>
        <th>
            <div className="flex">
                <span>Sentinel State</span>
                
            </div>
        </th>
        <th>Token Id</th>
        <th>Status</th>
        <th>Transfer To</th>
        <th>Nft Status</th>
       
        </tr>
      </thead>
      <tbody>
     

            {!loading && transfersData.map((line, index) => {

                const date = new Date(line.attributes.timestampCreated * 1000)
                const dateString = date.toString()
                //date string to short date
                const shortDate = dateString.substring(0, dateString.indexOf('GMT'))

                let rowSelected = clicked.includes((line.id)) ? "rowSelected" : ""

                // find the elf in the nftData array
                let elf = nftData.find((item) => item.id === line.attributes.tokenId)
                let excludeAction = transferTo === "polygon" ? 0 : 8
                let nftStatus = elf.action === excludeAction ? "on eth" : "in polygon"

           
                
                return( <tr key={index} className={`${rowSelected} row`} onClick={()=> handleClick((line))}  > 
                   <td>
                     {line.id}
                    </td>
                    <td>
                        {shortDate}
                    </td>
                    <td>
                     {line.attributes.sentinel && String(line.attributes.sentinel).substring(0, 10) +
                    "..." +
                    String(line.attributes.sentinel).substring(68)}
                    </td>
                    <td>{line.attributes.tokenId}</td>                   
                    <td>{line.attributes.status}</td>
                    <td>{line.attributes.transferTo}</td>
                    <td>{nftStatus}</td>

                </tr>)
            })}
       
                </tbody>
                </table>
                </div>
                </div>

     
</div>
      
      




{alert.show && showAlert(alert.value)}



        </>
        
     
    ) : <Loader text={loadingText} />
}

export default SentinelTransfers
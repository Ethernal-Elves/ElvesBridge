import React, { useEffect, useState } from "react";

import { useMoralis } from "react-moralis";
import {elvesAbi, elvesContract, lookupMultipleElves} from "../../../utils/interact"


const Admin = () => {


const { Moralis } = useMoralis();




const Elves = Moralis.Object.extend("Elves");





const refreshMetaData = async () => {

 

  let results = []

  let start = 1
  let supply = 6666//parseInt(cloudSupply.supply) ///tokenSupply
  let stop = 0
  let steps = supply < 44 ? supply : 44

 
  let counter = 0
  let i = 0

  while(counter<supply){
         
    start = i*steps + 1
    stop = start + steps - 1

    const tokenArray = []
      for (var j = start; j <= stop; j++) {
        tokenArray.push(j);
        counter++
      }
   const params = {array: tokenArray, chain: "eth"}
   let chain = "eth"
   results = await lookupMultipleElves(params)
   console.log(results)
   results.map(async (elf)=>{
    
    let query = new Moralis.Query(Elves);  
    query.equalTo("token_id", elf.id);
    const res = await query.first();
    if(!res){
     
     
      const elvesObject = new Elves();
      elvesObject.set("owner_of", elf.owner)
      elvesObject.set("token_id", elf.id)
      elvesObject.save() 
      console.log("object created")
      }else{

        if(parseInt(elf.action) === 8){
          chain = "polygon"
        }
        res.set("owner_of", elf.owner);
        res.set("chain", chain);

        res.save()
        console.log("object saved", res, elf)
      }

    })
   

    i++
  }

  
};


return (
<>
       <div className="dark-1000 h-full d-flex home justify-center items-center black">
      

         
            <button className="btn btn-blue" onClick={refreshMetaData}>Update Elf Metadata</button> 
         
             
          </div>
 </>



  ) 
};

export default Admin;



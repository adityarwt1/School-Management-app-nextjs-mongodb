import { TokentInteface } from "@/interfaces/Token/tokenInterface"
import {redirect } from "next/navigation"
import { TokenServices } from "@/services/Token/token"
import React from "react"
import { mongoconnect } from "@/lib/mongodb"
import Principle from "@/models/Principle"
import PrincipleCard from "@/components/Principle/PrincipleCard"
import { PrincipleCardInterface } from "@/interfaces/Principle/PrincipleInfoInterface"
import School from "@/models/School"

const PrincipleDashBoard =async ()=>{
    const tokenServices = new TokenServices()

    const principleInfo = await tokenServices.getTokenInfo() as TokentInteface

    if(principleInfo.role !== "principle" ){
        redirect("/principleLogin")
    }

    const isConnected = await mongoconnect()

    if(!isConnected){
        throw new Error("Internal server issue.")
    }

    const principleDoc = await Principle.findOne({_id:principleInfo._id}).select("fullName bcCode email profilePicture schoolId ").lean() as PrincipleCardInterface;
    
    const schoolinfo = await School.findOne({_id:principleDoc.schoolId})
    console.log(schoolinfo)
    return  (
        <>
        <PrincipleCard {...principleDoc}/>
        </>
    )
}

export default PrincipleDashBoard;
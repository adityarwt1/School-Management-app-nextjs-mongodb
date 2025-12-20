import { TokentInteface } from "@/interfaces/Token/tokenInterface"
import {redirect } from "next/navigation"
import { TokenServices } from "@/services/Token/token"
import React, { Suspense } from "react"
import { mongoconnect } from "@/lib/mongodb"
import Principle from "@/models/Principle"
import PrincipleCard from "@/components/Principle/PrincipleCard"
import { PrincipleCardInterface } from "@/interfaces/Principle/PrincipleInfoInterface"
import School from "@/models/School"
import SchoolCard from "@/components/School/SchoolCard"
import PrincipleSkeletonScreen from "@/components/Principle/PrincipleSkeletonScreen"
import SchoolCardSkeleton from "@/components/School/SchoolCardSkeleton"

const PrincipleDashBoard =async ()=>{
    const tokenServices = new TokenServices()

    const principleInfo = await tokenServices.getTokenInfo() as TokentInteface
    console.log(principleInfo)
    if(principleInfo.role !== "principle" ){
        redirect("/principleLogin")
    }

    const isConnected = await mongoconnect()

    if(!isConnected){
        throw new Error("Internal server issue.")
    }

    const principleDoc = await Principle.findOne({_id:principleInfo._id}).select("fullName bcCode email profilePicture schoolId ").lean() as PrincipleCardInterface;
    console.log (principleDoc)
    const schoolinfo = await School.findOne({principleId:principleDoc._id}).lean()
    console.log(schoolinfo)
    return (
      <>
        <div className="flex w-full  justify-center itmes-center">
          <Suspense fallback={<PrincipleSkeletonScreen />}>
            <PrincipleCard {...principleDoc} key={principleDoc._id as string} />
          </Suspense>
          <Suspense fallback={<SchoolCardSkeleton />}>
            <SchoolCard
              school={schoolinfo}
              key={principleDoc._id + "_SchoolId"}
            />
          </Suspense>

          
        </div>  
      </>
    );
}

export default PrincipleDashBoard;
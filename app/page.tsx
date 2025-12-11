import { Metadata } from "next";
import React from "react";


const HomePage = ()=>{
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-2xl">School Management App</div>
    </div>
  )
}

export default HomePage

export const metadata:Metadata={
  title:"Home - School Manage App",
  description:"Manage your school seemless for Principle Dashboard, teacher Dashboard and Student Dashboard.",
  keywords:["school manage", "teacher dashboard","student dashboard","manage  school"],
  openGraph:{
    images:['/images/og/banner.png']
  }

}
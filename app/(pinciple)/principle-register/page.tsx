"use client"
import { PrincipleInfoInterface } from "@/interfaces/Principle/Register/requestInterface";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const PrincipleRegisterPage = () => {
  const [principleInfo, setPrincipleInfo] = useState<PrincipleInfoInterface>({
    fullName: "",
    email: "",
    contactNumber: 0,
    password: "",
  });
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [isLoading , setIsLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPrincipleInfo((prev) => ({
      ...prev,
      [name]: name === "contactNumber" ? Number(value) : value,
    }));
  };

  const handleSubmit =async (e:FormEvent) :Promise<void>=>{
    e.preventDefault();
    setIsLoading(true)
    if(!principleInfo.contactNumber || !principleInfo.email || !principleInfo.fullName || !principleInfo.password){
      setError("Provide field first.")
      setIsLoading(false)
      return ;
    }
    try {
      const response = await fetch("/api/v1/principleRegister",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({...principleInfo})
      });

      const data = await response.json()

      if(data.success){
        router.replace("/principledashboard" ,{scroll:true})
      }
      if(data.error){
        setError(data.error)
      }
    } catch (error) {
      setError((error  as Error).message)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="fullName"
          placeholder="Enter your name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />

        <input
          type="number"
          name="contactNumber"
          placeholder="Enter number"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
        <button disabled={isLoading} type="submit">{isLoading ? "Register...":"Register"}</button>
      </form>
      {error && (
        <div>{error}</div>
      )}
    </div>
  );
};

export default PrincipleRegisterPage;

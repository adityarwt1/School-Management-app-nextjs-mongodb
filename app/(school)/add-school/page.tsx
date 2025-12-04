"use client"
import { SchoolInterface } from "@/interfaces/School/SchoolInterface";
import { addSchool } from "@/services/School/addSchool";
import { useRouter } from "next/navigation";
import React, { ChangeEvent,  useState } from "react";

const SchoolAdd = () => {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInterface>({
    diseCode: 0,
    schoolName: "",
    pinCode: 0,
    contactNumber: 0,
    email: "",
    from: 1,
    to: 12,
  });

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  // LKG → UKG → 1 to 12
  const classes = [
    "LKG",
    "UKG",
    ...Array.from({ length: 12 }, (_, i) => i + 1),
  ];

  // Generic handler for input boxes
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSchoolInfo((prev) => ({
      ...prev,
      [name]: name === "schoolName" || name === "email" ? value : Number(value),
    }));
  };

  // Handler for <select>
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setSchoolInfo((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value), // convert numbers only
    }));
  };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
      e.preventDefault()
        setIsLoading(true)
       try {
            const response = await addSchool({contactNumber:schoolInfo.contactNumber , diseCode:schoolInfo.diseCode , email:schoolInfo.email , from:schoolInfo.from , pinCode:schoolInfo.pinCode,schoolName:schoolInfo.schoolName , to:schoolInfo.to})
            if(response.error){
              setError(response.error)
              return 
            }
            if(response.success){
              router.replace("/principledashboard")
            }
       } catch (error) {
        console.log(error as Error)
       }finally{
        setIsLoading(false)
       } 
    }
  return (
    <div>
      <form className="flex flex-col gap-2 p-4 text-white" onSubmit={handleSubmit}>
        <label htmlFor="diseCode">DISE Code</label>
        <input
          type="number"
          placeholder="Enter DISE code"
          name="diseCode"
          id="diseCode"
          onChange={handleOnChange}
          required
        />

        <label htmlFor="schoolName">School Name</label>
        <input
          type="text"
          placeholder="Enter school name"
          name="schoolName"
          id="schoolName"
          onChange={handleOnChange}
          required
        />

        <label htmlFor="pinCode">Pin Code</label>
        <input
          type="number"
          placeholder="Enter pin code"
          name="pinCode"
          id="pinCode"
          onChange={handleOnChange}
          required
        />

        <label htmlFor="contactNumber">Contact Number</label>
        <input
          type="number"
          placeholder="Enter contact number"
          name="contactNumber"
          id="contactNumber"
          onChange={handleOnChange}
          required
        />

        <label htmlFor="email">School or Principal Email</label>
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          id="email"
          onChange={handleOnChange}
          required
        />

        <label htmlFor="clsFrom">Class From</label>
        <select id="clsFrom" name="from" onChange={handleSelectChange} required>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {typeof cls === "number" ? `Class ${cls}` : cls}
            </option>
          ))}
        </select>

        <label htmlFor="clsTo">Class To</label>
        <select id="clsTo" name="to" onChange={handleSelectChange} required>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {typeof cls === "number" ? `Class ${cls}` : cls}
            </option>
          ))}
        </select>

       
        <button type="submit" disabled={isLoading} >{isLoading ?"Adding...":"Add"}</button>
      </form>
      {error && (
        <div>{error}</div>
      )}
    </div>
  );
};

export default SchoolAdd;

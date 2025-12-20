"use client";
import { StudenterRegisterInterface } from "@/interfaces/Student/Student";
import { ImageServices } from "@/services/images/image";
import { StudentApi } from "@/services/Student/student";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

const StudentRegisterPage = () => {
  const [data, setData] = useState<StudenterRegisterInterface>({
    aadharNumber: 0,
    address: "",
    contactNumber: 0,
    diseCode: 0,
    email: "",
    fatherName: "",
    fullName: "",
    motherName: "",
    panNumber: "",
    password: "",
    profilePicture: "",
    ssmId: 0,
  });
  console.log(data)
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const studentApiServices = new StudentApi();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await studentApiServices.registerStudent(data);

      if (response.success) {
        router.replace("/studentDashboard");
      } else if (response.error) {
        setError(response.error);
      } else {
        setError(response.message || "Something went wrong!");
      }
    } catch {
      setError("Failed to register student!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange =async (e:ChangeEvent<HTMLInputElement>)=>{
    const {name , files} = e.target
    const imageServices = new ImageServices()
    if(files){
      const url = await imageServices.convertToBase64(files[0])

      setData(prev=> ({
        ...prev,
        [name]:url
      }))
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-md">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            required
            id="fullName"
            name="fullName"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="fatherName">Father Name</label>
          <input
            required
            id="fatherName"
            name="fatherName"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="motherName">Mother Name</label>
          <input
            required
            id="motherName"
            name="motherName"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            required
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input required id="address" name="address" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="aadharNumber">Aadhar Number</label>
          <input
            required
            id="aadharNumber"
            type="number"
            name="aadharNumber"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            required
            id="contactNumber"
            type="number"
            name="contactNumber"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="diseCode">DISE Code</label>
          <input
            required
            id="diseCode"
            type="number"
            name="diseCode"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="ssmId">SSM ID</label>
          <input
            required
            id="ssmId"
            type="number"
            name="ssmId"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="panNumber">PAN Number</label>
          <input
            required
            id="panNumber"
            name="panNumber"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="profilePicture">Profile Picture URL</label>
          <input
            required
            id="profilePicture"
            name="profilePicture"
            onChange={handleImageChange}
            type="file"
            accept="images/*"
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Register..." : "Register"}
        </button>
      </form>

      {error && <div>{error}</div>}
    </>
  );
};

export default StudentRegisterPage;

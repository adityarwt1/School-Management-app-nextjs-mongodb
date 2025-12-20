import { PrincipleCardInterface } from "@/interfaces/Principle/PrincipleInfoInterface";
import Image from "next/image";
import React from "react";

const PrincipleCard: React.FC<PrincipleCardInterface> = ({
  profilePicture,
  fullName,
  bcCode,
  email,
}) => {
  return (
    <div className="w-full max-w-md p-4">
      <div className="h-full border border-[#112A46]/15 rounded-2xl shadow-md bg-white flex items-center gap-6 p-6">
        {/* PROFILE IMAGE */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200 shrink-0">
          <Image
            src={profilePicture}
            alt={`${fullName} profile picture`}
            fill
            className="object-cover"
            sizes="80px"
            priority
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="flex flex-col gap-1 text-sm flex-1">
          <p>
            <span className="text-gray-500 font-medium">Name:</span>{" "}
            <span className="text-gray-800 font-semibold">{fullName}</span>
          </p>

          <p>
            <span className="text-gray-500 font-medium">BC Code:</span>{" "}
            <span className="text-gray-800">{bcCode}</span>
          </p>

          <p className="break-all">
            <span className="text-gray-500 font-medium">Email:</span>{" "}
            <span className="text-gray-800">{email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrincipleCard;

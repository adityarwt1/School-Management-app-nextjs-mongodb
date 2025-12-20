import { SchoolCardInterface } from "@/interfaces/School/SchoolInterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SchoolCardProps {
  school?: SchoolCardInterface;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  if (!school) {
    return (
      <div className="w-full  p-4">
        <div className="h-full border border-[#112A46]/15 rounded-2xl shadow-md bg-white flex items-center justify-center p-6">
          <Link
            href="/registerSchool"
            className="px-6 py-3 border border-black/15 shadow-md rounded-xl hover:shadow-lg transition"
          >
            Add Your School
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="h-full border border-[#112A46]/15 rounded-2xl shadow-md bg-white flex items-center gap-6 p-6">
        {/* SCHOOL LOGO */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200 shrink-0">
          <Image
            src={school.logo}
            alt={`${school.schoolName} logo`}
            fill
            className="object-cover"
            sizes="64px"
            priority
          />
        </div>

        {/* SCHOOL DETAILS */}
        <div className="flex flex-col gap-1 text-sm flex-1">
          <p className="text-base font-semibold text-gray-800">
            {school.schoolName}
          </p>

          <div className="flex flex-wrap gap-4 text-gray-600">
            <p>
              <span className="font-medium">DISE:</span> {school.diseCode}
            </p>
            <p>
              <span className="font-medium">PIN:</span> {school.pinCode}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-gray-600">
            <p>
              <span className="font-medium">Classes:</span> {school.from} –{" "}
              {school.to}
            </p>
            <p>
              <span className="font-medium">Type:</span>{" "}
              {school.govt ? "Government" : "Private"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;

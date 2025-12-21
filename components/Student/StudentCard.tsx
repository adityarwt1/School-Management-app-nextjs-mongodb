import { StudentCardInterface} from '@/interfaces/Student/Student'
import Image from 'next/image'
import React from 'react'

const StudentCard: React.FC<StudentCardInterface> = ({student}) => {
  return (
    <div className="flex flex-col gap-1  items-center border mx-10 my-2 rounded-2xl shadow-lg border-[#112A46]/15 pb-2">
      <div className="relative w-24 h-24 mb-4">
        <Image
          src={student.profilePicture || "/images/profile.png"}
          alt="Prfile picture"
          className="w-full h-full object-cover rounded-full border-4 border-[#112A46]/10"
          width={40}
          height={40}
        />
      </div>
      <div>
        <span className="text-gray-600">FullName:</span> {student.fullName}
      </div>
      <div>
        <span className="text-gray-600">E-mail:</span> {student.email}
      </div>
      <div>
        <span className="text-gray-600">Dise Code:</span> {student.diseCode}{" "}
        <span className="bg-[#112A46] px-2 py-1 rounded-2xl text-white">
          {student.govt ? "Government" : "Private"}
        </span>
      </div>
    </div>
  );
};

export default StudentCard
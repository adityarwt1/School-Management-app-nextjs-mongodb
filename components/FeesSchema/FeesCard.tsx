
import { FeesCardInterface } from '@/interfaces/Fees/Fees';
import Link from 'next/link'
import React from 'react'


const FeesCard : React.FC<FeesCardInterface>= (props) => {
  return (
    <div className="flex flex-col  border border-[#112A46] w-96 h-40">
      <div className="h-[20%] text-center bg-[#112A46]/95 text-white items-center flex justify-center">
        <div> Class: {props.class}</div>
      </div>
      <div className="h-[60%] w-full text-center  flex justify-center items-center">
        <div className="text-4xl font-mono">{`₹${props.amount}`}/month</div>
      </div>
      <Link
        href={`/addFeesSchem?mode=edit&amount=${props.amount}&class=${props.class}&_id=${props._id}`}
        className="bg-[#112A46] text-white h-[20%] flex justify-center items-center"
      >
        <div className='text-xl '>Edit</div>
      </Link>
    </div>
  );
}

export default FeesCard
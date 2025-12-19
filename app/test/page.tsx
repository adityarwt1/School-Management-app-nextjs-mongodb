import React, { useState } from 'react'

const TestPage = () => {
    const [phoneNumber,setPhoneNumber] = useState(0)
  return (
    <div>
        <form >
            <input type="number" onChange={(e)=> setPhoneNumber(Number(e.target.value ))} />
        </form>
    </div>
  )
}

export default TestPage
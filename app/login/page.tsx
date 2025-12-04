import React from 'react'

const LoginPage = () => {

  return (
    <div className='w-full h-screen justify-center items-center'>
      <div>
        <select name="role">
          <option value="principle">Principle</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>
    </div>
  )
}

export default LoginPage
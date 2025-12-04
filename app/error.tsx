"use client"
import React from 'react'

const error = ({error}:{error:Error}) => {
  return (
    <div><div>Error page</div><div>{error.message}</div></div>
  )
}

export default error
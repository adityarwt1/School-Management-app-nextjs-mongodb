import React from 'react'

const page = async() => {
    const response = await fetch(
      "https://kys.udiseplus.gov.in/webapp/api/search-schools?searchType=3&searchParam=23170600806"
    );
    const data = await response.json();
    console.log(data.data.content)
  return (
    <div>page</div>
  )
}

export default page
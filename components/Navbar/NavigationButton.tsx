import React from 'react'

interface NavigationLinkInterface{
    title:string,
}
const NavigationButton : React.FC<NavigationLinkInterface>= ({ title}) => {
  return (
    <button className="hover:bg-white px-2 py-1 duration-300 transition-all hover:text-black delay-100 cursor-pointer">{title}</button>
  );
}

export default NavigationButton
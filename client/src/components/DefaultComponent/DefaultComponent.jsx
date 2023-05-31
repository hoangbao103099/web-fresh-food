import React from 'react'
import HeaderComponents from '../HeaderComponent/HeaderComponent'

const DefaultComponents = ({children}) => {
  return (
    <div>
        <HeaderComponents />
        {children}
    </div>
  )
}

export default DefaultComponents
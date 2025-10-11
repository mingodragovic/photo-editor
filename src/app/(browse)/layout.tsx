import HomeHeader from '@/components/navigation/HomeHeader'
import React from 'react'

const BrowseLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <HomeHeader />
      {children}
    </div>
  )
}

export default BrowseLayout
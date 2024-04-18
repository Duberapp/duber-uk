import React, { MouseEventHandler, useState } from 'react'
import { type AdminRouteSlug } from 'global-constants'
import AdminSidebar from './AdminSidebar'
import { ScrollArea } from "../../ui/scroll-area";

interface AdminLayoutProps {
  route: AdminRouteSlug,
  user: any,
  sideBarLogo?: React.ReactNode,
  handleRoute: (route: AdminRouteSlug) => MouseEventHandler<HTMLButtonElement>,
  userPlaceholderImage: string,
  children?: React.ReactNode | React.ReactNode[]
  headerComponent?: React.ReactNode | React.ReactNode[]
}

const AdminLayout = ({
  route,
  user,
  sideBarLogo,
  userPlaceholderImage,
  handleRoute,
  children,
  headerComponent }: AdminLayoutProps) => {

  return (
    <main className="p-5 flex flex-row h-full gap-x-5">
      {/* Sidebar */}
      <AdminSidebar
        className="h-full"
        route={route}
        logo={sideBarLogo}
        handleRoute={handleRoute}
        user={user}
        userPlaceholderImage={userPlaceholderImage}
      />

      {/* Wrapper */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className='w-full my-3'>
          {headerComponent}
        </div>

        <ScrollArea className='flex-1 bg-white w-full h-full p-5 rounded-xl'>
          {children}
        </ScrollArea >
      </div>
    </main>
  )
}

export default AdminLayout
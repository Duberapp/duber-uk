import React, { MouseEventHandler, useState } from 'react'
import { type AdminRouteSlug } from 'global-constants'
import AdminSidebar from './AdminSidebar'
import { ScrollArea } from "../../ui/scroll-area";
import { InitialSidebar } from '../DashboardComponents/Sidebar';
import ApplicationsSidebar from './ApplicationsSidebar'

interface AdminLayoutProps {
  route: AdminRouteSlug,
  user: any,
  sideBarLogo?: React.ReactNode,
  handleRoute: (route: AdminRouteSlug) => MouseEventHandler<HTMLButtonElement>,
  userPlaceholderImage: string,
  children?: React.ReactNode | React.ReactNode[]
  headerComponent?: React.ReactNode | React.ReactNode[],
  handleLogout: () => void,
  rightSidebar: boolean,
  applicationsView?: {
    enabled: boolean,
    currentApplication: string | number,
    initialImg1: string,
    initialImg2: string
  }
}

const AdminLayout = ({
  route,
  user,
  sideBarLogo,
  userPlaceholderImage,
  handleRoute,
  children,
  headerComponent,
  handleLogout,
  rightSidebar,
  applicationsView }: AdminLayoutProps) => {

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
        handleLogout={handleLogout}
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

      {rightSidebar && applicationsView && applicationsView.enabled && (
        <div className='w-80 h-full'>
          {!applicationsView.currentApplication ? (
            <InitialSidebar
              img_1={applicationsView.initialImg1}
              img_2={applicationsView.initialImg2}
              title={'View Pilot'}
              description='Accept or decline drone pilots, ensure they are compliant!'
            />
          ) : (
            <ApplicationsSidebar activeApplication={applicationsView.currentApplication} />
          )}
        </div>
      )}
    </main>
  )
}

export default AdminLayout
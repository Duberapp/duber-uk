import React, { MouseEventHandler } from 'react'
import { AdminNavLinks, AdminNavLinksType, type AdminRouteGroup, type AdminRouteSlug } from 'global-constants'
import DuberButton from '../DuberButton'
import { ScrollTextIcon, BookmarkIcon, UserRoundCheck, UserIcon, FlagIcon, SettingsIcon, ChevronRight, LogOutIcon } from 'lucide-react'

interface AdminSidebarProps {
  className?: string,
  route: AdminRouteSlug,
  logo?: React.ReactNode,
  handleRoute: (route: AdminRouteSlug) => MouseEventHandler<HTMLButtonElement>,
  user: any,
  userPlaceholderImage: string,
  handleLogout: () => void,
}

const AdminSidebar = ({
  className, route, logo, handleRoute, user, userPlaceholderImage, handleLogout
}: AdminSidebarProps) => {

  const checkIsSubRoute = (navLink: AdminNavLinksType) => {
    if (navLink.slug.split('/').length < 3) {
      // consider its dashboard
      return false;
    } else if (navLink.slug.split('/')[2] === route.split('/')[2]) {
      return true;
    } else {
      return false
    }
  }

  return (
    <aside className={`${className} w-72 bg-duber-navyBlue rounded-xl h-full py-8 px-5 flex flex-col`}>
      {/* Logo */}
      <div>{logo}</div>

      {/* Nav Links */}
      <div className="mt-7 flex-1 flex flex-col gap-y-1">
        {AdminNavLinks.slice(0, AdminNavLinks.length - 2).map((navLink) => (
          <DuberButton
            key={navLink.id}
            className={`px-2 h-14 hover:text-duber-skyBlue hover:bg-blue-700/5 flex flex-row justify-start text-base
              ${(navLink.slug === route || checkIsSubRoute(navLink))
                ? 'text-duber-skyBlue bg-blue-700/20 hover:bg-blue-700/20' : 'text-white'
              }
            `}
            variant={'ghost'}
            onClick={() => {
              handleRoute(navLink.slug)
            }}
          >
            <p key={navLink.id} className='flex items-center gap-x-5'>
              {navLink.route === 'dashboard' && <ScrollTextIcon className={`w-6 h-6`} />}
              {navLink.route === 'bookings' && <BookmarkIcon className={`w-6 h-6`} />}
              {navLink.route === 'customers' && <UserRoundCheck className={`w-6 h-6`} />}
              {navLink.route === 'pilots' && <UserIcon className={`w-6 h-6`} />}
              {navLink.route === 'applications' && <FlagIcon className={`w-6 h-6`} />}
              {navLink.title}
            </p>
          </DuberButton>
        ))}

        <hr className='my-4 opacity-50' />

        {AdminNavLinks.slice(AdminNavLinks.length - 2, AdminNavLinks.length).map((navLink) => (
          <DuberButton
            key={navLink.id}
            className={`px-2 h-14 hover:text-duber-skyBlue hover:bg-blue-700/5 flex flex-row justify-start text-base
            ${(navLink.slug === route || checkIsSubRoute(navLink))
                ? 'text-duber-skyBlue bg-blue-700/20 hover:bg-blue-700/20' : 'text-white'
              }
            `}
            variant={'ghost'}
            onClick={() => navLink.slug === '/admin-dashboard/logout' ? handleLogout() : handleRoute(navLink.slug)}
          >
            <p key={navLink.id} className='flex items-center gap-x-5'>
              {navLink.route === 'settings' && <SettingsIcon className={`w-6 h-6`} />}
              {navLink.route === 'logout' && <LogOutIcon className={`w-6 h-6`} />}
              {navLink.title}
            </p>
          </DuberButton>
        ))}
      </div>

      {user && (
        <DuberButton className={`w-full h-16 bg-duber-skyBlue-light hover:bg-duber-skyBlue-light flex items-center justify-start gap-x-3 p-3`}>
          <div className="overflow-hidden rounded-md">
            <img src={user.profilePic ? user.profilePic : userPlaceholderImage} alt="" className='w-12 h-12' />
          </div>

          <div className="flex-1 text-left">
            <p className="text-[14px] text-duber-navyBlue font-semibold">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-duber-navyBlue font-light">Admin</p>
          </div>

          <ChevronRight className='w-5 h-5 text-duber-navyBlue' />
        </DuberButton>
      )}
    </aside>
  )
}

export default AdminSidebar
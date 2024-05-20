import React from "react";
import { AdminLayout } from "ui";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import supabaseClient from "../../config/supabaseClient";

const AdminLayoutProvider = ({
  children,
  headerComponent,
  isApplicationView = false,
  activeApplication,
}) => {
  const router = useRouter();
  const stateUser = useSelector((state) => state.currentUser.currentUser);

  async function handleLogout() {
    const { error } = await supabaseClient.auth.signOut();
    localStorage.clear();

    if (typeof window !== "undefined") {
      window.location.replace("/");
    }
  }

  return (
    <div className="w-full h-screen max-h-screen overflow-y-hidden flex bg-[#F5F5F5] flex-col flex-1">
      <AdminLayout
        route={router.pathname}
        user={stateUser}
        handleRoute={(routeSlug) => router.push(routeSlug)}
        sideBarLogo={
          <div className="flex items-center gap-x-4">
            <img src="/assets/Duber Icon.svg" className="w-10 h-10" />
            <p className="font-semibold tracking-widest text-white text-2xl">
              Duber
            </p>
          </div>
        }
        userPlaceholderImage="/assets/avatar.jpg"
        children={children}
        headerComponent={headerComponent}
        handleLogout={handleLogout}
        rightSidebar={isApplicationView}
        applicationsView={{
          enabled: isApplicationView,
          currentApplication: activeApplication,
          initialImg1: "/assets/sidebar_assets/halo_1.png",
          initialImg2: "/assets/sidebar_assets/halo_2.png",
        }}
      />
    </div>
  );
};

export default AdminLayoutProvider;

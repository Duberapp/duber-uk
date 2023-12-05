import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import {
  MainLayout,
  StepNavigationBar,
  OrderSidebar,
  LocationDate,
  Options,
  Contact,
  Confirm,
} from "../../components/CustomerDashboard_Components";
import { Toaster } from "react-hot-toast";
import Validating from "../../components/CustomerDashboard_Components/FormSteps/Validating";

const Index = () => {
  const state = useSelector((state) => state.createOrder);

  return (
    <div className="relative">
      <Head>
        <title>Duber Drone Pilot Hire</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>

      <MainLayout>
        <div className="sm:flex hidden">
          <Toaster position="top-center" />
        </div>

        <div className="sm:hidden flex">
          <Toaster position="top-right" />
        </div>

        {/* Fader Div */}
        <div>
          {state.active_step === 4 || state.active_step === 5 ? (
            <ActiveStep />
          ) : (
            <div className="grid md:grid-cols-12 grid-cols-1 gap-x-8 ">
              <div className="md:col-span-8 md:max-lg:col-span-12 col-span-12">
                <StepNavigationBar />

                <ActiveStep />
              </div>

              <div className="md:col-span-4 col-auto lg:grid hidden h-auto 2xl:h-[660px] min-h-[560px]  bg-navyBlue rounded-lg py-6 px-4">
                <OrderSidebar />
              </div>
            </div>
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default Index;

const ActiveStep = () => {
  const state = useSelector((state) => state.createOrder);

  switch (state.active_step) {
    case 1:
      return <LocationDate />;
    case 2:
      return <Options />;
    case 3:
      return <Contact />;
    case 4:
      return <Confirm />;
    case 5:
      return <Validating />;

    default:
      "";
  }
};

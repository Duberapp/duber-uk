import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
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
import { Loading } from "ui";
import { useLoadScript } from "@react-google-maps/api";
import { setPrice } from "../../redux/mapSlice";

const Index = () => {
  const state = useSelector((state) => state.createOrder);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["drawing", "places"],
  });

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

        {!isLoaded ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading className={"w-9 h-9 text-duber-navyBlue mt-1"} />
          </div>
        ) : (
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
        )}
      </MainLayout>
    </div>
  );
};

export default Index;

const ActiveStep = () => {
  const state = useSelector((state) => state.createOrder);
  const dispatch = useDispatch();
  const [priceList, setPriceList] = useState([]);

  // ================= Price List listner =================
  useEffect(() => {
    if (priceList.length > 0) {
      let totalCost = 0;

      priceList.map((priceObj) => (totalCost += priceObj.price));

      dispatch(setPrice(totalCost));
    }
  }, [priceList]);
  // ========================================================

  switch (state.active_step) {
    case 1:
      return <LocationDate priceList={priceList} setPriceList={setPriceList} />;
    case 2:
      return <Options priceList={priceList} setPriceList={setPriceList} />;
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

import React from "react";
import Head from "next/head";
import MainLayout from "../../components/CustomerDashboard_Components/MainLayout";
import SubTitle from "../../components/LandingPage_Components/UI/SubTitle";

const TermsAndConditions = () => {

  return (
    <div className="relative">
      <Head>
        <title>Duber | Terms and Conditions</title>
      </Head>

      <MainLayout>
        <SubTitle
          title="Terms and Conditions"
          subTitle="When booking a drone pilot through Duber, the following terms and conditions apply:"
        />

        <ol className="max-w-[700px] mx-auto space-y-4">
          <li>
            1. The pilot selects the time of arrival, and Duber or the user has no
            authority to set a time of arrival.
          </li>
          <li>
            2. Duber is not responsible for the drone operation or booking, and is
            only providing a platform to connect users with qualified drone
            pilots.
          </li>
          <li>
            3. The quality of the aerial data is not Duber&apos;s responsibility,
            and should be discussed with the pilot directly. If you are not
            satisfied with the pilot, you can rate them fairly at the end of the
            order.
          </li>
          <li>
            4. If the user wishes to cancel the order, Duber will charge a 10%
            admin fee when the refund is issued.
          </li>
          <li>
            5. By booking a drone pilot through Duber, the user confirms that they
            have obtained the necessary permission from the land/building owner
            to allow our drone pilots to carry out the flight.
          </li>
          <li>
            6. The user agrees to not work with the pilot directly, and to use the
            pilot again, they must book through Duber.
          </li>
          <li>
            7. In the event of unforeseen circumstances that prevent the pilot from
            carrying out the flight, they have the right to reschedule. If the
            pilot cannot fulfill the requested date of booking, Duber will
            contact the user directly to reschedule, and the user has the option
            of a full refund.
          </li>
        </ol>
      </MainLayout>
    </div>
  );
};

export default TermsAndConditions;
import React from "react";
import { AuthLayout } from "../../../components";
import { useRouter } from "next/router";

const CompleteRegister = () => {
  const router = useRouter();
  const { firstName } = router.query;

  return (
    <div className="">
      <AuthLayout>
        <div className="w-full h-full flex items-center gap-x-14">
          <div className="flex-1 h-full">
            <p className="text-3xl leading-normal font-semibold text-logoText">
              {firstName || "First Name"}, the application has been submitted
            </p>
            <p className="mt-3 text-logoText text-lg">{`Duber's review team will review this shortly.`}</p>

            <p className="mt-11 text-xs text-logoText">{`On behalf of all the team at Duber, thank you for applying to be apart of our drone pilot network.`}</p>

            <p className="mt-5 text-xs text-logoText">
              {`You will receive an email from us with letting you know if you have been approved. If you have been approved the email will contain login information to the platform and a member of the team will be in contact to help you get started.`}
            </p>
          </div>

          <div className="flex-1 sm:flex hidden">
            <img src="/assets/register-complete-page-img.png" alt="" />
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default CompleteRegister;

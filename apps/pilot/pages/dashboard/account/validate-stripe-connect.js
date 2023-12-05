import React from "react";
import { updateUser } from "../../../config/supabaseFunctions";

const ValidateStripeConnect = () => {
  return <div>ValidateStripeConnect</div>;
};

export const getServerSideProps = async ({ query }) => {
  const { error } = await updateUser(
    {
      stripe_connected_id: query.account_id,
    },
    query.email
  );

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
    props: {},
  };
};

export default ValidateStripeConnect;

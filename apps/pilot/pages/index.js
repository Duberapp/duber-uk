import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser, useSessionContext } from "@supabase/auth-helpers-react";
import { FullScreenLoading } from "../components";

const Index = () => {
  const router = useRouter();
  const { isLoading } = useSessionContext();
  const user = useUser();

  // Added just a comment on index.js

  useEffect(() => {
    if (!isLoading && user === null) {
      router.push("/auth/login");
    } else {
      router.push("/dashboard");
    }
  }, [isLoading]);

  return <FullScreenLoading />;
};

export default Index;

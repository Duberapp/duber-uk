const AdminAPIBaseURL = `https://adminapi.duber.uk`;

const stage =
  process.env.NEXT_PUBLIC_ENVIRONMENT !== "live" &&
  process.env.NEXT_PUBLIC_ENVIRONMENT !== "dev"
    ? "live"
    : process.env.NEXT_PUBLIC_ENVIRONMENT;

export const adminAPIBaseURL = `${AdminAPIBaseURL}/${stage}`;

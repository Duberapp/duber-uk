import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Accordion,
  CallToAction,
  ContentLeft,
  ImageLeft,
  ImageRight,
  SubTitle,
  ThreeBoxes,
} from "../components/LandingPage_Components";
import LandingLayout from "../components/LandingPage_Components/LandingLayout";
import MainHero from "../components/LandingPage_Components/UI/MainHero";
import UnderConstructionPage from "../components/UnderConstructionPage";
import data from "../utils/landingPageData";

export default function Home() {
  //  ===================================================
  const isUnderConstruction = false;

  if (isUnderConstruction) {
    return (
      <div className="">
        <Head>
          <title>Duber | Website under Construction</title>
        </Head>

        <UnderConstructionPage />
      </div>
    );
  }
  //  ===================================================

  // Added test comment to index.js

  return (
    <div className="relative">
      <Head>
        <title>Duber | UK&apos;s Trusted Drone Pilot Hire App</title>
        <meta
          name="title"
          content="Duber | UK's Trusted Drone Pilot Hire App"
        />
        <meta
          name="description"
          content="Looking to hire a professional drone pilot? Dubers is the leading app for finding and hiring certified drone pilots for your project. Get started today!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://duber.uk/" />
        <meta
          property="og:title"
          content="Duber | UK's Trusted Drone Pilot Hire App"
        />
        <meta
          property="og:description"
          content="Looking to hire a professional drone pilot? Dubers is the leading app for finding and hiring certified drone pilots for your project. Get started today!"
        />
        <meta
          property="og:image"
          content="https://duber.uk/assets/og-image.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://duber.uk/" />
        <meta
          property="twitter:title"
          content="Duber | UK's Trusted Drone Pilot Hire App"
        />
        <meta
          property="twitter:description"
          content="Looking to hire a professional drone pilot? Dubers is the leading app for finding and hiring certified drone pilots for your project. Get started today!"
        />
        <meta
          property="twitter:image"
          content="https://duber.uk/assets/og-image.png"
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index,follow" />
      </Head>
      <LandingLayout>
        <MainHero
          title="Get a qualifed drone pilot now"
          subTitle="Quickly book a drone pilot for your building inspections, property listings & social events"
          buttonLink="/hire"
          buttonName="Book Now"
          smallText="Instant & Secure Booking"
          boldText="From £250."
        />
        <ThreeBoxes
          oneTitle="Lightning Fast"
          oneText="100% automated."
          oneText2="No delays, no stress."
          twoTitle="Qualified Pilots"
          twoText="CAA Approved"
          twoText2="Insured Drone Flights"
          threeTitle="Nationwide"
          threeText="Book Anywhere In The UK"
          threeText2="No Travel Fees, Fixed Rates"
        />
        <ContentLeft />
        <SubTitle title="Why use Duber™" />
        <ImageLeft
          image="/assets/Nationwide.jpg"
          title="Hire a drone pilot anywhere in the UK"
          description="We have a large network of drone pilots in the UK that allows us to service you anywhere nationwide with no extra cost."
        />
        <ImageRight
          image="/assets/SelectArea.jpg"
          title="Competitive fixed rates guaranteed"
          description="Costs are calulated by the area of the flight you are booking, there is a minimum fee of £250 under 90m2."
        />
        <ImageLeft
          image="/assets/tracking.jpg"
          title="Live Tracking & Update Notifications"
          description="Our app has a live tracking page that allows you to see the status of your order and will recieve email update notifications."
        />
        <div className="flex justify-center pt-10">
          <CallToAction buttonLink="/hire" buttonName="Book Now From £250" />
        </div>
        <div id="FAQs">
          <SubTitle title="Frequently asked questions" />
          {data.map((item) => (
            <Accordion
              title={item.title}
              content={item.content}
              key={item.key}
            />
          ))}
        </div>
      </LandingLayout>
    </div>
  );
}

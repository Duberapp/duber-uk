import Head from "next/head";
import {
  ContentBoxes,
  MainHero,
  SubTitle,
  ReviewBar,
  VideoLeft,
  Accordion,
} from "../components/LandingPage_Components";
import LandingLayout from "../components/LandingPage_Components/LandingLayout";
import { useRouter } from "next/router";

export default function DuberPilots() {
  const data = [
    {
      title: "What is a supplier agreement?",
      content:
        "The Supplier Agreement is a binding legal document that establishes the terms and conditions of the relationship between the drone pilot and Duber. This document must be signed upon registration.",
      key: "1",
    },
    {
      title: "What are the requirements for being a Duber Drone Pilot?",
      content:
        "It is imperative that one is registered with the esteemed Civil Aviation Authority and holds drone insurance, for as the old adage goes, Failing to prepare is preparing to fail. Or in this case, failing to be registered and insured is preparing for an unfortunate aerial mishap.",
      key: "2",
    },
    {
      title: "What documents do i need?",
      content:
        "If one chooses to partake in the delightful pastime of flying a drone that weighs less than 250 grams, no additional proof of registration is required. However, you must provide proof of drone insurance.",
      key: "3",
    },
    {
      title: "What Insurance do i need?",
      content:
        "It is imperative that the drone insurance in question holds a minimum of 10 million in public indemnity insurance coverage, for as the old adage goes, You can't make an omelette without breaking eggs or in this case, you can't fly a drone without proper insurance coverage.",
      key: "4",
    },
    {
      title: "Can i do more than 1 job per day?",
      content:
        "Yes you can do many as you like, as long as its between 8am-4pm",
      key: "5",
    },
    {
      title: "Do i need to own a drone?",
      content:
        "Yes you do, we recommend DJI drones as they have excellent handling and camera quality",
      key: "6",
    },
  ];

  const router = useRouter();
  const constructionMode = router.query?.constructionMode;

  return (
    <div className="relative">
      <Head>
        <title>Duber | Become a drone pilot and earn from £150</title>
        <meta
          name="title"
          content="Duber | Become a drone pilot and earn from £150"
        />
        <meta
          name="description"
          content="Join us to become a Duber Drone Pilot and start earning money flying drones."
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index,follow" />
      </Head>
      <LandingLayout constructionMode={constructionMode}>
        <MainHero
          title="Work that fits around your life"
          subTitle="Join us to become a Duber Drone Pilot and start earning money flying drones."
          buttonLink="https://pilot.duber.uk/auth/register"
          buttonName="Apply Now"
          smallText="Instant & Secure Booking"
          boldText="From £250."
        />
        <ReviewBar />
        <ContentBoxes />
        <VideoLeft />
        <SubTitle title="Frequently asked questions" subTitle=" " />
        {data.map((item) => (
          <Accordion title={item.title} content={item.content} key={item.key} />
        ))}
      </LandingLayout>
    </div>
  );
}

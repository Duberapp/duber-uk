import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import React from "react";
import BottomFooter from "../LandingPage_Components/UI/BottomFooter";
import NavBar from "../LandingPage_Components/UI/NavBar";
import TopCta from "./UI/TopCta";
import SideCta from "./UI/SideCta";
import SideNav from "./UI/SideNav";

const BlogLayout = ( props ) => {
    
  return (
    <div>
      <Head>
        <title>{`Duber | ${props.title}`}</title>
        <meta name="title" content={`Duber | ${props.title}`} />
        <meta name="description" content={props.blogDesc} />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://duber.uk/blog/${props.link}`}
        />
        <meta property="og:title" content={`Duber | ${props.title}`} />
        <meta property="og:description" content={props.blogDesc} />
        <meta
          property="og:image"
          content={`https://duber.uk/assets/${props.blogImg}`}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://duber.uk/blog/${props.link}`}
        />
        <meta property="twitter:title" content={`Duber | ${props.title}`} />
        <meta property="twitter:description" content={props.blogDesc} />
        <meta
          property="twitter:image"
          content={`https://duber.uk/assets/${props.blogImg}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index,follow" />
      </Head>
      <NavBar />
      <div className="mt-6 md:mt-14 max-w-screen-lg container text-navyBlue w-full h-full space-y-10 lg:space-y-0 lg:space-x-10 sm:mx-auto mx-0 lg:px-0 px-5 mb-12 flex flex-col lg:flex-row">
        <div className="w-full mx-auto md:w-[700px] lg:shrink-0 lg:mx-0 space-y-8">
          <TopCta />
          <div>
            <h1 className="font-semibold text-2xl sm:text-3xl">
              {props.title}
            </h1>
          </div>
          <div id="breadcrums">
            <p className="text-sm">
              <Link href="/blog" className="cursor-pointer">
                Blog /
              </Link>{" "}
              {props.title}
            </p>
          </div>
          <div>
            <Image
              src={`/assets/${props.blogImg}`}
              alt={props.alt}
              width={700}
              height={420}
            />
          </div>
          {props.children}
          <div className="hidden lg:block">
            <SideCta />
          </div>
        </div>
        <div className="w-full mx-auto md:w-[700px] lg:w-full space-y-8">
          <SideCta />
          <SideNav />
        </div>
      </div>
      <BottomFooter />
    </div>
  );
};

export default BlogLayout;

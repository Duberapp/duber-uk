import React from "react";
import Head from "next/head";
import MainLayout from "../../components/CustomerDashboard_Components/MainLayout";
import SubTitle from "../../components/LandingPage_Components/UI/SubTitle";

const CookiePolicy = () => {
  return (
    <div className="relative">
      <Head>
        <title>Duber | Cookie Policy</title>
      </Head>

      <MainLayout>
        <SubTitle
          title="Cookie Policy"
          subTitle="When using Duber's website (duber.uk) you are agreeing to the following cookie policy"
        />

        <ol className="max-w-[700px] mx-auto space-y-4">
          <li>
            Our website uses cookies to enhance your browsing experience and to
            collect information about how you use our site. By continuing to use
            our website, you consent to the use of cookies in accordance with
            this Cookie Policy.
          </li>
          <li>What are cookies?</li>
          <li>
            Cookies are small pieces of data that are stored on your computer,
            mobile phone, or other device when you visit a website. These
            cookies allow the website to remember your actions and preferences
            over a period of time, so you don’t have to keep re-entering them
            whenever you come back to the site or browse from one page to
            another.
          </li>
          <li>How do we use cookies?</li>
          <li>We use cookies for a variety of reasons, such as:</li>
          <li>
            To provide a better user experience by remembering your preferences
            and settings
          </li>
          <li>
            To analyze how our website is used, so we can improve its
            performance and design
          </li>
          <li>To show you relevant advertising</li>
          <li>To enable social media features</li>
          <li>
            We also use third-party services, such as Microsoft Clarity, which
            use cookies to help us understand how visitors use our website and
            to show you relevant advertising.
          </li>
          <li>How to manage cookies</li>
          <li>
            You can control and manage cookies in a number of ways. Most web
            browsers allow you to enable or disable cookies, and you can usually
            adjust your settings to block or alert you when cookies are being
            used. Please note that blocking cookies may impact your ability to
            use our website.
          </li>
          <li>
            Additionally, you can exercise your rights under the General Data
            Protection Regulation (GDPR) by contacting us at [Insert your email
            address or contact information]. This includes the right to access,
            rectify, erase, or object to the processing of your personal data.
          </li>
          <li>
            We may update this Cookie Policy from time to time, so please check
            back regularly to stay informed about our use of cookies and related
            technologies.
          </li>
        </ol>
      </MainLayout>
    </div>
  );
};

export default CookiePolicy;

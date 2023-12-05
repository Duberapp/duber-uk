import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import LandingLayout from "../components/LandingPage_Components/LandingLayout";

export default function Contact() {
  return (
    <div className="relative">
      <Head>
        <title>Duber | Got an issue? contact our support team</title>
        <meta
          name="title"
          content="Duber | Got an issue? contact our support team"
        />
        <meta
          name="description"
          content="Contact our support team of any issues you have with your orders"
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index,follow" />
      </Head>
      <LandingLayout>
        <div className="sm:flex justify-center max-w-screen-md mx-auto mt-5 mb-8 py-16">
          <div className="relative sm:h-56 h-14 w-72">
            <div className="sm:absolute z-10 bottom-0">
              <h1 className="text-4xl font-bold heading-outline-blue uppercase">
                Support
              </h1>
            </div>
            <div className="sm:h-56 top-0 sm:absolute sm:block hidden">
              <Image
                alt="shape"
                src="/assets/Pink Circle.svg"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="sm:w-80 w-full">
            <div className="mb-3 ot-frame">
              <div className="space-y-4">
                <div className="relative">
                  <button className="absolute top-4 m-auto pl-3 items-center">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </button>
                  <input
                    className="py-3 sm:text-md placeholder-opacity-50 placeholder-white transition-colors focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50 bg-white border border-blue-light text-blue-dark placeholder-blue-light placeholder-opacity-100 pl-10 pr-4 rounded-xl w-full "
                    placeholder="Name"
                    type="text"
                    name="name"
                    datalpignore="true"
                    autocomplete="off"
                    value=""
                  />
                </div>
                <div className="relative">
                  <button className="absolute top-4 m-auto pl-3 items-center">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <input
                    className="py-3 sm:text-md placeholder-opacity-50 placeholder-white transition-colors focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50 bg-white border border-blue-light text-blue-dark placeholder-blue-light placeholder-opacity-100 pl-10 pr-4 rounded-xl w-full "
                    placeholder="Email"
                    type="text"
                    name="email"
                    datalpignore="true"
                    autocomplete="off"
                    value=""
                  />
                </div>
                <div className="relative">
                  <textarea
                    className="py-3 sm:text-md placeholder-opacity-50 placeholder-white transition-colors focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50 bg-white border border-blue-light text-blue-dark placeholder-blue-light placeholder-opacity-100 px-4 rounded-xl w-full "
                    placeholder="Some message..."
                    type="text"
                    name="message"
                  ></textarea>
                </div>
                <button className="bg-primaryTeal rounded-xl text-white font-bold uppercase hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50 px-6 py-4 undefined w-full false undefined transition-all">
                  <div className=" flex justify-center ">Send</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </LandingLayout>
    </div>
  );
}

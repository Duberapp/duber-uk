import Image from "next/image";
import Link from "next/link";
import React from "react";

const BottomFooter = ({ constructionMode }) => {
  return (
    <footer className="bg-navyBlue">
      <div className="max-w-[1190px] px-4 py-10 mx-auto text-base text-white">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/">
              <Image
                src="/assets/Duber logo.svg"
                width={181}
                height={50}
                objectFit="Cover"
                alt="Duber Logo"
              />
            </Link>
            <p className="max-w-xs mt-4">duber.uk © 2022</p>
          </div>
          <div className="grid grid-cols-2 gap-8 col-span-2">
            <div>
              <p className="font-medium">Helpful Links</p>
              <nav className="flex flex-col mt-4 space-y-2">
                {!constructionMode && (
                  <Link href={"/hire"}>
                    <p className="hover:opacity-75 cursor-pointer">
                      Book Pilot Now
                    </p>
                  </Link>
                )}
                <Link href={"/"}>
                  <p className="hover:opacity-75 cursor-pointer">
                    Become a Pilot
                  </p>
                </Link>
                <Link href={"/faqs"}>
                  <p className="hover:opacity-75 cursor-pointer">FAQs</p>
                </Link>
              </nav>
            </div>
            <div>
              <p className="font-medium">Legal</p>
              <nav className="flex flex-col mt-4 space-y-2">
                <Link href={"/legal/PrivacyPolicy"}>
                  <p className="hover:opacity-75 cursor-pointer">
                    Privacy Policy
                  </p>
                </Link>
                <Link href={"/legal/TermsAndConditions"}>
                  <p className="hover:opacity-75 cursor-pointer">
                    Terms &amp; Conditions
                  </p>
                </Link>
                <Link href={"/legal/CookiePolicy"}>
                  <p className="hover:opacity-75 cursor-pointer">
                    Cookie Policy
                  </p>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BottomFooter;

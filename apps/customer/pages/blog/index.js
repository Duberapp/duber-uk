import Head from "next/head";
import Image from "next/image";
import LandingLayout from "../../components/LandingPage_Components/LandingLayout";
import posts from "../../components/BlogPage_Components/posts.json"
import Link from "next/link";

const data = posts

const Index = () => {
  return (
    <div className="relative">
      <Head>
        <title>Duber | Blog Posts About Drone Services</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <LandingLayout>
        <div className="relative mt-6 md:mt-14 text-navyBlue font-normal space-y-8">
          <div className="space-y-2">
            <h1 className="font-semibold text-2xl sm:text-3xl">
              The Duber Blog
            </h1>
            <p>Get accurate information around drone services.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((post) => (
              <div key={post.id} className="w-full cursor-pointer">
                <Link href={post.link}>
                  <div>
                    <Image
                      className="w-fit rounded-lg"
                      src={post.image}
                      alt="post image"
                      width={720}
                      height={310}
                      objectFit="cover"
                    />
                    <p className="text-lg font-semibold text-primaryPink">
                      {post.title}
                    </p>
                    <p>{post.desc}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </LandingLayout>
    </div>
  );
};

export default Index;

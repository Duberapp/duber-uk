import Link from "next/link";
import React from "react";
import posts from "../posts.json";

const data = posts

const SideNav = () => {

  return (
    <div className="relative shadow-box p-5 rounded-lg space-y-1 flex space-x-8">
      <div className="space-y-4">
        <p className="font-semibold text-lg">Other Posts:</p>
        <ol className="list-disc list-inside">
          {data.map((post) => (
            <li key={post.id} className="cursor-pointer">
              <Link href={post.link}>{post.title}</Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SideNav;

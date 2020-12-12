// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../Client.js";

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
        title,
        slug,
        mainImage{
        asset->{
          _id,
          url
        }, 
        alt
      }
    }`)
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  return (
      <main className="bg-white-100 mn-h-screen p-12">
        <section className="container mx-auto">
          <h1 className="text-5xl flex justify-center">Ken's Blog</h1>
          <h2 className="text-lg text-gray-600 flex justify-center mb-12">Ethereum, Smart Contracts, and a sprinkle of Biohacking</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPostsData && allPostsData.map((post, index) => (
            <article>
              <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                <span className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-black-400" key={index}>
                  <img src={post.mainImage.asset.url} alt={post.mainImage.alt} className="w-full h-full rounded-r object-cover absolute"/>
                  <span className="block relative h-full flex justify-end items-end pr-4 pb-4">
                    <h3 className="text-white text-lg font-blog px-3 py-4 bg-gray-700 text-white bg-opacity-75 rounded">
                      {post.title}
                    </h3>
                  </span>
                </span>
              </Link>
            </article>
          ))}
          </div>
        </section>
      </main>


  );
}
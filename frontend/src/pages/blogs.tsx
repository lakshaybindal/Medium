import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { url } from "../port";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/skeleton";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [name, setName] = useState("");
  const [loading, setloading] = useState(true);
  const navigator = useNavigate();
  async function getBlogs() {
    try {
      const res = await axios.get(url + "/api/blog/bulk", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      setBlogs(res.data.blogs);
      setloading(false);
    } catch (e) {
      console.log(e);
    }
  }
  async function getname() {
    try {
      const res = await axios.get(url + "/api/blog/me", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      setName(res.data.name);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getBlogs();
    getname();
  }, []);

  type Blog = {
    id: string;
    title: string;
    content: string;
    date: string;
    author: { name: string };
  };
  if (loading)
    return (
      <>
        <Skeleton />
      </>
    );
  return (
    <>
      <Navbar
        onclick={() => {
          navigator("/createblog");
        }}
        name={name}
      ></Navbar>
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex border-b border-gray-200 mb-4">
          <button className="py-2 px-4 text-black border-b-2 border-black font-semibold">
            For You
          </button>
        </div>

        <div className="space-y-6">
          {blogs.map((b: Blog, index) => (
            <BlogCard
              fullblog={() => {
                navigator("/blog?id=" + b.id);
              }}
              key={index}
              authorname={b.author.name}
              title={b.title}
              content={b.content}
              date={b.date.slice(0, 10)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

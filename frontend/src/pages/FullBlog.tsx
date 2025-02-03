import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../port";
import { useSearchParams } from "react-router-dom";

export default function FullBlog() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";

  const [blog, setBlog] = useState<{
    title: string;
    content: string;
    date: string;
    author: { name: string };
  }>({
    title: "",
    content: "",
    date: "",
    author: { name: "" },
  });

  async function getBlog() {
    if (!id) return;
    try {
      const res = await axios.get(`${url}/api/blog/${id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      console.log(res.data.blog);
      setBlog(res.data.blog);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getBlog();
  }, [id]); // Run when 'id' changes

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
      <p className="text-sm text-gray-500 mt-2">
        Posted on {blog.date.slice(0, 10)}
      </p>

      <div className="mt-6 text-gray-800 leading-relaxed">{blog.content}</div>

      <div className="mt-6 flex items-center space-x-3">
        <div className=" font-semibold text-gray-700">
          author: {blog.author.name}
        </div>
      </div>
    </div>
  );
}

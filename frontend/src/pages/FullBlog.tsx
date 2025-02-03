import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../port";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function FullBlog() {
  const [searchParams] = useSearchParams();
  const [loading, setloading] = useState(true);
  const id = searchParams.get("id") || "";
  const navigator = useNavigate();
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
      setloading(false);
    } catch (e) {
      alert("You are not signed in");
      navigator("./signin");
      console.log(e);
    }
  }

  useEffect(() => {
    getBlog();
  }, [id]);
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner></Spinner>;
      </div>
    );
  }
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

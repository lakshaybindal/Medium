import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../port";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const navigator = useNavigate();

  async function getName() {
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

  async function createBlog() {
    try {
      const res = await axios.post(
        url + "/api/blog",
        { title, content },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      console.log(res.data);
      navigator("/blogs");
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <Navbar name={name} onclick={createBlog} />
      <div className="max-w-3xl mx-auto mt-10 px-6">
        <input
          className="w-full text-4xl font-serif placeholder-gray-400 focus:outline-none border-none"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mt-4 text-xl placeholder-gray-500 focus:outline-none border-none min-h-[400px]"
          placeholder="Tell your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </>
  );
}

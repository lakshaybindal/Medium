import React, { useState } from "react";
import Input from "../components/input";
import Button from "../components/button";
import Header from "../components/header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignupInput } from "@lakshay_bindal/medium-common";
import { url } from "../port";
export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setUsername] = useState<string>("");
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const res = await axios.post(url + "/api/user/signup", {
        username: email,
        password: password,
        name: name,
      } as SignupInput);
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center px-16">
        <Header
          heading="Create an account"
          subheading="Already have an account?"
          log="Login"
          link="/signin"
        />

        <div className="w-3/5">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            set={setUsername}
          />
          <Input
            label="Email"
            type="email"
            placeholder="m@example.com"
            set={setEmail}
          />
          <Input
            label="Password (min 6 characters)"
            type="password"
            placeholder="Enter your password"
            set={setPassword}
          />
          <Button label="Sign Up" onClick={handleSignup} />
        </div>
      </div>

      <div className="w-1/2 bg-gray-100 flex justify-center items-center p-10">
        <div className="max-w-md">
          <p className="text-2xl font-semibold">
            “The customer service I received was exceptional. The support team
            went above and beyond to address my concerns.“
          </p>
          <p className="mt-4 font-bold">Jules Winnfield</p>
          <p className="text-gray-500">CEO, Acme Inc</p>
        </div>
      </div>
    </div>
  );
}

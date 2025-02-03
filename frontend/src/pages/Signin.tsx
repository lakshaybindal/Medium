import { useState } from "react";
import Input from "../components/input";
import Button from "../components/button";
import Header from "../components/header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SigninInput } from "@lakshay_bindal/medium-common";
import { url } from "../port";

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  async function handleSignin() {
    try {
      const res = await axios.post(url + "/api/user/signin", {
        username: email,
        password: password,
      } as SigninInput);
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
          heading="Sign in to your account"
          subheading="Don't have an account?"
          log="Sign Up"
          link="/"
        />

        <div className="w-3/5">
          <Input
            label="Email"
            type="email"
            placeholder="m@example.com"
            set={setEmail}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            set={setPassword}
          />
          <Button label="Sign In" onClick={handleSignin} />
        </div>
      </div>

      <div className="w-1/2 bg-gray-100 flex justify-center items-center p-10">
        <div className="max-w-md">
          <p className="text-2xl font-semibold">
            “We make it easy to stay connected. Secure and fast access to your
            account, anytime.”
          </p>
          <p className="mt-4 font-bold">Mia Wallace</p>
          <p className="text-gray-500">CTO, Acme Inc</p>
        </div>
      </div>
    </div>
  );
}

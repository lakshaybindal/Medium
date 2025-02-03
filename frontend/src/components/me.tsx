import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Me() {
  const Navigator = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      Navigator("/signup");
    } else {
      Navigator("/blogs");
    }
  }, []);
  return <></>;
}

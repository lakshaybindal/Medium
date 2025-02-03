import React from "react";
import { Link } from "react-router-dom";

export default function Header(props: { heading: string; subheading: string; log: string; link: string }) {
  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold">{props.heading}</h1>
      <p className="text-gray-500">
        {props.subheading}{" "}
        <Link to={props.link} className="text-blue-600">
          {props.log}
        </Link>
      </p>
    </div>
  );
}

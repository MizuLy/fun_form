import React from "react";
import { Link } from "react-router-dom";
import Mainrouter from "./routes/Mainrouter";
import Home from "./pages/Home";
import Mainlayout from "./layouts/Mainlayout";

export default function App() {
  return (
    <div>
      <Mainrouter />
    </div>
  );
}

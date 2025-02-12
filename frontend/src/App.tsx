import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import "./App.css";
import Blogs from "./pages/blogs";
import FullBlog from "./pages/FullBlog";
import CreateBlog from "./pages/CreateBlog";
import Me from "./components/me";

function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<Me></Me>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            <Route path="/blog" element={<FullBlog></FullBlog>}></Route>
            <Route path="/blogs" element={<Blogs></Blogs>}></Route>
            <Route
              path="/createblog"
              element={<CreateBlog></CreateBlog>}
            ></Route>
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;

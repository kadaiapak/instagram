import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { useSelector } from "react-redux";

const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}`).default;
  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const auth = useSelector((state) => state.auth);
  const { page, id } = useParams();
  let pageName = "";
  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }
  return generatePage(pageName);
};

export default PageRender;

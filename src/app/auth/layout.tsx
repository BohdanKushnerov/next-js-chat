import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>Layout Auth</div>
      {children}
    </>
  );
};

export default Layout;

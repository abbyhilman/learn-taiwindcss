import React from "react";

const newDate = new Date();

const Footer = () => {
  return (
    <div className="flex justify-center items-center h-16 bg-black text-white">
      <p> Copyright @ {newDate.getFullYear()} EmmerceApp</p>
    </div>
  );
};

export default Footer;

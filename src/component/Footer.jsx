import React from "react";

const newDate = new Date();

const Footer = () => {
  return (
    // <footer>
    //   <div className="flex justify-center items-center w-screen h-16 bg-black text-white relative inset-x-0 bottom-0">
    //
    //   </div>
    // </footer>
    <div className="relative h-32 w-32 ">
      <div className="absolute insert-0 md:inset-x-0 bottom-0 flex justify-center items-center w-screen h-16 bg-black text-white">
        <p> Copyright @ {newDate.getFullYear()} EmmerceApp</p>
      </div>
    </div>
  );
};

export default Footer;

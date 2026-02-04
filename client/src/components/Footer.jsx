import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0  w-full bg-blue-300 text-center text-white-500 text-md py-5 shadow">
      &copy; {new Date().getFullYear()} Student Management System. All rights
      reserved.
    </footer>
  );
};

export default Footer;

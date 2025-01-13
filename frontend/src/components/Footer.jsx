import React from 'react';  

const Footer = () => {  
  return (  
    <footer className="bg-gray-800 text-white p-4">  
      <div className="container mx-auto flex justify-center items-center">  
          <p className="text-sm">&copy; {new Date().getFullYear()} The Book Store. All rights reserved.</p>  
      </div>  
    </footer>  
  );  
};  

export default Footer;
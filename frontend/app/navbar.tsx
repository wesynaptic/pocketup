import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="w-full max-x-[1200px] flex justify-between mb-12">
        <div>
         <div className="relative z-20 flex items-center text-lg font-medium">
          <svg className="mr-2" width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5265 0.000784679C5.98416 0.0693812 1.50731 4.5886 1.50731 10.1471V22.7638C0.595941 23.3989 0 24.4547 0 25.6507C0 27.5939 1.57301 29.1669 3.51617 29.1669C5.45929 29.1669 7.03233 27.5939 7.03233 25.6507C7.03233 24.4728 6.45429 23.4309 5.56616 22.7929V10.1471C5.56616 6.77826 8.28557 4.05884 11.6544 4.05884H13.8529C17.2218 4.05884 19.9412 6.77826 19.9412 10.1471C19.9412 13.5159 17.2218 16.2353 13.8529 16.2353H13.6726C13.0325 15.3681 12.0032 14.806 10.8416 14.806C8.8985 14.806 7.32546 16.379 7.32546 18.3222C7.32546 20.2653 8.8985 21.8383 10.8416 21.8383C12.0537 21.8383 13.1218 21.2263 13.7539 20.2942H13.8529C19.4541 20.2942 24 15.7483 24 10.1471C24 4.5459 19.4541 0 13.8529 0H11.5265V0.000784679Z" fill="black"/>
          </svg> Pocketup
          </div>
        </div>
          <Avatar>
            <AvatarImage src="https://media1.tenor.com/m/IAR8RQwY3UoAAAAC/vomit-gnome.gif" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
      </nav>
    );
};

export default Navbar;

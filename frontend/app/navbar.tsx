import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex">
                <li className="mr-6">
                    <Link className="text-white hover:text-gray-300" href="/">
                        Home
                    </Link>
                </li>
                <li className="mr-6">
                    <Link className="text-white hover:text-gray-300" href="/posts">
                       posts
                    </Link>
                </li>
                <li className="mr-6">
                    <Link className="text-white hover:text-gray-300" href="/darko">
                       darko
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

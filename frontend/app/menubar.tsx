'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'


const Menubar = () => {
    const pathname = usePathname();
    return (
        <div className="flex mb-4">
            <Link
                className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary font-medium text-muted-foreground capitalize
                ${pathname == '/posts' ? ' text-primary bg-muted' : ""}`}
                href="/posts"
            >
            posts
            </Link>
            <Link
                className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary font-medium text-muted-foreground capitalize
                ${pathname == '/test' ? ' text-primary bg-muted' : ""}`}
                href="/test"
            >
            test
            </Link>
            <Link
                className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary font-medium text-muted-foreground capitalize
                ${pathname == '/opala' ? ' text-primary bg-muted' : ""}`}
                href="/opala"
            >
            opala
            </Link>
        </div>
    );
};

export default Menubar;


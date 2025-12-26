"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
    const pathname = usePathname();

    // anasayfada navbar gösterme
    if (pathname === "/") return null;
    else return <Navbar />;


}

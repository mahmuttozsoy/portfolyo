"use client";

import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
    const { pathname } = useLocation();

    if (pathname.startsWith("/admin")) return null;

    return <Navbar pathname={pathname} />;


}

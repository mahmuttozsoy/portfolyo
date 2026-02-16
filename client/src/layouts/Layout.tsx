import { Outlet } from "react-router-dom";
import NavbarWrapper from "../components/NavbarWrapper";
import Footer from "../components/Footer";

export default function Layout() {
    return (
        <div className="relative min-h-screen">
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <NavbarWrapper />
            <div className="relative z-10">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
}

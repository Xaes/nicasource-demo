import { ReactElement } from "react";
import LogoSVG from "../../assets/logo.svg";

const Navbar = (): ReactElement => {
    return (
        <nav className="container mx-auto">
            <div className="flex items-center justify-between pt-8">
                <div className="flex items-center space-x-4">
                    <img src={LogoSVG} alt="VideoHub Nicasource" className="w-10 h-10" />
                    <h3>VideoHub</h3>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

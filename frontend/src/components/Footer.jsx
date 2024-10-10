import { FaGithub, FaLinkedin } from "react-icons/fa";
import Github from "./Github";
import Linkedin from "./Linkedin";

const Footer = () => {
    return (
        <footer className="footer bg-base-200 text-base-content items-center p-4">
            <aside className="grid-flow-col items-center">
                {/* <FaHashtag size={36} /> */}
                <img src="/icon.svg" width={36} alt="icon" />
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a href="https://github.com/ynsmrtpc/clearsight" target="_blank" rel="noopener noreferrer">
                    <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/yunusemretopcu/" target="_blank" rel="noopener noreferrer" className='text-primary' >
                    <Linkedin size={24} />
                </a>
            </nav>
        </footer>
    );
};

export default Footer;

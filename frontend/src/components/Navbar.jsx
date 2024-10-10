import { FaGithub, FaLinkedin, FaRegImage } from 'react-icons/fa';
import Linkedin from './Linkedin';
import Github from './Github';

const Navbar = () => {
    return (
        <nav className="navbar bg-white shadow-lg fixed w-full z-10">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <a className="flex items-center text-2xl font-bold text-primary transition duration-300 ease-in-out">
                    <img src="/icon.svg" className='mr-2' width={36} alt="icon" />
                    <p>
                        <span className='text-[#e62c5acc]'>Clear</span>
                        <span className='text-[#0fabf6cc]'>Sight</span>
                    </p>
                </a>

                <div className="hidden md:flex space-x-8 items-center">
                    <a href="https://github.com/ynsmrtpc/clearsight" target="_blank" rel="noopener noreferrer">
                        <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/yunusemretopcu/" className='text-primary' target="_blank" rel="noopener noreferrer">
                        <Linkedin size={24} />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

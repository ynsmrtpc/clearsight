import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Helmet from 'react-helmet';

const App = () => {
    return (
        <main className='flex flex-col justify-between h-screen'>
            <Helmet>
                <title>ClearSight - Free Background Removal Tool</title>
                <meta name="description" content="ClearSight offers a powerful and free image background removal tool. Easily transform your images with our user-friendly interface." />
                <meta name="keywords" content="background removal, image editing, free tool, ClearSight, image processing, remove background" />
                <link rel="canonical" href="https://clearsight.com" />
                <link rel="icon" type="image/svg+xml" href="/icon.svg" />
                <meta property="og:title" content="ClearSight - Free Background Removal Tool" />
                <meta property="og:description" content="Unlock powerful image editing features with ClearSight's free background removal tool. Start transforming your images today!" />
                <meta property="og:url" content="https://clearsight.com" />
                <meta property="og:image" content="/icon.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="ClearSight - Free Background Removal Tool" />
                <meta name="twitter:description" content="Transform your images effortlessly with ClearSight's free background removal service." />
                <meta name="twitter:image" content="/icon.png" />
            </Helmet>

            <Navbar />
            <HeroSection />
            <Footer />
        </main>
    );
};

export default App;

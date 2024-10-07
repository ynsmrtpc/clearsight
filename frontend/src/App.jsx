import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone'; // Sürükle-bırak kütüphanesi
import { FaSun, FaMoon, FaTwitter, FaFacebook, FaYoutube, FaHashtag, FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';

const App = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');


  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // const apiUrl = process.env.NODE_ENV === 'production' ? 'http://clearsightapi:5002' : 'http://localhost:5002';
      const response = await axios.post(`http://localhost:5002/remove_background`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(`data:image/png;base64,${response.data.image}`);
    } catch (error) {
      console.error('Error uploading the image:', error);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true);
    setImageUrl('')
    setUploadedImage('')
    const file = acceptedFiles[0];
    setFile(file);
    setUploadedImage(URL.createObjectURL(file));
    document.getElementById('imageModal').showModal();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (uploadedImage && !imageUrl) {
      handleUpload();
    }
  }, [uploadedImage]);


  return (
    <main className='flex flex-col justify-between items-center min-h-screen gap-12'>
      <header className="w-full flex justify-between items-center px-5 py-3">
        <h1 className="text-3xl font-bold">ClearSight</h1>
        <div className="flex gap-2">
          <button onClick={() => handleThemeChange(theme === "light" ? "dark" : "light")} className="btn btn-sm">
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      <section className='container flex-1'>
        <div className='flex justify-between mt-20 lg:flex-nowrap flex-wrap gap-12'>

          <div className="diff aspect-[16/9]">
            <div className="diff-item-1">
              <img alt="daisy" src="/demo-remove.png" />

            </div>
            <div className="diff-item-2">
              <img alt="daisy" src="/demo.jpg" />
            </div>
            <div className="diff-resizer"></div>
          </div>

          <div className='w-full h-auto'>
            <div
              {...getRootProps({
                className: 'dropzone p-8 rounded-lg border-dashed border-4 border-gray-400 flex flex-col justify-center items-center h-full w-full bg-base-200'
              })}
            >
              <input {...getInputProps()} />
              <p className="text-lg">Dosyanızı buraya sürükleyin veya seçmek için tıklayın</p>
            </div>
          </div>
        </div>
      </section>


      <dialog id="imageModal" className="modal ">
        <div className="modal-box w-full max-w-[75vw]">
          <form method="dialog">
            <button className="btn float-end"><FaTimes /></button>
          </form>
          {uploadedImage && (
            <section>
              <div className="flex lg:flex-nowrap flex-wrap justify-between gap-4">

                <div className='h-full card'>
                  <div className="card-body">
                    <img src={uploadedImage} alt="Uploaded" className={`w-full h-auto rounded-md shadow-md ${loading && 'animate-pulse'}`} />
                  </div>
                </div>

                {imageUrl && (
                  <div className='h-full card'>
                    <div className="card-body">
                      <img src={imageUrl} alt="Processed" className="w-full h-auto rounded-md shadow-md" />
                      <a href={imageUrl} download className="btn mt-4">Download</a>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </dialog>



      <footer className="footer bg-neutral text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <FaHashtag size={36} />
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a>
            <FaTwitter size={24} />
          </a>
          <a>
            <FaYoutube size={24} />
          </a>
          <a>
            <FaFacebook size={24} />
          </a>
        </nav>
      </footer>
    </main >
  );
};

export default App;

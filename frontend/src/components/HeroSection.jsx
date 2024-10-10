import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';

const HeroSection = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadedImage, setUploadedImage] = useState('');

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
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
        <section id='home' className="hero h-full bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-lg animate__animated animate__fadeIn">
                    <img src="/icon.svg" width={130} className='mx-auto' alt="icon" />
                    <h1 className="text-5xl font-bold">Remove Backgrounds Instantly</h1>
                    <p className="py-6">
                        Clearsight uses AI-powered tools to help you remove backgrounds from images with ease. Try it now!
                    </p>
                    <div
                        {...getRootProps({
                            className: 'dropzone p-8 rounded-lg border-dashed border-4 border-gray-400 flex flex-col justify-center items-center h-full w-full bg-base-200'
                        })}
                    >
                        <input {...getInputProps()} />
                        <p className="text-lg">Drag your file here or click to select it</p>
                    </div>
                </div>
            </div>

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
        </section>
    );
};

export default HeroSection;

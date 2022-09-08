import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { createSong, getSongs } from "../store/songs";

import './CSS/Upload.css'
import './CSS/Loading.css'


const Upload = ({ setLocation }) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [imagePre, setImagePre] = useState();
    const [audioUploaded, setAudioUploaded] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fileArr, setFilesArr] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('Your Song file size is too large. Please reduce it below 10Mb.');

    const audioSubmit = () => {
        if (!error) setAudioUploaded(true);
    }

    useEffect(()=>{
        if (file) {
            if (file.size > 10000000) {
                setError('Your Song file size is too large. Please reduce it below 10Mb.')
            } else {
                setError(null)
            }
        }
        if (image) {
            if (image.size > 10000000) setError('Your Image file size is too large. Please reduce it below 10Mb.')
        }

    }, [file, image])

    useEffect(()=>{
        if (file && !error) setAudioUploaded(true);
    }, [error])

    const imageSubmit = (e) => {
        e.preventDefault();
        const files = [image, file]


        if (!error) {
            setFilesArr(files)
            const info = {
                title,
                description,
                files
            }
            setLoading(true);
            dispatch(createSong(info))
            .then(()=>dispatch(getSongs()))
            .then(()=>setLoading(false))
            .then(()=>setLocation('home'))
            .catch(()=>setLoading(false))
        }
    }

    const previewFile = (e) => {
        setImage(e.target.files[0]);
        setImagePre(URL.createObjectURL(e.target.files[0]))
    }


    return (
        <>
        {loading && (
            <div className="Loading-container">
                <div className="loading-circle">LOADING
                    <span></span>
                </div>
            </div>
        )}
        <div className="Upload-container">
            {!audioUploaded && (
            <div className="Upload-inner-audio-container">
                <form className='Upload-form'>
                    <input
                        type="file"
                        id="audioFile"
                        style={{display: 'none'}}
                        onChange={(e)=>{setFile(e.target.files[0]); audioSubmit()}}
                        accept='audio/*'
                    />
                    <input
                        type="button"
                        className="file-upload-button"
                        value="choose a file to upload"
                        onClick={()=>document.getElementById('audioFile').click()}
                    />
                </form>
                {file && error && (<div className="audio-error">{error}</div>)}
            </div>
            )}
            {audioUploaded && (
            <div className="Upload-inner-image-container">
                <div className="Upload-inner-image-left">
                    <div className="image-preview-container">
                        <img className='imagePreview' src={imagePre}/>
                    </div>
                        <form className='Upload-form'>
                            <input
                                type="file"
                                id="imageFile"
                                style={{display: 'none'}}
                                onChange={(e)=>previewFile(e)}
                                accept='image/*'
                            />
                            {!image && (<input
                                type="button"
                                className="file-search"
                                value="Upload Image"
                                onClick={()=>document.getElementById('imageFile').click()}
                            />)}
                            {image && (<button type='button' onClick={()=>document.getElementById('imageFile').click()}>Replace Image</button>)}
                        </form>
                </div>
                    <div className="Upload-inner-image-right">
                        <form className='Upload-title-form'>
                            <label className="form-label">Title</label>
                            <input
                                type='text'
                                className="title-input"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                            <label className="form-label">Description</label>
                            <input
                                type='text'
                                className="description-input"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                            />
                        </form>
                        <button type="button" onClick={imageSubmit}>Save</button>
                        {image && error && (<>{error}</>)}
                    </div>
            </div>
            )}
        </div>
        </>
    )
};

export default Upload;

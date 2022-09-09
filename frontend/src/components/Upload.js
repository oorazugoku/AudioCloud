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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('Your Song file size is too large. Please reduce it below 10Mb.');
    const [stopButton, setStopButton] = useState(false);

    const audioSubmit = () => {
        if (!error) setAudioUploaded(true);
    };


    useEffect(()=>{
        if (file && !image) {
            const fileArr = file.name.split('.');
            const ext = fileArr[fileArr.length - 1]
            if (file.size > 10000000) {
                setError('Your Song file size is too large. Please reduce it below 10Mb.')
                return
            } else {
                setError(null)
                switch (ext.toLowerCase()) {
                    case 'm4a':
                    case 'flac':
                    case 'mp3':
                    case 'mp4':
                    case 'wav':
                    case 'wma':
                    case 'aac':
                        return
                }
                setError('This is not an Audio file. Please upload the correct file type.')
            }
        }


        if (image) {
            const fileArr = image.name.split('.');
            const ext = fileArr[fileArr.length - 1]
            if (image.size > 10000000) {
                setError('Your Image file size is too large. Please reduce it below 10Mb.')
                    return
            } else {
                switch (ext.toLowerCase()) {
                    case 'jpg':
                    case 'jpeg':
                    case 'png':
                    case 'gif':
                    case 'tiff':
                    case 'jfif':
                        setStopButton(false)
                        setError(null)
                        return
                }
                setStopButton(true)
                setError('This is not an Image file. Please upload the correct file type.')
            }
        }
        if (title) setError(null)

    }, [file, image, title]);

    useEffect(()=>{
        if (file && !error) setAudioUploaded(true);
    }, [error]);



    const imageSubmit = (e) => {
        e.preventDefault();
        const files = [image, file]
        if (!title) {
            setError('Please Input a Title.')
        }
        if (!image) {
            setError('Please Upload an Image.')
        }

        if (!error && title?.length > 0 && image) {
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
    };



    const previewFile = (e) => {
        setImage(e.target.files[0]);
        setImagePre(URL.createObjectURL(e.target.files[0]));
    };


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
        {file && (<div style={{color: 'white', paddingBottom: '5px'}}>{file.name}</div>)}
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
                            {image && (<button type='button' className="replace-image-button" onClick={()=>document.getElementById('imageFile').click()}>Replace Image</button>)}
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
                        <button type="button" disabled={stopButton} className="Upload-save-button" onClick={imageSubmit}>Save</button>
                        {error && (<div className="upload-errors">{error}</div>)}
                    </div>
            </div>
            )}
        </div>
        </>
    )
};

export default Upload;

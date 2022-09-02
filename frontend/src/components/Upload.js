import React, { useState } from "react";

import './CSS/Upload.css'


const Upload = () => {
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [imagePre, setImagePre] = useState();
    const [audioUploaded, setAudioUploaded] = useState(false);

    const audioSubmit = (e) => {
        e.preventDefault();
        setAudioUploaded(true);
    }

    const imageSubmit = (e) => {
        e.preventDefault();
        setAudioUploaded(true);
    }

    const previewFile = (e) => {
        setImage(e.target.value);
        setImageUrl('')
        setImagePre(URL.createObjectURL(e.target.files[0]))
    }

    const previewUrl = (e) => {
        setImage('');
        setImageUrl(e.target.value)
        setImagePre(e.target.value)

    }


    return (
        <>
        <div className="Upload-container">
            {!audioUploaded && (
            <div className="Upload-inner-audio-container">
                <form className='Upload-form' onSubmit={audioSubmit}>
                    <input
                        type="file"
                        id="audioFile"
                        style={{display: 'none'}}
                        onChange={(e)=>setFile(e.target.value)}
                        accept='audio/*'
                    />
                    <input
                        type="button"
                        value="choose a file to upload"
                        onClick={()=>document.getElementById('audioFile').click()}
                    />
                    {/* <label><input type="file" onChange={(e)=>setFile(e.target.value)} accept='audio/*' /></label> */}
                    <button type="submit">Upload</button>
                </form>
            </div>
            )}
            {audioUploaded && (
            <div className="Upload-inner-image-container">
                <div className="Upload-inner-image-left">
                    <div className="image-preview-container">
                        <img className='imagePreview' src={imagePre}/>
                    </div>
                        <form className='Upload-form' onSubmit={imageSubmit}>
                            <label className="form-label">Input URL here or upload an Image</label>
                            <input
                                type='url'
                                className="imageUrl-input"
                                placeholder="MUST have http: or https:"
                                value={imageUrl}
                                onChange={(e)=>{previewUrl(e)}}
                            />
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
                            <button type="submit">Upload</button>
                        </form>
                </div>
                    <div className="Upload-inner-image-right">
                        <form className='Upload-title-form' onSubmit={imageSubmit}>
                            <label className="form-label">Title</label>
                            <input
                                type='url'
                                placeholder="url..."
                                value=''
                                onChange={(e)=>setImageUrl(e.target.value)}
                            />
                        </form>
                    </div>
            </div>
            )}
        </div>
        </>
    )
};

export default Upload;

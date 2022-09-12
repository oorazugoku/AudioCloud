import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSong, removeSong } from "../store/song";
import { deleteSong, editSong, getSongs } from "../store/songs";

import './CSS/EditSong.css'

const EditSong = ({ setEditing, song }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(song.imageURL);
    const [imagePre, setImagePre] = useState(song.imageURL);
    const [title, setTitle] = useState(song.title);
    const [description, setDescription] = useState(song.description);
    const [error, setError] = useState(null);
    const [saveOff, setSaveOff] = useState(false);
    const songState = useSelector(state => state.song);

    useEffect(()=>{
        if (!title) {
            setError('Please input a Title.')
            setSaveOff(true)
        } else {
            setError(null)
            setSaveOff(false)
        }
    }, [title])

    const imageSubmit = (e) => {
        e.preventDefault();
        if (!error) {
            const info = {
                id: song.id,
                title,
                description
            }
            dispatch(editSong(info))
            .then(()=>dispatch(getSongs()))
            .then(()=> {
                if (Object.values(songState).length > 0) dispatch(getOneSong(songState.id))
            })
            .then(()=>setEditing(false))
        }
    }

    const cancel = () => {
        setEditing(false)
    }

    const handleDelete = () => {
        if (songState.id === song.id) {
            dispatch(deleteSong(song.id))
            dispatch(removeSong()).then(()=>setEditing(false))
        } else {
            dispatch(deleteSong(song.id))
            .then(()=>setEditing(false))
        }
    }

    const previewFile = (e) => {
        setImage(e.target.files[0]);
        setImagePre(URL.createObjectURL(e.target.files[0]))
    }


    return (
        <div className="Upload-container">
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
                        <div className="EditSong-button-container">
                            <button type="button" className="EditSong-cancel-button" onClick={cancel}>Cancel</button>
                            <button type="button" disabled={saveOff} className="EditSong-save-button" onClick={imageSubmit}>Save</button>
                            <button type="button" className="EditSong-delete-button" onClick={handleDelete}>Delete</button>
                        </div>
                        {error && (<div className="EditSong-error">{error}</div>)}
                    </div>
            </div>
        </div>
    );
};


export default EditSong;

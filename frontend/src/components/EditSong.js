import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlaying } from "../store/playing";
import { removeSong } from "../store/song";
import { deleteSong, editSong } from "../store/songs";

const EditSong = ({ setEditing, song }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(song.imageURL);
    const [imagePre, setImagePre] = useState(song.imageURL);
    const [title, setTitle] = useState(song.title);
    const [description, setDescription] = useState(song.description);
    const songState = useSelector(state => state.song)



    const imageSubmit = (e) => {
        e.preventDefault();
        const info = {
            id: song.id,
            title,
            description
        }
        dispatch(editSong(info)).then(()=>setEditing(false))
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
                        <button type="button" onClick={cancel}>Cancel</button>
                        <button type="button" onClick={imageSubmit}>Save</button>
                        <button type="button" onClick={handleDelete}>Delete</button>
                    </div>
            </div>
        </div>
    );
};


export default EditSong;

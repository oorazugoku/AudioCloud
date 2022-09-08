import React from "react";
import { useDispatch } from 'react-redux'

import './CSS/Comments.css'

const Comments = ({ song }) => {
    const dispatch = useDispatch();

    const handleComment = () => {

    }

    return (
        <>
        <div className="Comment-container">
            <form onSubmit={handleComment}>
                <div className="Comment-input-container">
                    <input
                    className="Comment-input"
                    placeholder="Write a comment"
                    />
                </div>
            </form>
            <i class="fa-solid fa-message"/>{song.Comments.length}
        </div>
        </>
    );

};


export default Comments;

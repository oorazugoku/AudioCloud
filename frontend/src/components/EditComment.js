import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';



const EditComment = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const song = useSelector(state => state.songComments)
    const [comment, setComment] = useState('');


    const handleComment = (e) => {
        e.preventDefault();
        const info = {
            id: song.id,
            comment
        };

    };

    return (
        <>
        <form onSubmit={handleComment}>
            <div className="CommentsPage-input-container">
                <input
                className="CommentsPage-input"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                placeholder="Write a comment"
                />
            </div>
        </form>
        </>
    )
}

export default EditComment;

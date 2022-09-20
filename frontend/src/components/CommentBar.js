import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getSongComments } from "../store/comments";
import { getSongFromComments } from "../store/songComments";
import { getSongs } from "../store/songs";
import { likeSong, unlikeSong } from "../store/likes";
import { useHistory } from "react-router-dom";

import './CSS/CommentBar.css';

const Comments = ({ song }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const likes = useSelector(state => state.likes);
    const [comment, setComment] = useState('');
    const [count, setCount] = useState();

    useEffect(()=>{
        setCount(comment.length)
    }, [comment])


    const handleComment = (e) => {
        if (comment.length <= 280) {
            e.preventDefault();
            const info = {
                id: song.id,
                comment
            };
            dispatch(addComment(info))
            .then(()=>dispatch(getSongs()))
            .then(()=>setComment(''))
            .then(()=>setCount(280));
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }

    let red;
    if (count === 280) red = {color: "#FF5500"}

    const handleViewComments = () => {
        dispatch(getSongComments(song.id))
        .then(()=>dispatch(getSongFromComments(song)))
        .then(()=>history.push('/comments'))
    }

    const handleDisLike = (songId) => {
        dispatch(unlikeSong(songId))
    }

    const handleLike = (songId) => {
        dispatch(likeSong(songId))
    }

    return (
        <>
        <div className="Comment-container">
            <form onSubmit={handleComment}>
                <div className="Comment-input-container" >
                    <input

                    className="Comment-input"
                    value={comment}
                    maxLength={280}
                    onChange={(e)=>handleCommentChange(e)}
                    placeholder="Write a comment"
                    />
                </div>
            </form>
            {song && (
            <div className="Comments-lower-container">
                <div className="Comments-lower-left">
                    <div/>
                    {likes[song.id] ? (<div className="Stream-likes" ><i className="fa fa-heart" id='redheart' onClick={()=>handleDisLike(song.id)}/></div>) :
                    (<div className="Stream-likes" ><i className="fa-regular fa-heart" onClick={()=>handleLike(song.id)}/></div>)}
                    {count > 0 && (<div className="remaining">Remaining <div className="remaining-num" style={red}>{280 - count}</div></div>)}
                </div>

                <div className="Comments-lower-right" onClick={handleViewComments}>
                    <i className="fa-solid fa-message"/>
                    <div className="number-of-comments">{song.Comments?.length}</div>
                </div>
            </div>
            )}
        </div>
        </>
    );
};


export default Comments;

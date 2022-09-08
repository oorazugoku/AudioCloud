import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { addComment, getSongComments } from "../store/comments";
import { getOneSong } from "../store/song";
import { getSongFromComments } from "../store/songComments";
import { getSongs } from "../store/songs";

import './CSS/Comments.css'

const Comments = ({ song, setLocation }) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [copied, setCopied] = useState(false);
    const [count, setCount] = useState()

    useEffect(()=>{
        setCount(comment.length)
    }, [comment])
    console.log(count)


    const handleComment = (e) => {
        e.preventDefault();
        const info = {
            id: song.id,
            comment
        };
        dispatch(addComment(info))
        .then(()=>dispatch(getSongs()))
        .then(()=>setComment(''))
        .then(()=>setCount(280));
    };

    const handleCommentChange = (e) => {
        if (comment.length < 280) {
            setComment(e.target.value)
        }
    }

    let red;
    if (count === 280) red = {color: "#FF5500"}


    // const handleCopy = () => {
    //     navigator.clipboard.writeText(song.url);
    //     setCopied(true);
    //     setTimeout(()=>{
    //         setCopied(false);
    //     }, 4000);
    // };

    const handleViewComments = () => {
        dispatch(getSongComments(song.id))
        .then(()=>dispatch(getSongFromComments(song)))
        .then(()=>setLocation('comments'))
    }

    return (
        <>
        {copied && (<div className="copied-container"><div className="copied-left"><i className="fas fa-check"/></div><div className="copied-right">Link has been copied to the clipboard!</div></div>)}
        <div className="Comment-container">
            <form onSubmit={handleComment}>
                <div className="Comment-input-container" >
                    <input

                    className="Comment-input"
                    value={comment}
                    onChange={(e)=>handleCommentChange(e)}
                    placeholder="Write a comment"
                    />
                </div>
            </form>
            {song && (
            <div className="Comments-lower-container">
                <div className="Comments-lower-left">
                    <div/>
                    {count > 0 && (<div className="remaining">Remaining <div className="remaining-num" style={red}>{280 - count}</div></div>)}
                    {/* <button className="Comments-share-button" onClick={handleCopy}><i className="fa-solid fa-arrow-up-right-from-square"/> Copy Link</button> */}
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

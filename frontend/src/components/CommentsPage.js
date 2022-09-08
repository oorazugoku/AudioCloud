import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment, editComment, getSongComments } from "../store/comments";
import { getSongFromComments } from "../store/songComments";
import { getSongs } from "../store/songs";
import { Modal } from './context/Modal'

import './CSS/CommentsPage.css'
import EditComment from "./EditComment";

const CommentsPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const comments = useSelector(state => Object.values(state.comments));
    const song = useSelector(state => state.songComments);
    const songs = useSelector(state => state.songs);
    const users = useSelector(state => state.users);
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [comment, setComment] = useState('');
    const [editID, setEditID] = useState();
    const [commentEdit, setCommentEdit] = useState('');
    const [count, setCount] = useState()
    const [count2, setCount2] = useState()

    useEffect(()=>{
        setCount(comment.length)
    }, [comment, commentEdit])

    const handleComment = (e) => {
        e.preventDefault();
        const info = {
            id: song.id,
            comment
        };
        dispatch(addComment(info))
        .then(()=>dispatch(getSongs(song.id)))
        .then(()=>dispatch(getSongComments(song.id)))
        .then(()=>setComment(''))
        .then(()=>setCount(280));
    };

    const handleCommentEdit = (e) => {
        e.preventDefault()
        const info = {
            id: editID,
            comment: commentEdit
        }
        dispatch(editComment(info))
        .then(()=>dispatch(getSongComments(song.id)))
        .then(()=>setEditID())
    }

    // const handleCopy = () => {
    //     navigator.clipboard.writeText(song.url);
    //     setCopied(true);
    //     setTimeout(()=>{
    //         setCopied(false);
    //     }, 4000);
    // };

    const handleEdit = (data) => {
        setShowModal(true)
        setEditID(data.id)
        setCommentEdit(data.comment)
        setCount(280)
    }

    const handleDelete = (id) => {
        dispatch(deleteComment(id))
        .then(()=>dispatch(getSongComments(song.id)))
        .then(()=>dispatch(getSongs()))
    }

    const handleCommentChange = (e) => {
        if (comment.length < 280) {
            setComment(e.target.value)
        }
    }

    const handleEditChange = (e) => {
        if (commentEdit.length < 280) {
            setCommentEdit(e.target.value)
        }
    }

    let red;
    if (count === 280) red = {color: "#FF5500"}

    let red2;
    if (count2 === 280) red2 = {color: "#FF5500"}



    return (
        <>
            <div className="CommentsPage-container">

                <div className="CommentsPage-left">
                    <form onSubmit={handleComment}>
                        <div className="CommentsPage-input-container">
                            <input
                            className="CommentsPage-input"
                            value={comment}
                            onChange={(e)=>handleCommentChange(e)}
                            placeholder="Write a comment"
                            />
                        </div>
                    </form>
                    {comments && (<div className="CommentsPage-lower-container">
                        <div className="Comments-lower-left">
                        {count > 0 && (<div className="remaining">Remaining <div className="remaining-num" style={red}>{280 - count}</div></div>)}
                        </div>

                        <div className="CommentsPage-lower-right">
                            <i className="fa-solid fa-message"/>
                            <div className="number-of-comments">{comments.length}</div>
                        </div>
                    </div>)}
                    <div className="comment-section">
                    {comments?.map((each, i) => (
                        <div className="CommentsPage-commentsList" key={i}>
                            <div className="commentList-user">{users[each.userId]?.username}</div>
                            <div className="commentList-comment">{each.updatedAt}</div>
                            {editID === each.id ? (
                            <form onSubmit={handleCommentEdit}>
                                <div className="CommentsPage-input-container">
                                    <input
                                    className="CommentsPage-input"
                                    value={commentEdit}
                                    onChange={(e)=>handleEditChange(e)}
                                    placeholder="Write a comment"
                                    />
                                </div>
                            </form>
                            ) : (<><div className="commentList-comment">{each.comment}</div></>)}
                            {user.id === each.userId && (
                                <>
                                <button onClick={()=>handleEdit(each)}>Edit</button>
                                <button onClick={()=>handleDelete(each.id)}>Delete</button>
                            </>
                            )}
                        </div>
                    ))}
                    </div>
                </div>
                <div className="CommentsPage-right">

                </div>


            </div>
        </>
    );
};


export default CommentsPage;

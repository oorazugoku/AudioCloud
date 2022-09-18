import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment, editComment, getSongComments } from "../store/comments";
import { likeSong, unlikeSong } from "../store/likes";
import { setPlaying } from "../store/playing";
import { getOneSong } from "../store/song";
import { getSongs } from "../store/songs";
import WaveSurfer from 'wavesurfer.js'


import './CSS/CommentsPage.css'
import { setWave } from "../store/wave";
import { setWaveSeek } from "../store/waveSeek";
import { getSongFromComments } from "../store/songComments";
import { useHistory } from "react-router-dom";
import { setDuration } from "../store/duration";

const CommentsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const songState = useSelector(state => state.song);
    const playing = useSelector(state => state.playing);
    const comments = useSelector(state => Object.values(state.comments));
    const waveState = useSelector(state => state.wave)
    const song = useSelector(state => state.songComments);
    const likes = useSelector(state => state.likes);
    const users = useSelector(state => state.users);
    const duration = useSelector(state => state.duration)
    const waveSeek = useSelector(state => state.waveSeek)
    const [comment, setComment] = useState('');
    const [editID, setEditID] = useState();
    const [commentEdit, setCommentEdit] = useState('');
    const [count, setCount] = useState(280);
    const [count2, setCount2] = useState(280);
    const [waves, setWaves] = useState();
    const [time, setTime] = useState();
    const [loaded, setLoaded] = useState(false);
    const [songLoaded, setSongLoaded] = useState(false);
    const [changing, setChanging] = useState(false);

    useEffect(()=>{
        if (waveState) dispatch(setDuration(waveState?.getCurrentTime()))
    }, [])

    useEffect(()=>{
        const check = Object.values(song)
        if (check.length === 0) history.push('/userNav')
            const wave = WaveSurfer.create({
                container: '.CommentPage-wave',
                height: 150,
                waveColor: 'black',
                progressColor: '#FF5500',
                barGap: 2,
                barRadius: 0,
                barWidth: 1,
                hideScrollbar: true,
                responsive: true,
                partialRender: true
            })
            wave?.load(song?.url)
            wave?.setVolume(0)
            wave?.setMute(true)
            wave?.setCurrentTime(waveSeek[song?.id]?.time)
            wave?.on('seek', ()=> {
                const data = {
                    id: song.id,
                    time: wave.getCurrentTime()
                }
                dispatch(setWaveSeek(data))
            })
            setWaves(wave)
            setLoaded(true)
    }, [])

    // useEffect(()=>{
    //     if (loaded) {
    //         if (songState?.id === song?.id) {
    //             waves.setCurrentTime(waveState?.getCurrentTime())
    //             console.log('WAVEs', waves.getCurrentTime())
    //             waves.play()
    //         }
    //     }
    // }, [loaded])

    useEffect(()=>{
        const seek = {
            id: song?.id,
            time: time
        }
        dispatch(setWaveSeek(seek))
    }, [time])


    useEffect(()=>{
        setCount(comment.length)
        setCount2(commentEdit.length)
    }, [comment, commentEdit])

    useEffect(()=>{
        waves?.setCurrentTime(duration)
    }, [duration])

    const handleSong = (id) => {
        const data = {
            id,
            time: waves?.getCurrentTime()
        }
        dispatch(getOneSong(id))
        .then(()=>dispatch(getSongFromComments(song)))
        .then(()=>dispatch(setWave(waves)))
        .then(()=>dispatch(setPlaying(true)))
        .then(()=>dispatch(setWaveSeek(data)))
        // .then(()=>waveState?.play())
        // .then(()=>currentWave?.play())
    }

    const handlePause = () => {
        const data = {
            id: songState.id,
            time: waveState?.getCurrentTime()
        }
        dispatch(setPlaying(false))
        .then(()=>waveState?.pause())
        .then(()=>dispatch(setWaveSeek(data)))

    }


    const handleComment = (e) => {
        e.preventDefault();
        if (comment.length <= 280) {

            const info = {
                id: song.id,
                comment
            };
            dispatch(addComment(info))
            .then(()=>dispatch(getSongs(song.id)))
            .then(()=>dispatch(getSongComments(song.id)))
            .then(()=>setComment(''))
        }
    };

    const handleCommentEdit = (e) => {
        e.preventDefault();
        if (commentEdit.length <= 280) {
            const info = {
                id: editID,
                comment: commentEdit
            };
            dispatch(editComment(info))
            .then(()=>dispatch(getSongComments(song.id)))
            .then(()=>setEditID())
            .then(()=>setCommentEdit(''))
        }
    };

    const handleEdit = (data) => {
        setEditID(data.id)
        setCommentEdit(data.comment)
    };

    const handleDelete = (id) => {
        dispatch(deleteComment(id))
        .then(()=>dispatch(getSongComments(song.id)))
        .then(()=>dispatch(getSongs()));
    };

    const handleCommentChange = (e) => {
            setComment(e.target.value)
    };

    const handleEditChange = (e, id) => {
        if (editID !== id) setEditID(id)
        setCommentEdit(e.target.value)
    }

    let red;
    if (count === 280) red = {color: "#FF5500"}

    let red2;
    if (count2 === 280) red2 = {color: "#FF5500"}

    const checkDay = (date) => {
        const today = new Date()
        const newDate = new Date(date)
        const time = newDate.toLocaleTimeString([], { timeStyle: 'short' })
        const todayDay = today.getDay()
        const dateDay = newDate.getDay()

        if (date) {
            if (todayDay - dateDay === 0) {
                return `Today at ${time}`
            } else if (todayDay - dateDay === 1) {
                return `Yesterday at ${time}`
            } else {
                const result = newDate.toLocaleDateString()
                return result
            }
        }
    }

    const handleDisLike = (songId) => {
        dispatch(unlikeSong(songId))
    }

    const handleLike = (songId) => {
        dispatch(likeSong(songId))
    }


    return (
        <>
            <div className="CommentsPage-header-container">
                <div className="CommentsPage-top-left-container">
                    <div className="CommentsPage-play-button">
                    {songState.id === song.id & playing ?
                        (<button className="CommentsPage-play-button" onClick={handlePause}><i className="fas fa-pause"/></button>) :
                        (<button className="CommentsPage-play-button" onClick={()=>{handleSong(song.id)}}><i className="fas fa-play"/></button>)}
                    </div>
                    <div className="CommentsPage-song-info-container">
                        <div className="CommentsPage-song-title">{song.title}</div>
                        <div className="CommentsPage-artist-username">{users[song.artistId]?.username}</div>
                    </div>
                    <section className='CommentPage-wave'></section>
                    {loaded && (<>
                    <div className='CommentPage-wave-bottom-overlay-bar'></div>
                    <div className='CommentPage-wave-bottom-overlay'></div>
                    </>)}
                </div>
                <div className="CommentsPage-song-image"><img className='header-song-image' src={song.imageURL}/></div>
            </div>
            <div className="CommentsPage-container">
                <div className="CommentsPage-left">
                    <form onSubmit={handleComment}>
                        <div className="CommentsPage-input-container">
                            <input
                            className="CommentsPage-input"
                            value={comment}
                            maxLength={280}
                            onChange={(e)=>handleCommentChange(e)}
                            placeholder="Write a comment"
                            />
                        </div>
                    </form>
                    {comments && (<div className="CommentsPage-lower-container">
                        <div className="Comments-lower-left">
                        {likes[song.id] ? (<div className="Stream-likes" ><i className="fa fa-heart" id='redheart' onClick={()=>handleDisLike(song.id)}/></div>) :
                        (<div className="Stream-likes" ><i className="fa-regular fa-heart" onClick={()=>handleLike(song.id)}/></div>)}
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
                            <div className="commentList-owner-info">
                            <div className="commentList-user">{users[each.userId]?.username}</div>
                            <div className="commentList-date">{checkDay(each?.createdAt)}</div>
                            </div>
                            {editID === each.id ? (
                            <form onSubmit={handleCommentEdit}>
                                <div className="CommentsPage-input-container">
                                    <input
                                    className="CommentsPage-input"
                                    maxLength={280}
                                    value={commentEdit}
                                    onChange={(e)=>handleEditChange(e, each.id)}
                                    placeholder="Write a comment"
                                    />
                                </div>
                            </form>
                            ) : (<><div className="commentList-comment">{each.comment}</div></>)}
                            {user.id === each.userId && (
                                <div className="commentList-edit-info">
                                {count2 > 0 && editID === each.id && (<div className="remaining">Remaining <div className="remaining-num" style={red2}>{280 - count2}</div></div>)}
                                <div className="commentList-edit-buttons-container">
                                {editID !== each.id ? (<button className="comment-edit-button" onClick={()=>handleEdit(each)}>Edit</button>) : (<div className="press-enter">Press Enter to Save</div>)}
                                <button className="comment-delete-button" onClick={()=>handleDelete(each.id)}>Delete</button>
                                </div>
                                </div>
                            )}
                        </div>
                    )).reverse()}
                    </div>
                </div>
                <div className="CommentsPage-right">

                </div>


            </div>
        </>
    );
};


export default CommentsPage;

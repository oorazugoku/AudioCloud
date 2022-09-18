import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSongs } from "../store/songs";

import './CSS/SearchBar.css'

const SearchBar = ({ searched, setSearched }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const fill = useSelector(state => Object.values(state.search));
    const [search, setSearch] = useState('');
    const [autoFill, setAutoFill] = useState([]);
    const [focus, setFocus] = useState(false);
    const [mouse, setMouse] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = search.trim()
        if (trimmed.length > 0) {
            dispatch(getSongs(trimmed)).then(()=>history.push('/userNav'))
            setSearch('')
            setSearched(!searched)
        }
    }

    const handleFocus = () => {
        if (!mouse) {
            if (search.length > 0) setFocus(!focus)
            if (search.length === 0) setFocus(false)
        }
    }

    useEffect(()=>{
        if (search.length > 0) setFocus(true)
        if (search.length === 0) setFocus(false)
    }, [search])

    const handleSearch = (e) => {
        setSearch(e.target.value)
        const result = fill.filter(word => word.toLowerCase().includes(e.target.value.toLowerCase()))
        setAutoFill(result)
    }

    const handleSearchClick = (data) => {
        setSearch(data)
        dispatch(getSongs(data)).then(()=>history.push('/userNav'))
        setSearch('')
    }

    return (
        <>
            <div className="SearchBar-container">
                <form onSubmit={handleSubmit}>
                    <input
                    className="SearchBar-input"
                    value={search}
                    onBlur={handleFocus}
                    onFocus={handleFocus}
                    placeholder='Search'
                    onChange={(e)=>handleSearch(e)}
                    >
                    </input>
                    <i className="fas fa-magnifying-glass" onClick={handleSubmit} id='big-search-icon'></i>
                </form>
                {focus && (<div className="auto-fill-container" onMouseEnter={()=>setMouse(true)} onMouseLeave={()=>setMouse(false)}>
                    {autoFill.map(each => (<>
                        <div key={each} className='auto-fill-data' onClick={()=>handleSearchClick(each)}><i className="fas fa-magnifying-glass" id='small-search-icon' />{each.length >= 25 ? `${each.slice(0,25)}...` : each}</div>
                    </>))}
                </div>)}
            </div>
        </>
    );
};

export default SearchBar;

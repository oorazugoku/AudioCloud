import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSongs } from "../store/songs";

import './CSS/SearchBar.css'

const SearchBar = ({ searched, setSearched }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const fill = useSelector(state => Object.values(state.search));
    const [autoFill, setAutoFill] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = search.trim()
        if (trimmed.length > 0) {
            dispatch(getSongs(trimmed)).then(()=>history.push('/userNav'))
            setSearch('')
            setSearched(!searched)
        }
    }

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
                <form onSubmit={handleSubmit} autoComplete='on'>
                    <input
                    className="SearchBar-input"
                    value={search}
                    placeholder='Search'
                    onChange={(e)=>handleSearch(e)}
                    >
                    </input>
                    <i className="fas fa-magnifying-glass" onClick={handleSubmit}></i>
                </form>
                {!!autoFill.length > 0 && (<div className="auto-fill-container">
                    {autoFill.map(each => (<>
                        <div key={each} className='auto-fill-data' onClick={()=>handleSearchClick(each)}>{each}</div>
                    </>))}
                </div>)}
            </div>
        </>
    );
};

export default SearchBar;

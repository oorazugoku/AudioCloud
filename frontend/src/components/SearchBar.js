import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../store/songs";
import search from './images/search.svg'

import './CSS/SearchBar.css'

const SearchBar = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getSongs(search))
        setSearch('')
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <div className="SearchBar-container">
                <form onSubmit={handleSubmit}>
                    <input
                    className="SearchBar-input"
                    value={search}
                    placeholder='Search'
                    onChange={(e)=>handleSearch(e)}
                    >
                    </input>
                    <i class="fas fa-magnifying-glass" onClick={handleSubmit}></i>
                </form>
            </div>
        </>
    );
};

export default SearchBar;

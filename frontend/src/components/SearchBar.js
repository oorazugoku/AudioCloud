import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSongs } from "../store/songs";

import './CSS/SearchBar.css'

const SearchBar = ({ searched, setSearched }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = search.trim()
        if (trimmed.length > 0) {
            dispatch(getSongs(trimmed))
            setSearch('')
            setSearched(!searched)
        }
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
                    <i className="fas fa-magnifying-glass" onClick={handleSubmit}></i>
                </form>
            </div>
        </>
    );
};

export default SearchBar;

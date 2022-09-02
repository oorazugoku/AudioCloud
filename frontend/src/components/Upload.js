import React from "react";


const Upload = () => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label><input type="file" onChange={(e)=>setFile(e.target.value)} /></label>
                <button type="submit">Upload</button>
            </form>
        </>
    )
};

export default Upload;

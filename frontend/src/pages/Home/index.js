import React from 'react';
import { Link } from 'react-router-dom';


const Page = () => {
    return (
        <div>
            <h1> Smile Home</h1>
            <Link to="/about">  Smile sobre</Link>
        </div>
    );
}

export default Page
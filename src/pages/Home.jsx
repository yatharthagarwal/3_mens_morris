import React from 'react';

import { Link, Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <>
        <nav>
            <ul>
                <li>
                    <Link to='/manual'>Manual</Link>
                </li>
                <li>
                    <Link to='/board'>Board</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
        </>
    )
}

export default Home
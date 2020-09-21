import React from 'react';

import { Link } from "react-router-dom";

export const Home = () => {

    return (
        <div className='row'>
            
            <div className="col-12 mt-4">
                <h1>Issue Tracking</h1>
            </div>

            <div className="col-12">
                <ul>
                    <li>
                        <Link to='/issues/0'>
                            <h3>See Issues</h3>
                        </Link>            
                    </li>
                    <li>
                        <Link to='/add-issues'>
                            <h3>Add Issue</h3>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
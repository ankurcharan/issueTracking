import React, { useEffect, useReducer } from 'react';

import { Link } from "react-router-dom";
import axios from 'axios';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Icon } from '@material-ui/core';

const issueReducer = (state, action) => {

    switch(action.type) {
        case 'ISSUE_RECEIVED':
            return {
                ...state,
                title: action.payload.data.issue.title,
                body: action.payload.data.issue.body,
                isOpen: action.payload.data.issue.isopen,
                message: null
            }
        case 'NO_ISSUE_WITH_ID':
            return {
                ...state, 
                message: `No Issue With ID ${state.id}` 
            }
    }
}

export const Issue = (props) => {

    let pn = null;
    if(props.location.aboutProps) {
        pn = props.location.aboutProps.pageNumber;
    }

    const [state, dispatch] = useReducer(issueReducer, {
        title: '',
        body: '',
        isOpen: '',
        id: props.match.params.id,
        fromPage: pn || 0,
        message: null
    });

    const fetchIssueDetails = async () => {

        const res = await axios.get(`http://localhost:5000/issues/list-issues/${state.id}`);
        if(res.status === 200) {

            dispatch({
                type: 'ISSUE_RECEIVED',
                payload: res.data
            })
        } else if(res.status === 204) {
            dispatch({
                type: 'NO_ISSUE_WITH_ID'
            })
        }
    }

    useEffect(() => {
     
        fetchIssueDetails();
    }, []);

    return (
        <div className='row'>


            <div className="col-2 mt-3">
                <Link to={`/issues/${state.fromPage}`}>
                    <Icon>
                        <ArrowBack />
                    </Icon> Go Back
                </Link>
            </div>

            <div className="col-10 mt-3">
                <h1>Issue ID: {state.id}</h1>
            </div>

            {
                (state.message) ?
                (
                    <div className="col-12">
                        <h5>{state.message}</h5>
                    </div>
                ) : (
                    <>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">
                                    {state.title}
                                </h5>
                                <p class="card-text">
                                    {state.body}
                                </p>
                                {
                                    (state.isOpen) ?
                                    (
                                        <span class="badge badge-pill badge-success issueTag">Open</span>
                                    ) : (
                                        <span class="badge badge-pill badge-dark issueTag">Closed</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    </>
                )
            }

            
        </div>
    )
}
import React, { useReducer } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import ArrowBack from '@material-ui/icons/ArrowBack';

import { addIssueReducer } from "../../reducers";

export const AddIssue = () => {

    const [state, dispatch] = useReducer(addIssueReducer, {
        title: '',
        body: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            issueTitle: state.title.trim(),
            issueDesc: state.body.trim()
        }

        if(data.issueTitle.length === 0 || data.issueDesc.length === 0) {
            alert('Enter Issue');
            return;
        }

        console.log(data);

        const res = await axios.post('http://localhost:5000/issues/add-issue', JSON.stringify(data), {
            'headers': {
              'content-type': 'application/json',
            },
        });

        if(res.status === 201) {

            dispatch({
                type: 'RESET'
            });

            alert('Issues Added');
        }
    }


    const handleChange = (e) => {
        e.preventDefault();

        console.log(e.target.name)
        if(e.target.name === 'title') {
            dispatch({
                type: 'TITLE_CHANGED',
                payload: e.target.value
            })
        } else if(e.target.name === 'body') {
            dispatch({
                type: 'BODY_CHANGED',
                payload: e.target.value
            })
        }
    }

    return (
        <div className="row">

            <div className="col-2 mt-3">
                <Link to={`/`}>
                    <Icon>
                        <ArrowBack />
                    </Icon> Go Back
                </Link>
            </div>

            <div className="col-10 mt-3">
                <h1>Add Issue</h1>
            </div>

            <div className="col-12">

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Issue Title</span>
                    </div>
                    <input 
                        type="text" 
                        class="form-control" 
                        aria-label="Issue Title" 
                        aria-describedby="inputGroup-sizing-sm" 
                        value={state.title}
                        name='title'
                        onChange={handleChange}
                    />
                </div>

                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Issues <br /> Description</span>
                    </div>
                    <textarea 
                        class="form-control" 
                        aria-label="Issues Description"
                        rows='10'
                        value={state.body} 
                        name='body'
                        onChange={handleChange}    
                    />
                </div>
            </div>

            <div className="col-12 mt-3">
                <button 
                    type="button" 
                    class="btn btn-dark"
                    onClick={handleSubmit}
                >
                    Submit</button>
            </div>
        </div>
    )
}
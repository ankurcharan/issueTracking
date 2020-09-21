import React, { useReducer, useEffect } from 'react';

import axios from 'axios';
import { Link, Redirect } from "react-router-dom";


import Icon from '@material-ui/core/Icon';
import ArrowBack from '@material-ui/icons/ArrowBack';



const issuesReducer = (state, action) => {

    switch(action.type) {
        case 'ISSUES_RECEIVED':
            return {
                ...state, 
                totalIssues: action.payload.issuesTotal,
                issues: action.payload.issues
            }
    }
} 

export const Issues = (props) => {

    console.log('props', props);

    const [state, dispatch] = useReducer(issuesReducer, {
        
        pageNumber: props.match.params.id,
        totalIssues: 0,
        issues: []
    
    });

    const fetchIssues = async () => {
        
        const pageNumber = state.pageNumber;
        const res = await axios.get(`http://localhost:5000/issues/list-issues?page=${pageNumber}`);

        if(res.status === 200) {

            console.log(res.data.data);
            dispatch({
                type: 'ISSUES_RECEIVED',
                payload: res.data.data
            })
        } else {
            alert('Error. Try Again')
        }
    }

    useEffect(() => {
        fetchIssues();
    }, []);

    return (
        <div className='row'>
            {
                (state.issues.length == 0) ?
                (
                    <Redirect to='/issues/0' />
                ) : (

                    <>
						<div className='row'>
							<div className="col-2 mt-3">
								<Link to={`/`}>
									<Icon>
										<ArrowBack />
									</Icon> Go Back
								</Link>
							</div>
							<div className="col-10">
								<h1 className='mt-4'>Issues</h1>
							</div>
						
							<div className="row">
								{
									state.issues.map((issue, idx) => {
										const pathToIssue = `/issue/${issue.id}`;

										return <div className="col-12">
											<Link to={{
													pathname: pathToIssue,
													aboutProps: {
														fromPage: state.pageNumber
													}
												}} key={issue.id}>
													<div class="card">
														<div class="card-body m-0 p-3">
															<h6 className='m-0'>{issue.title}</h6>
															<span>{issue.body}</span>

															{
																(issue.isopen) ? 
																(
																	<span class="badge badge-success issueTag">Open</span>
																) : (
																	<span class="badge badge-dark issueTag">Closed</span>
																)
															}
														</div>
													</div>
											</Link>
										</div>
									})
								}

							</div>
						</div>

                    </>
                )
            }
        </div>
    )
}


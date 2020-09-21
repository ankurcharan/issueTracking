import React, { useReducer, useEffect, useState } from 'react';

import axios from 'axios';
import { Link, Redirect } from "react-router-dom";


import Icon from '@material-ui/core/Icon';
import ArrowBack from '@material-ui/icons/ArrowBack';

import Pagination from "react-bootstrap/Pagination";

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import { issuesReducer } from "../../reducers";

export const Issues = (props) => {

    console.log('props', props);

    const [state, dispatch] = useReducer(issuesReducer, {
        
        pageNumber: props.match.params.id,
        totalIssues: 0,
		issues: [],
		loading: false,
		issueLoaded: false
	});

	const [pageCrumbs, setPageCrumbs] = useState([]);

	useEffect(() => {

		let crumbs = [];
		for(let i = 0 ; i < (state.totalIssues / 10) ; i++) {
			crumbs.push(i)
		}
		setPageCrumbs(crumbs);
	}, [state.totalIssues])
	
    const fetchIssues = async (type) => {
		
		dispatch({
			type: 'REQUESTING_ISSUES'
		})

		let url = null;
		if(!type) {
			url = `http://localhost:5000/issues/list-issues?page=${state.pageNumber}`;
		} else {
			url = `http://localhost:5000/issues/list-issues?page=${state.pageNumber}&type=${type}`;
		}
		
        const res = await axios.get(url);

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

	const filterHandle = (e) => {
		e.preventDefault();

		console.log(e.target.name);
		fetchIssues(e.target.name);
	}

    return (
        <div className='row'>
            {
                (state.issueLoaded === true && state.issues.length === 0) ?
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

							<div className="col-12">
								<nav aria-label="Page navigation example">
									<ul class="pagination">
										{
											(state.totalIssues !== 0) ? (

												pageCrumbs.map((crumb) => {
	
													return <li class={`page-item`}>
															<a class="page-link" href={`/issues/${crumb}`}>{crumb}</a>
														</li>
												
												})
											) : (
												null
											)
										}
									</ul>
								</nav>
							</div>

							<div className="col-12 mb-3">
								<DropdownButton id="dropdown-basic-button" title="Dropdown button">
									<Dropdown.Item href="#!" onClick={filterHandle} name='all'>Show All</Dropdown.Item>
									<Dropdown.Item href="#!" onClick={filterHandle} name='open'>Show Open</Dropdown.Item>
									<Dropdown.Item href="#!" onClick={filterHandle} name='closed'>Show Closed</Dropdown.Item>
								</DropdownButton>
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


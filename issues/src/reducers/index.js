export const issuesReducer = (state, action) => {

    switch(action.type) {
        case 'ISSUES_RECEIVED':
            return {
                ...state, 
                totalIssues: action.payload.issuesTotal,
				issues: action.payload.issues,
				loading: false,
				issueLoaded: true
			}
		case 'REQUESTING_ISSUES':
			return {
				...state,
				loading: true,
				issueLoaded: false
			}
		default: return state
    }
} 


export const addIssueReducer = (state, action) => {
    switch(action.type) {
        case 'TITLE_CHANGED':
            return {
                ...state,
                title: action.payload
            }
        case 'BODY_CHANGED':
            return {
                ...state,
                body: action.payload
            }
        case 'RESET':
            return {
                ...state,
                title: '',
                body: ''
            }
        default: return state;
    }
}

export const issueReducer = (state, action) => {

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
        default: return state;
    }
}
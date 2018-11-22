import {FETCH_USER} from '../actions/types'

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false
        default:
            return state
    }
}

// Auth reducer returns three states:
// null - request pending (we really don't know exists user or not now)
// false - not exists
// object - user exists (contains existing user id)
import { SET_LOADING } from 'actions/types'

export const startLoader = store => next => action => {
	if (action.type !== SET_LOADING) {
		store.dispatch({
			type: SET_LOADING,
			payload: { loading: true }
		})
	}
	return next(action)
}


export const endLoader = store => next => action => {
	if (action.type !== SET_LOADING) {
		store.dispatch({
			type: SET_LOADING,
			payload: { loading: false }
		})
	}
	return next(action)
}
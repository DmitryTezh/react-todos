/**
 * Created by DIMOS on 23.02.2017.
 */
import 'isomorphic-fetch';

function fetchMiddleware({getState, dispatch}) {
    return next => action => {
        const {types, fetchUrl, shouldFetch = () => true, payload = {}} = action;
        if (!types) {
            return next(action);
        }

        if (!Array.isArray(types)
            || types.length !== 3
            || !types.every(type => typeof type === 'string')) {
            throw new Error('Invalid fetchMiddleware usage: "types" expected to be an array of three string types.');
        }
        if (typeof fetchUrl !== 'string') {
            throw new Error('Invalid fetchMiddleware usage: "fetchUrl" expected to be a string.');
        }
        if (typeof shouldFetch !== 'function') {
            throw new Error('Invalid fetchMiddleware usage: "shouldFetch" expected to be a function.');
        }
        if (!shouldFetch(getState)) {
            return;
        }

        const [requestType, successType, failureType] = types;
        dispatch({...payload, type: requestType});

        return fetch(fetchUrl).then(
            response => response.json(),
            error => {
                dispatch({...payload, error, type: failureType});
                console.log(error);
            }
        ).then(
            json => {
                if (json) {
                    dispatch({...payload, data: json, type: successType});
                }
            }
        )
    }
}

export default fetchMiddleware;
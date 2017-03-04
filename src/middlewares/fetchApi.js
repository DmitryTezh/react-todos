/**
 * Created by DIMOS on 23.02.2017.
 */
import 'isomorphic-fetch';
import forEach from 'lodash/forEach';

function fetchApi({getState, dispatch}) {
    return next => action => {
        const {types, fetchUrl, method = 'get', shouldFetch = () => true, payload = {}} = action;
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
        if (!shouldFetch(getState())) {
            return;
        }

        const [requestType, successType, failureType] = types;
        dispatch({type: requestType, ...payload});

        if (method === 'get') {
            return fetch(fetchUrl).then(
                response => response.json().then(data => dispatch({type: successType, data})),
                error => dispatch({type: failureType, error})
            )
        }
        else {
            const form = new FormData();
            forEach(payload, (value, key) => form.append(key, value));
            return fetch(fetchUrl, {
                method,
                body: form
            }).then(
                response => response.json().then(data => dispatch({type: successType, data})),
                error => dispatch({type: failureType, error})
            )
        }
    }
}

export default fetchApi;
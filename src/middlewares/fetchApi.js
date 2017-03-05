/**
 * Created by DIMOS on 23.02.2017.
 */
import 'isomorphic-fetch';
import forEach from 'lodash/forEach';
import * as actionTypes from '../constants/actionTypes';

function fetchApi({getState, dispatch}) {
    return next => action => {
        const {fetchType, fetchUrl, fetchMethod = 'get', shouldFetch = () => true, payload = {}} = action;
        if (!fetchType) {
            return next(action);
        }

        if (typeof fetchType !== 'string') {
            throw new Error('Invalid fetchMiddleware usage: "fetchType" expected to be a string.');
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

        dispatch({type: actionTypes.toRequestType(fetchType), ...payload});

        if (fetchMethod === 'get') {
            return fetch(fetchUrl).then(
                response => response.json().then(data => dispatch({type: actionTypes.toSuccessType(fetchType), data, ...payload})),
                error => dispatch({type: actionTypes.toFailureType(fetchType), error, ...payload})
            )
        }
        else if (fetchMethod === 'delete') {
            return fetch(fetchUrl, {
                method: fetchMethod
            }).then(
                response => dispatch({type: actionTypes.toSuccessType(fetchType), ...payload}),
                error => dispatch({type: actionTypes.toFailureType(fetchType), error, ...payload})
            )
        }
        else {
            const formData = new FormData();
            forEach(payload, (value, key) => formData.append(key, value));
            return fetch(fetchUrl, {
                method: fetchMethod,
                body: formData //JSON.stringify(payload)
            }).then(
                response => response.json().then(data => dispatch({type: actionTypes.toSuccessType(fetchType), data, ...payload})),
                error => dispatch({type: actionTypes.toFailureType(fetchType), error, ...payload})
            )
        }
    }
}

export default fetchApi;
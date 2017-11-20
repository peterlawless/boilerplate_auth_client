import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';
const ROOT_URL = 'http://localhost:3090';

// we make use of redux-thunk inside our action creator
// So instead of returning only pure objects with a 'type' property, another
// valid return from an action creator is a function that accepts the 'dispatch'
// method as its first argument, allowing us direct access to the 'dispatch'
export function signInUser({ email, password }) {
  // inside this function, we can make any kind of asynchronous request
  // and at some point in the future, we can call 'dispatch' with an action
  // of our choosing, and dispatch as many actions as we like
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password})
      .then( response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        // localStorage is domain-specific, and available to the 'window' scope
        localStorage.setItem('token', response.data.token);
        // - Redirect to route '/feature'
        browserHistory.push('/feature');
      })
      .catch( () => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad login info'));
      })
  }
}

export function signUpUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password})
      .then( response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch( response => {
        dispatch(authError(response.response.data.error));
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  // when the user signs out, we also want to remove the token so
  // that no more authenticated requests can be made without signing in again
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    // second argument of an axios request is like an options object
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      })
  }
}

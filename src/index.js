import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { getSessionToken } from '../src/utils/Authentication';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import './index.scss';
import Reducers from './reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { API_URL } from './constants';
import { redirectToLogin } from '../src/utils/Authentication';

const authLink = setContext(( _, { headers } ) => {
    // get the authentication token from local storage if it exists
    const token = getSessionToken();
    return token ? {
        headers: {
            ...headers,
            authorization: `${token}`,
        }
    } : { headers };
});

const invalidSessionLink = onError(({ graphQLErrors }) => {
    if(graphQLErrors.length > 0 && graphQLErrors.find(({ errorCode }) => errorCode === 401)) {
       
        setTimeout(_ => {
            redirectToLogin();
        }, 1000);
    }
});

const httpLink = createHttpLink({
    uri: API_URL
});

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
    },
};

const client = new ApolloClient({
    link: authLink.concat(invalidSessionLink).concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions
});

const reducers = combineReducers({
    form: reduxFormReducer,
    ...Reducers
});
const store = createStore(reducers);

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
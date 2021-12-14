import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApiServiceProvider } from './context';
import ApiRequests from './service/api/ApiRequests';

ReactDOM.render(
    <ApiServiceProvider value={ApiRequests}>
        <App />
    </ApiServiceProvider>,
    document.getElementById('root'),
);

import React from 'react';
import ReactDOM from 'react-dom';

// COMPONENTS //
import Dashboard from './components/Dashboard'

const App = () => {
    return (
        <div>
            <Dashboard />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
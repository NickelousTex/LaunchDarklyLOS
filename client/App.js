import React from 'react';
import ReactDOM from 'react-dom';

// COMPONENTS //
import Dashboard from './components/Dashboard';

const render = () => {
    ReactDOM.render(
        <div>
            <Dashboard />
        </div>,
        document.getElementById('root')
    );
};

render();

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept('./components/Dashboard', () => {
        console.log('HMR: Reloading Dashboard component...');
        render(); // Force re-render when Dashboard is updated
    });
}

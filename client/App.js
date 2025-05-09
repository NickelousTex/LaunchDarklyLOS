import React from 'react';
import ReactDOM from 'react-dom';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

// COMPONENTS //
import Dashboard from './components/Dashboard';
const init = async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.REACT_APP_LAUNCHDARKLY_CLIENT_SIDE_ID,
    context: {
        kind: 'admin',
        key: 'test_user',
        name: 'Jon Doe',
        email: 'JonDoe@gmail.com',
    },
    options: {
      streaming: true,
    },
  });

  const render = () => {
    ReactDOM.render(
      <LDProvider>
        <div>
          <Dashboard />
        </div>
      </LDProvider>,
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
};

init();

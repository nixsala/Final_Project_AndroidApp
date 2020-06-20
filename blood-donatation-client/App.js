import React from 'react';

import RouteNavigator from './src/routes/routes';

import {setNavigator} from './src/routes/navigationRef';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as AccidentProvider} from './src/context/AccidentContext';
console.disableYellowBox = true;
const App: () => React$Node = () => {
  return (
      <>
          <AuthProvider>
              <AccidentProvider>
                  <RouteNavigator
                      ref={(navigator) => {
                          setNavigator(navigator);
                      }}
                  />
              </AccidentProvider>
          </AuthProvider>
      </>
  );
};

export default App;

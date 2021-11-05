import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/Navigation';
import {PermissionsProvider} from './src/conext/PermissionsContext';

// Aquí guardamos todos los context
const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;

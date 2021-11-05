import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MapScreen} from '../screens/MapScreen';
import {PermissionsScreen} from '../screens/PermissionsScreen';
import {permissionsContext} from '../conext/PermissionsContext';
import {LoadingScreen} from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const {permissions} = useContext(permissionsContext);
  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }
  return (
    <Stack.Navigator
      // initialRouteName={
      //   permissions.locationStatus === 'granted'
      //     ? 'MapScreen'
      //     : 'PermissionsScreen'
      // }
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="MapScreen" component={MapScreen} />
      ) : (
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
};

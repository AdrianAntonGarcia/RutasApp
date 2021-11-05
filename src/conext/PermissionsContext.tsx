import React from 'react';
import {createContext, useState} from 'react';
import {PERMISSIONS, PermissionStatus, request} from 'react-native-permissions';
import {Platform} from 'react-native';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionsInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const permissionsContext = createContext<PermissionsContextProps>(
  {} as PermissionsContextProps,
);

export const PermissionsProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [permissions, setpermissions] = useState(permissionsInitState);
  const checkLocationPermission = () => {};
  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      // permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      // permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    setpermissions({...permissions, locationStatus: permissionStatus});
  };
  return (
    <permissionsContext.Provider
      value={{permissions, askLocationPermission, checkLocationPermission}}>
      {children}
    </permissionsContext.Provider>
  );
};

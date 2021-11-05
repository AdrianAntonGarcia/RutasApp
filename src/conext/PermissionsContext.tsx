import React from 'react';
import {createContext, useState} from 'react';
import {PermissionStatus} from 'react-native-permissions';

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
  const askLocationPermission = () => {};
  const checkLocationPermission = () => {};
  return (
    <permissionsContext.Provider
      value={{permissions, askLocationPermission, checkLocationPermission}}>
      {children}
    </permissionsContext.Provider>
  );
};

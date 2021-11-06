import Geolocation from '@react-native-community/geolocation';
import {useEffect, useRef, useState} from 'react';
import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [routeLines, setRouteLines] = useState<Location[]>([]);
  const [initialPosition, setInitialPosition] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });
  const watchId = useRef<number>();
  const isMounted = useRef<boolean>(true);
  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => {
          reject({err});
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );
    });
  };

  const followUserLocation = () => {
    if (!isMounted.current) return;
    watchId.current = Geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => {
        console.log(latitude, longitude);
        setUserLocation({latitude, longitude});
        setRouteLines(routes => [...routes, {latitude, longitude}]);
      },
      err => console.log(err),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  const stopFollowUserLocation = () => {
    watchId.current && Geolocation.clearWatch(watchId.current);
  };

  useEffect(() => {
    if (!isMounted.current) return;
    getCurrentLocation().then(location => {
      if (!isMounted.current) return;
      setInitialPosition(location);
      setUserLocation(location);
      setRouteLines(routes => [...routes, location]);
      setHasLocation(true);
    });
    return () => {
      isMounted.current = false;
    };
  }, []);
  return {
    hasLocation,
    initialPosition,
    userLocation,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    routeLines,
  };
};

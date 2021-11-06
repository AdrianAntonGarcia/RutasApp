import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    longitud: 0,
    latitude: 0,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setInitialPosition({
          latitude: coords.latitude,
          longitud: coords.longitude,
        });
        setHasLocation(true);
      },
      err => {
        console.log({err});
        setHasLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }, []);
  return {hasLocation, initialPosition};
};

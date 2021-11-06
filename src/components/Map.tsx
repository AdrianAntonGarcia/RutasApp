import React, {useRef, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {Fab} from './Fab';
interface Props {
  markers?: Marker[];
}
export const Map = ({markers}: Props) => {
  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
  } = useLocation();

  const mapViewRef = useRef<MapView>();

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  };

  useEffect(() => {
    followUserLocation();
    return () => {};
  }, []);

  useEffect(() => {
    mapViewRef.current?.animateCamera({
      center: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
    });
    return () => {};
  }, [userLocation]);

  if (!hasLocation) {
    return <LoadingScreen />;
  }
  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          key={0}
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="Marcador, titulo"
          description="Descripción"
        /> */}
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={() => centerPosition()}
        style={{position: 'absolute', bottom: 20, right: 20}}
      />
    </>
  );
};

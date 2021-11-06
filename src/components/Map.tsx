import React, {useRef, useEffect} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
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
    stopFollowUserLocation,
    userLocation,
    routeLines,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);
  const isMounted = useRef<boolean>(true);

  const centerPosition = async () => {
    following.current = true;
    const {latitude, longitude} = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  };

  useEffect(() => {
    if (!isMounted.current) return;
    followUserLocation();
    return () => {
      stopFollowUserLocation();
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isMounted.current) return;
    if (!following.current) return;
    mapViewRef.current?.animateCamera({
      center: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
    });
    return () => {
      isMounted.current = false;
    };
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
        }}
        onTouchStart={() => (following.current = false)}>
        <Polyline
          coordinates={routeLines}
          strokeColor="black"
          strokeWidth={3}
        />
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

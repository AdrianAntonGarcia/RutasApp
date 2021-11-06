import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {Fab} from './Fab';
interface Props {
  markers?: Marker[];
}
export const Map = ({markers}: Props) => {
  const {hasLocation, initialPosition} = useLocation();

  if (!hasLocation) {
    return <LoadingScreen />;
  }
  return (
    <>
      <MapView
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitud,
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
        iconName="star-outline"
        onPress={() => console.log('Hola fab')}
        style={{position: 'absolute', bottom: 20, right: 20}}
      />
    </>
  );
};

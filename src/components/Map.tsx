import React from 'react';
import MapView, {Marker} from 'react-native-maps';

interface Props {
  markers?: Marker[];
}
export const Map = ({markers}: Props) => {
  return (
    <>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
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
    </>
  );
};

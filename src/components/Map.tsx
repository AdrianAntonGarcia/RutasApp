import React, {useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
interface Props {
  markers?: Marker[];
}
export const Map = ({markers}: Props) => {
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => console.log(info),
      err => console.log({err}),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }, []);
  return (
    <>
      <MapView
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
          latitude: 39.4964,
          longitude: -0.373057,
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

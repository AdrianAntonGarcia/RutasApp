import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="black" size={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

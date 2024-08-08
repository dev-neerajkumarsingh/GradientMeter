/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, StatusBar} from 'react-native';
import {Meter} from './src/Meter';

function App(): React.JSX.Element {
 
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
      />
      <Meter needleRotationVal={90} />
    </View>
  );
}

export default App;

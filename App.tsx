/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import CustomButton from '@coin98-components-kit';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { DatabaseProvider } from '@nozbe/watermelondb/react'
import { database } from './configuration';
// import PostsList from './screens/Post';
import WatermelonDBReader from './screens/Post/WatermelonDBReader';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <DatabaseProvider database={database}>
      <View style={styles.container}>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        {/* <CustomButton
          style={styles.buttonCustom}
          title="Click me"
          // backgroundColorHex="#00ff6aff"
          onPress={(event) => {
            console.log(event.nativeEvent.message); // "pressed"
          }} /> */}
          {/* <PostsList /> */}
          <WatermelonDBReader />
      </View>
    </DatabaseProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: 'white',
  },
  buttonCustom: {
    width: 200,
    height: 50,
    color: 'black',
    backgroundColor: 'blue',
  },
});

export default App;

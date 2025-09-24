/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import CustomButton from '@coin98/custom-button-component';
import CustomButtonContainer from '@coin98/custom-button-fabric';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { DatabaseProvider } from '@nozbe/watermelondb/react'
import { database } from './configuration';
// import PostsList from './screens/Post';
import WatermelonDBReader from './screens/Post/WatermelonDBReader';
import VariableModuleDemo from './components/VariableModuleDemo';
// import IconSystemDemo from './components/IconSystemDemo';
import IconSystemDemoSimple from './components/IconSystemDemoSimple';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <DatabaseProvider database={database}>
      <View style={styles.container}>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        <CustomButton
          style={styles.buttonCustom}
          title="Click me"
          onPress={() => {
            console.log("hehehehehe"); // "pressed"
          }} />
        
        <CustomButtonContainer
          style={styles.containerFabric}
          buttonTitle1="First Action"
          buttonTitle2="Second Action"
          buttonColor1="#007AFF"
          buttonColor2="#FF3B30"
          onButtonPress={(buttonIndex, message) => {
            console.log(`Fabric Button ${buttonIndex}: ${message}`);
          }}
        />
        
          {/* <PostsList /> */}
          {/* <WatermelonDBReader /> */}
          {/* <VariableModuleDemo /> */}
          {/* <IconSystemDemo /> */}
          {/* <IconSystemDemoSimple /> */}
      </View>
    </DatabaseProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  buttonCustom: {
    width: 200,
    height: 50,
    color: 'black',
    backgroundColor: 'black',
  },
  containerFabric: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});

export default App;

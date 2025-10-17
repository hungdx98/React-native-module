// import CustomButton from '@coin98/custom-button-component';
import { DatabaseProvider } from '@nozbe/watermelondb/react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ActivityIndicator, Button, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { database } from './configuration';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useRef, useState } from 'react';
// import PostsList from './screens/Post';
// import WatermelonDBReader from './screens/Post/WatermelonDBReader';
// import VariableModuleDemo from './components/VariableModuleDemo';
// import IconSystemDemoSimple from './components/IconSystemDemoSimple';
// import LottieAnimationDemo from './components/LottieAnimationDemo';

export interface GoogleV2AuthData {
  idToken: string
}
export interface GoogleV3Data extends GoogleV2AuthData {
  customToken: string
  sessionId: string
  isRegistered: boolean
  version: string
  address: string
}

export interface GoogleAuthResponse<T = GoogleV3Data | GoogleV2AuthData> {
  data: {
    success: boolean
    data: T
  }
  success: boolean
  status: number
  time: number
}

GoogleSignin.configure({
  webClientId: '897776340259-fqksgtjpo49c4em216lt6tm837klar2l.apps.googleusercontent.com', // prod
  iosClientId: '897776340259-6ue8r26p5nfsacm9re5n7baods5fnure.apps.googleusercontent.com', // prod
  // webClientId: '114789873055-e2sktrogsg2k12rj9lhhvfhpg796ebsf.apps.googleusercontent.com', // dev
  // iosClientId: '114789873055-08otqsmtjr7culm30du0q9cud7qdb81q.apps.googleusercontent.com', // dev
  offlineAccess: true,
});

function App() {
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wallet, setWallet] = useState<any>(null);
  // const isDarkMode = useColorScheme() === 'dark';
  const browserRef = useRef<WebView>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      // const authProvider = firebase.auth();
      const isSignedIn = GoogleSignin.hasPreviousSignIn();
      if (isSignedIn && Platform.OS === "android") {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const res = await GoogleSignin.signIn();
      const { idToken, user } = res
      console.log('User Info:', user);
      console.log('ID Token:', idToken);

      // Get the user's ID token
      // const { idToken } = userInfo;
      if (idToken) {
        setIdToken(idToken);
        postMessage({ idToken });
        // Create a Google credential with the token
        // const googleCredential = credential(idToken);

        // // Sign in with the credential
        // const userCredential = await signInWithCredential(auth, googleCredential);
        // console.log('Firebase User Credential:', userCredential);
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setIsLoading(false);
    }
  };

  const postMessage = (payload: any) => {
    const js = `
    window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(payload)} }));
    true;
  `;
    browserRef.current?.injectJavaScript(js);
  };

  const onBrowserMessage = async (_e: WebViewMessageEvent): Promise<void | boolean> => {
    if (!_e.nativeEvent.data) return false;
    console.log('onBrowserMessage', _e.nativeEvent.data);
    const data = JSON.parse(_e.nativeEvent.data);
    if (!data.address) return false;
    setWallet(data);
    setIsLoading(false);
    // return postMessage('onMessage', { idToken });
    // return postMessage(data.id, result);
  };

  return (
    <DatabaseProvider database={database}>
      <View style={styles.container}>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        {/* <CustomButton
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
        /> */}

        {/* <LottieAnimationDemo /> */}

        {/* <PostsList /> */}
        {/* <WatermelonDBReader /> */}
        {/* <VariableModuleDemo /> */}
        {/* <IconSystemDemo /> */}
        {/* <IconSystemDemoSimple /> */}
        {
          !!wallet ? <View style={{ marginTop: 20, height: 400, width: '100%' }}>
            <Text>Wallet Address: {wallet?.address}</Text>
            <Text>Wallet Name: {wallet?.name}</Text>
          </View> : <TouchableOpacity style={styles.googleSignInButton} onPress={handleGoogleSignIn} disabled={isLoading}>
            {
              isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.googleSignInButtonText}>Sign in with Google</Text>
            }
          </TouchableOpacity>
        }
        {
          isLoading && !wallet && <View style={{ marginTop: 20, height: 400, width: '100%' }}>
            <WebView
              source={{ uri: 'http://10.40.0.43:3000' }}
              ref={browserRef}
              onMessage={onBrowserMessage}
              webviewDebuggingEnabled={true}
            />
          </View>
        }
      </View>
    </DatabaseProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  buttonCustom: {
    width: 200,
    height: 50,
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontSize: 16,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  containerFabric: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  googleSignInButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  googleSignInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;

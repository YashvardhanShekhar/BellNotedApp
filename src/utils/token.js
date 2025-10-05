import { Alert } from 'react-native';
import { getApp, initializeApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  onTokenRefresh,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCYLV2RvcNTzcAlEdbarLvvq99NNxJKF9s',
  authDomain: 'bellnoted.firebaseapp.com',
  projectId: 'bellnoted',
  storageBucket: 'bellnoted.firebasestorage.app',
  messagingSenderId: '602877810737',
  appId: '1:602877810737:web:0dc2de690f1e7ede5b9d10',
  measurementId: 'G-QWD3Q378CY',
};

let app;
try {
  app = getApp();
} catch (e) {
  app = initializeApp(firebaseConfig);
}

export const generateToken = async () => {
  const messaging = getMessaging(app);

  const authStatus = await requestPermission(messaging);
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }

  const token = await getToken(messaging);
  console.log('FCM Token:', token);
  return token;

  // // Token refresh
  // const unsubscribeTokenRefresh = onTokenRefresh(messaging, token => {
  //   console.log('FCM Token refreshed:', token);
  // });

  // // Foreground message handler
  // const unsubscribeOnMessage = onMessage(messaging, async remoteMessage => {
  //   console.log('FCM Message in foreground:', remoteMessage);
  //   Alert.alert(
  //     remoteMessage.notification?.title || 'Notification',
  //     remoteMessage.notification?.body || 'You got a new message!',
  //   );
  // });

  // return () => {
  //   unsubscribeTokenRefresh();
  //   unsubscribeOnMessage();
  // };
};

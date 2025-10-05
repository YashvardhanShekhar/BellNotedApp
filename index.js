/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { changeIcon, getIcon, resetIcon } from 'react-native-change-icon';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Handle background + quit notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  try {
    const absentPeriodsStr = remoteMessage.data?.absentPeriods;
    const absentPeriods = absentPeriodsStr ? JSON.parse(absentPeriodsStr) : [];

    await AsyncStorage.setItem('absentPeriods', JSON.stringify(absentPeriods));

    // await changeIcon(String(absentPeriods.length));

  } catch (err) {
    console.error('Background FCM error:', err);
  }
});

AppRegistry.registerComponent(appName, () => App);

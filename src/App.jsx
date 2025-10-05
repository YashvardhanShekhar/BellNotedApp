import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegistrationPage from './Screens/registraion';
import ScheduleScreen from './Screens/showAttendence';
import { changeIcon } from 'react-native-change-icon';

const url = 'https://bellnotedbackend.onrender.com';

export default function App() {
  const [id, setId] = useState(null);
  const [report, setReport] = useState([]);
  
  useEffect(() => {
    
    fetch('https://bellnotedbackend.onrender.com');
    // Load initial data
    (async () => {
      try {
        const savedId = await AsyncStorage.getItem('id');
        setId(savedId != null ? JSON.parse(savedId) : null);

        if( id) fetch(url + '/check/' + id);

        const savedReport = await AsyncStorage.getItem('absentPeriods');
        setReport(savedReport != null ? JSON.parse(savedReport) : []);
      } catch (err) {
        console.error('Error loading from AsyncStorage:', err);
      }
    })();

    // FCM listener
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      try {
        const absentPeriodsStr = remoteMessage.data?.absentPeriods;
        const absentPeriods = absentPeriodsStr
          ? JSON.parse(absentPeriodsStr)
          : [];

        console.log('Foreground message, absent periods:', absentPeriods);

        await AsyncStorage.setItem(
          'absentPeriods',
          JSON.stringify(absentPeriods),
        );
        setReport(absentPeriods);

        // change the icon to number of absent periods
        // changeIcon(String(absentPeriods.length));

        Alert.alert('New Absent Periods', JSON.stringify(absentPeriods));
      } catch (err) {
        console.error('Foreground FCM error:', err);
      }
    });

    return unsubscribe; // clean up on unmount
  }, []);

  // Render
  if (id) {
    // id present → show schedule with report data
    return <ScheduleScreen data={report} />;
  } else {
    // no id yet → show registration page
    return <RegistrationPage />;
  }
}

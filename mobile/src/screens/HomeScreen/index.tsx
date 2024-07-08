import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {getMessage} from '../../api';

export default function HomeScreen() {
  const [message, setMessage] = useState();

  async function getGreetings() {
    const data = await getMessage();
    setMessage(data);
  }

  useEffect(() => {
    getGreetings();
  }, []);

  return (
    <SafeAreaView>
      <Text>{message}</Text>
    </SafeAreaView>
  );
}

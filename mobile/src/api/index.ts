import {Alert} from 'react-native';
import navigation from '../navigation';

export async function login(email: string, password: string) {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    Alert.alert('Error', 'An error occurred while logging in');
  }
}

export async function getMessage() {
  try {
    const response = await fetch('http://localhost:5001/generate-message');
    const data = await response.json();
    return data.message;
  } catch (error) {}
}

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {login} from '../../api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    const response = await login(email, password);
    if (response) {
      Alert.alert('Success', 'User logged in successfully');
      //@ts-ignore
      navigation.navigate('Home');
    } else {
      Alert.alert('An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>Log in</Text>

      <View
        style={[styles.inputContainer, isEmailFocused && styles.inputFocused]}>
        <Image
          source={require('../../assets/EmailIcon.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
      </View>

      <View
        style={[
          styles.inputContainer,
          isPasswordFocused && styles.inputFocused,
        ]}>
        <Image
          source={require('../../assets/LockIcon.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        <Image
          source={require('../../assets/EyeIcon.png')}
          width={24}
          height={24}
          style={styles.icon}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.or}>Or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../../assets/Google.png')}
            style={styles.socialLogo}
          />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../../assets/Facebook.png')}
            style={styles.socialLogo}
          />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.register}>Have no account yet?</Text>
      </View>
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 47,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#3949AB',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  inputFocused: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: '#5769D4',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    borderColor: '#5769D4',
    borderWidth: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    color: '#333',
  },
  forgotPassword: {
    color: '#3949AB',
    width: '100%',
    textAlign: 'right',
    marginBottom: 16,
    marginLeft: 170,
  },
  loginButton: {
    backgroundColor: '#3949AB',
    borderRadius: 30,
    padding: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E6E9FA',
  },
  or: {
    marginHorizontal: 8,
    color: '#aaa',
  },
  socialLoginContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  socialButton: {
    height: 40,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderColor: '#3949AB',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 35,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  socialText: {
    color: '#3949AB',
    fontWeight: '600',
    fontSize: 14,
  },
  socialLogo: {
    width: 24,
    height: 24,
  },
  register: {
    color: '#7B7B7B',
    fontWeight: '600',
    fontSize: 14,
    marginVertical: 16,
  },
  registerButton: {
    borderColor: '#3949AB',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    width: '100%',
  },
  registerText: {
    textAlign: 'center',
    color: '#3949AB',
    fontSize: 14,
  },
});

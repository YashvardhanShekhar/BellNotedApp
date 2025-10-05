// RegistrationPage.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { generateToken } from '../utils/token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeIcon, getIcon, resetIcon } from 'react-native-change-icon';
import { BackHandler } from 'react-native';

const { height } = Dimensions.get('window');

const url = 'https://bellnotedbackend.onrender.com';

export default function RegistrationPage() {
  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    
    setErrorMessage('');
    if (!collegeId.trim() || !password.trim()) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    try {
      const token = await generateToken();
      console.log('token : ' + token);
      const res = await fetch(url + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: collegeId.trim(),
          password: password,
          fcmToken: token,
        }),
      });

      const response = await res.json();
      console.log(res);

      if (response?.success) {
        await AsyncStorage.setItem('id', JSON.stringify(collegeId.trim()));
        alert("you credentials has been verified. \n exiting the app in one second")
        fetch(url + '/check/' + collegeId.trim());
        setTimeout(() => {
          BackHandler.exitApp();
        }, 1500); 

      } else {
        setErrorMessage(response?.error);
      }
    } catch (e) {
      console.error(e);
      setErrorMessage("something went wrong try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (errorMessage) setErrorMessage('');
    if (field === 'collegeId') setCollegeId(value);
    if (field === 'password') setPassword(value);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24} // tune if header present
    >
      <StatusBar backgroundColor="#f8f9ff" barStyle="dark-content" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#f8f9ff', '#e8f0fe', '#f0f4ff']}
        style={styles.backgroundGradient}
        pointerEvents="none"
      />

      {/* Floating Background Elements */}
      <View style={[styles.floatingElement, styles.element1]}>
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.elementGradient}
          pointerEvents="none"
        />
      </View>
      <View style={[styles.floatingElement, styles.element2]}>
        <LinearGradient
          colors={['#8b5cf6', '#06b6d4']}
          style={styles.elementGradient}
          pointerEvents="none"
        />
      </View>
      <View style={[styles.floatingElement, styles.element3]}>
        <LinearGradient
          colors={['#06b6d4', '#10b981']}
          style={styles.elementGradient}
          pointerEvents="none"
        />
      </View>

      {/* Scrollable content to cooperate with keyboard */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Create your account to continue</Text>
        </View>

        {/* Card */}
        <View style={styles.glassCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.1)']}
            style={styles.glassBackground}
            pointerEvents="none"
          />

          {/* College ID */}
          <View style={styles.inputContainer}>
            <View
              collapsable={false}
              style={[
                styles.inputWrapper,
                focusedField === 'collegeId' && styles.inputWrapperFocused,
              ]}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.4)']}
                style={styles.inputGradient}
                pointerEvents="none"
              />
              <Ionicons
                name="school-outline"
                size={20}
                color={focusedField === 'collegeId' ? '#6366f1' : '#9ca3af'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="College ID"
                placeholderTextColor="#9ca3af"
                value={collegeId}
                onChangeText={v => handleInputChange('collegeId', v)}
                onFocus={() => setFocusedField('collegeId')}
                onBlur={() => setFocusedField(null)}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <View
              collapsable={false}
              style={[
                styles.inputWrapper,
                focusedField === 'password' && styles.inputWrapperFocused,
              ]}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.4)']}
                style={styles.inputGradient}
                pointerEvents="none"
              />
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={focusedField === 'password' ? '#6366f1' : '#9ca3af'}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={v => handleInputChange('password', v)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleRegister}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#6366f1"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Error */}
          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={18} color="#dc2626" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Button */}
          <TouchableOpacity
            style={[
              styles.registerButton,
              isLoading && styles.registerButtonDisabled,
            ]}
            onPress={handleRegister}
            activeOpacity={0.85}
            disabled={isLoading}
          >
            <LinearGradient
              colors={
                isLoading ? ['#9ca3af', '#6b7280'] : ['#6366f1', '#8b5cf6']
              }
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              pointerEvents="none"
            />
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="white" />
                <Text style={styles.registerButtonText}>
                  Verifying credentials
                </Text>
              </View>
            ) : (
              <Text style={styles.registerButtonText}>Verify Credentials</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  floatingElement: {
    position: 'absolute',
    borderRadius: 100,
    overflow: 'hidden',
  },
  elementGradient: { width: '100%', height: '100%', opacity: 0.1 },
  element1: { width: 200, height: 200, top: -50, right: -50 },
  element2: { width: 150, height: 150, bottom: 100, left: -30 },
  element3: { width: 100, height: 100, top: height * 0.4, right: 20 },

  scrollContainer: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  header: { alignItems: 'center', marginBottom: 40 },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 16, color: '#6b7280', textAlign: 'center' },

  // Flat card: no shadow/elevation “halo”
  glassCard: {
    position: 'relative',
    borderRadius: 24,
    padding: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    ...Platform.select({
      ios: {
        shadowColor: 'transparent',
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 0 },
      },
      android: { elevation: 0, shadowColor: 'transparent' },
    }),
  },
  glassBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    opacity: 0.8,
  },

  inputContainer: { marginBottom: 20 },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minHeight: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden', // prevents inner “glow”
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'transparent',
      },
      android: { elevation: 0 },
    }),
  },
  inputGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    zIndex: 0, // keep behind text, icon, and eye button
  },
  inputWrapperFocused: {
    borderColor: '#6366f1',
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 0 },
      },
      android: { elevation: 0 },
    }),
  },
  inputIcon: { marginRight: 12, zIndex: 1 },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
    paddingVertical: 16,
    zIndex: 1,
  },
  passwordInput: { paddingRight: 48 },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    paddingHorizontal: 8,
    minWidth: 36,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    ...Platform.select({
      android: { elevation: 2 }, // reinforce stacking on Android
      ios: {},
    }),
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239,68,68,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(239,68,68,0.35)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 0 },
      },
      android: { elevation: 0 },
    }),
  },
  errorText: {
    color: '#dc2626',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },

  registerButton: {
    position: 'relative',
    borderRadius: 16,
    marginTop: 12,
    overflow: 'hidden',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'transparent',
      },
      android: { elevation: 0, shadowColor: 'transparent' },
    }),
  },
  registerButtonDisabled: { opacity: 0.9 },
  loadingContainer: { flexDirection: 'row', alignItems: 'center' },
  registerButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginLeft: 8,
    textAlign: 'center',
  },
});

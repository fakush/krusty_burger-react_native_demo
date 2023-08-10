import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Actions/userActions';
import { isValidEmail, isAtLeastSixCharacters } from '../Utils/authValidations';
import { useSignInMutation } from '../Services/authService';
import { colors } from '../Global/colors';
import IconButton from '../Components/Common/Buttons/IconButton'
import { texts } from '../Global/texts';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('')
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('')

  const dispatch = useDispatch()
  const [triggerSignIn, resultSignIn] = useSignInMutation();

  const onSubmit = () => {
    const isValidVariableEmail = isValidEmail(email)
    const isCorrectPassword = isAtLeastSixCharacters(password)
    
    if (isValidVariableEmail && isCorrectPassword) {
      triggerSignIn({
        email,
        password,
        returnSecureToken: true,
      });
    }

    if (!isValidVariableEmail) setErrorEmail('Email is not correct')
    else setErrorEmail('')
    if (!isCorrectPassword) setErrorPassword('Password must be at least 6 characters')
    else setErrorPassword('')
  };

  useEffect(() => {
    if (resultSignIn.isSuccess) {
      dispatch(setUser({
        email: resultSignIn.data.email,
        idToken: resultSignIn.data.idToken,
        localId: resultSignIn.data.localId,
        profileImage: "",
        location: {
          latitude: "",
          longitude: "",
        }
      }))
    }
  }, [resultSignIn])

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../Assets/Icons/krusty-splash-alt_500.png')} />
      <Text style={[texts.subtitle, styles.text]}>Login to continue</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        error={errorEmail}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        value={password}
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        onChangeText={(password) => setPassword(password)}
        error={errorPassword}
      />
      <View style={styles.button}>
        <IconButton icon='login' text='Login' onPress={onSubmit} />
      </View>
      <View style={styles.register}>
        <Text>Don't have an account?</Text>
        <IconButton icon='account-plus' text='Register' onPress={() => navigation.navigate("Signup")} />
      </View>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.primary,
  },
  image: {
    marginTop: 20,
    aspectRatio: 1,
    marginBottom: 20,
    height: 200,
    resizeMode: "contain",
  },
  input: {
    width: "80%",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
  register: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
    gap: 10,
  },
})
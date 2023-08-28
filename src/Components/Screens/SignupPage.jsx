import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/Slices/userSlice';
import { isValidEmail, isAtLeastSixCharacters } from '../../Utils/authValidations';
import { colors } from '../../Utils/Global/colors';
import IconButton from '../Common/Buttons/IconButton'
import { texts } from '../../Utils/Global/texts';
import { useSignUpMutation } from '../../Services/authService';

const SignupPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('')
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const ref_password = useRef()
  const ref_passwordMatch = useRef()

  const [triggerSignUp, result] = useSignUpMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
          profileImage: "",
          location: {
            latitude: "",
            longitude: "",
          },
        })
      )
    }
  }, [result])

  const validateEmail = () => {
    const isValidVariableEmail = isValidEmail(email)
    if (!isValidVariableEmail && email !== "") setErrorEmail('Email format error')
    else setErrorEmail('')
    return isValidVariableEmail
  }

  const validatePassword = () => {
    const isCorrectPassword = isAtLeastSixCharacters(password)
    if (!isCorrectPassword && password !== "") setErrorPassword('Password must be at least 6 characters')
    else setErrorPassword('')
    return isCorrectPassword
  }

  const validatePasswordMatch = () => {
    const isRepeatedPasswordCorrect = password === confirmPassword
    if (!isRepeatedPasswordCorrect && confirmPassword !== "") setErrorConfirmPassword("Passwords don't match")
    else setErrorConfirmPassword('')
    return isRepeatedPasswordCorrect
  }


  const onSubmit = () => {
    try {
      if (validateEmail() && validatePassword() && validatePasswordMatch()) {
        const request = {
          email,
          password,
          returnSecureToken: true
        }
        triggerSignUp(request)
      } else {
        if (email === "") setErrorEmail('Email is required')
        if (password === "") setErrorPassword('Password is required')
        if (confirmPassword === "") setErrorConfirmPassword('Password confirmation is required')
      }
    } catch (err) {
      console.log('🟥 Catch error');
      console.log('🟥 signup error: ', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../Assets/Icons/krusty-splash-alt_500.png')} />
        <Text style={[texts.subtitle, styles.text]}>SignUp</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          onSubmitEditing={() => { ref_password.current.focus() }}
          onBlur={validateEmail}
          error={errorEmail}
        />
        {errorEmail && <Text style={styles.error}>{errorEmail}</Text>}
        <TextInput
          ref={ref_password}
          style={styles.input}
          mode="outlined"
          label="Password"
          value={password}
          secureTextEntry={!showPassword}
          right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
          onChangeText={(password) => setPassword(password)}
          onSubmitEditing={() => { ref_passwordMatch.current.focus() }}
          onBlur={validatePassword}
          error={errorPassword}
        />
        {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
        <TextInput
          ref={ref_passwordMatch}
          style={styles.input}
          mode="outlined"
          label="Repeat Password"
          value={confirmPassword}
          secureTextEntry={!showPassword}
          // right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
          onSubmitEditing={onSubmit}
          onBlur={validatePasswordMatch}
          onChangeText={(password) => setConfirmPassword(password)}
          error={errorConfirmPassword}
        />
        {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
        <View style={styles.button}>
          <IconButton icon='login' text='Register' onPress={onSubmit} />
        </View>
        <View style={styles.register}>
          <Text>Already have an account?</Text>
          <IconButton icon='account-plus' text='Login' onPress={() => navigation.navigate("Login")} />
        </View>
      </View>
    </ScrollView>
  )
}

export default SignupPage

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
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
    marginTop: 60,
    marginBottom: 36,
    gap: 10,
  },
  error: {
    color: '#c11f44',
    alignSelf: 'flex-start',
    paddingLeft: '10%',
  }
})
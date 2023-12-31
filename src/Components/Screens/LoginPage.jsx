import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import { TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/Slices/userSlice';
import { isValidEmail, isAtLeastSixCharacters } from '../../Utils/authValidations';
import { useSignInMutation } from '../../Services/authService';
import { colors } from '../../Utils/Global/colors';
import IconButton from '../Common/Buttons/IconButton'
import { texts } from '../../Utils/Global/texts';
import localPersistence from '../../Services/localPersistenceService';
import { Snackbar } from 'react-native-paper';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('')
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState('')
  const [visible, setVisible] = useState(false);
  
  const dispatch = useDispatch()
  const [triggerSignIn, resultSignIn] = useSignInMutation();

  const ref_password = useRef()

  const validateEmail = () => {
    const isValidVariableEmail = isValidEmail(email)
    if (!isValidVariableEmail && email !== "") setErrorEmail('Email format error')
    else setErrorEmail('')
  }

  const validatePassword = () => {
    const isCorrectPassword = isAtLeastSixCharacters(password)
    if (!isCorrectPassword && password !== "") setErrorPassword('Password must be at least 6 characters')
    else setErrorPassword('')
  }

  const onSubmit = async () => {
    const isValidVariableEmail = isValidEmail(email)
    const isCorrectPassword = isAtLeastSixCharacters(password)

    if (isValidVariableEmail && isCorrectPassword) {
      await triggerSignIn({ email, password, returnSecureToken: true, });
    }

    validateEmail()
    validatePassword()
  };

  const onDismissSnackBar = () => {
    setVisible(false)
  };

  useEffect(() => {
    if (resultSignIn.isSuccess) {
      const signedUser = {
        fullName: "",
        email: resultSignIn.data.email,
        idToken: resultSignIn.data.idToken,
        localId: resultSignIn.data.localId,
        profileImage: "",
        location: {
          latitude: "",
          longitude: "",
        }
      }
      dispatch(setUser(signedUser))
      localPersistence.saveJson('user', signedUser)
    } else if (resultSignIn.isError){
      setVisible(true)
    }
  }, [resultSignIn])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../Assets/Icons/krusty-burger-logo-alt_500.png')} />
        <Text style={[texts.subtitle, styles.text]}>Login to continue</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          onSubmitEditing={() => { ref_password.current.focus() }}
          onBlur={validateEmail}
          error={errorEmail}
          textColor='black'
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
          onSubmitEditing={onSubmit}
          onBlur={validatePassword}
          error={errorPassword}
          textColor='black'
        />
        {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
        <View style={styles.button}>
          <IconButton icon='login' text='Login' onPress={onSubmit} />
        </View>
        <View style={styles.register}>
          <Text>Don't have an account?</Text>
          <IconButton icon='account-plus' text='Register' onPress={() => navigation.navigate("Signup")} />
        </View>
        <Snackbar
          style={styles.snackbar}
          duration={1500}
          visible={visible}
          onDismiss={() => onDismissSnackBar()}
        >
          Invalid email or password, please try again.
        </Snackbar>
      </View>
    </ScrollView>
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
    backgroundColor: colors.secondary,
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
  },
  snackbar: {
    backgroundColor: colors.primary,
    fontWeight: 'bold'
  }
})
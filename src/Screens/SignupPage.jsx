import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Actions/userActions';
import { isValidEmail, isAtLeastSixCharacters } from '../Utils/authValidations';
import { colors } from '../Global/colors';
import IconButton from '../Components/Common/Buttons/IconButton'
import { texts } from '../Global/texts';
import { useSignUpMutation } from '../Services/authService';

const SignupPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

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

  const onSubmit = () => {
    try {
      const isValidVariableEmail = isValidEmail(email)
      const isCorrectPassword = isAtLeastSixCharacters(password)
      const isRepeatedPasswordCorrect = password === confirmPassword

      if (isValidVariableEmail && isCorrectPassword && isRepeatedPasswordCorrect) {
        const request = {
          email,
          password,
          returnSecureToken: true
        }
        triggerSignUp(request)
      }

      if (!isValidVariableEmail) setErrorMail('Email is not correct')
      else setErrorMail('')
      if (!isCorrectPassword) setErrorPassword('Password must be at least 6 characters')
      else setErrorPassword('')
      if (!isRepeatedPasswordCorrect) setErrorConfirmPassword('Passwords must match')
      else setErrorConfirmPassword('')

    } catch (err) {
      console.log("Catch error");
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[texts.subtitle, styles.text]}>SignUp</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        error={errorMail}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        onChangeText={(password) => setPassword(password)}
        error={errorPassword}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Repeat Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        onChangeText={(password) => setconfirmPassword(password)}
        error={errorConfirmPassword}
      />
      <View style={styles.button}>
        <IconButton icon='login' text='Register' onPress={onSubmit} />
      </View>
      <View style={styles.register}>
        <Text>Already have an account?</Text>
        <IconButton icon='account-plus' text='Login' onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  )
}

export default SignupPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  text: {
    color: colors.primary,
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    width: 220,
    height: 250,
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
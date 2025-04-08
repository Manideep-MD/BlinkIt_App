import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import {useDispatch} from 'react-redux';
import {SET_TOKEN} from '../../redux/reducers/tokenReducer';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types'; 
import {Formik} from 'formik';
import * as Yup from 'yup';
import {EMAIL_REGEX} from '../../constants/Regex';
import ErrorText from '../../components/ErrorText/ErrorText';
import Loader from '../../components/Loader/Loader';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Invalid email')
    .required('Email is required'),
  password: Yup.string().min(6, 'Too short').required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const {SignIn, loading} = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async (values: {email: string; password: string}) => {
    try {
      const response = await SignIn(values?.email, values?.password);
      if (response) {
        dispatch(SET_TOKEN(response?.user?._user?.uid));
        navigation.navigate('ProductList');
      }
    } catch (error:any) {
      console.log(error, 'error---->');
      if (error?.response) {
        console.log('Server Error:', error?.response?.data);
      } else if (error?.request) {
        console.error('Network Error: No response received', error?.request);
      } else {
        console.error('Unexpected Error:', error?.message);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../../assets/logos/blinkit-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back</Text>

        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                placeholderTextColor="#8e8e8e"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
              />
              <View style={styles.errorContainer}>
                {touched.email && errors.email && (
                  <ErrorText text={errors?.email} />
                )}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor="#8e8e8e"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
              />
              <View style={styles.errorContainer}>
                {touched.password && errors.password && (
                  <ErrorText text={errors?.password} />
                )}
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit as any}
                disabled={loading}>
                <Text style={styles.buttonText}>
                  {loading ? 'Logging in...' : 'Login'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>
            Don’t have an account? <Text style={styles.boldText}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  errorContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffcc00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  linkText: {
    fontSize: 16,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#ffcc00',
  },
});

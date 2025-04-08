import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {REMOVE_TOKEN} from '../redux/reducers/tokenReducer';
import {useDispatch} from 'react-redux';
import {persistor} from '../redux/store/store';
import {handleError} from '../Utils/errorHandler';

interface AuthContextProps {
  loading: boolean;
  logout: () => void;
  SignIn: (email: string, password: string) => Promise<any>;
  SignUp: (email: string, password: string) => Promise<any>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const SignIn = async (email: any, password: any) => {
    setLoading(true);
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);

      if (response) {
        console.log(response, 'ressssssssssssss');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'User registered successfully!',
          visibilityTime: 3000,
          position: 'top',
        });
        return response;
      }
    } catch (error) {
      console.error('Signup error:', error);
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error?.message || 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  const SignUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response) {
        console.log('User signed up:', response.user);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'User registered successfully!',
          visibilityTime: 3000,
          position: 'top',
        });
        return response;
      }
    } catch (error) {
      console.error('Signup error:', error);
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error?.message || 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // const unsubscribe = auth().onAuthStateChanged(currentUser => {
    //   setUser(currentUser);
    //   setLoading(false);
    // });
    // return unsubscribe;
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await auth().signOut();

      dispatch(REMOVE_TOKEN());

      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'You have been logged out successfully.',
      });
    } catch (err) {
      const errorMessage = handleError(err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{SignIn, loading, logout, SignUp}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

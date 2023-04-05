import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView as ScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import Row from '../../components/atoms/row';
import PrimaryButton from '../../components/buttons/button-primary';
import AppHeader from '../../components/header/app-header';
import PrimaryInput from '../../components/input/primary-input';
import PrimaryModal from '../../components/modals/primary-modal';
import Regular from '../../presentation/typography/regular-text';
import alertService from '../../services/alert.service';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import {ACTIONS} from '../../store/actions';
import {URLS} from '../../store/api-urls';
import styles from './profile.styles';
// create a component
const Profile = props => {
  const {user_info, headers, setUser} = props;
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [isLogout, setLogout] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [showCalender, setShowCalender] = useState(false);
  const [payload, setPayload] = React.useState({
    email: user_info?.email,
    username: '',
    first_name: user_info?.first_name,
    last_name: user_info?.last_name,
    password: '',
    confirm_password: '',
    contact_number: user_info?.contact_number,
    address: '',
    id: user_info?.id,
  });

  const validate = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  };

  const onLogoutClick = async () => {
    setLogout(true);
    setDescription('Are you sure you want to logout account?');
    setShowCalender(true);
  };
  const onDeleteClick = async () => {
    setLogout(false);
    setDescription('Are you sure you want to delete your account?');
    setShowCalender(true);
  };
  const onLogout = async () => {
    await AsyncStorage.clear();
    props?.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Signin'}],
      }),
    );
  };
  const onUpdate = async () => {
    if (payload.first_name.length < 1) {
      alertService.show('Please Enter First Name', 'Update Account');
      return;
    }
    if (!validate(payload.email)) {
      alertService.show('Please Enter Valid Email', 'Update Account');
      return;
    }
    if (payload.email.length < 1) {
      alertService.show('Please Enter Email', 'Update Account');
      return;
    }
    if (payload.contact_number.length < 1) {
      alertService.show('Please Enter Phone Number', 'Update Account');
      return;
    }
    if (payload.password != payload.confirm_password) {
      alertService.show('Confirm Password Not Matched', 'Update Account');
      return;
    }
    if (headers['access-token']) {
      setLoading(true);
      var config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${URLS.base_url}${URLS.auth.update}`,
        headers: {
          uid: headers['uid'],
          client: headers['client'],
          'access-token': headers['access-token'],
        },
      };

      axios(config)
        .then(function (response) {
          setLoading(false);
          setUser(payload);
          AsyncStorage.setItem('@user', JSON.stringify(payload));
          alertService.show('Updated Sucessfully!', 'Profile');
        })
        .catch(function (error) {
          setLoading(false);
          alertService.show('Something went Wrong', 'Error');
          console.log(error);
        });
    }
  };
  const onDelete = async () => {
    if (headers['access-token']) {
      setLoading(true);
      var config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${URLS.base_url}${URLS.auth.delete}`,
        headers: {
          uid: headers['uid'],
          client: headers['client'],
          'access-token': headers['access-token'],
        },
      };

      axios(config)
        .then(function (response) {
          setLoading(false);
          onLogout();
        })
        .catch(function (error) {
          setLoading(false);
          alertService.show('Something went Wrong', 'Error');
          console.log(error);
        });
    }
  };
  return (
    <View style={{...styles.container}}>
      <AppHeader title="Edit Profile" />
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={{color: colors.primary}}
        color={colors.primary}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <PrimaryInput
            label={'First Name'}
            value={payload.first_name}
            placeHolder="First Name"
            leftIcon="User"
            bWidth={1}
            onChange={val => setPayload({...payload, first_name: val})}
          />
          <PrimaryInput
            label={'Last Name'}
            value={payload.last_name}
            placeHolder="Last Name"
            leftIcon="User"
            bWidth={1}
            onChange={val => setPayload({...payload, last_name: val})}
          />
          <PrimaryInput
            label={'Email'}
            value={payload.email}
            placeHolder="Email Address"
            leftIcon="BEmail"
            bWidth={1}
            onChange={val => setPayload({...payload, email: val})}
          />

          <PrimaryInput
            label={'Phone'}
            value={payload.contact_number}
            placeHolder="Phone Number"
            leftIcon="Phone"
            readonly={false}
            onChange={val => setPayload({...payload, contact_number: val})}
            inputType={'phone-pad'}
          />

          <PrimaryInput
            label={'Password'}
            value={payload.password}
            placeHolder="Password"
            leftIcon="Lock"
            rightIcon="Eye"
            isPassword={hidePassword}
            onRightIconClick={() => setHidePassword(!hidePassword)}
            onChange={val => setPayload({...payload, password: val})}
          />

          <PrimaryInput
            label={'Confirm Password'}
            value={payload.confirm_password}
            placeHolder="Confirm Password"
            leftIcon="Lock"
            rightIcon="Eye"
            isPassword={hideConfirmPassword}
            onRightIconClick={() =>
              setHideConfirmPassword(!hideConfirmPassword)
            }
            onChange={val => setPayload({...payload, confirm_password: val})}
          />

          <PrimaryButton
            title="Save Changes"
            style={{marginTop: mvs(40)}}
            onClick={() => onUpdate()}
          />
          <Row
            alignItems="center"
            style={{marginVertical: mvs(15), justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => onLogoutClick()}>
              <Regular label={'Log out'} size={14} color={colors.lightgrey1} />
            </TouchableOpacity>
            <Regular label={' or '} size={14} color={colors.lightgrey1} />
            <TouchableOpacity onPress={() => onDeleteClick()}>
              <Regular
                label={'Delete Your Account'}
                size={14}
                color={colors.lightgrey1}
              />
            </TouchableOpacity>
          </Row>
        </View>
      </ScrollView>
      <PrimaryModal
        visible={showCalender}
        logout={isLogout}
        description={description}
        onCancel={() => setShowCalender(false)}
        onDelete={() => {
          setShowCalender(false);
          onDelete();
        }}
        onLogout={() => {
          setShowCalender(false);
          onLogout();
        }}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  headers: store.state.headers,
});

const mapDispatchToProps = {
  setUser: info => ACTIONS.setUserInfo(info),
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import DualText from '../../components/atoms/dual-text/dual-text';
import Row from '../../components/atoms/row';
import PrimaryButton from '../../components/buttons/button-primary';
import AppHeader from '../../components/header/app-header';
import PrimaryInput from '../../components/input/primary-input';
import DatePickerModal from '../../components/modals/date-picker-modal';
import PrimaryModal from '../../components/modals/primary-modal';
import Regular from '../../presentation/typography/regular-text';
import alertService from '../../services/alert.service';
import colors from '../../services/colors';
import SERVICES from '../../services/common-services';
import {mvs} from '../../services/metrices';
import {ACTIONS} from '../../store/actions';
import {CommonActions} from '@react-navigation/native';
import styles from './profile.styles';
import Spinner from 'react-native-loading-spinner-overlay';
import DIVIY_API from '../../store/api-calls';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
const Profile = props => {
  const {user_info, update} = props;
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
  });
  const pickImage = async side => {
    const image = await SERVICES._returnImageGallery();
    if (image == undefined) {
      return;
    }
    if (side == 'front') {
      setPayload({...payload, FrontSideIdCard: image});
    } else if (side == 'back') {
      setPayload({...payload, BackSideIdCard: image});
    } else if (side == 'profile') {
      setPayload({...payload, ProfilePicture: image});
    }
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
    setLoading(true);
    var res = await update(payload);
    setLoading(false);
    if (res?.data) {
      alertService.show('Account Updated Successfully!', 'Sign up');
    } else if (res?.response?.data?.errors) {
      alertService.show(res?.response?.data?.errors[0] + '', 'Update Account');
    }
  };
  const validate = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  };
  const validate_password = password => {
    const reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    return reg.test(password);
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
});

const mapDispatchToProps = {
  update: info => DIVIY_API.update(info),
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

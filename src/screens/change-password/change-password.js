import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { mvs } from '../../services/metrices';
import { Logo } from '../../assets/svgs';
import DIVIY_API from '../../store/api-calls';
import styles from './change-password.styles';
import colors from '../../services/colors';
import PrimaryInput from '../../components/input/primary-input';
import PrimaryButton from '../../components/buttons/button-primary';
import AppHeader from '../../components/header/app-header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alertService from '../../services/alert.service';
import Spinner from 'react-native-loading-spinner-overlay';
// create a component
const ChangePassword = props => {
  const{route,reset_password,user_info,new_password}=props;
  const navigation = useNavigation();
  const [loading,setLoading]=useState(false)
  const [showExisting,setShowExisting]=useState(true)
  const [showPassword,setShowPassword]=useState(true)
  const [showConfirmPassword,setShowConfirmPassword]=useState(true)
  const [payload, setPayload] = React.useState({
    Email:route.params.new? user_info?.email:route.params?.email,
    Password: '',
    OldPassword:'',
    ConfirmPassword:''
  });

  const changePassword=async()=>{
    if(payload.Password!=payload.ConfirmPassword){
      alertService.show("Confirm Password Not Matched","Password")
    }
    console.log(payload);
    var response={};
    setLoading(true)
    if(route.params.new){
      try {
        response = await reset_password(payload);
      } catch (error) {
        console.log(error)
      }
    }else{
      try {
        response = await new_password(payload);
      } catch (error) {
        console.log(error)
      }
    }
    setLoading(false)
    if(response?.data?.succeeded==true){
      await  AsyncStorage.clear()
      navigation.navigate("Signin")
    }
    
  }

  return (
    <View style={{ ...styles.container}}>
      <AppHeader title='CHANGE PASSWORD'/>
      <Spinner
          visible={loading}
          textContent={'Please Wait...'}
          textStyle={{color:colors.primary}}
          color={colors.primary}
        />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
            <Logo style={{marginTop:mvs(45),alignSelf: 'center',}}/>
            <View style={{paddingTop:mvs(25)}}>
              {route.params.new &&
              (
                <PrimaryInput placeHolder='Existing Password' value={payload.OldPassword} bWidth={1}
                leftIcon='Lock' rightIcon='Eye' isPassword={showExisting}
                onChange={(val)=>setPayload({...payload,OldPassword:val})}
                onRightIconClick={()=>setShowExisting(!showExisting)}/>
              )
              }
               <PrimaryInput placeHolder='New Password' bWidth={1}
               leftIcon='Lock' rightIcon='Eye' value={payload.Password} isPassword={showPassword}
               onChange={(val)=>setPayload({...payload,Password:val})}
               onRightIconClick={()=>setShowPassword(!showPassword)}/>

               <PrimaryInput placeHolder='Confirm Password' value={payload.ConfirmPassword}
                leftIcon='Lock' rightIcon='Eye'
                isPassword={showConfirmPassword}
                onChange={(val)=>setPayload({...payload,ConfirmPassword:val})}
                onRightIconClick={()=>setShowConfirmPassword(!showConfirmPassword)}/>

               <PrimaryButton  title='CONTINUE' style={{marginTop:mvs(40)}} 
                onClick={()=>changePassword()}/>
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
   user_info: store.state.user_info
});

const mapDispatchToProps = {
  reset_password: payload =>DIVIY_API.reset_password(payload),
  new_password: payload =>DIVIY_API.new_password(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

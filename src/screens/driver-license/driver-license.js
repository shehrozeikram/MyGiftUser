import { useNavigation } from '@react-navigation/native';
import React,{ useState} from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { mvs } from '../../services/metrices';
import { Logo } from '../../assets/svgs';
import styles from './style';
import colors from '../../services/colors';
import PrimaryInput from '../../components/input/primary-input';
import PrimaryButton from '../../components/buttons/button-primary';
import DualText from '../../components/atoms/dual-text/dual-text';
import AppHeader from '../../components/header/app-header';
import ImageInput from '../../components/input/image-input';
import { ACTIONS } from '../../store/actions';
import DatePickerModal from '../../components/modals/date-picker-modal';
import SERVICES from '../../services/common-services';
import alertService from '../../services/alert.service';
// create a component
const DriverLicense =props => {
  const{setLicense}=props;
  const navigation = useNavigation();
  const[showCalender,setShowCalender]=useState(false)
  const [payload, setPayload] = React.useState({
    ExpiryDate: '',
    DriverId : '',
    License:'',
    FrontSidePicture :null,
    BackSidePicture :null,
    IsVerify:false,
  });
  const pickImage = async (side) => {
    const image = await  SERVICES._returnImageGallery();
     if(image==undefined){
       return;
    }
    if(side=="front"){
      setPayload({...payload, FrontSidePicture : image})
    }else if(side=="back"){
      setPayload({...payload, BackSidePicture : image})
    }
 }
  const saveLicense=async()=>{
    if(payload?.License?.length<1){
      alertService.show("Please Enter Driving License","Driving License");
      return;
    }
    if(payload?.ExpiryDate?.length<1){
      alertService.show("Please Select Expiry Date Of Driving License","Driving License");
      return;
    }
    if(payload?.FrontSidePicture==null){
      alertService.show("Please Upload Front Side image of Your Driving License","Driving License");
      return;
    }
    if(payload?.BackSidePicture==null){
      alertService.show("Please Upload Back Side image of Your Driving License","Driving License");
      return;
    }
    
     setLicense(payload)
     navigation.navigate("VehcileRegistration")
   
 }
  
  return (
    <View style={{ ...styles.container }}>
      <AppHeader title='Driver License'/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
             <Logo style={{alignSelf:'center'}}/>
            <View style={{paddingTop:mvs(25)}}>
               <PrimaryInput  value={payload?.License} placeHolder='Driving License' leftIcon='Licsense' bWidth={1}
               onChange={(val)=>setPayload({...payload, License: val})}/>
               <PrimaryInput  value={payload.ExpiryDate} placeHolder='Expire Date' 
               readonly={false} leftIcon='CalendarBlack' rightIcon='Calendar' onRightIconClick={()=>setShowCalender(true)}/>
               
               <ImageInput placeHolder='Upload Front Side Driving License'
                 image={payload?.FrontSidePicture}
                onPick={()=>pickImage('front')}/>
               
               <ImageInput placeHolder='Upload Back Side Driving License' 
                image={payload?.BackSidePicture}
                onPick={()=>pickImage('back')}/>
               
               <PrimaryButton  title={'NEXT'}
                style={{marginTop:mvs(40)}} 
                onClick={()=>saveLicense()}/>

             <TouchableOpacity   onPress={()=>navigation.navigate("Signin")}
                style={{alignSelf:'center',marginTop:mvs(28)}}>
                <DualText content="Have an account? " 
                    style={{fontSize:mvs(16),color:colors.black}}
                    highlightText={'LOGIN'}/>
              </TouchableOpacity>
        </View>
            
        </View>

      </ScrollView>
      <DatePickerModal visible={showCalender} onSelect={(date)=>{
            setShowCalender(false);
            setPayload({...payload, ExpiryDate: date})
        }}/>
       
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  selected_license:store.state.selected_license
});

const mapDispatchToProps = {
  setLicense: (payload) => ACTIONS.setLicense(payload)
};
export default connect(mapStateToProps, mapDispatchToProps)(DriverLicense);

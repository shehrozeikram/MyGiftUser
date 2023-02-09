//import liraries
import React, { useEffect, useState } from 'react';
import {View, TouchableOpacity, StatusBar,SafeAreaView, Image} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styles from './track-delivery.styles';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';  
import MapViewDirections from 'react-native-maps-directions';
import colors from '../../services/colors';
import { Menu, LocationMarker, RiderMarker ,LocationPath} from '../../assets/svgs';
import LinearGradient from 'react-native-linear-gradient';
import IconButton from '../../components/buttons/icon-button';
import Row from '../../components/atoms/row';
import PrimaryButton from '../../components/buttons/button-primary';
import customStyle from './map-style';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import { mvs } from '../../services/metrices';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import PrimaryModal from '../../components/modals/primary-modal';
import { MapKey, URLS } from '../../store/api-urls';
import ToggleSwitch from 'toggle-switch-react-native'
import Bold from '../../presentation/typography/bold-text';
import { DrawerActions } from '@react-navigation/native';
import DIVIY_API from '../../store/api-calls';
import CONSTANTDATA from '../../store/my-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { Shop } from '../../assets/images';
// create a component
const TrackDelivery = props => {
  const{pending_parcel,get_pending_parcel,current_location,user_info,accept_request,change_parcel_status,update_payment_status}=props;
  const ref = React.useRef(null);
  const navigation = useNavigation();
  const [successModal,setSuccessModal]=useState(false)
  const[isSwtichOn,setSwitchOn]=useState(false)
  const[intervalId,setIntervalId]=useState(null)
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    //changeStatus()
    get_pending_parcel_Data(false);
  },[])
 
  const get_pending_parcel_Data=async(OnOff)=>{
    setSwitchOn(OnOff)
    if(OnOff==true && !pending_parcel?.id){
      const id = setInterval(()=>{
        if(!pending_parcel?.id){
          get_pending_parcel()
        }
      },5000);
      console.log("Interval started with Id "+id)
      setIntervalId(id);
    }else if(intervalId!=null){
      clearInterval(intervalId);
      console.log("Interval is Cleared")
    }
  }
  const acceptRequest=async()=>{
    if(pending_parcel?.id){
      setLoading(true)
      await accept_request({RiderId:user_info?.id,Id:pending_parcel?.id})
      setLoading(false)
    }
  }
  const changeStatus=async(parcelStatus)=>{
    if(pending_parcel?.id){
      setLoading(true)
      await change_parcel_status({Status:parcelStatus,Id:pending_parcel?.id})
      setLoading(false)
      if(pending_parcel?.status==CONSTANTDATA.parcel_statuses.Delivered){
        setSuccessModal(true)
      }
    }
  }
  const confirmPayment=async()=>{
    var payload={
      id:pending_parcel?.id,
      isPaid:true
    };
    setLoading(true)
    const res=await update_payment_status(payload);
    setLoading(false)
    console.log(res?.data)
    if(res?.data?.succeeded==true){
      navigation.replace("DrawerNavigator")
    }
  }
  console.log(pending_parcel)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <Spinner
          visible={loading}
          textContent={'Please Wait...'}
          textStyle={{color:colors.primary}}
          color={colors.primary}
        />
      <View style={{flex:1}}>
      <MapView  
          customMapStyle={customStyle}
          style={styles.mapStyle}  
          showsUserLocation={false}  
          zoomEnabled={true}  
          userInterfaceStyle={'dark'}
          zoomControlEnabled={true}
          ref={ref}
          provider={PROVIDER_GOOGLE}
          initialRegion={{  
            latitude: current_location?.latitude,   
            longitude: current_location?.longitude,  
            latitudeDelta: 0.0922,  
            longitudeDelta: 0.0421,  
          }}>  
         {pending_parcel?.id && ( <>
           <MapViewDirections
             origin={{latitude: current_location?.latitude, longitude: current_location?.longitude}}
             destination={{latitude:pending_parcel?.pickupLati,longitude:pending_parcel?.pickupLongi}}
             apikey={MapKey}
             strokeWidth={3}
             strokeColor={colors.mappath}
             optimizeWaypoints={true}
             onStart={(params) => {
              //console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              ref?.current.fitToCoordinates(result.coordinates, {
               
              });
            }}
            onError={(errorMessage) => {
               console.log('GOT AN ERROR',errorMessage);
            }}
           />
           <MapViewDirections
             origin={{latitude:pending_parcel?.pickupLati,longitude:pending_parcel?.pickupLongi}}
             destination={{latitude:pending_parcel?.dropOffLati,longitude:pending_parcel?.dropOffLongi}}
             apikey={MapKey}
             strokeWidth={3}
             strokeColor={colors.mappath}
             optimizeWaypoints={true}
             onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              ref?.current.fitToCoordinates(result.coordinates, {
               
              });
            }}
            onError={(errorMessage) => {
               console.log('GOT AN ERROR');
            }}
           />
            <Marker  coordinate={{latitude:pending_parcel?.pickupLati,longitude:pending_parcel?.pickupLongi}}>
               <LocationMarker/>
           </Marker>
           <Marker  coordinate={{latitude:pending_parcel?.dropOffLati,longitude:pending_parcel?.dropOffLongi}}>
               <LocationMarker/>
           </Marker>
           </>)}
           <Marker coordinate={{latitude: current_location?.latitude, longitude: current_location?.longitude}}>
              <RiderMarker/>
           </Marker>
        
          
       </MapView> 
        <View style={styles.body}>
           <Row style={{alignItems:'center',marginHorizontal:mvs(18)}}>
                <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                   <Menu/>
                </TouchableOpacity>
                  
                   <Bold label={'HOME'} size={20} color={colors.black}/>
                   <ToggleSwitch
                      isOn={isSwtichOn}
                      onColor="green"
                      offColor="red"
                      size='small'
                      onToggle={isOn =>get_pending_parcel_Data(isOn)}
                    />
              </Row>              
            <View style={{flex:1,justifyContent:'flex-end'}}> 
              <LinearGradient
                 start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
                 colors={[`${colors.white}20`,colors.white]}
                 borderRadius
                 style={styles.bottomView}>
                 {
                  pending_parcel?.status==CONSTANTDATA.parcel_statuses.Pending?
                  <PrimaryButton title={"Accept"} onClick={()=>acceptRequest()}/>
                  :pending_parcel?.status==CONSTANTDATA.parcel_statuses.Accepted?
                  <PrimaryButton title={"Accepted.. Have You Arrived?"} onClick={()=>changeStatus(CONSTANTDATA.parcel_statuses.Arrived)}/>
                  :pending_parcel?.status==CONSTANTDATA.parcel_statuses.Arrived?
                  <PrimaryButton title={"Arrived.. Pick up"} onClick={()=>changeStatus(CONSTANTDATA.parcel_statuses.PickedUp)}/>
                  :pending_parcel?.status==CONSTANTDATA.parcel_statuses.PickedUp?
                  <PrimaryButton title={"Picked Up.. Are you on Way?"} onClick={()=>changeStatus(CONSTANTDATA.parcel_statuses.OnWay)}/>
                  :pending_parcel?.status==CONSTANTDATA.parcel_statuses.OnWay?
                  <PrimaryButton title={"On the way..Have you Reached?"} onClick={()=>changeStatus(CONSTANTDATA.parcel_statuses.Delivered)}/>
                  :pending_parcel?.status==CONSTANTDATA.parcel_statuses.Delivered?
                  <PrimaryButton title={"Reached..Deliver Now"} onClick={()=>changeStatus(CONSTANTDATA.parcel_statuses.Delivered)}/>
                  :
                  <PrimaryButton title={"Please Wait...."}/>
                 } 
                
                </LinearGradient>
            </View>
        </View>
      </View>

           {pending_parcel?.id &&
             ( <LinearGradient
                start={{ x: 0, y: 0.99 }} end={{ x: 0, y: 1 }}
                colors={[`${colors.black}99`,colors.black]}
                borderRadius
                style={styles.parcel}>
              {pending_parcel?.orderId>0
               && (<TouchableOpacity>
                     <Image source={Shop} style={styles.shopImage}/>
                </TouchableOpacity>)}
                <Row style={{alignItems:'center'}}>
                  <ImagePlaceholder uri={{uri:`${URLS.image_url}${pending_parcel?.customer?.image}`}} containerStyle={styles.imageStyle}/>
                  <Medium label={pending_parcel?.customer?.name} size={15} color={colors.white} style={{flex:1,marginLeft:mvs(5)}}/>
                  {pending_parcel?.status!=CONSTANTDATA.parcel_statuses.Pending
                    &&(<Row style={{alignItems:'center'}}> 
                     <IconButton  icon='ChatSmall' style={styles.button} f={0} onClick={()=>navigation.navigate("Chat",{user:pending_parcel?.customer})}/>
                     <IconButton  icon='PhoneSmall' style={styles.button} f={0} onClick={()=>navigation.navigate("CallScreen")}/>
                  </Row>)}
                </Row> 
                <Row style={{flex:1, marginTop:mvs(14)}}>
                   <LocationPath/>
                    <View style={styles.locationView}>
                        <Regular label={pending_parcel?.pickup} numberOfLines={1} size={14} color={colors.white}/>
                        <Regular label={pending_parcel?.dropOff} numberOfLines={1} size={14} color={colors.white}/>
                    </View>
              </Row>
              <Row style={{ marginTop:mvs(14)}}>
                <Regular label={'Fare ₵'+pending_parcel?.totalAmount} size={14} color={colors.white}/>
                <Regular label={pending_parcel?.distance+'km'} size={14} color={colors.white}/>
              </Row>
            </LinearGradient>)}
      <PrimaryModal icon={'Success'}
       description={'You Have Been Delivered Parcel'}
       visible={successModal} 
       buttonTitle={pending_parcel?.paymentMethod=="Cash"?" Collect Payment": "CONTINUE RIDE"}
       onOk={()=>{setSuccessModal(false);confirmPayment()}}/>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  pending_parcel: store.state.pending_parcel,
  user_info: store.state.user_info,
  current_location: store.state.current_location,
});

const mapDispatchToProps = { 
  get_pending_parcel: () =>  DIVIY_API.get_pending_parcel(),
  accept_request: (payload) =>  DIVIY_API.accept_parcel(payload),
  change_parcel_status:(payload)=>DIVIY_API.change_parcel_status(payload),
  update_payment_status:(payload)=>DIVIY_API.update_payment_status(payload)
};
export default connect(mapStateToProps, mapDispatchToProps)(TrackDelivery);

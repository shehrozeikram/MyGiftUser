import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View ,TouchableOpacity, ScrollView,StatusBar, Image} from 'react-native';
import { connect } from 'react-redux';
import Regular from '../../presentation/typography/regular-text';
import { mvs } from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import { DrawerItem } from '../../components/molecules/drawer-item/drawer-item';
import colors from '../../services/colors';
import LinearGradient from 'react-native-linear-gradient';
import { Arrow, DrawerIcon, DrawerLogo, Notification, Signout } from '../../assets/svgs';
import Medium from '../../presentation/typography/medium-text';
import Row from '../../components/atoms/row';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import { DImage } from '../../assets/images';
import SemiBold from '../../presentation/typography/semibold-text';
import { URLS } from '../../store/api-urls';
const CustomDrawerContent = (props) => {
  const {user_info} = props;
  const onNavigate = (screen,params) => {
      props.navigation.toggleDrawer();
    props.navigation.navigate(screen,params);
  };
  const onSignOut = async () => {
    await AsyncStorage.clear();
    props?.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: 'Signin'},
        ],
      }),
    );
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
       <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
    <LinearGradient
      start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
      colors={colors.primaryLinear}
      style={{
        flex: 1,
        paddingHorizontal: mvs(18),
        paddingTop: mvs(20),
        backgroundColor:colors.primary,
      }}>
     
     <DrawerLogo style={{alignSelf: 'center',}}/>
    
      <Row style={{marginTop:mvs(30),alignItems:'center',marginBottom:mvs(20)}}>
        <ImagePlaceholder uri={{uri:`${URLS.image_url}${user_info?.image}`}} containerStyle={styles.dp}/>
        <View style={{flex:1,paddingHorizontal:mvs(10)}}>
           <SemiBold label={user_info?.fullName} size={17} color={colors.white}/>
           <Regular label={user_info?.email} size={12} color={colors.white}/>
        </View>
      </Row>
    
       <DrawerItem
        onPress={() => onNavigate('Profile')}
        icon={"EditProfile"}
        title={'Edit Profile'}/>
     
     <DrawerItem
        onPress={() => onNavigate('ChatList')}
        icon={"Chat"}
        title={'Chat'}/>

     <DrawerItem
        onPress={() => onNavigate('BottomTab')}
        icon={"Wallet"}
        title={'Wallet'}/>

      <DrawerItem
        icon='License'
        onPress={() => onNavigate('UpdateLicense')}
        title={'Driver License'}/>

      <DrawerItem
        icon='Vehicle'
        onPress={() => onNavigate('UpdateVehicle')}
        title={'Vehicle Registration'}/>
      
      <DrawerItem
        onPress={() => onNavigate('ChangePassword',{new:true})}
        icon={"ChangePassword"}
        title={'Change Password'}/>

      <DrawerItem
        onPress={() => onNavigate('TermsConditions')}
        icon={"Terms"}
        title={'Terms & Conditions'}/>
       <DrawerItem
        onPress={() => onNavigate('PrivacyPolicy')}
        icon={"Privacy"}
        title={'Privacy Policy'}/>

     
      <Image source={DImage} style={{...styles.iconView}} resizeMode='contain'/>
      <TouchableOpacity style={styles.noti_button} onPress={()=>onNavigate("Notifications")}>
               <Notification/>
               <View style={styles.badge}>
                  <Regular label={'4'} color={colors.primary} size={9}/>
               </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_signout} onPress={onSignOut}>
          <Signout/>
            <Medium label={'Logout'}
            color={colors.white} size={17} style={{flex: 1,paddingLeft:mvs(10)}}/>
          <Arrow/>
      </TouchableOpacity>
    </LinearGradient>
    </ScrollView>
  );
};
const mapStateToProps = (store) => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  signin: (payload) => DIVIY_API.signin(payload),
};
export default connect( mapStateToProps, mapDispatchToProps,)(CustomDrawerContent);

export const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingVertical: mvs(10),
    paddingHorizontal: mvs(22),
  },
  optionTitle: {
    fontSize: mvs(15),
    marginLeft: mvs(15),
    marginRight: mvs(15),
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    height: mvs(60),
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  noti_button:{
    position:'absolute',
    opacity:0.5,
    borderBottomLeftRadius:mvs(34),
    right:0,top:mvs(0),
    backgroundColor:colors.white,
    padding:mvs(25),
    justifyContent:'center',alignItems:'center'
  },
  badge:{
    backgroundColor:colors.white,
    borderRadius:mvs(1000),
    height:mvs(15),width:mvs(15),
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    right:mvs(15),
    top:mvs(18)
  },
  iconView:{
  position:'absolute',
  right:-40,alignSelf:'center',
  top:mvs(135),
  height:mvs(518)
  },
  btn_signout:{
    position:'absolute',
    bottom:mvs(20),
    left:mvs(18),right:mvs(18),
    height:mvs(60),
    flexDirection:'row',
    backgroundColor:"#7E477E",
    borderRadius:mvs(17),
    alignItems:'center',
    paddingHorizontal:mvs(20),
    justifyContent:'space-between',
    
  },
  dp:{
    height:mvs(60),
    width:mvs(60),
    borderRadius:mvs(1000)
  }
});

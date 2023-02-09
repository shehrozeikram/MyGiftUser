import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View,BackHandler} from 'react-native';
import {connect} from 'react-redux';
import Bold from '../../presentation/typography/bold-text';
import {ACTIONS} from '../../store/actions';
import {Styles as styles} from './style';
import colors from '../../services/colors';
import { FillCheckBox, Logo ,CheckBox  } from '../../assets/svgs';
import PrimaryButton from '../../components/buttons/button-primary';
import { mvs } from '../../services/metrices';
import DualText from '../../components/atoms/dual-text/dual-text';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal'
import Regular from '../../presentation/typography/regular-text';
import Row from '../../components/atoms/row';
import SemiBold from '../../presentation/typography/semibold-text';
import alertService from '../../services/alert.service';

const PreLogin = props => {
  const navigation = useNavigation();
  const [terms,setTerms]=useState(true);
  const [policy,setPolicy]=useState(false);
  const [showModal,setShow]=useState(true)
  React.useEffect(() => {
    
  }, []);
const reject=async()=>{
 // BackHandler.exitApp();
 setShow(false)
}
const accept=async()=>{
  if(!terms){
    alertService.show("Please Accept the terms and conditions","Terms & Conditions")
    return;
  }
  if(!policy){
    alertService.show("Please Accept the Privacy Policy","Privacy Policy")
    return;
  }
  setShow(false);
}
const login=async()=>{
   if(!terms || !policy){
    setShow(true);
    return;
   }
   navigation.navigate("Signin")
}
  return (
   
    <View style={{...styles.container}}>
        <Modal isVisible={showModal} backdropOpacity={0.7}>
             <View style={styles.modal}>
                <LinearGradient
                 start={{ x: 1, y: 1 }}
                 end={{ x: 1, y: 0.1 }}
                 colors={colors.primaryLinear}
                 style={{...styles.gradient}}>
                       <Bold label={"AGREEMENT"} size={20} color={colors.white}/>
                </LinearGradient>
                <Regular label={'I confirm that i have read & agree'} style={styles.confirmTxt} size={16}/>
              <View style={{marginHorizontal:mvs(45),marginTop:mvs(15)}}>
                  <Row style={{alignItems:'center'}}>
                    {terms? 
                    
                    <TouchableOpacity onPress={()=>setTerms(false)}>
                         <FillCheckBox/>
                    </TouchableOpacity>

                    :   
                    <TouchableOpacity onPress={()=>setTerms(true)}>
                      <CheckBox/>
                   </TouchableOpacity>
                    
                    }
                     
                     <Regular label={'Terms & Conditions'} style={{flex:1,marginLeft:mvs(12)}} size={16}/>
                  </Row>
                  <Row style={{alignItems:'center',marginTop:mvs(23)}}>
                  {policy? 
                    <TouchableOpacity onPress={()=>setPolicy(false)}>
                         <FillCheckBox/>
                    </TouchableOpacity>
                    :   
                    <TouchableOpacity onPress={()=>setPolicy(true)}>
                      <CheckBox/>
                   </TouchableOpacity>
                    }
                     <Regular label={'Privacy Policy'} style={{flex:1,marginLeft:mvs(12)}} size={16}/>
                  </Row>
                  
              </View>
              <Row style={{alignItems:'center',marginTop:mvs(37)}}>
                       <TouchableOpacity style={styles.btnReject} onPress={()=>{reject()}}>
                         <SemiBold label={'REJECT'} size={16} color={colors.black}/>
                       </TouchableOpacity>

                       <TouchableOpacity style={{flex:1}} onPress={()=>accept()}>
                        <LinearGradient 
                          colors={colors.primaryLinear}
                          style={styles.btnAccept}>
                           <SemiBold label={'ACCEPT'} size={16} color={colors.white}/>
                         </LinearGradient>
                       </TouchableOpacity>
                         
               </Row>
             </View>
        </Modal>

       <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
         <Bold label={"PRE LOGIN"} size={20} color={colors.black} style={{alignSelf: 'center'}}/>
         <Logo style={{marginTop:mvs(45),alignSelf: 'center',}}/>
         
         <View style={{marginTop:mvs(20)}}>

           <PrimaryButton  title='LOGIN WITH EMAIL' icon='Email' onClick={()=>login()}/>

           <PrimaryButton title='LOGIN WITH FACEBOOK' icon='Facebook' color={colors.skyLinear}/>

           <PrimaryButton title='LOGIN WITH GOOGLE' icon='Google' color={colors.redLinear}/>

           <PrimaryButton title='LOGIN WITH APPLE' icon='Apple' color={colors.blackLinear}/>

           <TouchableOpacity onPress={()=>navigation.navigate("Signup")}
            style={{alignSelf:'center',marginTop:mvs(67)}}>
            <DualText 
                content="Don't have an account? " 
                style={{fontSize:mvs(16)}}
                highlightText={'SIGNUP'}/>
           </TouchableOpacity>
           </View>
         </ScrollView>
    </View>
   
  );
};

const mapStateToProps = store => ({
  home_posts: store.state.home_posts,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  setUserInfo: payload => ACTIONS.setUserInfo(payload),
  setSocket: payload => ACTIONS.setSocket(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(PreLogin);

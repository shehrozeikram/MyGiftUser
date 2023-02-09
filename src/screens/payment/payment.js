//import liraries
import React, { useState } from 'react';
import {View, ScrollView, StatusBar,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styles from './payment.styles';
import AppHeader from '../../components/header/app-header';
import PrimaryInput from '../../components/input/primary-input';
import Row from '../../components/atoms/row';
import { mvs } from '../../services/metrices';
import Bold from '../../presentation/typography/bold-text';
import colors from '../../services/colors';
import PrimaryButton from '../../components/buttons/button-primary';
import PrimaryModal from '../../components/modals/primary-modal';

// create a component
const Payment = props => {
 
  const navigation = useNavigation();
  const [showModal,setShow]=useState(false);
  const trackDelivery=async()=>{
    setShow(false);
    navigation.navigate("TrackDelivery");
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
     <AppHeader title='PAYMENT'/>  
       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.body}>
           <PrimaryInput leftIcon='User' placeHolder='Holder Name'/>
           <PrimaryInput leftIcon='Card' placeHolder='Account No'/>
           <Row>
             <PrimaryInput leftIcon='Lock' placeHolder='Expire' style={{flex:1,marginRight:mvs(4.5)}}/>
             <PrimaryInput leftIcon='Lock' placeHolder='CVV' style={{flex:1,marginLeft:mvs(4.5)}}/>
           </Row>
            <View style={styles.bottomView}>
                    <Row style={styles.totalAmount}>
                       <Bold label={"Total Amount"} size={18} color={colors.white}/>
                       <Bold label={"₵20.00"} size={18} color={colors.white}/>
                    </Row>
                    <PrimaryButton style={{marginTop:mvs(39)}} title="PAY NOW" onClick={()=>setShow(true)}/>
            </View>
        </View>
        
       </ScrollView>
       <PrimaryModal visible={showModal} onOk={()=>{trackDelivery()}} buttonTitle='Back to Ride'/>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  home_categories: store.state.home_categories,
  categories: store.state.categories,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchHomeCategories: () => DIVIY_API.fetchHomeCategories(),
  fetchSubCategories: parent_cat_id =>
    DIVIY_API.fetchSubCategories(parent_cat_id),
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);

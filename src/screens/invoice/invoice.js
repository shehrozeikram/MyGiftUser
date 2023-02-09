//import liraries
import React, { useState } from 'react';
import {View, ScrollView, StatusBar,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styles from './invoice.styles';
import Bold from '../../presentation/typography/bold-text';
import AppHeader from '../../components/header/app-header';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import InvoiceItem from '../../components/invoice/invoice-item';
import Row from '../../components/atoms/row';
import Regular from '../../presentation/typography/regular-text';
import { Line } from '../../assets/svgs';
import PrimaryInput from '../../components/input/primary-input';
import PrimaryButton from '../../components/buttons/button-primary';
// create a component
const Invoice = props => {
 const[invoice,setInvoice]=useState({
   Name:"Jacqueline",Phone:"+0 123 456 7890",CustomerId:"#123 568",VehicleType:"Bike",
   RiderName:"John Smith",VehicleNo:"Bike-GTH 5689",Pickup:"46019 kuhic Shoals",
   DropOff:"5593 Leannon Expressway",Start:"05:30 PM",End:"06:30 PM",Amount:"₵25.00",
   Distance:"1.5 km",Voucher:"₵5.00",Discount:"₵5.00",TotalAmount:"₵20.00"
 })
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <AppHeader title='USER INVOICE'/>
      <ScrollView contentContainerStyle={{ flexGrow: 1,paddingBottom:mvs(35) }}>
          <View style={styles.body}>
             <View style={styles.invoice}>
               <InvoiceItem leftTitle='Name' leftValue={invoice?.Name} rightTitle={'Phone'} rightValue={invoice?.Phone}/>
               <InvoiceItem leftTitle='Customer ID' leftValue={invoice?.CustomerId} rightTitle={'Vehicle Type'} rightValue={invoice?.VehicleType}/>
               <InvoiceItem leftTitle='Rider Name' leftValue={invoice?.RiderName} rightTitle={'Vehicle No'} rightValue={invoice?.VehicleNo}/>
               <InvoiceItem leftTitle='Pickup' leftValue={invoice?.Pickup} rightTitle={'Drop Off'} rightValue={invoice?.DropOff}/>
               <InvoiceItem leftTitle='Start' leftValue={invoice?.Start} rightTitle={'End'} rightValue={invoice?.End}/>
               <InvoiceItem leftTitle='Distances' leftValue={invoice?.Distance} rightTitle={'Amount'} rightValue={invoice?.Amount}/>
               <InvoiceItem leftTitle='Voucher' leftValue={invoice?.Voucher}/>
               <Line style={{marginTop:mvs(20)}}/>
               <Row style={{marginTop:mvs(15)}}>
                 <Regular label={"Discount"} size={14} color={colors.lightgrey1}/>
                 <Bold size={17} label={invoice?.Discount} color={colors.black}/>
               </Row>
               <Row style={{marginTop:mvs(15)}}>
                 <Regular label={"Total Amount"} size={14} color={colors.lightgrey1}/>
                 <Bold size={17} label={invoice?.TotalAmount} color={colors.black}/>
               </Row>
             </View>
             
               <PrimaryInput leftIcon='Voucher' placeHolder='Add Voucher' style={{marginTop:mvs(20)}}/>
               <PrimaryButton style={{marginTop:mvs(20)}} title="PAY NOW" onClick={()=>navigation.navigate("Payment")}/>
               <PrimaryButton style={styles.btnDownload} title="DOWNLOAD INVOICE" 
                color={[colors.white,colors.white]} titleStyle={{color:colors.darkPrimary}}/>
          </View>
        </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Invoice);

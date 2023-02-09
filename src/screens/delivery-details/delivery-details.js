//import liraries
import React from 'react';
import {View, ScrollView, StatusBar,SafeAreaView,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './delivery-details.styles';
import Bold from '../../presentation/typography/bold-text';
import colors from '../../services/colors';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import SemiBold from '../../presentation/typography/semibold-text';
import Regular from '../../presentation/typography/regular-text';
import Row from '../../components/atoms/row';
import { LocationDate } from '../../assets/svgs';
import { mvs } from '../../services/metrices';
import Medium from '../../presentation/typography/medium-text';
import AppHeader from '../../components/header/app-header';
import { URLS } from '../../store/api-urls';
// create a component
const DeliveryDetails= props => {
  const{route,navigation}=props;
  const{parcel}=route.params

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <AppHeader title='DELIVERY DETAIL'/>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.body}>
          <View style={styles.sub_container}>
              <Row style={{alignItems:'center'}}>
                  <ImagePlaceholder uri={{uri:`${URLS.image_url}${parcel?.customer?.image}`}} containerStyle={styles.imageStyle}/>
                  <View style={{flex:1,marginLeft:mvs(10)}}>
                    <Bold label={parcel?.customer?.name} size={15} color={colors.black}/>
                  </View>
              </Row>
             
              <Row style={{marginTop:mvs(14),paddingLeft:mvs(10)}}>
                  <LocationDate/>
                  <View style={styles.locationView}>
                          <Regular label={'09 June 2022, 03:52 pm'} size={13} color={colors.black}/>
                          <Regular label={parcel?.pickup} size={13} color={colors.black}/>
                          <Regular label={parcel?.dropOff} size={13} color={colors.black}/>
                   </View>
              </Row>
              <Row style={{marginTop:mvs(14)}}>
                <Medium size={16} label={'Cash ₵'+parcel?.totalAmount} color={colors.black}/>
                <TouchableOpacity>
                   <SemiBold label={parcel?.status} size={13} color={colors.green}/>
                </TouchableOpacity>
              </Row>
          </View>
          
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
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDetails);

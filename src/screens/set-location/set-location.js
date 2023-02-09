//import liraries
import React from 'react';
import {View, Text, StatusBar,SafeAreaView,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styles from './set-location.styles';
import MapView ,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
const destination = {latitude: 37.771707, longitude: -122.4053769};
import Row from '../../components/atoms/row';
import { Address, CurrentLocation, GrayBack, LocationMarker, SelectedLocation, VerticalLine } from '../../assets/svgs';
import { mvs } from '../../services/metrices';
import PrimaryButton from '../../components/buttons/button-primary';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapKey } from '../../store/api-urls';
import colors from '../../services/colors';
import Regular from '../../presentation/typography/regular-text';
// create a component
const SetLocation = props => {
  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const navigation = useNavigation();
  const ref = React.useRef(null);
  const placeRef = React.useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      
      <View style={{flex:1}}>
          <MapView  
              //customMapStyle={customStyle}
              style={styles.mapStyle}  
              showsUserLocation={true}
              zoomEnabled={true}  
              zoomControlEnabled={true}
              userInterfaceStyle={'dark'}
              ref={ref}
              provider={PROVIDER_GOOGLE}
              region={region}>  
              <Marker  coordinate={region}>
                  <LocationMarker/>
              </Marker>
        </MapView> 
        
          <View style={styles.body}>
            <Row style={styles.searchBox}>
             <GrayBack/>
             <VerticalLine style={{ marginLeft:mvs(30)}}/>
             
             <GooglePlacesAutocomplete
                ref={placeRef}
                fetchDetails={true}
                placeholder='Search your location'
                onPress={(data, details = null) => {
                  console.log("Selected locations")
                  console.log(data, details);
                }}
                query={{
                  key: MapKey,
                  language: 'en',
                }}
                styles={styles.palceStyles}
                renderRow={(rowData) => {
                //  console.log(rowData)
                  const title = rowData.structured_formatting.main_text;
                  const address = rowData.structured_formatting.secondary_text;
                  return (
                   <Row style={{alignItems: 'center',paddingHorizontal:mvs(20)}}>
                       <Address/>
                        <View style={{flex:1,marginHorizontal:mvs(20)}}>
                          <Regular size={15} label={title} color={colors.black} numberOfLines={3} style={{width:mvs(200)}}/>
                          <Regular size={15} label={address} color={colors.black} numberOfLines={3} style={{width:mvs(200)}}/>
                       </View>
                       <SelectedLocation/>
                   </Row>
                   );
                  }}
              />
             
              <CurrentLocation style={{}}/>
            </Row>              
            <View style={{flex:1,justifyContent:'flex-end'}}> 
              <PrimaryButton title='DONE'/>
            </View>
          </View>
        
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(SetLocation);

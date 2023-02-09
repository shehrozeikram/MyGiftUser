import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const styles = StyleSheet.create({
  container:{
     flex:1,
    backgroundColor:colors.white
  },
  body:{
      flex:1,
      paddingTop:mvs(52),
      paddingBottom:mvs(25)
  },
  bottomView:{
    position:'absolute',
    bottom:mvs(1),
    left:mvs(13),
    right:mvs(13)
  },
  absoluteImage:{
    position:'absolute',left:0,right:0,top:0,bottom:0,
    paddingHorizontal:mvs(26),
    paddingTop:mvs(32)
  },
  locationView:{
    backgroundColor:colors.white,
    borderRadius:mvs(10),
    marginTop:mvs(28),
    paddingHorizontal:mvs(20),
    paddingVertical:mvs(14),...colors.shadow
  },
  btnChange:{
    marginTop:-18,height:mvs(27),
    justifyContent:'center',
    paddingHorizontal:mvs(13),
    marginVertical:6,
    alignSelf:'flex-start'
  },
  parcelOption:{
    backgroundColor:colors.parcelBg,
    borderRadius:mvs(5),
    marginHorizontal:mvs(30),
    paddingHorizontal:mvs(18),
    paddingVertical:mvs(15),
    opacity:0.7,
    marginTop:mvs(20)
  },
  foodPharmacyView:{
    marginHorizontal:mvs(30),
    marginTop:mvs(20)
  },
  restaurantOption:{
    backgroundColor:colors.restaurantBg,
    borderRadius:mvs(5),
  },
  pharmacyOption:{
    backgroundColor:colors.pharmacyBg,
    borderRadius:mvs(5),
  }
});
export default styles;

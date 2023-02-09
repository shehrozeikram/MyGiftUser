import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const styles = StyleSheet.create({
  container:{
     flex:1,
    backgroundColor:colors.background
  },
  body:{
    flex:1,
    paddingHorizontal:mvs(17),
    paddingTop:mvs(1),     
  },
  totalAmount:{
    alignItems:'center',paddingHorizontal:mvs(20),
    backgroundColor:colors.black,
    height:mvs(60),borderRadius:mvs(8)
  },
  bottomView:{
    flex:1,justifyContent:'flex-end',paddingBottom:mvs(30)
  }
});
export default styles;

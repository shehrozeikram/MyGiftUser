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
      paddingBottom:mvs(20)
  },
  topView:{
    borderRadius:mvs(8),
    paddingVertical:mvs(20),
  },
  withdraw:{
    marginVertical:mvs(15),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:mvs(10),
    borderWidth:1,
    borderColor:colors.white,
    marginHorizontal:mvs(17),
    paddingVertical:mvs(11)
  }
});
export default styles;

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
  image:{
    height:mvs(100),
    width:mvs(100),
    borderRadius:mvs(1000),
    alignSelf:'center'
  },
  button:{
    height:mvs(70),
    width:mvs(70), 
  }
});
export default styles;

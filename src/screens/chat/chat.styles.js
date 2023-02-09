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
      paddingHorizontal:mvs(13),
      paddingTop:mvs(10)
  },
  bottomView:{
    position:'absolute',
    bottom:mvs(1),
    left:mvs(13),
    right:mvs(13)
  }
});
export default styles;

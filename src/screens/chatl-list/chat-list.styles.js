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
    
 },bottomView:{
  height:mvs(200),
  bottom:mvs(0),
  left:0,
  right:0,
  zIndex:1,
  position:'absolute'
}
});
export default styles;

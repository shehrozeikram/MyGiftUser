import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    paddingTop:mvs(30),
    paddingHorizontal:mvs(17),
  },
  radio_button:{
    marginTop:mvs(10),
    borderRadius:10,
    marginBottom:mvs(30),
    borderColor:colors.primary,
    backgroundColor:colors.white,
    ...colors.shadow,
    elevation:5
    
  },
  radio_button1:{
    marginTop:mvs(10),
    borderRadius:10,
    marginBottom:mvs(64),
    borderColor:colors.primary,
    backgroundColor:colors.white,
    ...colors.shadow,
    elevation:5,
    paddingBottom:mvs(32)
    
  },
  wallet_true:{  marginLeft:mvs(48),marginVertical:mvs(25),alignItems:'center',justifyContent:'center'}
 
});
export default styles;

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
      paddingTop:mvs(6),
      paddingHorizontal:mvs(17)   
  },
  invoice:{
    borderRadius:mvs(10),
    backgroundColor:colors.white,
    ...colors.shadow,
    paddingBottom:mvs(15),
    paddingHorizontal:mvs(30)
  },
  btnDownload:{
    marginTop:mvs(15),
    borderWidth:1,
    borderColor:colors.darkPrimary,
    borderRadius:mvs(15)
  }
});
export default styles;

import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const styles = StyleSheet.create({
  container:{
     flex:1,
    backgroundColor:colors.background
  },
  body:{
      paddingHorizontal:mvs(17),
      paddingTop:mvs(1),  
      flex:1
  },
  sub_container:{
    borderRadius:mvs(15),
    paddingHorizontal:mvs(15),
    paddingVertical:mvs(13),
    backgroundColor:colors.white,
    ...colors.shadow,
    marginTop:mvs(10),
   
    },
    imageStyle:{
        height:mvs(50),
        width:mvs(50),
        borderRadius:mvs(1000)
    },
    button:{
        height:mvs(44),width:mvs(44),
        borderRadius:mvs(1000),
        marginHorizontal:mvs(5)
    },
    locationView:{
       paddingLeft:mvs(15),
       justifyContent:'space-between',
       flex:1,
       height:mvs(90)
    }
});
export default styles;

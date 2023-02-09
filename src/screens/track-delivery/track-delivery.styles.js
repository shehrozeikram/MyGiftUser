import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const styles = StyleSheet.create({
  container:{
     flex:1,
    backgroundColor:colors.tabBackground
  },
  body:{
      flex:1,
      paddingTop:mvs(34),
      backgroundColor:colors.transparent,
     
  },
  mapStyle: {  
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
  },
  topView:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,height:mvs(52),
    borderRadius:mvs(8),
    marginHorizontal:mvs(40)
  },
  bottomView:{
    height:mvs(294),
    paddingHorizontal:mvs(17),
    justifyContent:'flex-end',
    paddingBottom:mvs(30)
  },
  parcel:{
    borderRadius:mvs(15),
    position:'absolute',
    bottom:mvs(115),
    left:0,
    right:0,
    paddingHorizontal:mvs(14),
    paddingVertical:mvs(28),
    marginHorizontal:mvs(18)
    },
    imageStyle:{
        height:mvs(50),
        width:mvs(50),
        borderRadius:mvs(1000)
    },
    shopImage:{
      height:mvs(50),
      width:mvs(50),
      alignSelf:'center'
    },
    button:{
        height:mvs(44),width:mvs(44),
        borderRadius:mvs(1000),
        marginHorizontal:mvs(5)
    },
    locationView:{
      flex:1,paddingLeft:mvs(15),
      justifyContent:'space-between',
      height:'100%',    
  }
});
export default styles;

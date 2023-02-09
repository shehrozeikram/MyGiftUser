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
    paddingHorizontal:mvs(22),
    paddingBottom:mvs(30)
 },
 mapStyle: {  
   position: 'absolute',  
   top: 0,  
   left: 0,  
   right: 0,  
   bottom: 0,  
 },
 searchBox:{
  alignItems:'center',
  height:mvs(60),
  borderTopLeftRadius:mvs(10),
  borderTopRightRadius:mvs(10),
  backgroundColor:colors.white,
  ...colors.shadow,
  paddingLeft:mvs(20),
  paddingRight:mvs(12),
 },
 palceStyles:{
  textInput: {
      color: colors.black,
      fontSize: mvs(15),
      marginLeft:mvs(18),
      borderRadius:0,
      height:mvs(55),
      marginTop:mvs(3.5)
    } ,
    listView: {
      color: 'black', //To see where exactly the list is
      zIndex: 1000, //To popover the component outwards
      position: 'absolute',
      top: mvs(63),
      borderBottomLeftRadius:mvs(15),
      borderBottomRightRadius:mvs(15),
      width:mvs(340),
      left:mvs(-65)
  },
  separator:{
    flex: 1,
    height: 0,
    backgroundColor: 'blue',
  },
 }
});
export default styles;

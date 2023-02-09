import { StyleSheet } from "react-native";
import { mvs } from "../../services/metrices";
import colors from "../../services/colors";
export const Styles = StyleSheet.create({
    container:{
       flex:1,
       paddingHorizontal:mvs(17),
       paddingVertical:mvs(40)
    },
    image:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        width:'100%'
    },
    gradient:
    {
        justifyContent:'center',
        alignItems:'center',
        height:mvs(60),
        borderTopLeftRadius:mvs(15),
        borderTopRightRadius:mvs(15)
    },
    modal:{
        backgroundColor:colors.white,
        ...colors.shadow,
        borderRadius:mvs(15)
    },
    confirmTxt:{
        marginHorizontal:mvs(25),marginTop:mvs(28),alignSelf:'center'
    },
    btnReject:{
        justifyContent:'center',
        alignItems:'center',height:mvs(57),
       backgroundColor:colors.gray,flex:1,borderBottomLeftRadius:mvs(15)
    },
    btnAccept:{
        justifyContent:'center',
        alignItems:'center',height:mvs(57),
        flex:1,borderBottomRightRadius:mvs(15)
    }
});
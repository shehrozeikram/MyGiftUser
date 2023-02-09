import React, { } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { mvs } from '../../services/metrices';
import Row from '../atoms/row';
import colors from '../../services/colors';
import Bold from '../../presentation/typography/bold-text';
import { useNavigation } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native'
import { Menu } from '../../assets/svgs';
import { DrawerActions } from '@react-navigation/native';
const SwtichHeader = ({title='HOME',style,titleStyle,isOn=true,onChange}) => {
const navigation=useNavigation()
  return (
        <Row style={{...styles.container,...style}}>
           <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                   <Menu/>
            </TouchableOpacity>
            <Bold label={title} size={20} color={colors.black} style={titleStyle}/>
            {/* <ToggleSwitch
              isOn={isOn}
              onColor="green"
              offColor="red"
              size='small'
              onToggle={onChange}
            /> */}
            <View></View>
        </Row>
      
    );
}
const styles = StyleSheet.create({
    container:{
       alignItems:'center',
       paddingHorizontal:mvs(17),
       marginTop:mvs(15),
       marginVertical:mvs(10)  
    }
});
export default SwtichHeader;
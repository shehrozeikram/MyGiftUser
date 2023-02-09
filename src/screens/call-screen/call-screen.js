//import liraries
import React from 'react';
import {View, StatusBar,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styles from './call-screen.styles';
import colors from '../../services/colors';
import LinearGradient from 'react-native-linear-gradient';
import Regular from '../../presentation/typography/regular-text';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import { User } from '../../assets/images';
import { mvs } from '../../services/metrices';
import AppHeader from '../../components/header/app-header';
import Medium from '../../presentation/typography/medium-text';
import Row from '../../components/atoms/row';
import IconButton from '../../components/buttons/icon-button';
// create a component
const CallScreen = props => {
 
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      <LinearGradient 
       start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
       colors={colors.primaryLinear}
       style={styles.body}>
        <AppHeader title='' leftIcon='WhiteBack'/>
             <ImagePlaceholder uri={User} containerStyle={styles.image}/>
             <View style={{alignSelf:'center',marginTop:mvs(10),alignItems:'center'}}>
               <Regular label={"John Smith"} size={20} color={colors.white}/>
               <Regular label={"Driver"} size={16} color={colors.white}/>
               <Medium label={"00:10"} size={24} color={colors.white} style={{marginTop:mvs(73)}}/>
            </View>
            <View style={{flex:1,justifyContent:'center',paddingHorizontal:mvs(30)}}>
                 <Row>
                    <IconButton icon='Speaker' style={styles.button} color={colors.secondaryLinear}/>
                    <IconButton icon='MainCall' style={styles.button} color={colors.orangeLinear}/>
                    <IconButton icon='Mic' style={styles.button} color={colors.secondaryLinear}/>
                 </Row>  
            </View>
       </LinearGradient>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  home_categories: store.state.home_categories,
  categories: store.state.categories,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchHomeCategories: () => DIVIY_API.fetchHomeCategories(),
  fetchSubCategories: parent_cat_id =>
    DIVIY_API.fetchSubCategories(parent_cat_id),
};
export default connect(mapStateToProps, mapDispatchToProps)(CallScreen);

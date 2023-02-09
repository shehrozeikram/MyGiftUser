//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import AppHeader from '../../components/header/app-header';
import HomeScreenComponent from '../../components/home-screen-component/home-screen-component';
import Light from '../../presentation/typography/light-text';
import SemiBold from '../../presentation/typography/semibold-text';
import alertService from '../../services/alert.service';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import styles from './homeScreen-styles';
const HomeScreen = props => {
  const {cards, get_cards} = props;
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await get_cards();
  };
  console.log('Cards===> ', cards);
  return (
    <View style={{...styles.conntainer}}>
      <AppHeader title="Choose your Card" />
      <View style={{alignSelf: 'center'}}>
        <Light label={'Welcome back! Buy cards you like '} color={'#50555C'} />
      </View>
      <View style={{paddingHorizontal: mvs(17)}}>
        <SemiBold label={'All Cards'} color={'#50555C'} />
      </View>
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, flex: 1}}>
          <HomeScreenComponent list={cards} />
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
  cards: store.state.cards,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  get_cards: () => DIVIY_API.get_cards(),
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

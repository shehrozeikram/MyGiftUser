//import liraries
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {Bd, ProfileImage} from '../../assets/images';
import Row from '../../components/atoms/row';
import AvailableBalance from '../../components/available-balance/available-balance';
import PrimaryButton from '../../components/buttons/button-primary';
import TransactionItem from '../../components/transaction/transaction-history-item';
import Bold from '../../presentation/typography/bold-text';
import Light from '../../presentation/typography/light-text';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import styles from './style';
import Carousel from 'react-native-reanimated-carousel';
// create a component
const ClaimGift = props => {
  const {ratings, get_ratings, user_info} = props;
  const [history] = useState([
    {
      date: '09 June 2022',
      data: [{}, {}],
    },
  ]);
  const [onSwtich, setSwtich] = useState(true);
  const [isFetched, setFetched] = useState(false);
  useEffect(() => {
    //getRatings();
  }, []);
  const getRatings = async () => {
    await get_ratings(user_info?.id);
    setFetched(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <View style={styles.body}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.body}>
            <Row
              alignItems="center"
              style={{paddingHorizontal: mvs(20), marginVertical: mvs(25)}}>
              <Image source={ProfileImage} style={styles.imageStyle} />
              <AvailableBalance
                bgColor={colors.primary}
                style={{
                  width: mvs(150),
                  height: mvs(50),
                  paddingVertical: mvs(7),
                }}
              />
            </Row>
            <View style={styles.balance}>
              <Row alignItems="center" style={{width: '96%'}}>
                <Bold
                  label={'Earn more points'}
                  size={mvs(17)}
                  color={colors.black}
                />
                <Regular
                  label={'Available:750 points'}
                  size={13}
                  color={colors.green}
                />
              </Row>
              <Light
                label={'You can earn more points by purchasing more cards'}
                color={colors.lightgrey1}
                style={{marginTop: mvs(10)}}
                size={mvs(12)}
              />
            </View>
            <SemiBold
              label={'Claim Rewards'}
              size={18}
              style={{marginTop: mvs(30), marginBottom: mvs(1)}}
            />
            <Carousel
              width={mvs(330)}
              height={mvs(300)}
              autoPlay={false}
              mode="parallax"
              style={{zIndex: 1}}
              modeConfig={'parallax-vertical'}
              data={[...new Array(6).keys()]}
              scrollAnimationDuration={100}
              onSnapToItem={index => console.log('current index:', index)}
              renderItem={({index}) => (
                <View style={styles.balance1} key={index}>
                  <Image
                    source={Bd}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    style={{marginVertical: mvs(12), alignSelf: 'center'}}>
                    <Bold
                      label={'Claim Gift'}
                      color={colors.primary}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />

            <SemiBold
              label={'Latest Rewards'}
              size={18}
              style={{marginTop: mvs(25)}}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{marginTop: mvs(10)}}
              contentContainerStyle={{
                backgroundColor: colors.white,
                paddingHorizontal: mvs(5),
                paddingBottom: mvs(10),
              }}
              data={[1, 2, 3, 4, 5, 6, 7, 89, 9, 10, 11, 12]}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <TransactionItem parcel={item} key={index} />
              )}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  ratings: store.state.ratings,
  user_info: store.state.user_info,
  parcel_history: store.state.parcel_history,
});

const mapDispatchToProps = {
  get_ratings: id => DIVIY_API.get_ratings(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(ClaimGift);

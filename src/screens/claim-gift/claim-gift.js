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
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {Bd, Card, ProfileImage} from '../../assets/images';
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
import Spinner from 'react-native-loading-spinner-overlay';
import alertService from '../../services/alert.service';
import {Gift, Stars} from '../../assets/svgs';
// create a component
const ClaimGift = props => {
  const {
    fetch_claim_rewards,
    fetch_rewards,
    claim_rewards,
    rewards,
    claim_card,
    user_info,
    wallet,
  } = props;
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getData();
  }, [refresh]);
  const getData = async () => {
    await fetch_claim_rewards(user_info?.id);
    await fetch_rewards(user_info?.id);
  };
  const claim = async id => {
    setLoading(true);
    var res = await claim_card(id);
    setLoading(false);
    if (res?.data?.api_status) {
      setRefresh(!refresh);
    } else {
      alertService.show('Something went wrong!', 'Claim Gift');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={{color: colors.primary}}
        color={colors.primary}
      />
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
                  height: mvs(55),
                  paddingVertical: mvs(7),
                }}
                balance={wallet?.user_balance ? wallet?.user_balance : 0}
              />
            </Row>
            <View style={styles.balance}>
              <Row alignItems="center" style={{width: '96%'}}>
                <Bold
                  label={'Earn more points'}
                  size={mvs(14)}
                  color={colors.black}
                />
                <Regular
                  label={'Available:750 points'}
                  size={mvs(13)}
                  color={colors.green}
                />
              </Row>
              <Light
                label={'You can earn more points by purchasing more cards'}
                color={colors.lightgrey1}
                numberOfLines={2}
                style={{marginTop: mvs(10), textAlign: 'center'}}
                size={mvs(12)}
              />
            </View>
            {claim_rewards?.length > 0 && (
              <>
                <SemiBold
                  label={'Claim Rewards'}
                  size={18}
                  style={{marginTop: mvs(30), marginBottom: mvs(1)}}
                />
                <Carousel
                  loop={false}
                  width={mvs(330)}
                  height={mvs(300)}
                  autoPlay={false}
                  mode="parallax"
                  style={{zIndex: 1}}
                  modeConfig={'parallax-vertical'}
                  data={claim_rewards}
                  scrollAnimationDuration={100}
                  onSnapToItem={index => console.log('current index:', index)}
                  renderItem={({item, index}) => (
                    <View style={styles.balance1} key={index}>
                      <ImageBackground
                        source={Card}
                        borderRadius={mvs(30)}
                        style={styles.image}
                        resizeMode="cover">
                        <Gift style={styles.symbol} />
                        <Stars style={styles.stars} />
                        <View style={styles.nameView}>
                          <Bold
                            label={item?.title}
                            size={mvs(21)}
                            color={'#966E09'}
                          />
                        </View>
                        <View style={styles.userView}>
                          <Bold
                            label={'From ' + item?.user?.first_name}
                            size={mvs(21)}
                            style={styles.name}
                            color={'#966E09'}
                          />
                        </View>
                      </ImageBackground>
                      <TouchableOpacity
                        onPress={() => claim(item?.id)}
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
              </>
            )}
            {rewards?.length > 0 && (
              <>
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
                  data={rewards}
                  keyExtractor={item => item.id}
                  renderItem={({item, index}) => (
                    <TransactionItem transaction={item} key={index} />
                  )}
                />
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  rewards: store.state.rewards,
  user_info: store.state.user_info,
  claim_rewards: store.state.claim_rewards,
  wallet: store.state.wallet,
});

const mapDispatchToProps = {
  fetch_claim_rewards: user_id => DIVIY_API.fetch_claim_rewards(user_id),
  fetch_rewards: user_id => DIVIY_API.fetch_rewards(user_id),
  claim_card: id => DIVIY_API.claim_card(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(ClaimGift);

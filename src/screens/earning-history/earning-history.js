//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import HistoryItem from '../../components/transaction/transaction-history-item';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import SwtichHeader from '../../components/header/swtich-header';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
import Row from '../../components/atoms/row';
import Medium from '../../presentation/typography/medium-text';
import DIVIY_API from '../../store/api-calls';
// create a component
const EarningHistory = props => {
  const {parcel_history, get_parcel_history, navigation} = props;
  const [history, setHistory] = useState([
    {
      date: '09 June 2022',
      data: [{}, {}],
    },
  ]);
  const [onSwtich, setSwtich] = useState(true);
  const [isFetched, setFetched] = useState(false);
  useEffect(() => {
    getParcelHistory();
  }, []);
  const getParcelHistory = async () => {
    await get_parcel_history();
    setFetched(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <SwtichHeader
        isOn={onSwtich}
        title="EARNING"
        onChange={onOff => setSwtich(onOff)}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ShimmerPlaceholder
          visible={isFetched}
          style={{flex: 1, width: '100%'}}>
          <View style={styles.body}>
            <LinearGradient
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              colors={colors.primaryLinear}
              borderRadius
              style={styles.topView}>
              <Row style={{marginHorizontal: mvs(32)}}>
                <View>
                  <Medium
                    label={'Total Delivered'}
                    color={colors.white}
                    size={13}
                  />
                  <Medium label={'₵2,568'} color={colors.white} size={24} />
                </View>
                <View>
                  <Medium label={'My Earning'} color={colors.white} size={13} />
                  <Medium label={'₵2,568'} color={colors.white} size={24} />
                </View>
              </Row>
              <TouchableOpacity
                style={styles.withdraw}
                onPress={() => navigation.navigate('Payment')}>
                <Medium label={'WITHDRAW'} size={18} color={colors.white} />
              </TouchableOpacity>
            </LinearGradient>
            {history.map((element, index) => {
              return (
                <View key={index}>
                  {/* <Regular label={element.date} size={12} color={colors.black} style={{marginTop:mvs(10)}}/> */}
                  {parcel_history?.map((item, index) => {
                    return <HistoryItem key={index} parcel={item} />;
                  })}
                </View>
              );
            })}
          </View>
        </ShimmerPlaceholder>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  parcel_history: store.state.parcel_history,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  get_parcel_history: () => DIVIY_API.get_parcel_history(),
};
export default connect(mapStateToProps, mapDispatchToProps)(EarningHistory);

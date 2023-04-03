import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flexGrow: 1,
    paddingTop: mvs(0),
    paddingHorizontal: mvs(17),
  },
  user: {
    backgroundColor: colors.white,
    borderBottomColor: colors.lightgrey1,
    borderBottomWidth: 0.5,
    paddingBottom: mvs(20),
    marginTop: mvs(15),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(10),
  },
  image: {
    height: mvs(70),
    width: mvs(70),
    borderRadius: 1000,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: mvs(17),
    paddingVertical: mvs(20),
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: mvs(30),
    borderTopRightRadius: mvs(30),
    // marginHorizontal: mvs(-17),
  },
});
export default styles;

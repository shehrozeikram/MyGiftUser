import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingBottom: mvs(100),
    paddingHorizontal: mvs(17),
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    width: mvs(290),
    textAlign: 'center',
    marginBottom: mvs(30),
  },
});
export default styles;

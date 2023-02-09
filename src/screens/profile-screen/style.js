import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingBottom: mvs(25),
    marginTop: mvs(14),
  },
  imageStyle: {
    width: mvs(120),
    height: mvs(120),
    borderRadius: mvs(10),
    alignSelf: 'center',
  },
  name: {
    marginTop: mvs(13),
    alignSelf: 'center',
  },
});
export default styles;

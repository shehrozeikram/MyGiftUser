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
    paddingHorizontal: mvs(22),
    justifyContent: 'center',
    paddingBottom: mvs(100),
  },
  logo: {
    alignSelf: 'center',
  },
});

export default styles;

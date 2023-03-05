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
    paddingHorizontal: mvs(17),
    paddingTop: mvs(10),
    backgroundColor: colors.white,
  },
  topView: {
    borderRadius: mvs(8),
    paddingVertical: mvs(20),
  },
  image: {
    height: mvs(70),
    width: mvs(70),
    borderRadius: mvs(10),
  },
  button: {
    //width: '45%',
    backgroundColor: colors.white,
    elevation: mvs(4),
    borderRadius: mvs(10),
    height: mvs(60),
  },
  buttonText: {
    fontSize: mvs(18),
    color: colors.primary,
    fontWeight: 'bold',
  },
  balance: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: mvs(40),
    paddingTop: mvs(22),
    backgroundColor: colors.white,
    ...colors.shadow,
    borderRadius: mvs(20),
  },
});
export default styles;

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
    paddingBottom: mvs(60),
    paddingTop: mvs(20),
  },
  card: {
    borderRadius: mvs(20),
    borderColor: colors.primary,
    backgroundColor: colors.white,
    ...colors.shadow,
    padding: mvs(9),
    marginTop: mvs(10),
    flex: 1,
    marginBottom: mvs(60),
  },
  image: {
    height: mvs(100),
    width: mvs(100),
    borderRadius: mvs(5),
    alignSelf: 'center',
  },
});
export default styles;

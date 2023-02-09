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
    paddingTop: mvs(60),
  },
  card: {
    borderRadius: mvs(20),
    borderColor: colors.primary,
    backgroundColor: colors.white,
    ...colors.shadow,
    padding: mvs(13),
    marginTop: mvs(10),
  },
  image: {
    height: mvs(100),
    width: mvs(100),
    borderRadius: mvs(5),
  },
  input: {
    borderBottomColor: colors.black,
    borderBottomWidth: 1.5,
    flex: 1,
    fontSize: 10,
    height: mvs(20),
    padding: 0,
    marginLeft: 6,
  },
});
export default styles;

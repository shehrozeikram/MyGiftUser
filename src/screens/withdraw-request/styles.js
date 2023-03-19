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
  camera: {
    alignSelf: 'center',
    height: mvs(146),
    width: mvs(146),
    borderRadius: mvs(1000),
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.white,
    padding: mvs(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    height: mvs(130),
    width: mvs(130),
    borderRadius: mvs(1000),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: mvs(100),
    width: mvs(100),
    borderRadius: mvs(5),
    alignSelf: 'center',
  },
});
export default styles;

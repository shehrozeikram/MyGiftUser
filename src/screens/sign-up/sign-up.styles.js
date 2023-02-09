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
    paddingBottom: mvs(20),
    backgroundColor: colors.white,
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
  img: {
    width: '100%',
    height: '100%',
    borderRadius: mvs(1000),
  },
});
export default styles;

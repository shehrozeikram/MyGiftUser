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
    paddingHorizontal: mvs(10),
    backgroundColor: colors.white,
  },
  topView: {
    borderRadius: mvs(8),
    paddingVertical: mvs(20),
  },
  imageStyle: {
    height: mvs(50),
    width: mvs(50),
    borderRadius: mvs(10),
  },
  button: {
    width: '45%',
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
    marginHorizontal: mvs(3),
    paddingHorizontal: mvs(5),
  },
  balance1: {
    alignItems: 'center',
    width: mvs(300),
    height: mvs(320),
    paddingTop: mvs(1),
    backgroundColor: colors.white,
    ...colors.shadow,
    borderRadius: mvs(20),
  },
  image: {
    height: mvs(230),
    width: mvs(290),
  },
  symbol: {
    position: 'absolute',
    right: mvs(10),
    top: mvs(20),
  },
  stars: {
    position: 'absolute',
    top: mvs(30),
    left: mvs(30),
  },
  nameView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: mvs(25),
  },
  userView: {
    //justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: mvs(23),
    paddingBottom: mvs(25),
  },
  name: {},
});
export default styles;

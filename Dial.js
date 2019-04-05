import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Easing,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { IMAGES, COLORS, FONTS } from '../../config';
import { getUserProfile, spinUser, userRating } from '../../actions/profile';
import SwipeGestures from './SwipeGestures';
import LoadingComp from '../../components/Loading';

const { height, width } = Dimensions.get('window');
const centerPt = {
  x: width / 2,
  y: height / 2,
};
class Dial extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.Value(0);

    this.state = {
      visible: false,
      profileVisible: false,
      dailImage: true,
      data: [
        {
          wltitle: 'iPhone X',
          wlimage: IMAGES.iPhoneX,
          wldelete: IMAGES.giftSharing,
        },
        {
          wltitle: 'Apple Watch ',
          wlimage: IMAGES.appleWatch,
          wldelete: IMAGES.giftSharing,
        },
      ],
      spinValue: new Animated.Value(0),
      angleDeg: 0,
      val: 0,
      txt: 1,
      spinTextColor: '#4be06e',
    };
    this.onLongPress = this.onLongPress.bind(this);
  }

  componentWillMount = () => {
    this.props.spinUser(); // eslint-disable-line
    this.props.getUserProfile(); // eslint-disable-line
  };

  componentWillReceiveProps(nextProps) {
    const { rating } = nextProps;

    if (this.props.rating !== rating) { // eslint-disable-line
      this.props.spinUser(); // eslint-disable-line
    }
  }

  onChange(gestureState) {
    const { angleDeg, txt, val } = this.state;

    if (gestureState.moveY === 0) return;
    const updatedAngleDeg =
      (Math.atan2(
        gestureState.moveY - centerPt.y,
        gestureState.moveX - centerPt.x,
      ) *
        180) /
        Math.PI +
      180;
    if (updatedAngleDeg === angleDeg) return;
    let tmp = Math.floor(Math.abs(updatedAngleDeg - angleDeg) * 5) / 10000;
    if (tmp > 0.001) tmp = 0.001;
    let updatedVal = val + (angleDeg < updatedAngleDeg ? 1 : -1) * tmp;
    if (updatedVal > 0.1) updatedVal -= 0.1;
    else if (updatedVal < 0) updatedVal += 0.1;
    const updatedTxt = Math.floor((updatedVal * 10000) / 53) / 2;
    this.moveDial(updatedVal);
    this.setState({ angleDeg, val: updatedVal, txt: updatedTxt + 1 });

    if (txt >= 0 && txt <= 3) {
      this.setState({ spinTextColor: '#4be06e' });
    } else if (this.state.txt > 3 && this.state.txt <= 5) {
      this.setState({ spinTextColor: '#f4c458' });
    } else if (this.state.txt > 5 && this.state.txt <= 7.5) {
      this.setState({ spinTextColor: '#f7852e' });
    } else if (this.state.txt > 7.5 && this.state.txt <= 10) {
      this.setState({ spinTextColor: '#e2433a' });
    }
  }

  onEnd() {
    // const { user } = this.props;
    // const { txt } = this.state;
    // const { id } = user;

    // this.userRating(id, txt);
    // this.setState({
    //   dailImage: true,
    //   angleDeg: 0,
    //   val: 0,
    //   spinValue: new Animated.Value(0),
    //   txt: 1,
    // });
  }

  userRating = async (userId, rating) => {
    this.props.userRating(userId, rating); // eslint-disable-line
    this.props.spinUser(); // eslint-disable-line
  };

  onLongPress(){
    const { user } = this.props;
    const { txt } = this.state;
    const { id } = user;

    this.userRating(id, txt);
    this.setState({
      dailImage: true,
      angleDeg: 0,
      val: 0,
      spinValue: new Animated.Value(0),
      txt: 1,
    });
  }

  renderUser = () => {
    const { matchedUser } = this.props;
    const { dailImage } = this.state;
    const { dob, username } = matchedUser;

    if (dailImage === true) {
      const currentYear = new Date().getFullYear();
      const userDob = new Date(dob);
      const userDobYear = userDob.getFullYear();
      const age = currentYear - userDobYear;

      const userName = username || '-';
      const comma = username && userDob ? ', ' : '';
      const ageYear = dob != null ? age : '';

      return (
        <View style={styles.detailView}>
          <View style={styles.nameView}>
            <View style={{ paddingRight: 8 }}>
              <Text style={styles.name}>
                {userName}
                {comma}
                {ageYear}
              </Text>
            </View>
            <View style={styles.dot} />
          </View>
          <View style={styles.descriptionView}>
            <Image
              style={{
                width: 17,
                height: 17,
              }}
              source={IMAGES.nav}
            />
            <View style={{ paddingLeft: 3 }} />
            <Text style={styles.description}>5 MILES AWAY</Text>
          </View>
        </View>
      );
    }
  };

  renderImage = () => {
    const { spinValue, dailImage, spinTextColor, txt } = this.state;

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '3600deg'],
    });

    // const imgSource = this.state.dailImage ? null : IMAGES.dial_base;

    if (dailImage === false) {
      return (
        <View
        style={styles.dialContainer}
        >
        <SwipeGestures
          style={styles.dialContainer}
          onEnd={() => this.onEnd()}
          onChange={state => this.onChange(state)}
        >
          <View style={styles.dialerBg}>
            <Animated.Image
              style={[styles.dialerMarker, { transform: [{ rotate: spin }] }]}
              source={require('../../images/spinner-bg.png')}
            />
            <Image
              source={require('../../images/dial-marker.png')}
              style={{
                position: 'absolute',
                width: 250,
                height: 250,
              }}
            />
            
          </View>
        </SwipeGestures>
        <TouchableOpacity 
          onLongPress={() => this.onLongPress()} 
          style={{
            position: 'absolute',
            }}>
              <Text style={[styles.dialer, {
                color: this.state.spinTextColor
              }]}>{this.state.txt}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderMatchUserInfo = () => {
    const { profileVisible } = this.state;
    const { matchedUser } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent
        visible={profileVisible}
        onRequestClose={() => {
          this.setState({ profileVisible: false });
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => {
                console.log('aaaa', profileVisible);
                this.setState({ profileVisible: false });
              }}
              style={{
                zIndex: 999,
              }}
            >
              <Ionicons
                name="md-close"
                color={COLORS.white}
                size={25}
                style={{
                  backgroundColor: COLORS.transparent,
                  position: 'absolute',
                  right: 20,
                  top: 10,
                }}
              />
            </TouchableOpacity>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{matchedUser.username}</Text>
              <Image style={styles.modalHeaderImage} source={IMAGES.statIcon} />
            </View>
            <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemKey}>Username</Text>
                <Text style={styles.modalItemValue}>
                  {matchedUser.username}
                </Text>
              </View>
            </View>
            <View style={styles.modalItemSepbar} />
            <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemKey}>Height</Text>
                <Text style={styles.modalItemValue}>height</Text>
              </View>
            </View>
            <View style={styles.modalItemSepbar} />
            <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemKey}>Weight</Text>
                <Text style={styles.modalItemValue}>weight</Text>
              </View>
            </View>
            <View style={styles.modalItemSepbar} />
            <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemKey}>Body Type</Text>
                <Text style={styles.modalItemValue}>Body Type</Text>
              </View>
            </View>
            <View style={styles.modalItemSepbar} />
            <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemKey}>Hair Color</Text>
                <Text style={styles.modalItemValue}>
                  {matchedUser.hair_color}
                </Text>
              </View>
            </View>
            <View style={styles.modalItemSepbar} />
            <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemKey}>Eye Color</Text>
                <Text style={styles.modalItemValue}>
                  {matchedUser.eye_color}
                </Text>
              </View>
            </View>
            <View style={styles.modalItemSepbar} />
            <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemKey}>Ethnicity</Text>
                <Text style={styles.modalItemValue}>
                  {matchedUser.ethnicity}
                </Text>
              </View>
            </View>
            <View style={styles.modalItemSepbar} />
            <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemKey}>Gender</Text>
                <Text style={styles.modalItemValue}>{matchedUser.gender}</Text>
              </View>
            </View>
            <View style={styles.modalItemSepbar} />
            <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemKey}>Religion</Text>
                <Text style={styles.modalItemValue}>
                  {matchedUser.religion}
                </Text>
              </View>
            </View>
            <View style={styles.modalItemSepbar} />
            <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemKey}>Children</Text>
                <Text style={styles.modalItemValue}>
                  {matchedUser.children}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  onSwipeRight = () => {
    const { navigation } = this.props;

    navigation.navigate('SearchProducts');
  };

  moveDial(val) {
    const { spinValue } = this.state;

    const animation = Animated.timing(spinValue, {
      toValue: Number(val.toFixed(4)),
      duration: 0,
      easing: Easing.linear,
    });
    animation.start();
  }

  render() {
    const { isLoading } = this.props;
    const { dailImage } = this.state;

    if (isLoading) return <LoadingComp title="Loading..." />;
    return (
      <View style={styles.flex1}>
        <ImageBackground style={styles.container} source={IMAGES.bg}>
          <View style={styles.titleView}>
            <Text style={styles.title}>TERA</Text>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              // paddingTop: 200,
              paddingHorizontal: 20,
              flex: 1,
            }}
          >
            {this.renderImage()}
          </View>
          {this.renderUser()}
          <View style={styles.bottomIconView}>
            <View style={styles.flex1}>
              <TouchableOpacity
                onPress={() => this.setState({ profileVisible: true })}
              >
                <Image
                  style={{
                    width: 39,
                    height: 30,
                  }}
                  source={require('../../images/staticon.png')}
                />
              </TouchableOpacity>
            </View>
            {dailImage ? (
              <View style={[styles.flex3, { justifyContent: 'center' }]}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => this.setState({ dailImage: !dailImage })}
                >
                  <Image
                    style={{
                      width: 94,
                      height: 94,
                    }}
                    source={dailImage ? IMAGES.dial_progress_startup : null}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.flex3, { justifyContent: 'space-between' }]}>
                <TouchableOpacity
                  style={styles.flex1}
                  activeOpacity={0.9}
                  onPress={() => this.setState({ dailImage: !dailImage })}
                >
                  <Image source={IMAGES.trophy3} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.flex1}
                  activeOpacity={0.9}
                  onPress={() =>
                    this.setState({ dailImage: !this.state.dailImage })
                  }
                >
                  <Image
                    style={{
                      width: 36,
                      height: 36,
                    }}
                    source={IMAGES.trophyStar1}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.flex1}
                  activeOpacity={0.9}
                  onPress={() =>
                    this.setState({ dailImage: !this.state.dailImage })
                  }
                >
                  <Image
                    style={{
                      width: 32,
                      height: 32,
                    }}
                    source={IMAGES.rocket}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.flex1}>
              <TouchableOpacity
                onPress={() => this.setState({ visible: true })}
              >
                <Image
                  style={{
                    width: 32,
                    height: 34,
                  }}
                  source={require('../../images/gift-sharing.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <SlidingUpPanel
            visible={this.state.visible}
            onRequestClose={() => this.setState({ visible: false })}
          >
            <View style={styless.container}>
              <View
                style={{
                  width: 50,
                  height: 6,
                  backgroundColor: '#fff',
                  alignSelf: 'center',
                  margin: 10,
                  borderRadius: 4,
                }}
              />
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: 29,
                  marginBottom: 15,
                  fontFamily: 'SFProDisplay-Bold',
                  marginTop: 10,
                }}
              >
                GIFTS
              </Text>
              <FlatList
                data={this.state.data}
                numColumns={2}
                // keyExtractor={({item}) => item.wltitle}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.getItem(
                        item.ProjectID,
                        item.ProjectTitle,
                        item.Description,
                      )
                    }
                  >
                    <View style={styless.items}>
                      <View style={{ flexDirection: 'row', width: '100%' }}>
                        <Text
                          style={{
                            color: '#fff',
                            alignSelf: 'flex-start',
                            fontSize: 17,
                          }}
                        >
                          {item.wltitle}
                        </Text>
                        <Image
                          source={require('../../images/biggift.png')}
                          style={{
                            width: 25,
                            height: 30,
                            position: 'absolute',
                            right: 0,
                          }}
                        />
                      </View>
                      <Image
                        source={item.wlimage}
                        style={{
                          width: 148,
                          height: 170,
                          marginTop: 15,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </SlidingUpPanel>
          {this.renderMatchUserInfo()}
        </ImageBackground>
        {/* </GestureRecognizer> */}
      </View>
    );
  }
}
const styless = StyleSheet.create({
  container: {
    height: '65%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 5,
    backgroundColor: COLORS.maincolor,
    paddingHorizontal: 10,
  },
  items: {
    marginHorizontal: 6,
    marginVertical: 6,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#393a43',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(28, 22, 33)',
  },
  titleView: {
    paddingTop: 48,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 24,

    color: '#fff',
  },
  nameView: {
    paddingHorizontal: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 26,
    color: '#fff',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgb(43, 222, 115)',
    shadowColor: 'rgb(43, 222, 115)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  descriptionView: {
    paddingHorizontal: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    fontFamily: 'SFProText-Medium',
    fontSize: 14,
    color: '#fff',
  },
  bottomIconView: {
    paddingHorizontal: 35,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 27,
    height: 100,
  },
  detailView: {
    position: 'absolute',
    bottom: 180,
  },

  dialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dialerBg: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialerMarker: {
    position: 'absolute',
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialer: {
    fontSize: 30,
    textAlign: 'center',
    color: '#2CDE73',
  },
  flex1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flex3: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
  },
  modalContainer: {
    width: '90%',
    marginVertical: 50,
    backgroundColor: 'rgb(36, 37, 54)',
    borderRadius: 8,
  },
  modalHeader: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderText: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: 22,
    color: COLORS.white,
  },
  modalHeaderImage: {
    width: 24,
    height: 18,
    marginLeft: 12,
  },
  modalContent: {
    marginHorizontal: 14,
  },
  modalItem: {
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalItemKey: {
    fontFamily: FONTS.SFProTextRegular,
    fontSize: 17,
    color: COLORS.white,
  },
  modalItemValue: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: 17,
    color: COLORS.white,
  },
  modalItemSepbar: {
    borderBottomColor: 'rgba(255, 255, 255, .10)',
    borderBottomWidth: 1,
  },
});

Dial.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  rating: PropTypes.object.isRequired,
  matchedUser: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.profile.isFetching,
  user: state.profile.data,
  rating: state.profile.rating,
  matchedUser: state.profile.spinUser,
});

const mapDispatchToProps = {
  getUserProfile,
  spinUser,
  userRating,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dial);
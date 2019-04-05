import { createStackNavigator } from 'react-navigation';

import ShareLocationScreen from '../screens/Signup/ShareLocation';
import ShareLocationPeopleScreen from '../screens/Signup/ShareLocationPeople';
import NotifyMeScreen from '../screens/Signup/NotifyMe';
import NotifyMeMessageScreen from '../screens/Signup/NotifyMeMessage';
import SelectEthnicityScreen from '../screens/Signup/SelectEthnicity';
import SelectBodyTypeScreen from '../screens/Signup/SelectBodyType';
import UploadPoseScreen from '../screens/Signup/UploadPose';
import UploadSelfieScreen from '../screens/Signup/UploadSelfie';
import UploadFullBodyScreen from '../screens/Signup/UploadFullBody';
import UploadMiscellaneousScreen from '../screens/Signup/UploadMiscellaneous';
import SelectGenderScreen from '../screens/Signup/SelectGender';
import SelectOtherGenderScreen from '../screens/Signup/SelectOtherGender';
import EnterNameScreen from '../screens/Signup/EnterName';
import SelectAgeScreen from '../screens/Signup/SelectAge';
import SettingScreen from '../screens/Signup/Setting';
import EnterTallScreen from '../screens/Signup/EnterTall';
import PrivacyPolicyScreen from '../screens/Signup/PrivacyPolicy';
import TermsOfServiceScreen from '../screens/Signup/TermsService';
import TwentyComplete from '../screens/Signup/twentycomplete';
import ForgotPasswordScreen from '../screens/Signup/ForgotPassword';
import EnterNewPasswordScreen from '../screens/Signup/EnterNewPassword';
import PasswordResetScreen from '../screens/Signup/PasswordReset';
import VerifyAccountScreen from '../screens/Signup/VerifyAccount';
import EnterRecoveryCodeScreen from '../screens/Signup/EnterRecoveryCode';
import UploadRejectScreen from '../screens/Signup/UploadReject';
import UploadSuccessScreen from '../screens/Signup/UploadSuccess';
import UploadReviewScreen from '../screens/Signup/UploadReview';
import ProfileComplete from '../screens/Signup/ProfileComplete';
import EnterPhoneScreen from '../screens/Signup/EnterPhone';
import RunOutPeople1 from '../screens/MainScreen/RunOutPeople1';
import RunOutPeople2 from '../screens/MainScreen/RunOutPeople2';
import MailInfo from '../screens/MainScreen/MailInfo';
import Dial from '../screens/MainScreen/Dial';
import UserProfile from '../screens/MainScreen/UserProfile';
import ChatIndex from '../screens/MainScreen/chatindex';
import ChattPage from '../screens/MainScreen/chattpage';
import WishList from '../screens/MainScreen/WishList';
import AddWishList from '../screens/MainScreen/addwishlist';
import GiftsClaimed from '../screens/MainScreen/giftsclaimed';
import ShipAddress from '../screens/MainScreen/shipaddress';
import ReceivedGifts from '../screens/MainScreen/receivedgifts';
import SearchProduct from '../screens/MainScreen/searchproduct';
import PaymentPage from '../screens/MainScreen/PaymentPage';
import Confirmpayment from '../screens/MainScreen/confirmpayment';
import EditInterests from '../screens/MainScreen/EditInterests';
import AddInterests from '../screens/MainScreen/addinterest';
import ChangeEmail from '../screens/MainScreen/ChangeEmail';
import ChangePhoneNumber from '../screens/MainScreen/ChangePhoneNumber';
import ChangeUsername from '../screens/MainScreen/ChangeUsername';
import UserSetting from '../screens/MainScreen/UserSettings';
import AboutThem from '../screens/MainScreen/aboutthem';
import AddCreditCard from '../screens/MainScreen/AddCreditCard';
import Upgrades from '../screens/MainScreen/Upgrades';
import Elevens from '../screens/MainScreen/Elevens';
import Wipes from '../screens/MainScreen/Wipes';
import StartupScreen from '../screens/Startup/TeraScreen';
import InitialScreen from '../screens/Startup/initialscreen';

const InitialRoot = createStackNavigator(
  {
    startupScreen: {
      screen: StartupScreen,
      navigationOptions: {
        header: null,
      },
    },
    TwentyCScreen: { screen: TwentyComplete },
    shareLocation: { screen: ShareLocationScreen },
    shareLocationPeople: { screen: ShareLocationPeopleScreen },
    notifyMe: { screen: NotifyMeScreen },
    notifyMeMessage: { screen: NotifyMeMessageScreen },
    selectEthnicity: { screen: SelectEthnicityScreen },
    selectBodyType: { screen: SelectBodyTypeScreen },
    uploadPose: { screen: UploadPoseScreen },
    uploadSelfie: { screen: UploadSelfieScreen },
    uploadFullBody: { screen: UploadFullBodyScreen },
    uploadMiscellaneous: { screen: UploadMiscellaneousScreen },
    selectGender: { screen: SelectGenderScreen },
    selectOtherGender: { screen: SelectOtherGenderScreen },
    enterName: { screen: EnterNameScreen },
    selectAge: { screen: SelectAgeScreen },
    settingScreen: { screen: SettingScreen },
    enterTall: { screen: EnterTallScreen },
    privacyPolicyScreen: { screen: PrivacyPolicyScreen },
    termsOfServiceScreen: { screen: TermsOfServiceScreen },
    forgotPasswordScreen: { screen: ForgotPasswordScreen },
    enterNewPasswordScreen: { screen: EnterNewPasswordScreen },
    passwordResetScreen: { screen: PasswordResetScreen },
    verifyAccountScreen: {
      screen: VerifyAccountScreen,
      navigationOptions: {
        headerTitle: '',
      },
    },
    enterRecoveryCode: { screen: EnterRecoveryCodeScreen },
    profileComplete: { screen: ProfileComplete },
    uploadReject: { screen: UploadRejectScreen },
    uploadSuccess: { screen: UploadSuccessScreen },
    uploadReview: { screen: UploadReviewScreen },
    enterPhone: {
      screen: EnterPhoneScreen,
      navigationOptions: {
        headerBackTitle: 'Cancel',
        headerTitle: 'CHANGE PHONE NUMBER',
      },
    },
    DialScreen: Dial,
    MatchScreen: MailInfo,
    Chatindexs: ChatIndex,
    Chats: ChattPage,
    WishLists: WishList,
    AddWishLists: AddWishList,
    GiftsClaimeds: GiftsClaimed,
    ShipAddresss: ShipAddress,
    ReceivedGiftss: ReceivedGifts,
    SearchProducts: SearchProduct,
    Confirmpayments: Confirmpayment,
    PaymentPages: PaymentPage,
    UserSettings: {
      screen: UserSetting,
      navigationOptions: {
        headerTitle: 'Settings',
      },
    },
    AboutThems: {
      screen: AboutThem,
      navigationOptions: {
        headerTitle: 'About Them',
      },
    },
    ChangeEmails: ChangeEmail,
    ChangePhoneNumbers: ChangePhoneNumber,
    ChangeUsernames: ChangeUsername,
    AddInterestss: AddInterests,
    EditInterestss: EditInterests,
    UserProfiles: UserProfile,
    SettingScreens: {
      screen: SettingScreen,
      navigationOptions: {
        headerTitle: 'Settings',
      },
    },
    RunOutPeople1s: RunOutPeople1,
    RunOutPeople2s: RunOutPeople2,
    initialScreen: InitialScreen,
    AddCreditCardScreen: AddCreditCard,
    UpgradesScreen: Upgrades,
    ElevensScreen: Elevens,
    WipesScreen: Wipes,
  },
  {
    initialRouteName: 'startupScreen',
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: 16,
      },
    },
  },
);

export default InitialRoot;

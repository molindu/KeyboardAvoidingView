import React, { useContext, useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Keyboard, View, Dimensions, TouchableWithoutFeedback, Image, KeyboardAvoidingView, Platform } from 'react-native';

import colors from '../../assets/colors';
import { FONT_NAME, FONT_SIZE } from '../../assets/Font_Props';
import Label from '../components/Label';
import Button from '../components/Button';

//icon import 
import EditTextField from '../components/EditTextField';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Context } from '../context/Context';
import { MAIN_ROUTES } from '../constants/Routes';

export default function Login({ navigation }) {

  const { userName, setUserName, password, setPassword } = useContext(Context);


  const isButtonDisabled = !userName || !password;
  const Login = () => {
    navigation.navigate(MAIN_ROUTES.SELECT_TRAIN);
  }
  const WelcomeText = (
    container,
    innerContainer,
    label_1_textStyle,
    label_1_text,
    label_2_textStyle,
    label_2_text
  ) => {
    return (
      <View style={container}>
        <View style={innerContainer}>
          <Label
            textStyle={label_1_textStyle}
            text={label_1_text}
          />
          <Label
            textStyle={label_2_textStyle}
            text={label_2_text}
          />
        </View>
      </View>
    )
  }
  const RenderTopContainer = (onPress, container, icon_Path, icon_width, icon_Height,) => {
    const Path = icon_Path;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={container}>
          <Image style={{ width: icon_width, height: icon_Height }} source={Path} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    // Clean up listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        style={styles.body}
        source={require('../images/background.png')}
      >
        <View style={styles.container}>

          {!isKeyboardVisible && RenderTopContainer(
            () => Keyboard.dismiss(),
            styles.firstContainer,
            require('../icons/Logo.png'),
            80,
            80
          )}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.secContainer, isKeyboardVisible && {
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }]}>
              {WelcomeText(
                styles.textDev,
                styles.textContainer,
                styles.welText,
                'Welcome Back',
                styles.signText,
                'Sign in with your account'
              )}

              <View style={styles.formDev}>
                <EditTextField
                  containerStyle={[styles.inputStyle, { marginTop: 30, }]}
                  placeholder="User Name"
                  placeholderTextColor={colors.DARK_TEXT1}
                  textStyle={[styles.input]}
                  secureTextEntry={false}
                  editable={true}
                  value={userName}
                  onChangeText={setUserName}
                />
                <EditTextField
                  containerStyle={[styles.inputStyle, { marginTop: 30, }]}
                  placeholder="Password"
                  placeholderTextColor={colors.DARK_TEXT1}
                  textStyle={[styles.input]}
                  secureTextEntry={true}
                  editable={true}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <View style={styles.btnDev}>
                <Button
                  containerStyle={{ width: windowWidth * 0.91, marginTop: 35, }}
                  textStyle={styles.btn}
                  text="Log in"
                  onPress={() => Login()}
                  disabled={isButtonDisabled}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  firstContainer: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: windowHeight * 0.017,
    marginLeft: windowHeight * 0.03,
    marginRight: windowHeight * 0.03,
  },
  secContainer: {
    backgroundColor: colors.SURFACE,
    flex: 4,
    borderTopRightRadius: windowWidth / 10,
    borderTopLeftRadius: windowWidth / 10,
  },
  textDev: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formDev: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDev: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  welText: {
    fontFamily: FONT_NAME.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.EXTRA_LARGE_25,
    color: colors.BLUE,
  },
  signText: {
    color: colors.BLUE,
    fontFamily: FONT_NAME.POPPINS_MEDIUM,
    fontSize: FONT_SIZE.EXTRA_SMALL_12,
  },
  inputStyle: {
    // width: windowWidth * 0.77,
    width: '77%',
  },
  input: {
    color: colors.DARK_TEXT,
    fontFamily: FONT_NAME.POPPINS_MEDIUM,
    fontSize: FONT_SIZE.MEDIUM_16,
  },

  bottomText: {
    color: colors.TEXT_COLOR1,
    fontFamily: FONT_NAME.POPPINS_REGULAR,
    fontSize: FONT_SIZE.SMALL,
  },
  btn: {
    fontFamily: FONT_NAME.POPPINS_MEDIUM,
    fontSize: FONT_SIZE.MEDIUM_16,
    color: colors.SURFACE,
  },
  // ////////////////////////////////////////
  // button: {
  //   width: 14,
  //   height: 14,
  //   justifyContent: 'center',
  //   backgroundColor: colors.VIEW_FILL,
  //   alignItems: 'center',
  //   marginRight: 8,
  // },
})


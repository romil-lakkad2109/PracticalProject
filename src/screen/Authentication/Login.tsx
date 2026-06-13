import React, { useState } from 'react'
import { View, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native'

//API
import { API } from '../../api'

//ASSETS
import { COLORS, FONTS, IMAGES } from '../../assets'

//COMPONENT
import { CustomInput, ProgressView, Text } from '../../component'

//CONSTANT
import { getScaleSize, SHOW_TOAST, Storage } from '../../constant'

//PACKAGES
import { CommonActions } from '@react-navigation/native';

//SCREENS
import SCREENS from '..'


export default function Login(props: any) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)

    async function onLoaging() {

        if (!email) {
            SHOW_TOAST('Email Required', 'error')
            return
        } else if (!password) {
            SHOW_TOAST('Password Required', 'error')
        }

        const params = {
            email: email,
            password: password,
        };
        // }
        try {
            setLoading(true);
            const result = await API.Instance.post(API.API_ROUTES.login, params);
            if (result.status) {
                Storage.save(Storage.USER_DETAILS, JSON.stringify(result?.data?.data));
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: SCREENS.BottomBar.identifier,
                            },
                        ],
                    }),
                );
            } else {
                SHOW_TOAST(result?.data?.message, 'error');
            }
        } catch (error: any) {
            console.log('error', error)
            SHOW_TOAST(error?.message ?? '', 'error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={style.container}>
            <StatusBar
                backgroundColor="rgba(0,0,0,0.5)"
                barStyle="light-content"
            />
            <View style={[style.transparentContainer, {
            }]}>
                <Text
                    style={style.txtLable}
                    size={getScaleSize(32)}
                    font={FONTS.ExtraBold}
                    color={COLORS._000}>
                    {'Plie'}
                </Text>
                <View style={{ flex: 1.0 }} />
                <Image style={style.imgIcon} source={IMAGES.splash_icon} />
            </View>
            <ScrollView style={style.scrolledContainer}
                showsVerticalScrollIndicator={false}>
                <CustomInput
                    label="Email"
                    placeholder="email@email.com"
                    value={email}
                    onChangeText={setEmail}
                />
                <CustomInput
                    label="Password"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Text
                    style={{ alignSelf: 'flex-end', marginTop: getScaleSize(6) }}
                    size={getScaleSize(12)}
                    font={FONTS.Regular}
                    color={COLORS._828282}>
                    {'Forgot Password?'}
                </Text>
                <TouchableOpacity activeOpacity={1}
                    style={style.btnSignIN}
                    onPress={() => {
                        onLoaging()
                    }}>
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Medium}
                        color={COLORS._FFF}>
                        {'Sign In'}
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{ alignSelf: 'flex-end', marginTop: getScaleSize(15) }}
                    size={getScaleSize(12)}
                    font={FONTS.Regular}
                    color={COLORS._000}>
                    {'Not a member? '}
                    <Text
                        style={{ textDecorationColor: 'underline' }}
                        size={getScaleSize(12)}
                        font={FONTS.Regular}
                        color={COLORS._000}>
                        {'Sign Up Here'}
                    </Text>
                </Text>
                <View style={{ flexDirection: 'row', flex: 1.0, marginTop: getScaleSize(64) }}>
                    <View style={{ flex: 1.0, alignSelf: 'center', backgroundColor: COLORS._4F4F4F, height: 1, marginTop: getScaleSize(2) }} />
                    <Text
                        style={{ marginHorizontal: getScaleSize(10) }}
                        size={getScaleSize(12)}
                        font={FONTS.Regular}
                        color={COLORS._000}>
                        {'or Sign In with:'}
                    </Text>
                    <View style={{ flex: 1.0, alignSelf: 'center', backgroundColor: COLORS._4F4F4F, height: 1, marginTop: getScaleSize(2) }} />
                </View>
                <View style={style.bottomMenu}>
                    <Image style={style.imgSocialIcon} source={IMAGES.btn_google} />
                    <Image style={[style.imgSocialIcon, { marginHorizontal: getScaleSize(6) }]} source={IMAGES.btn_apple} />
                    <Image style={style.imgSocialIcon} source={IMAGES.btn_facebook} />

                </View>
            </ScrollView>
            {isLoading && <ProgressView />}

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS._FFF
    },
    transparentContainer: {
        height: '40%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    txtLable: {
        marginTop: StatusBar.currentHeight + getScaleSize(16), alignSelf: 'center'
    },
    imgIcon: {
        height: getScaleSize(51), width: getScaleSize(51), alignSelf: 'center', marginBottom: getScaleSize(32)
    },
    scrolledContainer: {
        marginHorizontal: getScaleSize(32),
        flex: 1.0,
        marginTop: getScaleSize(24)
    },
    btnSignIN: {
        marginTop: getScaleSize(27), paddingVertical: getScaleSize(10), paddingHorizontal: getScaleSize(24),
        borderRadius: getScaleSize(4), backgroundColor: COLORS._21D393,
        alignSelf: 'flex-end'
    },
    bottomMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: getScaleSize(39),
        justifyContent: 'center'
    },
    imgSocialIcon: {
        height: getScaleSize(44),
        width: getScaleSize(44),
        alignSelf: 'center'
    }
})
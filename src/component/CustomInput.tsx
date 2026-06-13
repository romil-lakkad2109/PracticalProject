import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

//ASSETS
import { COLORS, FONTS, IMAGES } from '../assets';

//CONSTANT
import { getScaleSize } from '../constant';

//COMPONENT
import Text from './Text';

const CustomInput = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
}: any) => {
    const [hidePassword, setHidePassword] = useState(secureTextEntry);

    return (
        <View style={styles.container}>
            <Text
                size={getScaleSize(16)}
                font={FONTS.Medium}
                color="#333">
                {label}
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#8A8A8A"
                    secureTextEntry={hidePassword}
                    style={styles.input}
                />

                {secureTextEntry && (
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setHidePassword(!hidePassword)}>
                        <Image
                            source={

                                IMAGES.btn_eye

                            }
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: getScaleSize(15),
    },

    inputContainer: {
        marginTop: getScaleSize(10),
        backgroundColor: '#FFFFFF',
        borderRadius: getScaleSize(10),

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: getScaleSize(2),
        },
        shadowOpacity: 0.15,
        shadowRadius: getScaleSize(6),

        elevation: 1,
    },

    input: {
        height: getScaleSize(58),
        paddingHorizontal: getScaleSize(20),
        fontSize: getScaleSize(16),
        color: '#333',
        paddingRight: getScaleSize(55),
    },

    eyeButton: {
        position: 'absolute',
        right: getScaleSize(18),
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },

    eyeIcon: {
        width: getScaleSize(24),
        height: getScaleSize(24),
        tintColor: '#9B9B9B',
    },
});

export default CustomInput;
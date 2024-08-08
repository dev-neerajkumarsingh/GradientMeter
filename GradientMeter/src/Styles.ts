import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');

export const Styles = StyleSheet.create({
    speedometerContainer: {
        alignSelf: 'center',
        backgroundColor: '#000',
        borderTopLeftRadius: 230,
        borderTopEndRadius: 230,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 1.1,
        height: 240,
    },
    speedometerArc: {
        width,
        height: 240,
        marginBottom: Platform.OS === 'android' ? 40 : 10,
    },
    needleStyle: {position: 'absolute', left: 150, bottom: 10},
    imageWrapper: {
        position: 'absolute',
        bottom: -60,
        zIndex: 10,
    },
    needleImg: {
        resizeMode: 'stretch',
        height: width / 2,
        width: width / 2,
    },
});
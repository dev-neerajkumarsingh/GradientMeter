import React, {useRef} from 'react';
import {View, Animated, Image, Easing, Platform, Dimensions} from 'react-native';
import {
    Canvas,
    Path,
    Skia,
    LinearGradient,
    vec,
} from '@shopify/react-native-skia';
import { Styles } from './Styles';

const { width: screenWidth } = Dimensions.get('window');

const limitValue = (value: any, minValue: number, maxValue: number, allowedDecimals: boolean) => {
    let currentValue = 0;
    if (!isNaN(value)) {
      if (Boolean(allowedDecimals)) {
        currentValue = parseFloat(value); //.toFixed(4);
      } else {
        currentValue = parseInt(value);
      }
    }
    return Math.min(Math.max(currentValue, minValue), maxValue);
};

type Props = {
    needleRotationVal: number; // from -90 to 90
    imageWrapperStyle?: object;
    imageStyle?: object;
  };

export const Meter: React.FC<Props> = ({needleRotationVal, imageWrapperStyle, imageStyle}) => {
    const arcWidth = Platform.OS === 'android' ? 50 : 40;
    const strokeWidth = 50;
    const center = screenWidth / 2;
    const r = (screenWidth - strokeWidth) / 2 - arcWidth;
    const startAngle = Math.PI;
    const endAngle = 2 * Math.PI;
    const x1 = center - r * Math.cos(startAngle);
    const y1 = -r * Math.sin(startAngle) + center;
    const x2 = center - r * Math.cos(endAngle);
    const y2 = -r * Math.sin(endAngle) + center;
    const rawPath = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
    const skiaBackgroundPath = Skia.Path.MakeFromSVGString(rawPath);

    const speedometerValue = useRef(new Animated.Value(100)).current;

    Animated.timing(speedometerValue, {
        toValue: limitValue(0, 0, 180, false),
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
    }).start();

    const rotationVal = `${needleRotationVal}deg`;

    const rotate = speedometerValue.interpolate({
        inputRange: [-1, 180],
        outputRange: [rotationVal, '-180deg'],
    });

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <View style={Styles.speedometerContainer}>
                {/* <CreditScoreImg width={300} height={180} /> */}
                {Boolean(skiaBackgroundPath) && (
                    <Canvas style={Styles.speedometerArc}>
                        <Path
                            path={skiaBackgroundPath!}
                            style="stroke"
                            strokeWidth={strokeWidth}
                            strokeCap="round">
                            <LinearGradient
                                start={vec(10, 100)}
                                end={vec(370, 50)}
                                colors={[
                                    '#CF1321',
                                    '#FF8E01',
                                    '#E1C534',
                                    '#7CC534',
                                    '#009F48',
                                    '#009F48',
                                ]}
                            />
                        </Path>
                    </Canvas>
                )}
                <Animated.View
                    style={[
                        Styles.imageWrapper,
                        {
                            transform: [{rotate}],
                        },
                        imageWrapperStyle,
                    ]}>
                    <Image
                        style={[Styles.needleImg, imageStyle]}
                        source={require('./NeedleImg.png')}
                    />
                </Animated.View>
            </View>
      </View>
    );
  };
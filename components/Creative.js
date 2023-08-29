import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const Creative = () => {
    const images = [
        "https://media.istockphoto.com/id/1135785938/photo/i-havent-washed-in-a-week.jpg?s=612x612&w=0&k=20&c=5Y5uX4S4ujcVt7Y1iUp05SXAW9-S_LFSnzBQ320t2r0=",
        "https://media.istockphoto.com/id/614955256/photo/full-loaded-washing-machine.jpg?s=612x612&w=0&k=20&c=HaI9n4YINkQvny415vnmHPjUHK6V1f2h65AQi94BED8="
    ];
    return (
        <View>
            <SliderBox 
            images={images} 
            autoPlay 
            circleLoop 
            dotColor={'#13274F'}
            inactiveDotColor='#90A4AE'
            ImageComponentStyle={{
            borderRadius: 6,
            width: "94%"

            }} />
        </View>
    );
};

export default Creative

const styles = StyleSheet.create({})
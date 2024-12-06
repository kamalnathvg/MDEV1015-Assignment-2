import { Image , StyleSheet, Dimensions} from 'react-native';
import React from 'react';



const WelcomeImage = () => {
    return (
        <Image
        style ={styles.image}
        source={require('../assets/welcome_image.jpg')}
        />
    );
};
const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
});


export default WelcomeImage;

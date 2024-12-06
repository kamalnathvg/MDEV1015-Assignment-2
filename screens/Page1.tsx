import React, { useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Page1 = () => {
    const [url, setUrl] = useState('https://cataas.com/cat/gif');
    const [isLoading, setIsLoading] = useState(true);

    const fetchNewImage = () => {
        setIsLoading(true); // Start loading
        setUrl(`https://cataas.com/cat/gif?random=${Math.random()}`);
    };

    const handleImageLoad = () => {
        setIsLoading(false); // Finish loading
    };

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.headerText}>Cat Gif Generator</Text>
            <View style={styles.content}>
                <Image
                    source={{ uri: url }}
                    style={styles.imageWrapper}
                    onLoadEnd={handleImageLoad}
                />
                {isLoading && (
                    <ActivityIndicator size="large" color="#8882d9" style={styles.activityIndicator} />
                )}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={fetchNewImage}>
                    <Text style={styles.buttonText}>Generate Image</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 20,
    },
    imageWrapper: {
        width: 300,
        height: 300,
    },
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: '#8882d9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText :{
        fontSize: 20,
        fontWeight: 'bold',
    },
    activityIndicator: {
        position: 'absolute',
        top: '50%',
    },
});

export default Page1;

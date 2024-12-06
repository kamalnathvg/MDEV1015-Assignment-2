import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Page5 = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

    const toggleSwitch = () => {
        setIsEnabled(previousState => {
            const newIsEnabled = !previousState;
            //setBackgroundColor(newIsEnabled ? getRandomColor() : '#FFFFFF');

             if (newIsEnabled) {
                    setBackgroundColor(getRandomColor());
                } else {
                    setBackgroundColor('#FFFFFF');
                }
            return newIsEnabled;
        });
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.title}>Random Color Page</Text>
            <View style={styles.content}>
                <Switch
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={styles.switch}
                />
                {/* similar to the above - can be written in if condition. */}
                <Text style={styles.switchText}>{isEnabled ? 'Switch is ON' : 'Switch is OFF'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    content: {
        alignItems: 'center',
        marginTop: 200,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 40,
    },
    switch: {
        transform: [{ scaleX: 2 }, { scaleY: 2 }],
        marginTop: 20,

    },
    switchText: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',

    },
});

export default Page5;

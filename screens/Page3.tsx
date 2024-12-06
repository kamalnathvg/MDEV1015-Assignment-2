import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Page3 = () => {
    const DATA = [
        { name: 'item 1' },
        { name: 'item 2' },
        { name: 'item 3' },
        { name: 'item 4' },
    ];

    const [data, setData] = useState(DATA);

    type ListItem = {
        name: string;
    };

    const addItem = () => {
        let newData = data.concat([{ name: `item ${data.length + 1}` }]);
        setData(newData);
        console.log(data);
    };

    const clearList = () => {
        setData([]);
    };

    const Item = ({ name }: ListItem) => {
        return (
            <View style={styles.listItemWrapper}>
                <Text>{name}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>List Item Generator</Text>
            <View style={styles.content}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item name={item.name} />}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonWrapper} onPress={addItem}>
                    <Text style={styles.buttonText}>Add Item</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrapper} onPress={clearList}>
                    <Text style={styles.buttonText}>Clear List</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    listItemWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#8882d9',
        marginVertical: 5,
        borderRadius: 5,
    },
    content: {
        flex: 1,
        marginHorizontal: 10,
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'space-around',
        padding: 20,
    },
    buttonWrapper: {
        alignSelf: 'center',
        backgroundColor: '#8882d9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 30,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Page3;

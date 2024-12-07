import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { db, auth } from './Auth';
import { doc, getDoc, setDoc } from "firebase/firestore";

const Page1 = () => {
    const [catId, setCatId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState<string[]>([]);

    // Fetch favorites from Firestore when the component loads
    useEffect(() => {
        const fetchFavorites = async () => {
            if (auth.currentUser) {
                const userDoc = doc(db, 'users', auth.currentUser.uid);
                const userSnap = await getDoc(userDoc);
                if (userSnap.exists()) {
                    setFavorites(userSnap.data().favorites || []);
                }
            }
        };

        fetchFavorites();
    }, []);

    // Save favorites to Firestore
    const saveFavorites = async (updatedFavorites: string[]) => {
        if (auth.currentUser) {
            try {
                const userDoc = doc(db, 'users', auth.currentUser.uid);
                await setDoc(userDoc, { favorites: updatedFavorites }, { merge: true });
                setFavorites(updatedFavorites);
                console.log(`Successfully updated favorites`);
            } catch (error) {
                console.error('Error saving favorites: ', error);
                Alert.alert('Error', 'Could not save favorites');
            }
        }
    };

    // Fetch new image using the cat ID from the API
    const fetchNewImage = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://cataas.com/cat?json=true');
            const data = await response.json();
            console.log(`${data._id}`);
            setCatId(data._id);
        } catch (error) {
            console.error('Error fetching cat image:', error);
            setIsLoading(false);
        }
    };

    // Handle image load completion
    const handleImageLoad = () => {
        setIsLoading(false);
    };

    // Toggle favorite functionality
    const toggleFavorite = (imageId: string) => {
        const updatedFavorites = favorites.includes(imageId)
            ? favorites.filter((id) => id !== imageId) // Remove from favorites
            : [...favorites, imageId]; // Add to favorites

        saveFavorites(updatedFavorites); // Save updated favorites to Firestore
    };

    // Render each favorite item (image) in a horizontal FlatList
    const renderFavoriteItem = ({ item }: any) => (
        <View style={styles.favoriteItem}>
            <Image source={{ uri: `https://cataas.com/cat/${item}` }} style={styles.favoriteImage} />
        </View>
    );

    // Fetch initial image when the component mounts
    useEffect(() => {
        fetchNewImage();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Cat Gif Generator</Text>

            {/* Display meme */}
            <View style={styles.content}>
                {catId && (
                    <Image
                        source={{ uri: `https://cataas.com/cat/${catId}` }}
                        style={styles.imageWrapper}
                        onLoadEnd={handleImageLoad}
                    />
                )}
                {isLoading && (
                    <ActivityIndicator size="large" color="#8882d9" style={styles.activityIndicator} />
                )}
            </View>

            {/* Button to generate new image */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={fetchNewImage}>
                    <Text style={styles.buttonText}>Generate Image</Text>
                </TouchableOpacity>
            </View>

            {/* Button to toggle favorite */}
            <TouchableOpacity
                onPress={() => toggleFavorite(catId!)} // Toggle based on the current cat ID
                style={styles.favoriteButton}
            >
                <Text style={styles.buttonText}>
                    {favorites.includes(catId!) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Text>
            </TouchableOpacity>

            {/* Display the list of favorite memes */}
            <Text style={styles.favoritesHeader}>Favorites</Text>
            <FlatList
                data={favorites}
                renderItem={renderFavoriteItem}
                keyExtractor={(item) => item}
                horizontal
                contentContainerStyle={styles.favoritesList}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
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
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    activityIndicator: {
        position: 'absolute',
        top: '50%',
    },
    favoriteButton: {
        alignSelf: 'center',
        backgroundColor: '#ff6f61',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    favoritesHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 20,
    },
    favoritesList: {
        marginTop: 10,
        marginBottom: 20,
    },
    favoriteItem: {
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoriteImage: {
        width: 100,
        height: 100,
    },
});

export default Page1;
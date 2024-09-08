import React  from 'react';
import { useEffect, useState }  from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { movieData } from '../../data/MovieData';
import { ShowMovie } from '../components/MovieComponent';
import { ButtonComponents } from '../components/ButtonComponents';

const HomeScreen = (props) => {
    const {navigation} = props;

    const [recommended, setRecommended] = useState([]);
    const [mostViewed, setMostViewed] = useState([]);
    const [allMostViewed, setAllMostViewed] = useState([]);
    const [allRecommended, setAllRecommended] = useState([]);

    // sort the data on rating
    const compareRating = (a, b) => {
        const ratingA = a.rating;
        const ratingB =b.rating;

        if (ratingA > ratingB) {
            return -1;
        } else if (ratingA < ratingB) {
            return 1;
        } else {
            return 0;
        }
    };

    // sort the data based on viewers
    const compareViewers = (a, b) => {
        const viewersA = a.viewers
        const viewersB = b.viewers

        if (viewersA > viewersB) {
            return -1;
        } else if (viewersA < viewersB) {
            return 1;
        } else {
            return 0;
        }
    };


    useEffect( () => {
        const threeRecommended = [];
        const threeMostViewed= [];
        const sortedRecommended = [...movieData].sort(compareRating);
        setRecommended(sortedRecommended);
        const sortedMostViewed = [...movieData].sort(compareViewers);
        setMostViewed(sortedMostViewed);

        setAllMostViewed(sortedMostViewed);
        setAllRecommended(sortedRecommended)

        for (let i = 0; i < 3; i++) {
            threeMostViewed.push(sortedMostViewed[i]);
        };
        for (let i = 0; i < 3; i++) {
            threeRecommended.push(sortedRecommended[i]);
        };

        setMostViewed(threeMostViewed);
        setRecommended(threeRecommended);
    }, []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={recommended}
        keyExtractor={ (item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => {
          return (
              <View style={styles.dataContainer}>
                  <Image
                      style={styles.movieImage}
                      source={{ uri: item.imageLink }}
                  />
                  <View style={styles.movieDescriptionContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.yearContainer}>
                        <Text>{item.year}</Text>
                    </View>
                    {/* <Text>{item.rating}</Text>*/}
                    {
                        item.rating === 5 ?
                        <Image
                            style={{
                                width: 100,
                                height: 20,
                            }}
                            source={require('../../public/five-stars.png')}/> 
                            :
                        item.rating === 4 ?
                            <Image
                                style={{
                                    width: 100,
                                    height: 20,
                                }}
                                source={require('../../public/four-stars.png')}/> 
                                :
                        item.rating === 3 ?
                            <Image
                                style={{
                                    width: 100,
                                    height: 20,
                                }}
                                source={require('../../public/three-stars.png')}/> 
                                :
                        item.rating === 2 ?
                            <Image
                                style={{
                                    width: 100,
                                    height: 20,
                                }}
                                source={require('../../public/two-stars.png')}/> 
                                :
                        item.rating === 1 ?
                            <Image
                                style={{
                                    width: 100,
                                    height: 20,
                                }}
                                source={require('../../public/star.png')}/> 
                                :
                        null
                    }
                    <ButtonComponents
                        onPress={ () => navigation.navigate('DetailMovie', {item})}/>
                  </View>
              </View>
          )
        }}
        ListEmptyComponent={
            <View style={{ alignItems: 'center'}}>
                <Text>
                    No items in this category
                </Text>
            </View>
        }

        ListHeaderComponent={
            <View>
                <View style={styles.mainCategoryContainer}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>
                            Most Viewed</Text>   
                    </View>
                    <View style={styles.seeAllContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('MostViewed', {allMostViewed})}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    horizontal
                    data={mostViewed}
                    keyExtractor={ (item) => item.id}
                    renderItem={ ({ item }) => {
                        return (
                            <ShowMovie
                                image={{uri: item.imageLink}}
                                title={item.title}
                                viewers={item.viewers}
                                isHome={true}/>
                        )
                    }}
                    contentContainerStyle={{flex: mostViewed.length === 0 ? 1:null}}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', flex: 1}}>
                            <Text>
                                No items in this category
                            </Text>
                        </View>
                    }/>
                    <View style={styles.mainCategoryContainer}>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.categoryText}>
                                Recommended
                            </Text>
                        </View>
                        <View style={styles.seeAllContainer}>
                            <TouchableOpacity onPress={ () => navigation.navigate('Recommended', allRecommended)}>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>                    
            </View>
        } 
        // ListFooterComponent={<Text>An array of objects lets you store multiple values in a single variable. It stores a fixed-size sequential collection of elements of th same type. An array is used to store a collection of data, but it is often more useful to think of an array as a collection of variables of the same type.</Text>}
      />     
    </View>
  )
};

const styles = StyleSheet.create({
    mainCategoryContainer: {
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        flexDirection: 'row'
    },
    categoryContainer: {
        flex: 1
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    mainContainer: {
        flex: 1
    },

    flatListContainer: {
        padding: 8,
        
    },

    movieImage: {
        width: 130,
        height: 200,
        borderRadius: 10,
    },

    dataContainer: {
        margin: 8,
        padding: 16,
        borderColor: '#96ceb4',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row'
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    movieDescriptionContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 8,
    },

    yearContainer: {
        marginTop: 8,
        marginBottom: 8,
    },

    seeAllContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    seeAllText: {
        color: '#009688',
        textDecorationLine: 'underline'
    }
});

export default HomeScreen;
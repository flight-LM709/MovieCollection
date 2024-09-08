import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React, {useEffect} from 'react';
import { ShowMovie } from '../components/MovieComponent';

const MostViewedScreen = (props) => {
    const { route } = props;
    const sortedMostViewed = route.params.allMostViewed;

    useEffect( () => {
        console.log(sortedMostViewed.length);
    }, []);

  return (
    <View>
      <FlatList
      contentContainerStyle={styles.mainDataContainer}
      data={sortedMostViewed}
      keyExtractor={ (item) => item.id}
      numColumns={2}
      key={2}
      renderItem={({ item }) => {
        return (
            <ShowMovie
            image={{uri: item.imageLink}}
            title={item.title}
            viewers={item.viewers}/>
        )
      }}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    mainDataContainer: {
        padding: 8,
    },

    movieContainer: {
        margin: 8,
        padding: 16,
        backgroundColor: 'skyblue'
    },
    movieImage: {
        width: 130,
        height: 200
    }
});

export default MostViewedScreen
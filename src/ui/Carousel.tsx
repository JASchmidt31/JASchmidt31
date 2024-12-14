import React, { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

interface CarouselProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
}

const Carousel = <T,>({ data, renderItem }: CarouselProps<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false });

  const handleScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={renderItem}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [width * (index - 1), width * index, width * (index + 1)],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp'
          });

          return <Animated.View key={index.toString()} style={[styles.dot, { width: dotWidth }]} />;
        })}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4
  }
});

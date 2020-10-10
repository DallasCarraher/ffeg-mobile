import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CartIcon} from './Cart';

export const Header = ({toggleCart, items, openCart}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.title}
        onPress={() => {
          toggleCart(false);
        }}>
        <Text style={styles.titleText}>McDallas</Text>
      </TouchableOpacity>
      <CartIcon items={items} openCart={openCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'black',
    color: 'white',
    padding: 15,
  },
  title: {
    flex: 2,
    paddingTop: 4,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

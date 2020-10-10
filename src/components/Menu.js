import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {burger, soda, fries} from './img';

export const Menu = function ({menu, cartHandler}) {
  const [size, setSize] = React.useState(null);
  const [chosenItem, setChosenItem] = React.useState(null);
  const [price, setPrice] = React.useState(0);

  function chooseSize(value, option, itemType, newPrice) {
    setSize(value && option);
    setChosenItem(itemType);
    setPrice(newPrice);
  }

  const itemName = (item) => {
    switch (item) {
      case 'Burger':
        return burger;
      case 'Soda':
        return soda;
      case 'Fries':
        return fries;
      default:
        return fries;
    }
  };

  const renderItem = ({item}) => {
    const name = itemName(item.item);
    return (
      <View key={item.item} style={styles.item}>
        <View>
          <Text style={styles.itemName}>{item.item}</Text>
          <Image source={name} alt={name} style={styles.itemImage} />
        </View>
        <View style={styles.sizeContainer}>
          {item.options.map((option) => {
            return (
              <View key={option.size}>
                <Text style={styles.size}>{option.size}</Text>
                <Switch
                  thumbColor="white"
                  trackColor={{false: '#DCDDDE', true: 'pink'}}
                  onValueChange={(value) => {
                    chooseSize(value, option.size, item.item, option.price);
                  }}
                  value={size === option.size && item.item === chosenItem}
                />
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          style={
            !size || item.item !== chosenItem
              ? styles.addToCartDisabled
              : styles.addToCart
          }
          onPress={() => {
            cartHandler(item, size, price);
            setSize(null);
            setChosenItem(null);
            setPrice(null);
          }}
          disabled={!size || item.item !== chosenItem}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={menu}
      renderItem={renderItem}
      keyExtractor={(item) => item.item}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    width: 300,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'pink',
  },
  itemName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 10,
  },
  itemImage: {
    height: 125,
    width: 100,
    resizeMode: 'contain',
  },
  sizeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  size: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  addToCart: {
    backgroundColor: 'pink',
    marginTop: 50,
    marginRight: 10,
    height: 40,
    width: 100,
    borderRadius: 10,
  },
  addToCartDisabled: {
    backgroundColor: '#DCDDDE',
    marginTop: 50,
    marginRight: 10,
    height: 40,
    width: 100,
    borderRadius: 10,
  },
  addToCartText: {
    paddingTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

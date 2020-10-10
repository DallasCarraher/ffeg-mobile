import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {cart} from './img';
import keygen from './utils';

export function Cart({items, setItems, sendToPayment, total, setTotal}) {
  return (
    <ScrollView>
      <Text style={styles.yourOrder}>Your Order</Text>
      <View style={styles.cart}>
        <>
          {!items.length && <Text style={styles.emptyCart}>Cart is Empty</Text>}
          {items.map((item) => (
            <View key={keygen()} style={styles.item}>
              <Text style={styles.itemDesc}>
                {`${item.size.substr(0, 3).toUpperCase()} -  ${
                  item.name
                } - $${item.price.toFixed(2)}`}
              </Text>
              <TouchableOpacity
                style={styles.remove}
                onPress={() => {
                  let newItems = items.filter(
                    (foodItem) => foodItem.id !== item.id,
                  );
                  setItems(newItems);
                  let newTotal = 0;
                  newItems.forEach((food) => {
                    newTotal += food.price;
                  });
                  setTotal(newTotal);
                }}>
                <Text style={styles.removeText}>remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
        {!!items.length && (
          <>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.completeOrder}
              onPress={() => {
                sendToPayment(items);
              }}>
              <Text style={styles.completeOrderText}>Complete Order</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  yourOrder: {
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  cart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  emptyCart: {
    fontSize: 20,
    color: 'red',
  },
  item: {display: 'flex', flexDirection: 'row'},
  itemDesc: {fontSize: 18},
  remove: {margin: 5, borderRadius: 10},
  removeText: {
    marginLeft: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
    height: 22,
    width: 70,
    textAlign: 'center',
    color: 'white',
  },
  total: {fontSize: 30, fontWeight: 'bold', margin: 20},
  completeOrder: {
    height: 50,
    width: '80%',
    marginBottom: 50,
    backgroundColor: 'pink',
    borderRadius: 10,
    justifyContent: 'center',
  },
  completeOrderText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export function CartIcon({items, openCart}) {
  const empty = items.length === 0;
  return (
    <TouchableOpacity style={iconStyles.cartIconContainer} onPress={openCart}>
      <Text style={iconStyles.cartCount}>
        {empty && '0'}
        {!empty && items.length}
      </Text>
      <Image source={cart} style={iconStyles.cartIcon} />
    </TouchableOpacity>
  );
}

const iconStyles = StyleSheet.create({
  cartIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartIcon: {height: 40, width: 40},
  cartCount: {
    paddingTop: 8,
    paddingRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

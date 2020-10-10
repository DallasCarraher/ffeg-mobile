import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
  NativeModules,
  Platform,
} from 'react-native';
// import menuMock from './__mocks__/menu.json'
import keygen from './src/utils';
import {url} from './src/constants';
import {Header, Cart, Menu} from './src/components';

const App = () => {
  const [menu, setMenu] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [cart, toggleCart] = React.useState(false);
  const [total, setTotal] = React.useState(0);

  function openCart() {
    toggleCart(true);
  }

  React.useEffect(() => {
    (async function getMenu() {
      const res = await fetch(url);
      const body = await res.json();
      setMenu(body.menu);
    })();
  }, []);

  function addToCart(item, size, price) {
    setTotal(total + price);
    const newItem = {id: keygen(), name: item.item, size, price};
    const updatedCart = [...items, newItem];
    setItems(updatedCart);
  }

  function sendToPayment(order) {
    console.table(order);
    setTotal(0);
    setItems([]);
    toggleCart(false);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <Header toggleCart={toggleCart} items={items} openCart={openCart} />
        {!cart ? (
          <Menu menu={menu} cartHandler={addToCart} />
        ) : (
          <Cart
            items={items}
            setItems={setItems}
            sendToPayment={sendToPayment}
            total={total}
            setTotal={setTotal}
          />
        )}
      </SafeAreaView>
      <Developer />
    </>
  );
};

let devMode = __DEV__;
devMode = false;

const Developer = () =>
  devMode && (
    <Pressable
      onPress={() => {
        Platform.OS === 'android' ? null : NativeModules.DevMenu.show();
      }}
      style={styles.developer}>
      <Text style={styles.devButtonText}>👨‍💻</Text>
    </Pressable>
  );

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  developer: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    padding: 20,
    backgroundColor: '#0083ff',
    opacity: 0.8,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  devButtonText: {color: 'white', fontSize: 20},
});

export default App;

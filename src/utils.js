/* eslint-disable no-bitwise */
// common utilities

export default function keygen() {
  return 'yxx-xxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

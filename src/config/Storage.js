/* eslint-disable */
import Des from './Des.js'
export default {
  save(key, value) {
    var encodeKey = Des.strEnc(key, "5NROXxN^gI%St2Xi", "1", "2");
    var encodeValue = Des.strEnc(JSON.stringify(value), "5NROXxN^gI%St2Xi", "1", "2");
    window.localStorage.setItem(encodeKey, encodeValue);
  },
  find(key) {
    var encodeKey = Des.strEnc(key, "5NROXxN^gI%St2Xi", "1", "2");
    var base64Value = window.localStorage.getItem(encodeKey);
    if (base64Value == null) {
      return null;
    }
    var decodeValue = Des.strDec(base64Value, "5NROXxN^gI%St2Xi", "1", "2");
    var value = JSON.parse(decodeValue)
    return value;
  },
  saveSession(key, value) {
    var encodeKey = Des.strEnc(key, "5NROXxN^gI%St2Xi", "1", "2");
    var encodeValue = Des.strEnc(JSON.stringify(value), "5NROXxN^gI%St2Xi", "1", "2");
    window.sessionStorage.setItem(encodeKey, encodeValue);
  },
  querySession(key) {
    var encodeKey = Des.strEnc(key, "5NROXxN^gI%St2Xi", "1", "2");
    var base64Value = window.sessionStorage.getItem(encodeKey);
    if (base64Value == null) {
      return null;
    }
    var decodeValue = Des.strDec(base64Value, "5NROXxN^gI%St2Xi", "1", "2");
    var value = JSON.parse(decodeValue)
    return value;
  }
}

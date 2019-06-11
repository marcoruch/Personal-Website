


export function GetHashCodeFromString(str) {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };


export function TryGetUniqueKey(length){

  var amount = length / 11;
  var string = "";

  for (let index = 0; index < amount; index++) {
    string += Math.random().toString(36).substring(2, 15);
  }
  return string.substr(0,length);
}

export function ArrayContains(a, obj) {
  var i = a.length;
  while (i--) {
     if (a[i] === obj) {
         return true;
     }
  }
  return false;
}
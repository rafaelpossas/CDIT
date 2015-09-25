/*
    Given a String array, convert it to an
    array of bytes.
 */
String.prototype.stringToBytes = function() {
    var ch, st, re = [];
    str = this;
    for (var i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);  // get char
        st = [];                 // set up "stack"
        do {
            st.push(ch & 0xFF);  // push byte to stack
            ch = ch >> 8;          // shift value down by 1 byte
        }
        while (ch);
        // add stack contents to result
        // done because chars have "wrong" endianness
        re = re.concat(st.reverse());
    }
    // return an array of bytes
    return re;
}
/*
    Give a bit shift, creates a hashcode
    for a string. Bit shifts will always be
    done to the left.
 */
String.prototype.hashCode = function(shift){
    var hash = 0;
    var word = this;
    var bytes = word.stringToBytes();
    if (word.length == 0) return hash; // Generates the hash based on each bit of the array
    for (i = 0; i < bytes.length; i++) {
        hash = ((hash<< shift)-hash)+bytes[i]; // Shifts two bits to the left
        hash = hash & hash; // Convert to 32bit integer
    }
    var result = Math.abs(hash);
    return result;
}

String.prototype.fnvHash = function() {
    var FNVINIT = 0x811c9dc5;
    var FNVPRIME = 0x01000193;

    var str = this;

    var bytes = str.stringToBytes();
    var hash = FNVINIT;
    for (var i = 0; i < bytes.length; i++) {
        hash *= FNVPRIME;
        hash ^= bytes[i];
    }
    var result = Math.abs(hash);

    return result;
}

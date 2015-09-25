var BloomFilter = function(bitArraySize){

    this.bitArraySize = bitArraySize;
    this.bitArray = [];

    for (var i=0;i<this.bitArraySize;i++){
        this.bitArray.push(0);
    }
    /*
        Gets the two Bloom positions according
        the word. The two hash functions are applied
        and then position is generated.
        @return array
     */
    var getBloomPositions = function(word){
        var hash_1 = word.hashCode(4); // Get the hash with 2 bit shifts to the left
        var hash_2 = word.hashCode(5); // Get the hash with 5 bit shifts to the left

        var bitposition_1 = hash_1%bitArraySize; // the remainder will always be less than the bit array size.
        var bitposition_2 = hash_2%bitArraySize; // the remainder will always be less than the bit array size.

        return [bitposition_1,bitposition_2];
    }

    BloomFilter.prototype.addBloom = function(word){

        var bloomPositions = getBloomPositions(word);

        var bitposition_1 = bloomPositions[0];
        var bitposition_2 = bloomPositions[1];

        this.bitArray[bitposition_1] = 1;
        this.bitArray[bitposition_2] = 1;

    }

    /*
        Gets the number of positions in the bitmap
        that are marked with 1
        @return Number
     */
    BloomFilter.prototype.getBloomMappings = function(){

        var size = 0;

        this.bitArray.forEach(function(bit){
            if(bit === 1){
                size++;
            }
        });

        return size;

    }
    /*
        Verifies through the bitmap if the word
        is present in the bloomfilter
        @return boolean
     */
    BloomFilter.prototype.isMatch = function(word){
        var bloomHash = getBloomPositions(word);

        if(this.bitArray[bloomHash[0]] && this.bitArray[bloomHash[1]]) return true;

        else return false;
    }

    BloomFilter.prototype.addWordsFromFile = function(file){

        var promise = new Promise(function(resolve,reject){
            if (file) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var result = reader.result;
                    resolve(result);
                }

                reader.readAsText(file);
            }else{
                reject("File not found!");
            }
        });
        return promise;
    }


}

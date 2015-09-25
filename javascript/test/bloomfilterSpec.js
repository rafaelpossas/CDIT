//
// Tests the bloomfilter operations
//
//
// Tests were coded based on the expected behavior of the
// application.
//
//
//
// Basic Functionality test plan
//
// * Bloomfilter can be instantiated with a specific bitmap size
// * Bloomfilter should add a word to bitmap based on its hash
// * Bloomfilter should match the word added previously to the bitmap
// * Bloomfilter should not match a word that was not added to the Bloomfilter;
//
//
describe("bloomfilter",function(){

    var bloomSize = 15;
    var bloomfilter

    beforeEach(function(){
        bloomfilter = new BloomFilter(bloomSize);
    });

    it("should initialize the array with the bloom size",function(){

        expect(bloomfilter.bitArray.length).toBe(bloomSize);
    });

    it("should add a word to the bloomfilter based on its hash",function(){
       bloomfilter.addBloom("Rafael");

       var bloomMappings = bloomfilter.getBloomMappings();

        expect(bloomMappings).toBe(2);
    });

    it("should match a word added to the bloomfilter",function(){
        bloomfilter.addBloom("Rafael");

        var isMatch = bloomfilter.isMatch("Rafael");

        expect(isMatch).toBe(true);


    });
    it("should not match a word not added to the bloomfilter",function(){
        bloomfilter.addBloom("Rafael");

        var isMatch = bloomfilter.isMatch("Diego");

        expect(isMatch).toBe(false);


    });
})

/**
 * Created by rafaelpossas on 25/09/15.
 */
(function(){
    window.onload = function() {

        var bloomFilter = new BloomFilter(64);

        fileInput.addEventListener('change',function(e){
            bloomFilter.addWordsFromFile(fileInput.files[0])
                .then(function(data){
                    data.split('\n').forEach(function(w){
                        bloomFilter.addBloom(w);
                    });

                    fileDisplayArea.innerText = '\n'+data;
                });
        });

        $('#btnTest').on('click',function(btn){
            if(bloomFilter.isMatch($("#membership").val())){
                $("#ismember").html("maybe!");
            }else{
                $("#ismember").html("no");
            }
        })
    }
})();

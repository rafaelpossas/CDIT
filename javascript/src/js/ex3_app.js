/**
 * Created by rafaelpossas on 25/09/15.
 */
(function(){
    window.onload = function() {
        var countingCode = new CountingCode();

        fileInput.addEventListener('change',function(e){
            countingCode.readLines(fileInput.files[0])
                .then(function(data){
                    fileDisplayArea.innerText = "Number of Lines of Code: "+data.count+'\n\n'+data.result;
                });
        });
    }
})();

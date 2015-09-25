
var CountingCode = function(){
    this.count;
    var regex = {
        blank: /^\s*\t*$/, // If the line is blank with either spaces or tabs
        singleLineComment: /^\s*\t*\/\/.*/, // If the line is only composed by a single line comment
        startEndMultilineComment: /(^\s*\t*\/\*)((?!\*\/)[\s\t\S])*(\**\/+)(\/{2,}[\s\t\S]*)*$/, // If the multline comment starts and ends in the same line
        startMultilineComment: /^(\s*\t*\/\*)((?!\*\/)[\s\S\t])*$/, // If the multiline comment starts but does not finish in the same line
        onGoingMultilineComment: /((?!\*\/)[\s\S\t])*/, // If there is an ongoing comment that was not previously closed
        endMultilineComment: /(\**\/+)(\/{2,}[\s\t\S]*)*$/, // If the line represents the end of a Multiline comment
        code: /^.*\s*/ // If the line represents code.
    };

    var getLineType = function(line,openMultiLineComment) {

        var type;

        if (line.match(regex.blank) && !openMultiLineComment) {

            type = 'blank';

        } else if(line.match(regex.singleLineComment) && !openMultiLineComment){

            type = "singleLineComment";

        } else if(line.match(regex.startEndMultilineComment) && !openMultiLineComment){

            type = "startEndMultilineComment";

        } else if (line.match(regex.startMultilineComment) && !openMultiLineComment) {

            type = 'startMultilineComment';

        } else if (line.match(regex.endMultilineComment) && openMultiLineComment) {

            type = 'endMultilineComment';

        } else if(line.match(regex.onGoingMultilineComment) && openMultiLineComment){

            type = 'onGoingMultilineComment'

        } else if (line.match(regex.code) && !openMultiLineComment) {

            type = 'code';

        }

        return type;

    }
    var countLines = function (text){
        var lines = text.split('\n');
        var count = 0;
        var openMultiLineComment = false;
        var type;

        lines.forEach(function(line){
            type = getLineType(line,openMultiLineComment);
            if(type == 'code'){
                count++;
                openMultiLineComment = false; // If a code was detected it means that the Multiline comment was closed
            }else if(type == 'startMultilineComment'){
                openMultiLineComment = true; // Flags that there is an open multiline comment going
            }else if(type == 'endMultilineComment'){
                openMultiLineComment = false; // Flags that the comment was properly closed
            }
        });
        return count;
    }
    var readLines = function (file) {

        var promise = new Promise(function(resolve,reject){
            if (file) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var result = reader.result;
                    var count = countLines(result);
                    var detail = {
                        count: count,
                        result: result
                    }
                    resolve(detail);
                }

                reader.readAsText(file);
            }else{
                reject("File not found!");
            }
        });
        return promise;

    }
    CountingCode.prototype.countLines = countLines;
    CountingCode.prototype.getLineType = getLineType;
    CountingCode.prototype.readLines = readLines;




}

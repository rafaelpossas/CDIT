//
// Tests the Counting Code functionalities
//
//
// Tests were coded based on the expected behavior of the
// application.
//
//
//
// Basic Functionality test plan
//
// * The class should be able to recognize 7 types of lines:
//       - blank line: This line only have spaces and tabs
//       - Single line comment: If this line starts with // before any text its a single line comment
//       - Start and End Multiline comment: This pattern occurs when the comment is both started and ended in the same line
//       - Start of Multiline Comment: Occurs when a multiline comment was started but not finished in the same line.
//       - On going Multiline Comment: Occurs when the multiline comment was previously opened and was not yet closed
//       - End of Multiline Comment: Occurs when a multiline comment was ended within that line
//       - Code: Whenever none of those previous patterns where found than the text is a code.
// * The class should receive a full code and return the name of lines of code within that code snippet.
//
//
describe("countingCode",function(){

    var cc;
    beforeAll(function(){
        cc = new CountingCode();
    });
    it("should be able to identify a blank line",function(){
        var lineType = cc.getLineType("\t    ",false);
        expect(lineType).toBe("blank");
    });
    it("should be able to identify a start multiline comments",function(){
        var lineType = cc.getLineType("/** This starts a multiline comment",false);
        expect(lineType).toBe("startMultilineComment");
    });
    it("should be able to identify an end of multi line comment",function(){
        var lineType = cc.getLineType("This is a single line comment*/",true);
        expect(lineType).toBe("endMultilineComment");
    });

    it("should be able to identify a start and end of multiline comments in the same line",function(){
        var lineType = cc.getLineType("/** This starts and ends multiline comment*/",false);
        expect(lineType).toBe("startEndMultilineComment");
    });

    it("should be able to identify an ongoing multi line comment",function(){
        var lineType = cc.getLineType("This is a single line comment",true);
        expect(lineType).toBe("onGoingMultilineComment");
    });
    it("should be able to identify a single line comment",function(){
        var lineType = cc.getLineType("// This is a single line comment",false);
        expect(lineType).toBe("singleLineComment");
    });

    it("should be able to identify a line of code",function(){
        var lineType = cc.getLineType("System.out.println('Cheers Mate')",false);
        expect(lineType).toBe("code");
    });

    it("should be able to read and entire file and return the number of code lines",function(){
        var code = '/** This is a multiline comment*/\n//Single line comment\npublic class Hello {\n System./*wait*/out./*for*/println/*it*/("Hello/*");\n}';
        expect(cc.countLines(code)).toBe(3);
    })



})

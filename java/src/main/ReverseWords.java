package main;


import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ReverseWords {

	public String reverseWordsCollection(String snt){
		
		if(snt.trim().isEmpty()){
			return snt;
		}
		
        List<String> sntArray = Arrays.asList(snt.split("\\s"));
        Collections.reverse(sntArray);
        
        StringBuilder reverseSnt = new StringBuilder(snt.length());
        
        sntArray.forEach(w -> reverseSnt.append(w+' '));
 
        return reverseSnt.toString().trim();
        
	}
	
	
}

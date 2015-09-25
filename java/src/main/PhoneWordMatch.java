package main;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class PhoneWordMatch {
	
    char[][] letters = 
        {{'0'},{'1'},{'A','B','C'},{'D','E','F'},{'G','H','I'},{'J','K','L'}, 
        {'M','N','O'},{'P','Q','R','S'},{'T','U','V'},{'W','X','Y','Z'}};
    
	public List<String> allWords;
	
	
	public PhoneWordMatch(String filePath)
	{
		try{
			allWords = readFile(filePath);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	public PhoneWordMatch()
	{
		try{
			allWords = readFile(System.getProperty("user.dir")+"/src/en_words.txt");
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	/*
	 * Reads a phone number and gets all possible words for that phone
	 * 
	 */
	public List<String> getAllWordsByPhone(char[] phoneNumber){
		
		char[][] phoneLetters = new char[phoneNumber.length][];
		int i=0;
		
		for (char c : phoneNumber) {
			
			phoneLetters[i] = letters[c-'0']; // Transforming to String
			i++;
		}
		List<String> permutations = new ArrayList<>();
		getPermutations(phoneLetters, 0, "",permutations);
		
		
		return permutations;
	}
	/*
	 * This function goes recursively in a depth search tree algorithm making all the combinations
	 * for the given phone. The algorithm tests if the current pattern ( length > 1) is found within
	 * the words, if it is not found we can discard that branch of the tree and go to another one.
	 * @return: changes permutation array on function parameters
	 */
	public void getPermutations(char[][] phoneLetters,int position,String current,List<String> permutations){
        if (position == phoneLetters.length) { // If the word has reached its maximum size
        	// If the word matches the word list, add it to the permutation array.
        	allWords.stream().map(String::toUpperCase).filter(w -> w.equals(current)).forEach(w -> permutations.add(w));
            return;
        
        }else if(!current.equals("") && current.length() > 1){ // If the word has more than 1 letter
        	Boolean isPresent = allWords.stream().map(String::toUpperCase) // Check to see if the words file have words starting with the current pattern
        										 .filter(w -> w.startsWith(current))
        										 .findAny()
        										 .isPresent();      									
        	if(!isPresent) return;
        }
	

        // Recursively search the arrays for all combinations.
        for (int i = 0; i < phoneLetters[position].length; i ++) {
        	getPermutations(phoneLetters, position+1, current + phoneLetters[position][i],permutations);
        }
	}
	public List<String> readFile(String path) throws IOException {
		
		List<String> words = new ArrayList<>();
		
		try (Stream<String> stream = Files.lines(Paths.get(path),Charset.defaultCharset())) {
            stream.forEach(w -> words.add(w));
		}
		return words;
	}


}

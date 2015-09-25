package main;

import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;


/**
 * @author rafaelpossas
 *
 */
public class Main {

	/**
	 * @param args
	 */
	

    public static void main(String[] args) {
    	PhoneWordMatch phwm;
    	ReverseWords rw = new ReverseWords();
    	
    	if(args.length > 0){
    		phwm = new PhoneWordMatch(args[0]);
    	}else{
    		phwm = new PhoneWordMatch();
    	}
    	if(phwm != null){
    		phwm.getAllWordsByPhone("2226366377".toCharArray()).forEach(System.out::println);
    	}

		String given = "This is a test";
		String result = rw.reverseWordsCollection(given);

		System.out.println(result);
		
    }


}

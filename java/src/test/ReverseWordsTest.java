package test;
import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import main.ReverseWords;

public class ReverseWordsTest {
	

	ReverseWords rw;
	
	@Before
	public void setUp() throws Exception {
		rw = new ReverseWords();
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void reverseSpacedSentence() {
		
		String given = "This is a test";
		String expected = "test a is This";
		String result = rw.reverseWordsCollection(given);

		assertTrue(expected.equals(result));		
		
	}
	
	

}

package test;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import main.PhoneWordMatch;

public class PhoneWordMatchTest {
	PhoneWordMatch pwm;
	@Before
	public void setUp() throws Exception {
		pwm = new PhoneWordMatch();
	}
	@Test
	public void getWordsByNumber() {
		List<String> words = pwm.getAllWordsByPhone("2226366377".toCharArray());
		assertTrue(words.size() > 0);
	}
	@Test
	public void noMatchWordForNumber() {
		List<String> words = pwm.getAllWordsByPhone("2222222221".toCharArray());
		assertTrue(words.size() == 0);
	}

}

package com.triplelift.shared.util;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import java.text.ParseException;
import java.time.Instant;

import org.junit.Test;

public class ConsentStringParserTest {

	@Test
	public void testBitField() throws ParseException {
		String consentString = "BN5lERiOMYEdiAOAWeFRAAYAAaAAptQ";

		ConsentStringParser consent = new ConsentStringParser(consentString);
		assertEquals(14, consent.getCmpID());
		assertEquals(22, consent.getCmpVersion());
		assertEquals("FR", consent.getConsentLanguage());
		assertEquals(Instant.ofEpochMilli(14924661858L * 100), consent.getCookieCreated());
		assertEquals(Instant.ofEpochMilli(15240021858L * 100), consent.getCookieLastUpdated());
		assertEquals(24, consent.getPurposes().size());
		assertTrue(consent.isPurposeAllowed(2));
		assertFalse(consent.isPurposeAllowed(1));
		assertTrue(consent.isPurposeAllowed(21));
		assertTrue(consent.isVendorAllowed(1));
		assertTrue(consent.isVendorAllowed(5));
		assertTrue(consent.isVendorAllowed(7));
		assertTrue(consent.isVendorAllowed(9));
		assertFalse(consent.isVendorAllowed(0));
		assertFalse(consent.isVendorAllowed(10));
		assertEquals(consentString, consent.getConsentString());
	}

	@Test
	public void testRangeEntry() throws ParseException {
		String consentString = "BN5lERiOMYEdiAKAWXEND1HoSBE6DAFAApAMgBkIDIgM0AgOJxAnQA";

		ConsentStringParser consent = new ConsentStringParser(consentString);
		assertEquals(10, consent.getCmpID());
		assertEquals(22, consent.getCmpVersion());
		assertEquals("EN", consent.getConsentLanguage());
		assertEquals(Instant.ofEpochMilli(14924661858L * 100), consent.getCookieCreated());
		assertEquals(Instant.ofEpochMilli(15240021858L * 100), consent.getCookieLastUpdated());
		assertEquals(24, consent.getPurposes().size());
		assertTrue(consent.isPurposeAllowed(4));
		assertFalse(consent.isPurposeAllowed(1));
		assertTrue(consent.isPurposeAllowed(24));
		assertFalse(consent.isVendorAllowed(1));
		assertFalse(consent.isVendorAllowed(3));
		assertTrue(consent.isVendorAllowed(225));
		assertTrue(consent.isVendorAllowed(5000));
		assertTrue(consent.isVendorAllowed(515));
		assertFalse(consent.isVendorAllowed(0));
		assertFalse(consent.isVendorAllowed(3244));
		assertEquals(consentString, consent.getConsentString());

	}

}

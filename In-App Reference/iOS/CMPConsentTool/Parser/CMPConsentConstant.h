//
//  CMPConsentConstant.h
//  GDPR
//
//  Created by Smaato Inc on 23.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
//

#ifndef CMPConsentConstant_h
#define CMPConsentConstant_h

static int VERSION_BIT_OFFSET = 0;
static int VERSION_BIT_LENGTH = 6;

static int CREATED_BIT_OFFSET = 6;
static int CREATED_BIT_LENGTH = 36;

static int LAST_UPDATED_BIT_OFFSET = 42;
static int LAST_UPDATED_BIT_LENGTH = 36;

static int CMP_ID_BIT_OFFSET = 78;
static int CMP_ID_BIT_LENGTH = 12;

static int CMP_VERSION_BIT_OFFSET = 90;
static int CMP_VERSION_BIT_LENGTH = 12;

static int CONSENT_SCREEN_BIT_OFFSET = 102;
static int CONSENT_SCREEN_BIT_LENGTH = 6;

static int CONSENT_LANGUAGE_BIT_OFFSET = 108;
static int CONSENT_LANGUAGE_BIT_LENGTH = 12;

static int VENDOR_LIST_BIT_OFFSET = 120;
static int VENDOR_LIST_BIT_LENGTH = 12;

static int PURPOSES_ALLOWED_BIT_OFFSET = 132;
static int PURPOSES_ALLOWED_BIT_LENGTH = 24;

static int MAX_VENDOR_ID_BIT_OFFSET = 156;
static int MAX_VENDOR_ID_BIT_LENGTH = 16;

static int ENCODING_TYPE_BIT = 172;

static int BIT_FIELD_BIT_OFFSET = 173;

static int DEFAULT_CONSENT_BIT = 173;

static int NUM_ENTRIES_BIT_OFFSET = 174;
static int NUM_ENTRIES_BIT_LENGTH = 12;

static int SINGLE_VENDOR_ID_BIT_LENGTH = 16;

static int START_VENDOR_ID_BIT_LENGTH = 16;

static int END_VENDOR_ID_BIT_LENGTH = 16;

#endif /* CMPConsentConstant_h */

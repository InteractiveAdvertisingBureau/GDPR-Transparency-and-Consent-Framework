package com.smaato.soma.cmpconsenttooldemoapp.cmpconsenttool.model;

import java.util.ArrayList;
import java.util.List;

class RangeSection {

    private char defaultConsent;
    private int numEntries;
    private List<RangeEntry> entries;

    char getDefaultConsent() {
        return defaultConsent;
    }

    void setDefaultConsent(char defaultConsent) {
        this.defaultConsent = defaultConsent;
    }

    int getNumEntries() {
        return numEntries;
    }

    void setNumEntries(int numEntries) {
        this.numEntries = numEntries;
    }

    List<RangeEntry> getEntries() {
        if (entries == null) {
            entries = new ArrayList<>();
        }

        return entries;
    }

    void setEntries(List<RangeEntry> entries) {
        this.entries = entries;
    }

    @Override
    public String toString() {
        return "\ndefaultConsent=" + defaultConsent +
                "\nnumEntries=" + numEntries +
                "\nentries=" + entries;
    }
}

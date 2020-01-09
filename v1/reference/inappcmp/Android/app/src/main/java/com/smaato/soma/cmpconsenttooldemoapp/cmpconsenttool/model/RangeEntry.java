package com.smaato.soma.cmpconsenttooldemoapp.cmpconsenttool.model;

class RangeEntry {

    private char singleOrRange;
    private String singleVendorId;
    private String startVendorId;
    private String endVendorId;

    char getSingleOrRange() {
        return singleOrRange;
    }

    void setSingleOrRange(char singleOrRange) {
        this.singleOrRange = singleOrRange;
    }

    String getSingleVendorId() {
        return singleVendorId;
    }

    void setSingleVendorId(String singleVendorId) {
        this.singleVendorId = singleVendorId;
    }

    String getStartVendorId() {
        return startVendorId;
    }

    void setStartVendorId(String startVendorId) {
        this.startVendorId = startVendorId;
    }

    String getEndVendorId() {
        return endVendorId;
    }

    void setEndVendorId(String endVendorId) {
        this.endVendorId = endVendorId;
    }

    @Override
    public String toString() {
        return "\nsingleOrRange=" + singleOrRange +
                "\nsingleVendorId=" + singleVendorId +
                "\nstartVendorId=" + startVendorId +
                "\nendVendorId=" + endVendorId;
    }
}

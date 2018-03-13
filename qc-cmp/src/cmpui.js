import 'style-loader!./assets/cmpui.css';
import page1 from 'html-loader?minimize=true!./assets/cmpui-page1.html';
import page2 from 'html-loader?minimize=true!./assets/cmpui-page2.html';
import page3 from 'html-loader?minimize=true!./assets/cmpui-page3.html';

/**
 * Quantcast's Reference Consent Manager Implementation
 */
window.__cmpui = new function(win) {
  // TODO: Determine if we need pending calls for the cmp ui. Seems unlikely
  if (win.__cmpui) {
    return win.__cmpui;
  }

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
  // *                        Consent UI Functions                       * \\
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\

  var consentUiPage = {
    1: {
      html: page1
    },
    2: {
      html: page2,
      init: function() {
        populatePurposes();
      }
    },
    3: {
      html: page3,
      init: function() {
        populateVendorList();
      }
    }
  };

  var isConsentUiShowing = function() {
    return !!document.getElementById('qcCmpUi');
  };

  var updateConsentUi = function(pageNum) {
    var consentUi = document.getElementById('qcCmpUi');
    consentUi.innerHTML = consentUiPage[pageNum].html;

    if (consentUiPage[pageNum].init) {
      consentUiPage[pageNum].init();
    }
  };

  var initConsentUi = function(pageNum) {
    if (isConsentUiShowing()) {
      updateConsentUi(pageNum);
    } else {
      // Add the consent banner as the top element in the body
      var consentUiContainer = document.createElement('div');
      consentUiContainer.className = 'qc-cmp-ui-container';

      var consentUi = document.createElement('div');
      consentUi.className = 'qc-cmp-ui';
      consentUi.id = 'qcCmpUi';
      consentUi.innerHTML = consentUiPage[pageNum].html;

      consentUiContainer.appendChild(consentUi);

      document.body.insertBefore(consentUiContainer, document.body.childNodes[0]);

      if (consentUiPage[pageNum].init) {
        consentUiPage[pageNum].init();
      }

      // TODO: (bgustaf) implement .add for IE < 10.
      // https://github.com/eligrey/classList.js/blob/master/classList.js
      setTimeout(function() {
        document.body.classList.add('qc-cmp-ui-showing');
        consentUiContainer.classList.add('qc-cmp-showing');
        consentUi.classList.add('qc-cmp-showing');
      }, 250);
    }
  };

  var dismissConsentUi = function() {
    // TODO: (bgustaf) implement .remove for IE < 10.
    // https://github.com/eligrey/classList.js/blob/master/classList.js
    var consentManagerUiContainer = document.getElementsByClassName('qc-cmp-ui-container')[0];
    consentManagerUiContainer.classList.remove('qc-cmp-showing');
    consentManagerUiContainer.childNodes[0].classList.remove('qc-cmp-showing');

    setTimeout(function() {
      consentManagerUiContainer.outerHTML = '';
      document.body.classList.remove('qc-cmp-ui-showing');
    }, 250);

    window.__cmp('runConsentUiCallback');
  };

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
  // *                         Shared Components                         * \\
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\

  var createToggle = function(toggleState) {
    var toggleIcon = document.createElement('span');
    toggleIcon.className = 'qc-cmp-toggle qc-cmp-toggle-' + (toggleState ? 'on' : 'off');
    toggleIcon.innerHTML = '<span class="qc-cmp-toggle-switch"></span>';
    return toggleIcon;
  };

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
  // *                   Consent UI Purposes Functions                   * \\
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\

  var enableAllPurposeConsents = function() {
    var consentToggles = document.getElementsByClassName('qc-cmp-toggle');
    for (var i = 0; i < consentToggles.length; i++) {
      if (consentToggles[i].classList.contains('qc-cmp-toggle-off')) {
        // TODO: (bgustaf) determine if we can just set all vendor and purpose consents to
        //       true as this would speed up execution time.
        togglePurposeConsent(i);
      }
    }
  };

  var togglePurposeConsent = function(index) {
    purposeConsents[index] = !purposeConsents[index];
    updatePurposeVendorsConsent(index);
    updatePurposeTabForConsentChange(index);
  };

  /**
   * Updates the consent of all the vendors requesting a given purpose.
   *  If the given purpose's consent is set to true, any vendors requesting
   *    that purpose have it's consent set to true.
   *  If the given purpose's consent is set to false, any vendors requesting
   *    that purpose that currently have consent will be checked to verify that
   *    at least one of the purposes they are requesting has consent. If none
   *    of the vendor's purposes have consent, the vendor's consent will be set
   *    to false.
   *
   * @param {number} index - the index of the purpose in the purposes array
   */
  var updatePurposeVendorsConsent = function(index) {
    var purposeVendors = purposes[index].vendors;
    for (var i = 0; i < purposeVendors.length; i++) {
      var vendorPurposes = vendors[purposeVendors[i].index].purposeIds;
      var vendorConsent = vendorConsents[purposeVendors[i].index];
      if (purposeConsents[index]) {
        vendorConsent = true;
      } else if (vendorConsent) {
        vendorConsent = false;
        for (var j = 0; j < vendorPurposes.length; j++) {
          if (purposeConsents[vendorPurposes[j] - 1]) {
            vendorConsent = true;
            break;
          }
        }
      }
      vendorConsents[purposeVendors[i].index] = vendorConsent;
    }
  };

  var updatePurposeTabForConsentChange = function(index) {
    // toggle the on/off toggle
    var consentToggle = document.getElementsByClassName('qc-cmp-toggle')[index];
    // TODO: (bgustaf) implement .toggle for IE < 10.
    // https://github.com/eligrey/classList.js/blob/master/classList.js
    consentToggle.classList.toggle('qc-cmp-toggle-on');
    consentToggle.classList.toggle('qc-cmp-toggle-off');

    // update the toggle status
    var consentStatus = document.getElementsByClassName('qc-cmp-toggle-status')[index];
    consentStatus.innerText = purposeConsents[index] ? 'Active' : 'Inactive';

    // update the purposes vendor list to be correctly enabled or disabled
    var purposeVendorList = document.getElementsByClassName('qc-cmp-vendor-list')[index];
    var vendorEnabledCells = purposeVendorList.getElementsByClassName('qc-cmp-enabled-cell');
    for (var i = 0; i < vendorEnabledCells.length; i++) {
      vendorEnabledCells[i].innerHTML = purposeConsents[index] ? 'Enabled' : 'Disabled';
    }
  };

  var createTab = function(name, index) {
    var tab = document.createElement('li');
    tab.innerText = name;
    tab.className = 'qc-cmp-tab' + (index ? '' : ' qc-cmp-active');
    tab.onclick = function() {
      window.__cmpui('showTab', index);
    };

    return tab;
  };

  var createTabHeader = function(name, index) {
    var tabHeader = document.createElement('h3');
    tabHeader.innerText = name;
    tabHeader.className = 'qc-cmp-tab-header' + (index ? '' : ' qc-cmp-active');
    tabHeader.onclick = function() {
      window.__cmpui('showTab', index);
    };

    return tabHeader;
  };

  var createTabContent = function(purpose, index) {
    var purposeConsent = purposeConsents[index];
    var toggleStateText = purposeConsent ? 'Active' : 'Inactive';

    // purpose consent toggle
    var toggleIcon = createToggle(purposeConsent);
    toggleIcon.onclick = function() {
      window.__cmpui('togglePurposeConsent', index);
    };

    // purpose consent status
    var toggleStatus = document.createElement('div');
    toggleStatus.className = 'qc-cmp-toggle-status';
    toggleStatus.innerText = toggleStateText;

    // purpose consent toggle container
    var toggleContainer = document.createElement('div');
    toggleContainer.className = 'qc-cmp-toggle-container';
    toggleContainer.appendChild(toggleIcon);
    toggleContainer.appendChild(toggleStatus);

    // purpose tab title
    var tabTitle = document.createElement('h2');
    tabTitle.className = 'qc-cmp-sub-title';
    // TODO: try to change the spec so purpose objects purpose property can be
    // renamed to name.
    tabTitle.innerText = purpose.purpose;

    // purpose tab title container
    var tabTitleContainer = document.createElement('div');
    tabTitleContainer.className = 'qc-cmp-sub-title-container';
    tabTitleContainer.appendChild(tabTitle);
    tabTitleContainer.appendChild(toggleContainer);

    // purpose tab description
    var tabDescription = document.createElement('p');
    tabDescription.className = 'qc-cmp-messaging';
    tabDescription.innerText = purpose.description;

    // purpose vendors list
    var vendorsListBody = document.createElement('tbody');

    for (var i = 0; i < purpose.vendors.length; i++) {
      var vendorCell = document.createElement('td');
      vendorCell.className = 'qc-cmp-company-cell';
      vendorCell.innerText = purpose.vendors[i].name;

      var vendorEnabledCell = document.createElement('td');
      vendorEnabledCell.className = 'qc-cmp-enabled-cell';
      vendorEnabledCell.innerText =
        purposeConsent && vendorConsents[purpose.vendors[i].index] ? 'Enabled' : 'Disabled';

      var vendorRow = document.createElement('tr');
      vendorRow.className = 'qc-cmp-vendor-row qc-cmp-bordered';
      vendorRow.appendChild(vendorCell);
      vendorRow.appendChild(vendorEnabledCell);

      vendorsListBody.appendChild(vendorRow);
    }

    var vendorsListTable = document.createElement('table');
    vendorsListTable.className = 'qc-cmp-vendor-list qc-cmp-purpose-vendor-list';
    vendorsListTable.appendChild(vendorsListBody);

    // full vendor list link
    var vendorsLink = document.createElement('a');
    vendorsLink.className = 'qc-cmp-alt-action';
    vendorsLink.onclick = function() {
      window.__cmpui('updateConsentUi', 3);
    };
    vendorsLink.innerText = 'See full vendor list';

    var tabContent = document.createElement('div');
    tabContent.className = 'qc-cmp-tab-content' + (index ? '' : ' qc-cmp-active');
    tabContent.appendChild(tabTitleContainer);
    tabContent.appendChild(tabDescription);
    tabContent.appendChild(vendorsListTable);
    tabContent.appendChild(vendorsLink);

    return tabContent;
  };

  var populatePurposes = function() {
    var tabsContainer = document.getElementById('qcCmpTabs');
    var tabContentsContainer = document.getElementById('qcCmpTabContents');

    for (var i = 0; i < purposes.length; i++) {
      tabsContainer.appendChild(createTab(purposes[i].purpose, i));

      tabContentsContainer.appendChild(createTabHeader(purposes[i].purpose, i));
      tabContentsContainer.appendChild(createTabContent(purposes[i], i));
    }
  };

  var showTab = function(tabNum) {
    var tabs = document.getElementsByClassName('qc-cmp-tab');
    var tabContents = document.getElementsByClassName('qc-cmp-tab-content');
    var tabHeaders = document.getElementsByClassName('qc-cmp-tab-header');

    if (tabNum >= tabs.length || tabNum < 0) {
      console.error(tabNum + 'is not a valid tab.');
      return;
    }

    // TODO: (bgustaf) implement .replace for IE.
    // https://github.com/eligrey/classList.js/blob/master/classList.js
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(' qc-cmp-active', '');
      tabHeaders[i].className = tabHeaders[i].className.replace(' qc-cmp-active', '');
      tabContents[i].className = tabContents[i].className.replace(' qc-cmp-active', '');
    }
    tabs[tabNum].className += ' qc-cmp-active';
    tabHeaders[tabNum].className += ' qc-cmp-active';
    tabContents[tabNum].className += ' qc-cmp-active';
    tabHeaders[tabNum].scrollIntoView();
  };

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
  // *                  Consent UI Vendor List Functions                 * \\
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\

  var getVendorConsentToggleStatus = function(index) {
    return vendorConsents[index] ? 'On' : 'Off';
  };

  var getVendorConsentStatusMessaging = function(index) {
    var vendor = vendors[index];
    return (
      vendor.name +
      ' currently ' +
      (vendorConsents[index] ? 'has' : 'does not have') +
      ' your consent to set cookies.'
    );
  };

  var getVendorRowColorClass = function(index) {
    return index % 2 === 1 ? ' qc-cmp-striped-row' : '';
  };

  var getVendorRow = function(vendor, index) {
    // vendor name cell
    var companyCell = document.createElement('td');
    companyCell.className = 'qc-cmp-company-cell';
    companyCell.innerText = vendor.name;

    // vendor consent toggle cell
    var toggleIcon = createToggle(vendorConsents[index]);
    toggleIcon.onclick = function() {
      window.__cmpui('toggleVendorConsent', index);
    };

    var toggleCell = document.createElement('td');
    toggleCell.className = 'qc-cmp-toggle-cell';
    toggleCell.appendChild(toggleIcon);

    // vendor additional information dropdown cell
    var dropdownIcon = document.createElement('div');
    dropdownIcon.className = 'qc-cmp-arrow-down';
    dropdownIcon.onclick = function() {
      window.__cmpui('openTableDropdown', index);
    };
    var dropdownCell = document.createElement('td');
    dropdownCell.className = 'qc-cmp-dropdown-cell';
    dropdownCell.appendChild(dropdownIcon);

    // vendor row
    var vendorRow = document.createElement('tr');
    vendorRow.className = 'qc-cmp-vendor-row' + getVendorRowColorClass(index);
    vendorRow.appendChild(companyCell);
    vendorRow.appendChild(toggleCell);
    vendorRow.appendChild(dropdownCell);

    return vendorRow;
  };

  var getVendorInfoRow = function(vendor, index) {
    // vendor website link
    var vendorPolicyLink = document.createElement('a');
    vendorPolicyLink.className = 'qc-cmp-link';
    vendorPolicyLink.href = vendor.policyUrl;
    vendorPolicyLink.innerText = vendor.policyUrl.replace(/(^\w+:|^)\/\//, '');

    var vendorPolicy = document.createElement('div');
    vendorPolicy.className = 'qc-cmp-vendor-policy';
    vendorPolicy.innerText = 'Privacy policy: ';
    vendorPolicy.appendChild(vendorPolicyLink);

    // vendor consent status
    var vendorConsentStatus = document.createElement('div');
    vendorConsentStatus.className = 'qc-cmp-vendor-consent-status';
    vendorConsentStatus.innerText = getVendorConsentToggleStatus(index);

    // vendor consent status messaging
    var vendorConsentStatusMessaging = document.createElement('div');
    vendorConsentStatusMessaging.className = 'qc-cmp-vendor-consent-messaging';
    vendorConsentStatusMessaging.innerText = getVendorConsentStatusMessaging(index);

    // vendor info cell
    var vendorInfoCell = document.createElement('td');
    vendorInfoCell.className = 'qc-cmp-vendor-info-content';
    vendorInfoCell.setAttribute('colspan', '3');
    vendorInfoCell.appendChild(vendorPolicy);
    vendorInfoCell.appendChild(vendorConsentStatus);
    vendorInfoCell.appendChild(vendorConsentStatusMessaging);

    // vendor info row
    var vendorInfoRow = document.createElement('tr');
    vendorInfoRow.className = 'qc-cmp-vendor-info qc-cmp-hidden' + getVendorRowColorClass(index);
    vendorInfoRow.appendChild(vendorInfoCell);

    return vendorInfoRow;
  };

  var populateVendorList = function() {
    var vendorListBody = document.createElement('tbody');
    vendorListBody.id = 'qcCmpVendorListBody';
    vendorListBody.className = 'qc-cmp-vendor-list-body';

    // build vendor list rows
    vendors.forEach(function(vendor, index) {
      vendorListBody.appendChild(getVendorRow(vendor, index));
      vendorListBody.appendChild(getVendorInfoRow(vendor, index));
    });

    // append vendor list table body to vendor list table
    var vendorListTable = document.getElementById('qcCmpVendorList');
    vendorListTable.appendChild(vendorListBody);
  };

  var togglePartnerInfoVisibility = function() {
    var partnerInfoSection = document.getElementById('qcCmpPartnerInfo');
    partnerInfoSection.classList.toggle('qc-cmp-hidden');
  };

  var openTableDropdown = function(index) {
    var vendorListBody = document.getElementById('qcCmpVendorListBody');

    var dropdownToggle = vendorListBody.getElementsByClassName('qc-cmp-arrow-down')[index];
    dropdownToggle.classList.toggle('qc-cmp-flip-up');

    var vendorInfoRow = vendorListBody.getElementsByClassName('qc-cmp-vendor-info')[index];
    vendorInfoRow.classList.toggle('qc-cmp-hidden');
  };

  var toggleAllVendorConsents = function(hasConsent) {
    var consentToggles = document.getElementsByClassName('qc-cmp-toggle');
    var toggleClass = 'qc-cmp-toggle-' + (hasConsent ? 'off' : 'on');
    for (var i = 0; i < consentToggles.length; i++) {
      if (consentToggles[i].classList.contains(toggleClass)) {
        // TODO: (bgustaf) determine if we can just set all vendor and purpose consents to
        //       hasConsent as this would speed up execution time.
        toggleVendorConsent(i);
      }
    }
  };

  var toggleVendorConsent = function(index) {
    vendorConsents[index] = !vendorConsents[index];
    updateVendorPurposesConsent(index);
    updateVendorListForConsentChange(index);
  };

  /**
   * Updates the consent of all the purposes a vendor is requesting consent for.
   *  If the given vendor's consent is set to true, any purpose the vendor wants
   *    consent for has it's consent set to true.
   *  If the given vendor's consent is set to false, any purpose the vendor wants
   *    consent for that currently have consent will be checked to verify that
   *    at least one of the vendors requestiong consent for that purpose has it's
   *    consent set to true. If none of the purpose's vendors have consent, the
   *    purpose's consent will be set to false.
   *
   * @param {number} index - the index of the vendor in the vendors array
   */
  var updateVendorPurposesConsent = function(index) {
    var vendorPurposes = vendors[index].purposeIds;
    for (var i = 0; i < vendorPurposes.length; i++) {
      var purposeIndex = vendorPurposes[i] - 1;
      var purposeVendors = purposes[purposeIndex].vendors;
      var purposeConsent = purposeConsents[purposeIndex];
      if (vendorConsents[index]) {
        purposeConsent = true;
      } else if (purposeConsent) {
        purposeConsent = false;
        for (var j = 0; j < purposeVendors.length; j++) {
          if (vendorConsents[purposeVendors[j].index]) {
            purposeConsent = true;
            break;
          }
        }
      }
      purposeConsents[purposeIndex] = purposeConsent;
    }
  };

  var updateVendorListForConsentChange = function(index) {
    // toggle the on/off toggle
    var consentToggle = document.getElementsByClassName('qc-cmp-toggle')[index];
    consentToggle.classList.toggle('qc-cmp-toggle-on');
    consentToggle.classList.toggle('qc-cmp-toggle-off');

    // update vendor info toggle status
    var consentStatus = document.getElementsByClassName('qc-cmp-vendor-consent-status')[index];
    consentStatus.innerHTML = getVendorConsentToggleStatus(index);

    // update vendor info toggle status messaging
    var consentMessage = document.getElementsByClassName('qc-cmp-vendor-consent-messaging')[index];
    consentMessage.innerHTML = getVendorConsentStatusMessaging(index);
  };

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
  // *                   Consent UI Consent Functions                    * \\
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\

  var vendorList = {};

  /**
   * @typedef vendors
   * @type {Array.<Vendor>}
   *
   * @typedef Vendor
   * @type {Object}
   * @property {number} id - a unique identifier of the vendor
   * @property {number} index - the vendor position in the vendors array
   * @property {string} purpose - the vendors's name
   * @property {string} description - a description of the vendor
   * @property {Array<number>} purposeIds - the id of all the purposes the vendor would like consent for
   */
  var vendors = [];
  var vendorConsents = [];

  /**
   * @typedef purposes
   * @type {Array.<Purpose>}
   *
   * @typedef Purpose
   * @type {Object}
   * @property {number} id - a unique identifier of the purpose
   * @property {string} purpose - the purpose's name
   * @property {string} description - a description of the purpose
   * @property {Array.<Vendor>} vendors - all the vendors requesting consent for the purpose
   */
  var purposes = [];
  var purposeConsents = [];

  var getConsentInfo = function() {
    return {
      purposeConsents: purposeConsents,
      vendorConsents: vendorConsents,
      vendorList: vendorList
    };
  };

  var setAndSaveAllConsent = function(hasConsent) {
    // TODO: (bgustaf) implement .fill for IE.
    vendorConsents.fill(hasConsent);
    purposeConsents.fill(hasConsent);

    window.__cmp('saveConsents', getConsentInfo(), dismissConsentUi);
  };

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
  // *                     Consent UI Init Functions                     * \\
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\

  /**
   * Adds a 'vendors' property to each purpose object in the global purposes
   * array, which holds an array of all the vendor objects that are requesting
   * consent for that purpose. It also adds an index key to each vendor object
   */
  var populatePurposeVendors = function() {
    for (var i = 0; i < purposes.length; i++) {
      var purpose = purposes[i];
      var vendorsRequestingPurpose = [];
      for (var j = 0; j < vendors.length; j++) {
        var vendor = vendors[j];
        // TODO: (bgustaf) implement .indexOf for IE < 9
        if (vendor.purposeIds.indexOf(purpose.id) >= 0) {
          vendor.index = j;
          vendorsRequestingPurpose.push(vendor);
        }
      }
      purpose.vendors = vendorsRequestingPurpose;
    }
  };

  var init = function() {
    window.__cmp('getVendorList', 'LATEST', function(_vendorList) {
      // set shared vendor list variable
      vendorList = _vendorList;

      // set shared purposes variables
      purposes = vendorList.purposes;
      purposeConsents = Array(purposes.length).fill(false);

      // set shared vendors variables
      vendors = vendorList.vendors;
      vendorConsents = Array(vendors.length).fill(false);

      // TODO: (bgustaf) sort the vendors so they are in alphabetical order
      populatePurposeVendors();

      initConsentUi(1);
    });
  };

  //api methods
  var api = function(cmd) {
    return {
      init: init,
      dismissConsentUi: dismissConsentUi,
      enableAllPurposeConsents: enableAllPurposeConsents,
      getConsentInfo: getConsentInfo,
      initConsentUi: initConsentUi,
      openTableDropdown: openTableDropdown,
      setAndSaveAllConsent: setAndSaveAllConsent,
      showTab: showTab,
      toggleAllVendorConsents: toggleAllVendorConsents,
      toggleVendorConsent: toggleVendorConsent,
      togglePartnerInfoVisibility: togglePartnerInfoVisibility,
      togglePurposeConsent: togglePurposeConsent,
      updateConsentUi: updateConsentUi
    }[cmd].apply(null, [].slice.call(arguments, 1));
  };

  return api;
}(window);

__cmpui('init');

/**
 * The default set of translated pieces of text indexed by locale.
 * Values from window.__cmp.config.localization will override these
 * per locale.  Empty values will use the english value provided
 * inline in each component.
 */
export default {
  en: {
    intro: {
      title: '',
      description: '',
      acceptAll: '',
      rejectAll: '',
      showPurposes: ''
    },
    details: {
      title: '',
      cancel: '',
      save: ''
    },
    purposes: {
      active: '',
      showVendors: '',
      cookies: {
        menu: '',
        title: '',
        description: ''
      },
      purpose1: {
        description: 'The storage of information, or access to information that is already stored, on your device such as advertising identifiers, device identifiers, cookies, and similar technologies.'
      },
      purpose2: {
        description: 'The collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as on other websites or apps, over time. Typically, the content of the site or app is used to make inferences about your interests, which inform future selection of advertising and/or content.'
      },
      purpose3: {
        description: 'The collection of information, and combination with previously collected information, to select and deliver advertisements for you, and to measure the delivery and effectiveness of such advertisements. This includes using previously collected information about your interests to select ads, processing data about what advertisements were shown, how often they were shown, when and where they were shown, and whether you took any action related to the advertisement, including for example clicking an ad or making a purchase. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as websites or apps, over time.'
      },
      purpose4: {
        description: 'The collection of information, and combination with previously collected information, to select and deliver content for you, and to measure the delivery and effectiveness of such content. This includes using previously collected information about your interests to select content, processing data about what content was shown, how often or how long it was shown, when and where it was shown, and whether the you took any action related to the content, including for example clicking on content. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, such as websites or apps, over time.'
      },
      purpose5: {
        description: 'The collection of information about your use of the content, and combination with previously collected information, used to measure, understand, and report on your usage of the service. This does not include personalisation, the collection of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, i.e. on other service, such as websites or apps, over time.'
      },
      customPurpose1: {
        menu: '',
        title: '',
        description: ''
      }
    },
    vendors: {
      title: '',
      rejectAll: '',
      acceptAll: '',
      company: '',
      offOn: '',
      description: ''
    }
  },
  de: {
    intro: {
      title: 'Diese Website verwendet Cookies',
      description: 'Wir und unsere Partner verwenden sogenannte Cookies (kleine Textdateien) im Webbrowser um zu verstehen, was unsere Besucher interessiert und entsprechend relevante Inhalte und Werbung anbieten zu können. Zukünftig benötigen wir wahrscheinlich ihr/euer Einverständnis dazu. Ein Beispiel, wie dies aussehen könnte, finden sie/findet ihr unter dieser Erklärung ',
      acceptAll: 'Alle Cookies akzeptieren',
      rejectAll: 'Alle Cookies ablehnen',
      showPurposes: 'Verwendungszwecke zeigen'
    },
    details: {
      title: 'Datenschutzeinstellungen',
      cancel: 'Abbrechen',
      save: 'Sichern und Beenden'
    },
    purposes: {
      active: 'Aktiv',
      showVendors: '',
      cookies: {
        menu: 'Wie wir Cookies einsetzen',
        title: 'Diese Website verwendet Cookies',
        description: 'Unsere Partner und wir setzen Cookies (kleine Textdateien) und sammeln Informationen während des Surfens im Web in diesem Browser. Dies dient dazu zu verstehen, was unsere Besucher interessiert und entsprechend relevante Inhalte und Werbung anbieten zu können.'
      },
      purpose1: {
        menu: 'Zugriff auf ein Gerät',
        title: 'Zugriff auf ein Gerät',
        description: 'Die Erlaubnis zum Speichern und Abrufen von Informationen auf dem Gerät eines Website-Besuchers.Das ist notwendig, um Cookies im Web-Browser zu speichern und zur Anzeige relevanter Informationen und Werbung abrufen zu können.'
      },
      purpose2: {
        menu: 'Persönlich angepaßte Werbung',
        title: 'Persönlich angepaßte Werbung',
        description: 'Die Erlaubnis, Besucherdaten so zu verarbeiten und/oder zu speichern und abzurufen, dass persönlich angepaßte Werbung angeboten und angezeigt werden kann (dies umfaßt die Auslieferung, Messung und die Erstellung von Berichten darüber). Dies erfolgt auf der Basis bekannter Präferenzen oder Interessen, oder durch das Schließen auf Präferenzen oder Interessen durch die Erfassung von Daten auch über verschiedene Websites, Apps oder Geräte hinweg zu diesem Zweck.'
      },
      purpose3: {
        menu: 'Analysen',
        title: 'Analysen',
        description: 'Die Erlaubnis, Besucherdaten zur Anzeige von Inhalten oder Werbung zu verarbeiten, und zur Messung der Auslieferung solcher Inhalte oder Werbung. Umfasst ist die Gewinnung von Erkenntnissen und die Generierung von Berichten um die Nutzung des angebotenen Service zu verstehen, und/oder das Abrufen oder Speichern von Informationen auf Geräten zu diesem Zweck.'
      },
      purpose4: {
        menu: 'Persönlich angepasste Inhalte',
        title: 'Persönlich angepasste Inhalte',
        description: 'Die Erlaubnis, Besucherdaten zur Anzeige von personalisierten Inhalten zu verarbeiten, und zur Messung der Auslieferung. Umfasst ist die Gewinnung von Erkenntnissen darüber und die Generierung von Berichten dazu. Dies erfolgt auf der Basis bekannter Präferenzen oder Interessen, oder durch das Schließen auf Präferenzen oder Interessen durch die Erfassung von Daten auch über verschiedene Websites, Apps oder Geräte hinweg zu diesem Zweck.'
      }
    },
    vendors: {
      title: 'Unsere Partner',
      rejectAll: 'Alle ablehnen',
      acceptAll: 'Alle akzeptieren',
      company: 'Unternehmen',
      offOn: 'Aus/An',
      description: 'Helfen Sie uns, Ihnen einen besseren Service zu bieten! Unsere Partner verwenden Cookies Ihres Browsers, um quer durch das Web zu verstehen, was Sie interessiert und Ihnen entsprechend relevante Inhalte und Werbung anzubieten.'
    }
  }
};

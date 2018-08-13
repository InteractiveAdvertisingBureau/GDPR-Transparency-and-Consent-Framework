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
        title: 'Information storage and access',
        description: 'The storage of information, or access to information that is already stored, on your device such as advertising identifiers, device identifiers, cookies, and similar technologies.'
      },
      purpose2: {
        title: 'Personalisation',
        description: 'The collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as on other websites or apps, over time. Typically, the content of the site or app is used to make inferences about your interests, which inform future selection of advertising and/or content.'
      },
      purpose3: {
        title: 'Ad selection, delivery, reporting',
        description: 'The collection of information, and combination with previously collected information, to select and deliver advertisements for you, and to measure the delivery and effectiveness of such advertisements. This includes using previously collected information about your interests to select ads, processing data about what advertisements were shown, how often they were shown, when and where they were shown, and whether you took any action related to the advertisement, including for example clicking an ad or making a purchase. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as websites or apps, over time.'
      },
      purpose4: {
        title: 'Content selection, delivery, reporting',
        description: 'The collection of information, and combination with previously collected information, to select and deliver content for you, and to measure the delivery and effectiveness of such content. This includes using previously collected information about your interests to select content, processing data about what content was shown, how often or how long it was shown, when and where it was shown, and whether the you took any action related to the content, including for example clicking on content. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, such as websites or apps, over time.'
      },
      purpose5: {
        title: 'Measurement',
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
      title: 'Wir respektieren Ihre Privatsphäre',
      description: 'Wir und unsere Partner verwenden sogenannte Cookies (kleine Textdateien) im Webbrowser um zu verstehen, was unsere Besucher interessiert und entsprechend relevante Inhalte und Werbung anbieten zu können. Zukünftig benötigen wir wahrscheinlich ihr/euer Einverständnis dazu. Ein Beispiel, wie dies aussehen könnte, finden sie/findet ihr unter dieser Erklärung ',
      acceptAll: 'Alle Cookies akzeptieren',
      rejectAll: 'Alle Cookies ablehnen',
      showPurposes: 'Datenschutzeinstellungen anpassen'
    },
    details: {
      title: 'Datenschutzeinstellungen',
      subtitle: 'Wir respektieren Ihre Privatsphäre',
      description: 'Wir und unsere Partner verwenden sogenannte Cookies (kleine Textdateien) im Webbrowser um zu verstehen, was unsere Besucher interessiert und entsprechend relevante Inhalte und Werbung anbieten zu können. Zukünftig benötigen wir wahrscheinlich ihr/euer Einverständnis dazu. Ein Beispiel, wie dies aussehen könnte, finden sie/findet ihr unter dieser Erklärung ',
      cancel: 'Abbrechen',
      save: 'Speichern & verlassen',
      showVendor: 'Komplette Partnerliste ansehen',
      savePurposes: 'Alle Nutzungszwecke erlauben'
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
        title: 'Speicherung und Zugriff auf Informationen',
        description: 'Die Speicherung von Informationen oder der Zugriff auf Informationen, die bereits gespeichert wurden, auf Anwendergeräten, wie beispielsweise der Zugriff auf Werbeidentifikatoren und/oder sonstige Geräteidentifikatoren, und/oder die Verwendung von Cookies oder ähnlichen Technologien.',
        showVendors: 'Unternehmen ansehen',
        hideVendors: 'Unternehmen ausblenden'
      },
      purpose2: {
        menu: 'Persönlich angepaßte Werbung',
        title: 'Personalisierung',
        description: 'Die Erhebung und Verarbeitung von Informationen über Benutzer einer Site, um nachfolgend Werbung in anderen Zusammenhängen, d. h. auf anderen Sites oder Apps, im Laufe der Zeit nutzerspezifisch anzupassen. Normalerweise wird der Inhalt der Site oder App herangezogen, um Rückschlüsse auf die Interessen der Benutzer zu ermöglichen, an denen sich die zukünftige Auswahl orientiert.',
        showVendors: 'Unternehmen ansehen',
        hideVendors: 'Unternehmen ausblenden'
      },
      purpose3: {
        menu: 'Analysen',
        title: 'Auswahl, Schaltung und Auswertung von Anzeigen',
        description: 'Die Erhebung von Informationen und die Verknüpfung mit zuvor erhobenen Informationen, die Auswahl und Schaltung von Werbungen und die Bewertung der Schaltung und der Wirksamkeit dieser Werbungen. Dies umfasst die Nutzung bereits erhobener Informationen über die Interessen der Benutzer, um Werbeanzeigen auszuwählen, Daten darüber zu verarbeiten, welche Werbungen angezeigt wurden, wie oft diese angezeigt wurden, wann und wo sie angezeigt wurden und ob auf die Werbung eine Handlung gefolgt ist, wie zum Beispiel das Klicken auf eine Anzeige oder ein Einkauf.',
        showVendors: 'Unternehmen ansehen',
        hideVendors: 'Unternehmen ausblenden' 
      },
      purpose4: {
        menu: 'Persönlich angepasste Inhalte',
        title: 'Auswahl, Schaltung und Auswertung von Inhalten',
        description: 'Die Erhebung von Informationen und die Verknüpfung mit zuvor erhobenen Informationen, die Auswahl und Schaltung von Inhalten und die Bewertung der Schaltung und der Wirksamkeit dieser Inhalte. Dies umfasst die Nutzung bereits erhobener Informationen über die Interessen der Benutzer, um Inhalte auszuwählen, Daten darüber zu verarbeiten, welche Inhalte angezeigt wurden, wie oft diese angezeigt wurden, wann und wo sie angezeigt wurden und ob auf den Inhalt eine Handlung gefolgt ist, wie zum Beispiel das Klicken auf einen Inhalt.',
        showVendors: 'Unternehmen ansehen',
        hideVendors: 'Unternehmen ausblenden'
      },
      purpose5: {
        menu: 'Bewertung',
        title: 'Bewertung',
        description: 'Die Erhebung von Informationen über die Nutzung der Inhalte durch den Benutzer und die Verknüpfung mit zuvor erhobenen Informationen, die herangezogen werden, um die Benutzer-Nutzung der Inhalte zu bewerten, zu verstehen und darüber zu berichten.',
        showVendors: 'Unternehmen ansehen',
        hideVendors: 'Unternehmen ausblenden'
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
  },
  fr: {
    intro: {
      title: 'Le respect de votre vie privée est notre priorité',
      description: 'Nos partenaires et nous-mêmes utilisons différentes technologies, telles que les cookies, pour personnaliser les contenus et les publicités, proposer des fonctionnalités sur les réseaux sociaux et analyser le trafic. Merci de cliquer sur le bouton ci-dessous pour donner votre accord. Vous pouvez changer d’avis et modifier vos choix à tout moment.',
      acceptAll: 'J&#039;accepte',
      rejectAll: 'Je refuse',
      showPurposes: 'personnaliser les paramètres de confidentialité'
    },
    details: {
      title: '',
      subtitle: 'Le respect de votre vie privée est notre priorité',
      description: 'Vous pouvez configurer vos réglages et choisir comment vous souhaitez que vos données personnelles soient utilisée en fonction des objectifs ci-dessous. Vous pouvez configurer les réglages de manière indépendante pour chaque partenaire. Vous trouverez une description de chacun des objectifs sur la façon dont nos partenaires et nous-mêmes utilisons vos données personnelles.',
      cancel: 'Annuler',
      save: 'Enregistrer et quitter',
      showVendor: 'Afficher la liste complète des partenaires',
      savePurposes: 'Consentement à toutes les utilisations prévues'
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
        menu: '',
        title: 'Conservation des informations et accès aux informations',
        description: 'Conservation d’informations ou accès à des informations déjà conservées sur l’appareil d’un utilisateur, par exemple accès aux identifiants publicitaires ou aux identifiants de l’appareil, ou utilisation de cookies ou de technologies similaires.',
        showVendors: 'montrer les entreprises',
        hideVendors: 'masquer les entreprises'
      },
      purpose2: {
        menu: '',
        title: 'Personnalisation',
        description: 'Collecte et traitement d’informations relatives à l’utilisateur d’un site afin de lui adresser, ultérieurement, des publicités personnalisées dans d’autres contextes (par exemple sur d’autres sites ou applications). En général, le contenu du site ou de l’application est utilisé pour faire des déductions concernant les intérêts de l’utilisateur, ce qui sera utile dans le cadre de sélections ultérieures.',
        showVendors: 'montrer les entreprises',
        hideVendors: 'masquer les entreprises'
      },
      purpose3: {
        menu: '',
        title: 'Sélection, diffusion et signalement de publicités',
        description: 'Collecte d’informations que l’on associe à des informations collectées précédemment pour sélectionner et diffuser des publicités, et évaluer leur diffusion et leur efficacité. Cela comprend : le fait d’utiliser des informations collectées précédemment relativement aux intérêts de l’utilisateur afin de sélectionner des publicités ; le traitement de données indiquant quelles publicités ont été affichées et à quelle fréquence, à quel moment et où elles ont été affichées ; et le fait de savoir si l’utilisateur a fait quelque chose par rapport auxdites publicités, par exemple s’il a cliqué dessus ou effectué un achat.',
        showVendors: 'montrer les entreprises',
        hideVendors: 'masquer les entreprises'
      },
      purpose4: {
        menu: '',
        title: 'Sélection, diffusion et signalement de contenu',
        description: 'Collecte d’informations que l’on associe à des informations collectées précédemment afin de sélectionner et de diffuser du contenu, et d’évaluer ensuite la diffusion et l’efficacité dudit contenu. Cela comprend : le fait d’utiliser des informations collectées précédemment relativement aux intérêts de l’utilisateur afin de sélectionner du contenu ; le traitement de données indiquant quel contenu a été affiché, à quelle fréquence, pendant combien de temps, à quel moment et où il a été affiché ; et le fait de savoir si l’utilisateur a fait quelque chose par rapport audit contenu, par exemple s’il a cliqué dessus.',
        showVendors: 'montrer les entreprises',
        hideVendors: 'masquer les entreprises'
      },
      purpose5: {
        menu: '',
        title: 'Évaluation',
        description: 'Collecte d’informations relatives à l’utilisation du contenu par l’utilisateur et association desdites informations avec des informations précédemment collectées afin d’évaluer, de comprendre et de rendre compte de la façon dont l’utilisateur utilise le contenu.',
        showVendors: 'montrer les entreprises',
        hideVendors: 'masquer les entreprises'
      }
    },
    vendors: {
      title: '',
      rejectAll: 'Tout Refuser',
      acceptAll: 'Tout Accepter',
      company: 'compagnie',
      offOn: '',
      description: ''
    }
  },
  es: {
    intro: {
      title: 'Tu privacidad es importante para nosotros',
      description: 'Tanto nuestros asociados como nosotros utilizamos cookies en nuestro sitio web para así poder personalizar el contenido, publicidad y funciones internas disponibles en el mismo. Al hacer click en "Guardar y Salir" consientes el uso de esta tecnología en nuestro sitio web. Si cambias de opinión y deseas personalizar tu consentimiento puedes hacerlo siempre que vuelvas a nuestro sitio web.',
      acceptAll: 'Acepto',
      rejectAll: 'No acepto',
      showPurposes: 'personalizar la configuración de privacidad'
    },
    details: {
      title: '',
      subtitle: 'Tu privacidad es importante para nosotros',
      description: 'Tanto nuestros partners como nosotros utilizamos cookies en nuestro sitio web para personalizar contenido y publicidad, proporcionar funcionalidades a las redes sociales, o analizar nuestro tráfico. Haciendo click consientes el uso de esta tecnologia en nuestra web. Puedes cambiar de opinion y personalizar tu consentimiento siempre que quieras volviendo a esta web',
      cancel: 'Cancelar',
      save: 'Guardar y salir',
      showVendor: 'Ver lista completa de partners',
      savePurposes: 'Habilitar todo'
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
        menu: '',
        title: 'Almacenamiento y acceso a la información',
        description: 'El almacenamiento de la información o el acceso a la información que ya está almacenada en el dispositivo del usuario, como el acceso a identificadores de publicidad u otros identificadores de dispositivo, el uso de cookies o tecnologías similares.',
        showVendors: 'ver empresas',
        hideVendors: 'esconder empresas'
      },
      purpose2: {
        menu: '',
        title: 'Personalización',
        description: 'La recogida y el tratamiento de información sobre un usuario de un sitio para posteriormente personalizar la publicidad dirigida al mismo en otros contextos, es decir, en otros sitios o aplicaciones, a lo largo del tiempo. Normalmente, el contenido del sitio o la aplicación se usan para deducir los intereses del usuario, que informan de elecciones futuras.',
        showVendors: 'ver empresas',
        hideVendors: 'esconder empresas'
      },
      purpose3: {
        menu: '',
        title: 'Selección, envío, informe de anuncio',
        description: 'La recopilación de información y combinación de la misma con la previamente recopilada para así poder seleccionar, enviar, calcular la cantidad y eficacia de la publicidad brindada.  Esto incluye usar información previamente recopilada sobre los intereses de un usuario para seleccionar anuncios, tratar datos sobre los anuncios que se han mostrado, con qué frecuencia se han mostrado, cuándo y dónde se han mostrado y si realizaron alguna acción relacionada con el anuncio, incluido, por ejemplo, hacer clic en un anuncio o hacer una compra.',
        showVendors: 'ver empresas',
        hideVendors: 'esconder empresas'
      },
      purpose4: {
        menu: '',
        title: 'Selección, envío, informe de contenido',
        description: 'La recopilación de información y combinación de la misma con la previamente recopilada para así poder seleccionar, enviar, calcular la cantidad y eficacia de el contenido brindado.  Esto incluye usar información previamente recopilada sobre los intereses de un usuario para seleccionar contenido, tratar datos sobre qué contenido se ha mostrado, con qué frecuencia y durante cuánto tiempo se ha mostrado, cuándo y dónde se ha mostrado y si realizaron alguna acción relacionada con el contenido, incluido, por ejemplo, hacer clic en el contenido.',
        showVendors: 'ver empresas',
        hideVendors: 'esconder empresas'
      },
      purpose5: {
        menu: '',
        title: 'Cálculo',
        description: 'La recopilación de información sobre el uso de contenido por parte de el usuario y la combinación de la misma con la previamente recopilada, la cual es usada para calcular, entender e informar sobre el uso del contenido por parte del usuario.',
        showVendors: 'ver empresas',
        hideVendors: 'esconder empresas'
      }
    },
    vendors: {
      title: '',
      rejectAll: 'Rechazar todo',
      acceptAll: 'Aceptar todo',
      company: 'empresa',
      offOn: '',
      description: ''
    }
  },
  nl: {
    intro: {
      title: 'We respecteren uw privacy',
      description: 'Wij en onze partners gebruiken technologie op onze site, zoals cookies om inhoud en advertenties te personaliseren, social media functies te bieden en ons websiteverkeer te analyseren. Klik hieronder om akkoord te gaan met het gebruik van deze technologie op het internet. U kunt op elk moment van gedachten veranderen en uw instemmingskeuzes wijzigen door terug te keren naar deze site.',
      acceptAll: 'Ik accepteer',
      rejectAll: 'Ik accepteer niet',
      showPurposes: 'pas privacy-instellingen aan'
    },
    details: {
      title: '',
      subtitle: 'Wij respecteren uw privacy',
      description: 'U kunt uw toestemmingsvoorkeuren instellen en aangeven hoe u wilt dat uw gegevens worden gebruikt voor de onderstaande doeleinden. U kunt uw voorkeuren voor ons onafhankelijk van die externe partners instellen. Elk doel heeft een beschrijving zodat u weet hoe wij en partners uw gegevens gebruiken.',
      cancel: 'Annuleer',
      save: 'Opslaan en afsluiten',
      showVendor: 'Zie volledige partnerlijst',
      savePurposes: 'Alles toestaan'
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
        menu: '',
        title: 'Opslag van en toegang tot informatie',
        description: 'De opslag van informatie of toegang tot informatie die reeds is opgeslagen op gebruikersapparatuur zoals toegang tot reclame-identifiers en/of andere apparatuur-identifiers en/of het gebruik van cookies of soortgelijke technologieën.',
        showVendors: 'bekijk bedrijven',
        hideVendors: 'verberg bedrijven'
      },
      purpose2: {
        menu: '',
        title: 'Personalisatie',
        description: 'Het verzamelen en verwerken van informatie over de gebruiker van een site om vervolgens in de loop van de tijd reclame af te stemmen op de gebruiker in andere contexten, d.w.z. op andere sites of apps. De inhoud van de site of app wordt in principe gebruikt om conclusies te trekken over interesses van de gebruiker ten behoeve van toekomstige selecties.',
        showVendors: 'bekijk bedrijven',
        hideVendors: 'verberg bedrijven'
      },
      purpose3: {
        menu: '',
        title: 'Reclameselectie, -levering en -rapportage',
        description: 'Het verzamelen van informatie en de combinatie met eerder verzamelde informatie voor het selecteren en leveren van reclame en om de levering en de doeltreffendheid van dergelijke reclame te meten. Dit omvat het gebruik van eerder verzamelde informatie over interesses van gebruikers om reclame te selecteren, de verwerking van gegevens over welke reclame wordt getoond, hoe vaak deze werd getoond, wanneer en waar deze werd getoond en of er actie werd ondernomen in verband met de reclame, met inbegrip van bijvoorbeeld het klikken op reclame of het verrichten van een aankoop.',
        showVendors: 'bekijk bedrijven',
        hideVendors: 'verberg bedrijven'
      },
      purpose4: {
        menu: '',
        title: 'Inhoudselectie, -levering en -rapportage',
        description: 'Het verzamelen van informatie en de combinatie met eerder verzamelde informatie voor het selecteren en leveren van inhoud en om de levering en de doeltreffendheid van dergelijke inhoud te meten. Dit omvat het gebruik van eerder verzamelde informatie over interesses van de gebruiker om inhoud te selecteren, de verwerking van gegevens over welke inhoud werd getoond, hoe vaak of hoe lang deze werd getoond, wanneer en waar deze werd getoond of er actie werd ondernomen in verband met de inhoud, met inbegrip van bijvoorbeeld het klikken op inhoud.',
        showVendors: 'bekijk bedrijven',
        hideVendors: 'verberg bedrijven'
      },
      purpose5: {
        menu: '',
        title: 'Meting',
        description: 'Het verzamelen van informatie over het gebruik van inhoud door de gebruiker en de combinatie met eerder verzamelde informatie die gebruikt wordt voor het meten van, inzicht krijgen in en rapporteren van het gebruik van de inhoud door de gebruiker.',
        showVendors: 'bekijk bedrijven',
        hideVendors: 'verberg bedrijven'
      }
    },
    vendors: {
      title: '',
      rejectAll: 'Alles afwijzen',
      acceptAll: 'Accepteer alles',
      company: 'bedrijf',
      offOn: '',
      description: ''
    }
  }
};

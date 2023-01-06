/**
 * Form configuration objevt according to PACA API database
 */

/**
 * Module dependencies.
 */
var path = require('path'),
  config = require(path.resolve('./config/config'));

module.exports = function () {
  config.productForm = {
    specialId: { editable: false, hidden: true },
    state: { editable: false, label: 'Etat' },
    type: { editable: false, label: 'Type' },
    subType: {
      editable: true,
      label: 'Sous-type',
      tag: 'select',
      tableRef: 'ref'
    },
    privateData: {
      editable: false,
      label: 'Données privées'
    },
    name: { editable: true, label: 'Nom', tag: 'input', type: 'text' },
    nameEn: { editable: true, label: 'Nom(En)', tag: 'input', type: 'text' },
    nameEs: { editable: true, label: 'Nom(Es)', tag: 'input', type: 'text' },
    nameIt: { editable: true, label: 'Nom(It)', tag: 'input', type: 'text' },
    nameDe: { editable: true, label: 'Nom(De)', tag: 'input', type: 'text' },
    nameNl: { editable: true, label: 'Nom(Nl)', tag: 'input', type: 'text' },
    specialIdSitra: {
      editable: false,
      label: 'Id APIDAE'
    },
    activityProvider: {
      editable: false,
      label: "Prestataire d'activité"
    },
    contributor: {
      editable: true,
      label: 'Contributeur',
      tag: 'input',
      type: 'text'
    },
    supplierId: {
      editable: false,
      label: 'Id du fournisseur'
    },
    supplierName: {
      editable: false,
      label: 'Nom du fournisseur'
    },
    shortDescription: {
      editable: true,
      label: 'Description courte',
      tag: 'textarea'
    },
    shortDescriptionEn: {
      editable: true,
      label: 'Description courte(En)',
      tag: 'textarea'
    },
    shortDescriptionEs: {
      editable: true,
      label: 'Description courte(Es)',
      tag: 'textarea'
    },
    shortDescriptionIt: {
      editable: true,
      label: 'Description courte(It)',
      tag: 'textarea'
    },
    shortDescriptionDe: {
      editable: true,
      label: 'Description courte(De)',
      tag: 'textarea'
    },
    shortDescriptionNl: {
      editable: true,
      label: 'Description courte(Nl)',
      tag: 'textarea'
    },
    description: { editable: true, label: 'Description', tag: 'textarea' },
    descriptionEn: {
      editable: true,
      label: 'Description(En)',
      tag: 'textarea'
    },
    descriptionEs: {
      editable: true,
      label: 'Description(Es)',
      tag: 'textarea'
    },
    descriptionIt: {
      editable: true,
      label: 'Description(It)',
      tag: 'textarea'
    },
    descriptionDe: {
      editable: true,
      label: 'Description(De)',
      tag: 'textarea'
    },
    descriptionNl: {
      editable: true,
      label: 'Description(Nl)',
      tag: 'textarea'
    },
    aspectGroupe: {
      editable: true,
      label: 'Aspect Groupe',
      tag: 'textarea'
    },
    aspectGroupeEn: {
      editable: true,
      label: 'Aspect Groupe(En)',
      tag: 'textarea'
    },
    aspectGroupeEs: {
      editable: true,
      label: 'Aspect Groupe(Es)',
      tag: 'textarea'
    },
    aspectGroupeIt: {
      editable: true,
      label: 'Aspect Groupe(It)',
      tag: 'textarea'
    },
    aspectGroupeDe: {
      editable: true,
      label: 'Aspect Groupe(De)',
      tag: 'textarea'
    },
    aspectGroupeNl: {
      editable: true,
      label: 'Aspect Groupe(Nl)',
      tag: 'textarea'
    },
    aspectBusiness: {
      editable: true,
      label: 'Aspect Business',
      tag: 'textarea'
    },
    aspectBusinessEn: {
      editable: true,
      label: 'Aspect Business(En)',
      tag: 'textarea'
    },
    aspectBusinessEs: {
      editable: true,
      label: 'Aspect Business(Es)',
      tag: 'textarea'
    },
    aspectBusinessIt: {
      editable: true,
      label: 'Aspect Business(It)',
      tag: 'textarea'
    },
    aspectBusinessDe: {
      editable: true,
      label: 'Aspect Business(De)',
      tag: 'textarea'
    },
    aspectBusinessNl: {
      editable: true,
      label: 'Aspect Business(Nl)',
      tag: 'textarea'
    },
    complementAccueil: {
      editable: true,
      label: "Complément d'accueil (Fr)",
      tag: 'textarea'
    },
    complementAccueilEn: {
      editable: true,
      label: "Complément d'accueil (En)",
      tag: 'textarea'
    },
    complementAccueilEs: {
      editable: true,
      label: "Complément d'accueil (Es)",
      tag: 'textarea'
    },
    complementAccueilIt: {
      editable: true,
      label: "Complément d'accueil (It)",
      tag: 'textarea'
    },
    complementAccueilDe: {
      editable: true,
      label: "Complément d'accueil (De)",
      tag: 'textarea'
    },
    complementAccueilNl: {
      editable: true,
      label: "Complément d'accueil (Nl)",
      tag: 'textarea'
    },
    address: {
      label: 'Adresse',
      fields: {
        address1: {
          editable: true,
          label: 'Adresse 1',
          tag: 'input',
          type: 'text'
        },
        address2: {
          editable: true,
          label: 'Adresse 2',
          tag: 'input',
          type: 'text'
        },
        address3: {
          editable: true,
          label: 'Adresse 3',
          tag: 'input',
          type: 'text'
        },
        address4: {
          editable: true,
          label: 'Adresse 4',
          tag: 'input',
          type: 'text'
        },
        insee: { label: 'insee', editable: false },
        cedex: { editable: true, label: 'Cedex', tag: 'input', type: 'text' },
        zipcode: {
          editable: false,
          tag: 'input',
          type: 'text',
          class: 'zipcode',
          label: 'Code postal'
        },
        location: {
          editable: true,
          label: 'Code postal - Commune',
          tag: 'select-autocomplete',
          class: 'city'
        },
        region: { editable: false, label: 'Région' }
      }
    },
    perimetreGeographique: {
      editable: true,
      array: true,
      label: 'Perimètre géographique',
      tag: 'select-autocomplete',
      class: 'city'
    },
    website: {
      editable: true,
      array: true,
      label: 'Site internet',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    websiteEn: {
      editable: true,
      array: true,
      label: 'Site internet(En)',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    websiteEs: {
      editable: true,
      array: true,
      label: 'Site internet(Es)',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    websiteIt: {
      editable: true,
      array: true,
      label: 'Site internet(It)',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    websiteDe: {
      editable: true,
      array: true,
      label: 'Site internet(De)',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    websiteNl: {
      editable: true,
      array: true,
      label: 'Site internet(Nl)',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    email: {
      editable: true,
      array: true,
      label: 'Courriel',
      tag: 'input',
      type: 'email',
      class: 'email'
    },
    phone: {
      editable: true,
      array: true,
      label: 'Téléphone',
      tag: 'input',
      type: 'tel',
      class: 'tel'
    },
    fax: {
      editable: true,
      array: true,
      label: 'Fax',
      tag: 'input',
      type: 'tel',
      class: 'tel'
    },
    reservation: {
      label: 'Réservation',
      array: true,
      fields: {
        name: { editable: true, label: 'Nom', tag: 'input', type: 'text' },
        description: { editable: true, label: 'Description', tag: 'textarea' },
        descriptionEn: {
          editable: true,
          label: 'Description(En)',
          tag: 'textarea'
        },
        descriptionEs: {
          editable: true,
          label: 'Description(Es)',
          tag: 'textarea'
        },
        descriptionIt: {
          editable: true,
          label: 'Description(It)',
          tag: 'textarea'
        },
        descriptionDe: {
          editable: true,
          label: 'Description(De)',
          tag: 'textarea'
        },
        descriptionNl: {
          editable: true,
          label: 'Description(Nl)',
          tag: 'textarea'
        },
        type: { editable: true, label: 'Type', tag: 'select', tableRef: 'ref' },
        website: {
          editable: true,
          array: true,
          label: 'Site internet',
          tag: 'input',
          type: 'url',
          class: 'url'
        },
        email: {
          editable: true,
          array: true,
          label: 'Courriel',
          tag: 'input',
          type: 'email',
          class: 'email'
        },
        phone: {
          editable: true,
          array: true,
          label: 'Téléphone',
          tag: 'input',
          type: 'tel',
          class: 'tel'
        },
        fax: {
          editable: true,
          array: true,
          label: 'Fax',
          tag: 'input',
          type: 'tel',
          class: 'tel'
        }
      }
    },
    websiteReservation: {
      editable: true,
      array: true,
      label: 'Réservation par internet',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    contact: {
      label: 'Contact',
      array: true,
      fields: {
        civility: {
          editable: true,
          label: 'Civilité',
          tag: 'select',
          tableRef: 'civility'
        },
        firstname: {
          editable: true,
          label: 'Prénom',
          tag: 'input',
          type: 'text'
        },
        lastname: { editable: true, label: 'Nom', tag: 'input', type: 'text' },
        primaryFunction: {
          editable: true,
          label: 'Fonction',
          tag: 'select',
          tableRef: 'personType'
        },
        email: {
          editable: true,
          array: true,
          label: 'Courriel',
          tag: 'input',
          type: 'email',
          class: 'email'
        },
        phone: {
          editable: true,
          array: true,
          label: 'Téléphone',
          tag: 'input',
          type: 'tel',
          class: 'tel'
        },
        fax: {
          editable: true,
          array: true,
          label: 'Fax',
          tag: 'input',
          type: 'tel',
          class: 'tel'
        },
        website: {
          editable: true,
          array: true,
          label: 'Site ',
          tag: 'input',
          type: 'url',
          class: 'url'
        }
      }
    },
    image: {
      editable: true,
      array: true,
      label: 'Image',
      class: 'image',
      fields: {
        url: {
          editable: true,
          label: 'Url',
          tag: 'input',
          type: 'url',
          class: 'url'
        },
        name: { editable: true, label: 'Libellé', tag: 'input', type: 'text' },
        nameEn: {
          editable: true,
          label: 'Libellé(En)',
          tag: 'input',
          type: 'text'
        },
        nameEs: {
          editable: true,
          label: 'Libellé(Es)',
          tag: 'input',
          type: 'text'
        },
        nameIt: {
          editable: true,
          label: 'Libellé(It)',
          tag: 'input',
          type: 'text'
        },
        nameDe: {
          editable: true,
          label: 'Libellé(De)',
          tag: 'input',
          type: 'text'
        },
        nameNl: {
          editable: true,
          label: 'Libellé(Nl)',
          tag: 'input',
          type: 'text'
        },
        legend: {
          editable: true,
          label: 'Description',
          tag: 'input',
          type: 'text'
        },
        legendEn: {
          editable: true,
          label: 'Description(En)',
          tag: 'input',
          type: 'text'
        },
        legendEs: {
          editable: true,
          label: 'Description(Es)',
          tag: 'input',
          type: 'text'
        },
        legendIt: {
          editable: true,
          label: 'Description(It)',
          tag: 'input',
          type: 'text'
        },
        legendDe: {
          editable: true,
          label: 'Description(De)',
          tag: 'input',
          type: 'text'
        },
        legendNl: {
          editable: true,
          label: 'Description(Nl)',
          tag: 'input',
          type: 'text'
        },
        description: {
          editable: true,
          label: 'Copyright',
          tag: 'input',
          type: 'text'
        },
        descriptionEn: {
          editable: true,
          label: 'Copyright(En)',
          tag: 'input',
          type: 'text'
        },
        descriptionEs: {
          editable: true,
          label: 'Copyright(Es)',
          tag: 'input',
          type: 'text'
        },
        descriptionIt: {
          editable: true,
          label: 'Copyright(It)',
          tag: 'input',
          type: 'text'
        },
        descriptionDe: {
          editable: true,
          label: 'Copyright(De)',
          tag: 'input',
          type: 'text'
        },
        descriptionNl: {
          editable: true,
          label: 'Copyright(Nl)',
          tag: 'input',
          type: 'text'
        },
        _id: {
          editable: true,
          label: '_id',
          tag: 'input',
          type: 'text',
          hidden: true
        }
      }
    },
    video: {
      editable: true,
      array: true,
      label: 'Vidéo',
      fields: {
        url: {
          editable: true,
          label: 'Url',
          tag: 'input',
          type: 'url',
          class: 'url'
        },
        name: { editable: true, label: 'Libellé', tag: 'input', type: 'text' },
        nameEn: {
          editable: true,
          label: 'Libellé(En)',
          tag: 'input',
          type: 'text'
        },
        nameEs: {
          editable: true,
          label: 'Libellé(Es)',
          tag: 'input',
          type: 'text'
        },
        nameIt: {
          editable: true,
          label: 'Libellé(It)',
          tag: 'input',
          type: 'text'
        },
        nameDe: {
          editable: true,
          label: 'Libellé(De)',
          tag: 'input',
          type: 'text'
        },
        nameNl: {
          editable: true,
          label: 'Libellé(Nl)',
          tag: 'input',
          type: 'text'
        },
        legend: {
          editable: true,
          label: 'Légende',
          tag: 'input',
          type: 'text'
        },
        legendEn: {
          editable: true,
          label: 'Légende(En)',
          tag: 'input',
          type: 'text'
        },
        legendEs: {
          editable: true,
          label: 'Légende(Es)',
          tag: 'input',
          type: 'text'
        },
        legendIt: {
          editable: true,
          label: 'Légende(It)',
          tag: 'input',
          type: 'text'
        },
        legendDe: {
          editable: true,
          label: 'Légende(De)',
          tag: 'input',
          type: 'text'
        },
        legendNl: {
          editable: true,
          label: 'Légende(Nl)',
          tag: 'input',
          type: 'text'
        },
        description: {
          editable: true,
          label: 'Description',
          tag: 'input',
          type: 'text'
        },
        descriptionEn: {
          editable: true,
          label: 'Description(En)',
          tag: 'input',
          type: 'text'
        },
        descriptionEs: {
          editable: true,
          label: 'Description(Es)',
          tag: 'input',
          type: 'text'
        },
        descriptionIt: {
          editable: true,
          label: 'Description(It)',
          tag: 'input',
          type: 'text'
        },
        descriptionDe: {
          editable: true,
          label: 'Description(De)',
          tag: 'input',
          type: 'text'
        },
        descriptionNl: {
          editable: true,
          label: 'Description(Nl)',
          tag: 'input',
          type: 'text'
        }
      }
    },
    pdf: {
      editable: true,
      array: true,
      label: 'Pdf',
      fields: {
        url: {
          editable: true,
          label: 'Url',
          tag: 'input',
          type: 'url',
          class: 'url'
        },
        name: { editable: true, label: 'Libellé', tag: 'input', type: 'text' },
        nameEn: {
          editable: true,
          label: 'Libellé(En)',
          tag: 'input',
          type: 'text'
        },
        nameEs: {
          editable: true,
          label: 'Libellé(Es)',
          tag: 'input',
          type: 'text'
        },
        nameIt: {
          editable: true,
          label: 'Libellé(It)',
          tag: 'input',
          type: 'text'
        },
        nameDe: {
          editable: true,
          label: 'Libellé(De)',
          tag: 'input',
          type: 'text'
        },
        nameNl: {
          editable: true,
          label: 'Libellé(Nl)',
          tag: 'input',
          type: 'text'
        },
        legend: {
          editable: true,
          label: 'Légende',
          tag: 'input',
          type: 'text'
        },
        legendEn: {
          editable: true,
          label: 'Légende(En)',
          tag: 'input',
          type: 'text'
        },
        legendEs: {
          editable: true,
          label: 'Légende(Es)',
          tag: 'input',
          type: 'text'
        },
        legendIt: {
          editable: true,
          label: 'Légende(It)',
          tag: 'input',
          type: 'text'
        },
        legendDe: {
          editable: true,
          label: 'Légende(De)',
          tag: 'input',
          type: 'text'
        },
        legendNl: {
          editable: true,
          label: 'Légende(Nl)',
          tag: 'input',
          type: 'text'
        },
        description: {
          editable: true,
          label: 'Description',
          tag: 'input',
          type: 'text'
        },
        descriptionEn: {
          editable: true,
          label: 'Description(En)',
          tag: 'input',
          type: 'text'
        },
        descriptionEs: {
          editable: true,
          label: 'Description(Es)',
          tag: 'input',
          type: 'text'
        },
        descriptionIt: {
          editable: true,
          label: 'Description(It)',
          tag: 'input',
          type: 'text'
        },
        descriptionDe: {
          editable: true,
          label: 'Description(De)',
          tag: 'input',
          type: 'text'
        },
        descriptionNl: {
          editable: true,
          label: 'Description(Nl)',
          tag: 'input',
          type: 'text'
        }
      }
    },
    pdfEn: {
      editable: true,
      array: true,
      label: 'Pdf (En)',
      fields: {
        url: {
          editable: true,
          label: 'Url',
          tag: 'input',
          type: 'url',
          class: 'url'
        },
        name: {
          editable: true,
          label: 'Libellé(En)',
          tag: 'input',
          type: 'text'
        }
      }
    },
    pdfEs: {
      editable: true,
      array: true,
      label: 'Pdf (Es)',
      fields: {
        url: {
          editable: true,
          label: 'Url',
          tag: 'input',
          type: 'url',
          class: 'url'
        },
        name: {
          editable: true,
          label: 'Libellé(Es)',
          tag: 'input',
          type: 'text'
        }
      }
    },
    pdfIt: {
      editable: true,
      array: true,
      label: 'Pdf (It)',
      fields: {
        url: {
          editable: true,
          label: 'Url',
          tag: 'input',
          type: 'url',
          class: 'url'
        },
        name: {
          editable: true,
          label: 'Libellé(It)',
          tag: 'input',
          type: 'text'
        }
      }
    },
    pdfDe: {
      editable: true,
      array: true,
      label: 'Pdf (De)',
      fields: {
        url: {
          editable: true,
          label: 'Url',
          tag: 'input',
          type: 'url',
          class: 'url'
        },
        name: {
          editable: true,
          label: 'Libellé(De)',
          tag: 'input',
          type: 'text'
        }
      }
    },
    pdfNl: {
      editable: true,
      array: true,
      label: 'Pdf (Nl)',
      fields: {
        url: {
          editable: true,
          label: 'Url',
          tag: 'input',
          type: 'url',
          class: 'url'
        },
        name: {
          editable: true,
          label: 'Libellé(Nl)',
          tag: 'input',
          type: 'text'
        }
      }
    },
    gpx: {
      editable: true,
      array: true,
      label: 'GPX',
      type: 'url',
      class: 'url'
    },
    gpxEn: {
      editable: true,
      array: true,
      label: 'GPX (En)',
      type: 'url',
      class: 'url'
    },
    gpxEs: {
      editable: true,
      array: true,
      label: 'GPX (Es)',
      type: 'url',
      class: 'url'
    },
    gpxIt: {
      editable: true,
      array: true,
      label: 'GPX (It)',
      type: 'url',
      class: 'url'
    },
    gpxDe: {
      editable: true,
      array: true,
      label: 'GPX (De)',
      type: 'url',
      class: 'url'
    },
    gpxNl: {
      editable: true,
      array: true,
      label: 'GPX (Nl)',
      type: 'url',
      class: 'url'
    },
    kml: {
      editable: true,
      array: true,
      label: 'KML',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    kmlEn: {
      editable: true,
      array: true,
      label: 'KML (En)',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    kmlEs: {
      editable: true,
      array: true,
      label: 'KML (Es)',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    kmlIt: {
      editable: true,
      array: true,
      label: 'KML (It)',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    kmlDe: {
      editable: true,
      array: true,
      label: 'KML (De)',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    kmlNl: {
      editable: true,
      array: true,
      label: 'KML (Nl)',
      tag: 'input',
      type: 'url',
      class: 'url'
    },
    geolocalisation: {
      editable: true,
      array: true,
      label: 'Localisation',
      fields: {
        altitudeMoyenne: {
          editable: true,
          label: 'Altitude Mini',
          tag: 'input',
          type: 'text',
          class: 'geodata'
        },
        altitudeMaximum: {
          editable: true,
          label: 'Altitude Maxi',
          tag: 'input',
          type: 'text',
          class: 'geodata'
        }
      }
    },
    itinerary: {
      editable: true,
      array: true,
      label: 'Itinéraire',
      fields: {
        dailyDuration: {
          editable: true,
          label: 'Durée journalière',
          tag: 'input',
          type: 'text',
          class: 'itineray'
        },
        distance: {
          editable: true,
          label: 'Distance',
          tag: 'input',
          type: 'text',
          class: 'itineray'
        },
        positive: {
          editable: true,
          label: 'Denivellation positive',
          tag: 'input',
          type: 'text',
          class: 'itineray'
        },
        negative: {
          editable: true,
          label: 'Denivellation négative',
          tag: 'input',
          type: 'text',
          class: 'itineray'
        },
        referencesTopoguides: {
          editable: true,
          label: 'References Topoguides',
          tag: 'input',
          type: 'text',
          class: 'itineray'
        },
        itineraireType: {
          editable: true,
          label: 'Type',
          tag: 'input',
          type: 'text',
          class: 'itineray'
        },
        itineraireBalise: {
          editable: true,
          label: 'Balise',
          tag: 'input',
          type: 'text',
          class: 'itineray'
        },
        altitudeMaximum: {
          editable: true,
          label: 'altitude Maximum',
          tag: 'input',
          type: 'text',
          class: 'itineray'
        },
        altitudeMoyenne: {
          editable: true,
          label: 'altitude Moyenne',
          tag: 'input',
          type: 'text',
          class: 'itineray'
        }
      }
    },
    passagesDelicats: {
      editable: true,
      label: 'Passages Delicats',
      tag: 'input',
      type: 'text',
      class: 'passagesDelicats'
    },
    passagesDelicatsEn: {
      editable: true,
      label: 'Passages Delicats (En)',
      tag: 'input',
      type: 'text',
      class: 'passagesDelicats'
    },
    passagesDelicatsEs: {
      editable: true,
      label: 'Passages Delicats (Es)',
      tag: 'input',
      type: 'text',
      class: 'passagesDelicats'
    },
    passagesDelicatsIt: {
      editable: true,
      label: 'Passages Delicats (It)',
      tag: 'input',
      type: 'text',
      class: 'passagesDelicats'
    },
    passagesDelicatsDe: {
      editable: true,
      label: 'Passages Delicats (De)',
      tag: 'input',
      type: 'text',
      class: 'passagesDelicats'
    },
    passagesDelicatsNl: {
      editable: true,
      label: 'Passages Delicats (Nl)',
      tag: 'input',
      type: 'text',
      class: 'passagesDelicats'
    },
    complement: {
      editable: true,
      label: 'Complement',
      tag: 'input',
      type: 'text',
      class: 'complement'
    },
    complementEn: {
      editable: true,
      label: 'Complement (En)',
      tag: 'input',
      type: 'text',
      class: 'complement'
    },
    complementEs: {
      editable: true,
      label: 'Complement (Es)',
      tag: 'input',
      type: 'text',
      class: 'complement'
    },
    complementIt: {
      editable: true,
      label: 'Complement (It)',
      tag: 'input',
      type: 'text',
      class: 'complement'
    },
    complementDe: {
      editable: true,
      label: 'Complement (De)',
      tag: 'input',
      type: 'text',
      class: 'complement'
    },
    complementNl: {
      editable: true,
      label: 'Complement (Nl)',
      tag: 'input',
      type: 'text',
      class: 'complement'
    },
    ambianceIdSitra: {
      editable: true,
      label: 'Ambiance',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    ambianceLibelle: {
      editable: true,
      label: 'Ambiance (Fr)',
      tag: 'input',
      type: 'text',
      class: 'ambiance'
    },
    ambianceLibelleEn: {
      editable: true,
      label: 'Ambiance (En)',
      tag: 'input',
      type: 'text',
      class: 'ambiance'
    },
    ambianceLibelleEs: {
      editable: true,
      label: 'Ambiance (Es)',
      tag: 'input',
      type: 'text',
      class: 'ambiance'
    },
    ambianceLibelleIt: {
      editable: true,
      label: 'Ambiance (It)',
      tag: 'input',
      type: 'text',
      class: 'ambiance'
    },
    ambianceLibelleDe: {
      editable: true,
      label: 'Ambiance (De)',
      tag: 'input',
      type: 'text',
      class: 'ambiance'
    },
    ambianceLibelleNl: {
      editable: true,
      label: 'Ambiance (Nl)',
      tag: 'input',
      type: 'text',
      class: 'ambiance'
    },
    socialNetwork: {
      editable: true,
      array: true,
      label: 'Réseaux sociaux',
      fields: {
        url: {
          editable: true,
          label: 'Url',
          tag: 'input',
          type: 'url',
          class: 'url'
        },
        _id: {
          editable: true,
          label: '_id',
          tag: 'input',
          type: 'text',
          hidden: true
        }
      }
    },
    localization: {
      editable: true,
      label: 'Localisation',
      type: 'geolocalization',
      fields: {
        lat: {
          editable: true,
          label: 'Latitude',
          tag: 'input',
          type: 'text',
          class: 'geodata'
        },
        lon: {
          editable: true,
          label: 'Longitude',
          tag: 'input',
          type: 'text',
          class: 'geodata'
        }
      }
    },
    altitude: {
      editable: true,
      label: 'Altitude',
      tag: 'input',
      type: 'text',
      class: 'geodata'
    },
    environment: {
      editable: true,
      array: true,
      label: 'Environnement',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    landmark: {
      editable: true,
      label: 'Repère plan',
      tag: 'input',
      type: 'text'
    },
    territory: {
      editable: false,
      array: true,
      tag: 'checkbox',
      type: 'checkbox',
      label: 'Territoire',
      tableRef: 'ref',
      class: 'checkboxes'
    },
    statusImport: {
      editable: false,
      label: 'Statut import',
      tag: 'select',
      tableRef: 'statusImport',
      hidden: true
    },
    alert: { editable: false, array: true, label: 'Alerte', hidden: true }, // Specific
    //tableRef: 'town'
    rateCompletion: {
      editable: false,
      label: 'Taux de complétion',
      hidden: true
    },
    ranking: {
      editable: false,
      label: 'Classement',
      tag: 'select',
      tableRef: 'ref'
    },
    dateRanking: {
      editable: true,
      label: 'Date classement',
      tag: 'input',
      type: 'text'
    },
    numRanking: {
      editable: true,
      label: 'Numéro classement',
      tag: 'input',
      type: 'text'
    },

    rankingArea: {
      editable: true,
      array: true,
      label: 'Zone classement',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    rankingPrefectural: {
      editable: true,
      label: 'Classement préfectoral',
      tag: 'select',
      tableRef: 'ref'
    },
    label: {
      editable: false,
      array: true,
      label: 'Label',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes',
      tableRef: 'ref'
    },
    labelType: {
      editable: false,
      label: 'Label type',
      tag: 'select',
      tableRef: 'ref'
    },
    labelTourismHandicap: {
      editable: false,
      array: true,
      label: 'Tourisme handicap',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes',
      tableRef: 'ref'
    },
    labelChartQuality: {
      editable: false,
      array: true,
      label: 'Charte de qualité',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes',
      tableRef: 'ref'
    },
    businessTourism: {
      editable: true,
      label: 'Equipement des salles',
      fields: {
        name: { editable: true, label: 'Nom', tag: 'input', type: 'text' },
        description: { editable: true, label: 'Description', tag: 'textarea' },
        descriptionEn: {
          editable: true,
          label: 'Description(En)',
          tag: 'textarea'
        },
        descriptionEs: {
          editable: true,
          label: 'Description(Es)',
          tag: 'textarea'
        },
        descriptionIt: {
          editable: true,
          label: 'Description(It)',
          tag: 'textarea'
        },
        descriptionDe: {
          editable: true,
          label: 'Description(De)',
          tag: 'textarea'
        },
        descriptionNl: {
          editable: true,
          label: 'Description(Nl)',
          tag: 'textarea'
        },
        dimensions: {
          editable: true,
          label: 'Dimensions',
          tag: 'input',
          type: 'text'
        },
        superficie: {
          editable: true,
          label: 'Superficie',
          tag: 'input',
          type: 'text'
        },
        hauteur: {
          editable: true,
          label: 'Hauteur',
          tag: 'input',
          type: 'text'
        },
        capaciteMax: {
          editable: true,
          label: 'Capacité max',
          tag: 'input',
          type: 'text'
        },
        label: {
          editable: false,
          array: true,
          label: 'Equipement',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes',
          tableRef: 'ref'
        },
        tourismeAffairesEnabled: {
          editable: true,
          label: 'Nombre de salles modulable',
          tag: 'checkbox',
          type: 'checkbox'
        },
        sallesReunion: {
          array: true,
          label: 'Salles réunion',
          fields: {
            nom: { editable: true, label: 'Nom', tag: 'input', type: 'text' },
            description: {
              editable: true,
              label: 'Description',
              tag: 'input',
              type: 'text'
            },
            superficie: {
              editable: true,
              label: 'Superficie',
              tag: 'input',
              type: 'text'
            },
            capaciteMax: {
              editable: true,
              label: 'Capacité max',
              tag: 'input',
              type: 'number'
            },
            lumiereNaturelle: {
              editable: true,
              label: 'Capacité max',
              tag: 'checkbox',
              type: 'checkbox',
              class: 'checkboxes'
            },
            dispositions: {
              editable: true,
              array: true,
              label: 'Dispositions',
              fields: {
                disposition: {
                  editable: true,
                  label: 'Disposition',
                  tag: 'input',
                  type: 'number'
                },
                capacite: {
                  editable: true,
                  label: 'Capacité',
                  tag: 'input',
                  type: 'number'
                },
                description: {
                  editable: true,
                  label: 'Description',
                  tag: 'input',
                  type: 'text'
                }
              }
            }
          }
        },
        sallesHebergement: {
          editable: false,
          array: true,
          label: 'Salles hébergement',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes',
          tableRef: 'ref'
        },
        sallesRestauration: {
          editable: false,
          array: true,
          label: 'Salles restauration',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes',
          tableRef: 'ref'
        },
        sallesEquipement: {
          editable: false,
          array: true,
          label: 'Salles equipement',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes',
          tableRef: 'ref'
        },
        sallesEquipeesPour: {
          editable: false,
          array: true,
          label: 'Salles équipées pour',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes',
          tableRef: 'ref'
        },
        nombreSallesReunionEquipees: {
          editable: true,
          label: 'Nombre de salles de réunions équipées',
          tag: 'input',
          type: 'number'
        },
        capaciteMaxAccueil: {
          editable: true,
          label: "Capacité max de l'accueil",
          tag: 'input',
          type: 'number'
        },
        nombreSallesModulables: {
          editable: true,
          label: 'Nombre de salles modulable',
          tag: 'input',
          type: 'number'
        }
      }
    },
    chain: {
      editable: false,
      array: true,
      label: 'Chaine',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    chainLabel: {
      editable: false,
      array: true,
      label: 'Chaine label',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    guide: {
      editable: false,
      array: true,
      label: 'Guide',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    language: {
      editable: false,
      array: true,
      label: 'Langue',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes',
      tableRef: 'ref'
    },
    languesDocumentation: {
      editable: false,
      array: true,
      label: 'Langue documentation',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes',
      tableRef: 'ref'
    },
    tailleGroupe: {
      editable: true,
      label: 'Taille groupe',
      fields: {
        min: { editable: true, label: 'Min.', tag: 'input', type: 'number' },
        max: { editable: true, label: 'Max.', tag: 'input', type: 'number' }
      }
    },
    capacity: {
      editable: false,
      label: 'Capacité',
      fields: {
        value: { editable: false, label: 'Valeur' },
        detail: {
          editable: false,
          label: 'Détail',
          fields: {
            bedroom: { editable: false, label: 'Chambre à coucher' },
            bed: { editable: false, label: 'Lit' },
            person: { editable: false, label: 'Personne' },
            surface: { editable: false, label: 'Surface' },
            doubleRoom: { editable: false, label: 'Chambre double' },
            twinRoom: { editable: false, label: 'Chambre twin' },
            tripleRoom: { editable: false, label: 'Chambre triple' },
            quadrupleRoom: { editable: false, label: 'Chambre quadruple' },
            accomodation: { editable: false, label: 'Appartement' },
            accomodationDisabledAccess: {
              editable: false,
              label: 'Appartement handicapé'
            },
            classifiedLocation: {
              editable: false,
              label: "Nombre d'emplacements classés/tentes"
            },
            reportedLocation: {
              editable: false,
              label: "Nombre d'emplacement de passage"
            },
            location: {
              editable: false,
              label: "Nombre d'emplacements avec locatifs résidentiels"
            },
            tent: { editable: false, label: 'Tente' },
            caravan: { editable: false, label: 'Caravane' },
            campingCar: { editable: false, label: 'Camping car' },
            mobilHome: { editable: false, label: 'Mobilhome' },
            bungalow: { editable: false, label: 'Bungalow' },
            chalet: { editable: false, label: 'Chalet' },
            flatwareTerrace: { editable: false, label: 'Couverts en terrasse' },
            room: { editable: false, label: 'Pièce' },
            housing: { editable: false, label: 'Hébergement' },
            flatware: { editable: false, label: 'Couverts' },
            total: { editable: false, label: 'Total' }
          }
        }
      }
    },
    scope: {
      editable: false,
      array: false,
      label: 'Portée',
      tag: 'select',
      tableRef: 'ref'
    },
    category: {
      editable: true,
      array: true,
      label: 'Catégorie',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    theme: {
      editable: true,
      array: true,
      label: 'Thème',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    activity: {
      editable: true,
      array: true,
      label: 'Activité',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    prestation: {
      editable: true,
      array: true,
      label: 'Prestation',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    typeDetail: {
      editable: true,
      array: true,
      label: 'Détail type',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    criteriaFamily: {
      editable: true,
      array: true,
      label: 'Critères familials',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    criteriaInternal: {
      editable: true,
      array: true,
      label: 'Critères internes',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    transport: {
      editable: true,
      array: true,
      label: 'Transport',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    service: {
      editable: true,
      array: true,
      label: 'Service',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    equipment: {
      editable: true,
      array: true,
      label: 'Equipement',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    comfort: {
      editable: true,
      array: true,
      label: 'Prestation confort',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    adaptedTourism: {
      editable: true,
      array: true,
      label: 'Tourisme adapté',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    visitLabel: {
      editable: true,
      label: 'Label visite'
    },
    visitGroup: {
      editable: true,
      array: true,
      label: 'Visite de groupe',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    visitIndividual: {
      editable: true,
      array: true,
      label: 'Visite individuelle',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    typeClient: {
      editable: true,
      array: true,
      label: 'Type de clientèle',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    typePromoSitra: {
      editable: true,
      array: true,
      label: 'Type promositra',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    typeAccomodation: {
      editable: true,
      array: true,
      label: "Type d'hébergement",
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    formuleAccommodation: {
      editable: true,
      label: "Fomule d'hébergement",
      fields: {
        description: { editable: true, label: 'Description', tag: 'textarea' },
        descriptionEn: {
          editable: true,
          label: 'Description(En)',
          tag: 'textarea'
        },
        descriptionEs: {
          editable: true,
          label: 'Description(Es)',
          tag: 'textarea'
        },
        descriptionIt: {
          editable: true,
          label: 'Description(It)',
          tag: 'textarea'
        },
        descriptionDe: {
          editable: true,
          label: 'Description(De)',
          tag: 'textarea'
        },
        descriptionNl: {
          editable: true,
          label: 'Description(Nl)',
          tag: 'textarea'
        }
      }
    },
    informationAccommodation: {
      editable: true,
      label: "Informations d'hébergement",
      fields: {
        numberDays: {
          editable: true,
          label: 'Nombre de jours',
          tag: 'textarea'
        },
        numberNights: {
          editable: true,
          label: 'Nombre de nuits',
          tag: 'textarea'
        }
      }
    },
    labelRestauration: { editable: true, label: 'Label restauration' },
    specialityRestauration: {
      editable: true,
      array: true,
      label: 'Spécialité du restaurant',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    typeHousing: {
      editable: true,
      array: true,
      label: "Type d'habitation",
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    typeSpecialty: {
      editable: true,
      array: true,
      label: 'Type de spécialité',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    aopAocIgp: {
      editable: true,
      array: true,
      label: 'Labels chartes qualité',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    typeProduct: {
      editable: true,
      array: true,
      label: 'Type de produit',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    statusExploitant: {
      editable: true,
      label: "Statut de l'exploitant",
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    meanPayment: {
      editable: true,
      array: true,
      label: 'Moyen de paiement',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    openingEveryDay: {
      editable: true,
      label: 'Ouvert tous les jours',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    openingDate: {
      editable: true,
      label: "Période d'ouverture",
      fields: {
        description: { editable: true, label: 'Description', tag: 'textarea' },
        descriptionEn: {
          editable: true,
          label: 'Description(En)',
          tag: 'textarea'
        },
        descriptionEs: {
          editable: true,
          label: 'Description(Es)',
          tag: 'textarea'
        },
        descriptionIt: {
          editable: true,
          label: 'Description(It)',
          tag: 'textarea'
        },
        descriptionDe: {
          editable: true,
          label: 'Description(De)',
          tag: 'textarea'
        },
        descriptionNl: {
          editable: true,
          label: 'Description(Nl)',
          tag: 'textarea'
        },
        complementaryOpenings: {
          label: 'Ouverture complémentaire',
          editable: true,
          array: true,
          tableRef: 'ref',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes'
        },
        periodesOuvertures: {
          editable: true,
          array: true,
          label: 'Date et Description',
          fields: {
            dateStart: {
              editable: true,
              label: 'Date début',
              tag: 'input',
              type: 'date'
            },
            dateEnd: {
              editable: true,
              label: 'Date fin',
              tag: 'input',
              type: 'date'
            },
            horaireOuverture: {
              editable: true,
              label: "horaire d'ouverture",
              tag: 'input'
            },
            horaireFermeture: {
              editable: true,
              label: 'horaire de fermeture',
              tag: 'input'
            },
            type: {
              editable: false,
              label: 'Type',
              tag: 'input',
              type: 'input'
            },
            description: {
              editable: true,
              label: 'Description',
              tag: 'textarea'
            },
            descriptionEn: {
              editable: true,
              label: 'Description(En)',
              tag: 'textarea'
            },
            descriptionEs: {
              editable: true,
              label: 'Description(Es)',
              tag: 'textarea'
            },
            descriptionIt: {
              editable: true,
              label: 'Description(It)',
              tag: 'textarea'
            },
            descriptionDe: {
              editable: true,
              label: 'Description(De)',
              tag: 'textarea'
            },
            descriptionNl: {
              editable: true,
              label: 'Description(Nl)',
              tag: 'textarea'
            },
            ouverturesJourDuMois: {
              editable: true,
              array: true,
              label: 'Ouverture jour du mois',
              fields: {
                jour: { editable: true, label: 'Jour', tag: 'textarea' },
                horaireOuverture: {
                  editable: true,
                  label: "horaire d'ouverture",
                  tag: 'input'
                },
                horaireFermeture: {
                  editable: true,
                  label: 'horaire de fermeture',
                  tag: 'input'
                }
              }
            }
          }
        },
        fermeturesExceptionnelles: {
          editable: true,
          array: true,
          label: 'Fermetures exceptionnelles',
          fields: {
            dateSpeciale: {
              editable: true,
              label: 'Date spéciale',
              tag: 'textarea'
            }
          }
        }
      }
    },
    visites: {
      editable: true,
      label: 'visite',
      fields: {
        visitable: {
          editable: true,
          label: 'Visitable',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes'
        },
        dureeMoyenneVisiteGroupe: {
          editable: true,
          label: 'durée moyenne de la visite en groupe',
          tag: 'textarea'
        },
        dureeMoyenneVisiteIndividuelle: {
          editable: true,
          label: 'durée moyenne de la visite individuelle',
          tag: 'textarea'
        },
        languesPanneauInformation: {
          editable: true,
          array: true,
          label: 'langues panneau information',
          tableRef: 'ref',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes'
        },
        languesAudioGuide: {
          editable: true,
          array: true,
          label: 'langues audioguide',
          tableRef: 'ref',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes'
        },
        languesVisite: {
          editable: true,
          array: true,
          label: 'langues visite',
          tableRef: 'ref',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes'
        }
      }
    },
    price: {
      editable: true,
      label: 'Tarif',
      fields: {
        description: { editable: true, label: 'Description', tag: 'textarea' },
        descriptionEn: {
          editable: true,
          label: 'Description(En)',
          tag: 'textarea'
        },
        descriptionEs: {
          editable: true,
          label: 'Description(Es)',
          tag: 'textarea'
        },
        descriptionIt: {
          editable: true,
          label: 'Description(It)',
          tag: 'textarea'
        },
        descriptionDe: {
          editable: true,
          label: 'Description(De)',
          tag: 'textarea'
        },
        descriptionNl: {
          editable: true,
          label: 'Description(Nl)',
          tag: 'textarea'
        },
        detail: {
          editable: true,
          array: true,
          label: 'Détail',
          fields: {
            dateStart: {
              editable: true,
              label: 'Date début',
              tag: 'input',
              type: 'date'
            },
            dateEnd: {
              editable: true,
              label: 'Date fin',
              tag: 'input',
              type: 'date'
            },
            price: {
              editable: true,
              array: true,
              label: 'tarif',
              fields: {
                min: {
                  editable: true,
                  label: 'Min.',
                  tag: 'input',
                  type: 'number'
                },
                max: {
                  editable: true,
                  label: 'Max.',
                  tag: 'input',
                  type: 'number'
                },
                label: {
                  editable: true,
                  label: 'label',
                  tag: 'input',
                  type: 'textarea'
                },
                description: {
                  editable: true,
                  label: 'Description',
                  tag: 'textarea'
                },
                descriptionEn: {
                  editable: true,
                  label: 'Description(En)',
                  tag: 'textarea'
                },
                descriptionEs: {
                  editable: true,
                  label: 'Description(Es)',
                  tag: 'textarea'
                },
                descriptionIt: {
                  editable: true,
                  label: 'Description(It)',
                  tag: 'textarea'
                },
                descriptionDe: {
                  editable: true,
                  label: 'Description(De)',
                  tag: 'textarea'
                },
                descriptionNl: {
                  editable: true,
                  label: 'Description(Nl)',
                  tag: 'textarea'
                }
              }
            }
          }
        }
      }
    },
    priceInclude: {
      editable: true,
      label: 'Prix inclus',
      fields: {
        description: { editable: true, label: 'Description', tag: 'textarea' },
        descriptionEn: {
          editable: true,
          label: 'Description(En)',
          tag: 'textarea'
        },
        descriptionEs: {
          editable: true,
          label: 'Description(Es)',
          tag: 'textarea'
        },
        descriptionIt: {
          editable: true,
          label: 'Description(It)',
          tag: 'textarea'
        },
        descriptionDe: {
          editable: true,
          label: 'Description(De)',
          tag: 'textarea'
        },
        descriptionNl: {
          editable: true,
          label: 'Description(Nl)',
          tag: 'textarea'
        }
      }
    },
    priceNotInclude: {
      editable: true,
      label: 'Prix non inclus',
      fields: {
        description: { editable: true, label: 'Description', tag: 'textarea' },
        descriptionEn: {
          editable: true,
          label: 'Description(En)',
          tag: 'textarea'
        },
        descriptionEs: {
          editable: true,
          label: 'Description(Es)',
          tag: 'textarea'
        },
        descriptionIt: {
          editable: true,
          label: 'Description(It)',
          tag: 'textarea'
        },
        descriptionDe: {
          editable: true,
          label: 'Description(De)',
          tag: 'textarea'
        },
        descriptionNl: {
          editable: true,
          label: 'Description(Nl)',
          tag: 'textarea'
        }
      }
    },
    priceSupplement: {
      editable: true,
      label: 'Prix supplémentaire',
      fields: {
        description: { editable: true, label: 'Description', tag: 'textarea' },
        descriptionEn: {
          editable: true,
          label: 'Description(En)',
          tag: 'textarea'
        },
        descriptionEs: {
          editable: true,
          label: 'Description(Es)',
          tag: 'textarea'
        },
        descriptionIt: {
          editable: true,
          label: 'Description(It)',
          tag: 'textarea'
        },
        descriptionDe: {
          editable: true,
          label: 'Description(De)',
          tag: 'textarea'
        },
        descriptionNl: {
          editable: true,
          label: 'Description(Nl)',
          tag: 'textarea'
        }
      }
    },
    ski: {
      editable: true,
      label: 'Informations ski',
      fields: {
        classification: {
          editable: true,
          label: 'Classification',
          tableRef: 'ref',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes'
        },
        domaineSkiableTypes: {
          editable: true,
          array: true,
          label: 'Domaine skiable type',
          tableRef: 'ref',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes'
        },
        nombrePistes: {
          editable: true,
          label: 'nombrePistes',
          tag: 'textarea'
        },
        nombreKmPiste: {
          editable: true,
          label: 'nombreKmPiste',
          tag: 'textarea'
        },
        nombrePistesVertes: {
          editable: true,
          label: 'nombrePistesVertes',
          tag: 'textarea'
        },
        nombreKmPisteVerte: {
          editable: true,
          label: 'nombreKmPisteVerte',
          tag: 'textarea'
        },
        nombrePistesBleues: {
          editable: true,
          label: 'nombrePistesBleues',
          tag: 'textarea'
        },
        nombreKmPisteBleue: {
          editable: true,
          label: 'nombreKmPisteBleue',
          tag: 'textarea'
        },
        nombrePistesRouges: {
          editable: true,
          label: 'nombrePistesRouges',
          tag: 'textarea'
        },
        nombreKmPisteRouge: {
          editable: true,
          label: 'nombreKmPisteRouge',
          tag: 'textarea'
        },
        nombrePistesNoires: {
          editable: true,
          label: 'nombrePistesNoires',
          tag: 'textarea'
        },
        nombreKmPisteNoire: {
          editable: true,
          label: 'nombreKmPisteNoire',
          tag: 'textarea'
        },
        nombreKmPisteSkating: {
          editable: true,
          label: 'nombreKmPisteSkating',
          tag: 'textarea'
        },
        nombreRemonteesMecaniques: {
          editable: true,
          label: 'nombreRemonteesMecaniques',
          tag: 'textarea'
        },
        nombreTeleskis: {
          editable: true,
          label: 'nombreTeleskis',
          tag: 'textarea'
        },
        nombreTelesieges: {
          editable: true,
          label: 'nombreTelesieges',
          tag: 'textarea'
        },
        nombreTelecabines: {
          editable: true,
          label: 'nombreTelecabines',
          tag: 'textarea'
        },
        nombreTelepheriques: {
          editable: true,
          label: 'nombreTelepheriques',
          tag: 'textarea'
        },
        nombreAutresRemontees: {
          editable: true,
          label: 'nombreAutresRemontees',
          tag: 'textarea'
        },
        nombreRemonteesAccessiblesPietons: {
          editable: true,
          label: 'nombreRemonteesAccessiblesPietons',
          tag: 'textarea'
        },
        nombreHandiski: {
          editable: true,
          label: 'nombreHandiski',
          tag: 'textarea'
        },
        nombreRemonteesSkiFond: {
          editable: true,
          label: 'nombreRemonteesSkiFond',
          tag: 'textarea'
        },
        geolocalisation: {
          fields: {
            altitudeMini: {
              editable: true,
              label: 'Mini',
              tag: 'input',
              type: 'text',
              class: 'geodata'
            },
            altitudeMaxi: {
              editable: true,
              label: 'Maxi',
              tag: 'input',
              type: 'text',
              class: 'geodata'
            }
          }
        },
        territoireTypeStation: {
          editable: true,
          array: true,
          label: 'Type station',
          tableRef: 'ref',
          tag: 'checkbox',
          type: 'checkbox',
          class: 'checkboxes'
        }
      }
    },
    legalInformation: {
      editable: true,
      label: 'Informations Légales',
      fields: {
        siret: {
          editable: true,
          label: 'SIRET',
          tag: 'input',
          type: 'text'
        },
        apeNafCode: {
          editable: true,
          label: 'Code APE NAF',
          tag: 'input',
          type: 'text'
        },
        modeGestion: {
          editable: true,
          label: 'Mode gestion',
          tag: 'input',
          type: 'text'
        },
        rcs: {
          editable: true,
          label: 'rcs',
          tag: 'input',
          type: 'text'
        },
        numeroAgrementLicense: {
          editable: true,
          label: 'Numéro de licence',
          tag: 'input',
          type: 'text'
        },
        numeroRegistration: {
          editable: true,
          label: "Numéro d'enregistrement",
          tag: 'input',
          type: 'text'
        }
      }
    },
    labelArea: {
      editable: true,
      array: true,
      label: 'Zone labels',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    providerAccreditation: {
      editable: true,
      array: true,
      label: 'Habilitations prestataires',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    approval: {
      editable: true,
      array: true,
      label: 'Agréments',
      tableRef: 'ref',
      tag: 'checkbox',
      type: 'checkbox',
      class: 'checkboxes'
    },
    genericEvent: {
      editable: true,
      label: 'Evènement générique',
      tag: 'select',
      tableRef: 'ref'
    },
    created: { editable: false, label: 'Date de création' },
    createdFromClient: {
      editable: false,
      label: 'Date de création chez le client'
    },
    lastUpdate: { editable: false, label: 'Mise à jour' },
    lastUpdateFromClient: {
      editable: false,
      label: 'Mise à jour chez le client'
    },
    filename: { editable: false, label: "Fichier d'import" },
    errorType: { editable: false, label: "Type d'erreur" },
    errorDate: { editable: false, label: "Date de l'erreur" }
  };
  //@fixme : field type "date" not working
  //type: 'date'
};

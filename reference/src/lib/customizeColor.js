// color css template
const colorCSS = `
  <style>
    .app_gdpr a {
      color: default !important;
    }
    .app_gdpr a:hover {
      color: #133214 !important;
    }
    .app_gdpr button {
      border-color: default !important;
    }
    .app_gdpr .intro_acceptAll {
      color: #fff !important;
      background-color: default !important;
    }
    .app_gdpr .intro_acceptAll:hover{
      color: default !important;
      background-color: transparent !important;
    }
    .app_gdpr .button_invert {
      color: default !important;
      background-color: transparent !important;
    }
    .app_gdpr .button_invert:hover {
      color: #fff !important;
      background-color: default !important;
    }
    .app_gdpr .details_save {
      background: default !important;
      border-color: default !important;
    }
    .app_gdpr .details_save:hover {
      color: default !important;
      background-color: #fff !important;
    }
    .app_gdpr .details_button {
      color: default !important;
      border-color: default !important;
    }
    .app_gdpr .details_button:hover {
      color: #fff !important;
      background-color: default !important;
    }
    .app_gdpr .vendors_enableAll,
    .vendors_disabled {
      color: default !important;
    }
    .app_gdpr .switch_visualizationContainer,
    .switch_visualizationGlow {
      background-color: default !important;
    }
    .app_gdpr svg {
      fill: default !important;
    }
  </style>
`;

export function getColorCSS(color) {
  return colorCSS.replace(/default/g, color);
}

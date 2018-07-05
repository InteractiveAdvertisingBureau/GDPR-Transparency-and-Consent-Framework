// color css template
const colorCSS = `
  .app_gdpr a {
    color: #2e7d32 !important;
  }
  .app_gdpr a:hover {
    color: #133214 !important;
  }
  .app_gdpr button {
    border-color: #2e7d32 !important;
  }
  .app_gdpr .intro_acceptAll {
    color: #fff !important;
    background-color: #2e7d32 !important;
  }
  .app_gdpr .intro_acceptAll:hover{
    color: #2e7d32 !important;
    background-color: transparent !important;
  }
  .app_gdpr .button_invert {
    color: #2e7d32 !important;
    background-color: transparent !important;
  }
  .app_gdpr .button_invert:hover {
    color: #fff !important;
    background-color: #2e7d32 !important;
  }
  .app_gdpr .details_save {
    background: #2e7d32 !important;
    border-color: #2e7d32 !important;
  }
  .app_gdpr .details_save:hover {
    color: #2e7d32 !important;
    background-color: #fff !important;
  }
  .app_gdpr .details_button {
    color: #2e7d32 !important;
    border-color: #2e7d32 !important;
  }
  .app_gdpr .details_button:hover {
    color: #fff !important;
    background-color: #2e7d32 !important;
  }
  .app_gdpr .vendors_enableAll,
  .vendors_disabled {
    color: #2e7d32 !important;
  }
  .app_gdpr .switch_isSelected
  .switch_visualizationContainer,
  .switch_visualizationGlow {
    background-color: #2e7d32 !important;
  }
  .app_gdpr svg {
    fill: #2e7d32 !important;
  }
`;

export function getColorCSS(color) {
  return colorCSS.replace(/#2e7d32/g, color);
}

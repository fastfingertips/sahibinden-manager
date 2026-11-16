export const keyboardNavStyles = `
  /* --- Klavye ile İlan Seçim Odak Stilleri --- */
  #searchResultsTable tr.searchResultsItem.sm-keyboard-focused {
    position: relative;
    z-index: 2;
  }

  #searchResultsTable tr.searchResultsItem.sm-keyboard-focused td {
    background-color: #e6f1fc !important;
    border-top: 1px solid #3875ba !important;
    border-bottom: 1px solid #3875ba !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-keyboard-focused td:first-child {
    border-left: 4px solid #1e60a5 !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-keyboard-focused td:last-child {
    border-right: 1px solid #3875ba !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-keyboard-focused a.classifiedTitle {
    color: #144980 !important;
    font-weight: 700 !important;
  }

  /* Galeri Görünümü Klavye Odak Stili */
  #searchResultsGallery td.searchResultsGalleryItem.sm-keyboard-focused {
    outline: 2px solid #1e60a5 !important;
    outline-offset: -2px !important;
    box-shadow: 0 0 10px rgba(30, 96, 165, 0.4) !important;
    background-color: #e6f1fc !important;
  }
`;

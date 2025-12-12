import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar los archivos de traducción
import en from './locales/en.json';
import es from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
     resources: {
  en: {
    translation: {
      errors: {
        dataLoad: "Error loading chat data",
        channelCreate: "Channel could not be created",
      },
      success: {
        channelCreated: "Channel created successfully",
        channelRenamed: "Channel renamed successfully",
        channelDeleted: "Channel deleted successfully",
      }
    }
  },
  es: {
    translation: {
      errors: {
        dataLoad: "Error al cargar los datos del chat",
        channelCreate: "No se pudo crear el canal",
      },
      success: {
        channelCreated: "Canal creado correctamente",
        channelRenamed: "Canal renombrado correctamente",
        channelDeleted: "Canal eliminado correctamente",
      }
    }
  }
}

    },
    lng: 'en',           // 👈 IDIOMA PREDETERMINADO (IMPORTANTE)
    fallbackLng: 'en',   // 👈 Para pruebas automatizadas
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

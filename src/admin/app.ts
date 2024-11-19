

const config = {
  // Replace the Strapi logo in auth (login) views
 
  // Extend the translations
  translations: {
    en: {
      "app.components.LeftMenu.navbrand.title": "Store Dashboard",

      "app.components.LeftMenu.navbrand.workplace": "Testing",

      "Auth.form.welcome.title": "Welcom to Moshal Alo",

      "Auth.form.welcome.subtitle": "Login to your account",

      "Settings.profile.form.section.experience.interfaceLanguageHelp":
        "Preference changes will apply only to you.",
    },
  },
  // Disable video tutorials
  tutorials: false,
  // Disable notifications about new Strapi releases
  notifications: { releases: false },
};



export default {
  config,
  
};
import useGetFetch from "components/fetch/useGetFetch";
import { createContext, useEffect, useState } from "react";

// ============================================================

// ============================================================

// SET "rtl" OR "ltr" HERE
// THEN GOTO BROWSER CONSOLE AND RUN localStorage.clear() TO CLEAR LOCALSTORAGE
const initialSettings = {
  direction: "rtl",
};
export const SettingsContext = createContext({
  settings: initialSettings,
  siteSettingsData: {},
  updateSettings: (arg) => {},
});

// ============================================================

// ============================================================

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialSettings);
  const [siteSettingsData, setSiteSettingsData] = useState({});
  const [fetchSiteSettings, setFetchSiteSettings] = useState();
  const updateSettings = (updatedSetting) => {
    setSettings(updatedSetting);
    window.localStorage.setItem(
      "bazaar_settings",
      JSON.stringify(updatedSetting)
    );
  };

  // UseEffect to Get Data from API and assigning it to seperate State
  useEffect(() => {
    const getAllSettings = async () => {
      // -----------REQUEST HEADER---------
      const myHeaders = new Headers();
      myHeaders.append("X-localization", "ar");
      // -----------REQUEST HEADER ---------

      // -----------REQUEST OPTIONS---------
      const requestOptions = {
        method: "GET",
        headers: { "X-localization": "ar" },
      };
      // -----------REQUEST OPTIONS---------

      try {
        const settingsResponse = await useGetFetch(
          "https://sinbad-store.com/api/v2/settings",
          requestOptions
        );
        setFetchSiteSettings(settingsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAllSettings();
    
  }, []);
  // UseEffect to Get Data from LocalStorage and Assigning it to State
  useEffect(() => {
    if (!window) return null;
    // -----------------------------------------------
    const getItem = window.localStorage.getItem("bazaar_settings");
    if (getItem) setSettings(JSON.parse(getItem));
    // -----------------------------------------------
    const getSiteSettings = window.localStorage.getItem("siteData_settings");
    // if it exists assign it to state (siteSettings)
    if (getSiteSettings && getSiteSettings !== "undefined"){
      setSiteSettingsData(JSON.parse(getSiteSettings));
    }
    // if it doesn't, get the info from the fetch state and assign the local storage and the settings state to the fetched state
    if(!getSiteSettings || getSiteSettings === "undefined" || getSiteSettings === {}) {
      window.localStorage.setItem("siteData_settings", JSON.stringify(fetchSiteSettings));
      setSiteSettingsData(fetchSiteSettings);
    }
  }, [fetchSiteSettings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        siteSettingsData,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
export default SettingsProvider;

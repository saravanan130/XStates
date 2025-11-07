import React, { useEffect, useState } from "react";
import styles from "./CitySelector.module.css";
import axios from "axios";

const CitySelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState("");
  const [selectedStates, setSelectedStates] = useState("");
  const [selectedCities, setSelectedCities] = useState("");

  useEffect(() => {
    axios
      .get("https://location-selector.labs.crio.do/countries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  useEffect(() => {
    if (selectedCountries) {
      axios
        .get(
          `https://location-selector.labs.crio.do/country=${selectedCountries}/states`
        )
        .then((res) => {
          setStates(res.data);
          setSelectedStates("");
          setCities([]);
          setSelectedCities("");
        })
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [selectedCountries]);

  useEffect(() => {
    if (selectedCountries && selectedStates) {
      axios
        .get(
          `https://location-selector.labs.crio.do/country=${selectedCountries}/state=${selectedStates}/cities`
        )
        .then((res) => {
          setCities(res.data);
          setSelectedCities("");
        })
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedCountries, selectedStates]);

  return (
    <div className={styles.citySelector}>
      <h1>Select Location</h1>
      <div className={styles.dropdowns}>
        <select
          className={styles.dropdown}
          value={selectedCountries}
          onChange={(e) => setSelectedCountries(e.target.value)}
        >
          <option disabled value="">
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          className={styles.dropdown}
          value={selectedStates}
          onChange={(e) => setSelectedStates(e.target.value)}
        >
          <option disabled value="">
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          className={styles.dropdown}
          value={selectedCities}
          onChange={(e) => setSelectedCities(e.target.value)}
        >
          <option disabled value="">
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCities && (
        <h2>
          You selected{" "}
          <span className={styles.highlight}>{selectedCities}, </span>
          <span className={styles.fade}>
            {selectedStates}, {selectedCountries}
          </span>
        </h2>
      )}
    </div>
  );
};

export default CitySelector;


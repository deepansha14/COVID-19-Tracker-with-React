import React, { useState, useEffect } from "react";
import numeral from "numeral";
// Importing the css Files
import "./App.css";
// Leaflet css 
import "leaflet/dist/leaflet.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
// importing the components
import Box from "./Box";
import LinearPlot from "./LinearPlot";
import Table from "./Table";
import { sortData, Stat_format } from "./utils";
import Map from "./Map";

const App = () => {
  // setting up the initial states
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [plotCountries, setplotCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [TypeOfCases, setTypeOfCases] = useState("cases");
  const [mapLocation, setmapLocation] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(4);

  useEffect(() => {
    // to fetch data that appers as soon as the applicaton loads
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getData = async () => {
      // to fetch the data and get the name of the countries and the iso2 codes
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            countryName: country.country,
            code: country.countryInfo.iso2,
          }));
          // Updating the states
          let sortedData = sortData(data);
          setCountries(countries);
          setplotCountries(data);
          setTableData(sortedData);
        });
    };

    getData();
  }, []);

  console.log(TypeOfCases);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setmapLocation([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="main">
      <div className="main__left">
        <div className="main__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="main__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.code}>{country.countryName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="main__stats">
          <Box
            onClick={(e) => setTypeOfCases("cases")}
            title="Coronavirus Cases"
            RedColor
            selected={TypeOfCases === "cases"}
            cases={Stat_format(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <Box
            onClick={(e) => setTypeOfCases("recovered")}
            title="Recovered"
            selected={TypeOfCases === "recovered"}
            cases={Stat_format(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <Box
            onClick={(e) => setTypeOfCases("deaths")}
            title="Deaths"
            RedColor
            selected={TypeOfCases === "deaths"}
            cases={Stat_format(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <Map
          countries={plotCountries}
          TypeOfCases={TypeOfCases}
          center={mapLocation}
          zoom={mapZoom}
        />
      </div>
      <Card className="main__right">
        <CardContent>
          <div className="main__information">
            <h3>Country wise Live Cases</h3>
            <Table countries={tableData} />
            <hr />
            <h3>Worldwide new {TypeOfCases}</h3>
            <LinearPlot className="main__plot" TypeOfCases={TypeOfCases} className="graph" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
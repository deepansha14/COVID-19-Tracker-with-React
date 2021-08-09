import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortedData;
};

const TypeOfCasesColors = {
    cases: {
        hex: "#fb4443",
        rgb: "rgb(120, 104, 230)",
        half_op: "rgb(120, 104, 230, 0.5)",
        multiplier: 100,
    },
    recovered: {
        hex: "#00C1D4",
        rgb: "rgb(0, 193, 212)",
        half_op: "rgba(0, 193, 212, 0.5)",
        multiplier: 200,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(120, 104, 230)",
        half_op: "rgb(120, 104, 230, 0.5)",
        multiplier: 800,
    },
};

export const Stat_format = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, TypeOfCases = "cases") =>
    data.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={TypeOfCasesColors[TypeOfCases].hex}
            fillColor={TypeOfCasesColors[TypeOfCases].hex}
            fillOpacity={0.2}
            radius={
                Math.sqrt(country[TypeOfCases]) * TypeOfCasesColors[TypeOfCases].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    ></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-infected">
                        Cases: {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="info-recovered">
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="info-deaths">
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>
    ));


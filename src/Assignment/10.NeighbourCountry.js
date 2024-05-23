import { useState, useEffect } from "react";
import axios from "axios";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [neighbours, setNeighbours] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const result = response.data;
        setCountries(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //console.log(selectedCountry)  //selectedCountry cca3

  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((ele) => ele.cca3 === selectedCountry); 
      //console.log(country) seleted country as obj
      if (country.borders) {
        //console.log(country.borders)  only border
        axios
          .get(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join()}`)
          .then((response) => {
            const result = response.data;
            setNeighbours(result);
          });
      }
    }
    //console.log(countries) //all countries 
  }, [selectedCountry, countries]);

  return (
    <div>
      <h2>Neighbouring Countries</h2>
      <select
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          
        }}
      >
        <option value=""> Select</option>
        {countries.map((ele, i) => {
          return (
            <option key={i} value={ele.cca3}>
              {ele.name.common}
            </option>
          );
        })}
      </select>

      <table border='1'>
        <thead>
          <tr >
            <th>Flag</th>
            <th>Name </th>
            <th>Capital</th>
          </tr>
        </thead>
        <tbody>
          {neighbours.map((ele, i) => {
            return (
              <tr key={i}>
                <td>
                  <img src={ele.flags.png} width="64" alt='neighbours' />
                </td>
                <td>{ele.name.common} </td>
                <td> {ele.capital} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

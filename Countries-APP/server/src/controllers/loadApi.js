const axios = require("axios");
const { Country } = require("../db");

const loadApi = async () => {
  try {
    const {data} = await axios.get("http://localhost:5000/countries");

    const countries = data.map((country) => {
      return {
        id: country.cca3,
          name: country.name.common,
          flag: country.flags.svg,
          continent: getContinentName(country.continents[0]),
          capital: country.capital ? country.capital[0] : "no capital",
          subregion: country.subregion || "no subregion",
          area: country.area,
          population: country.population,
      };
    });
    await Country.bulkCreate(countries);
    
  } catch (error) {
    
  }
};

const getContinentName = (continents) => {
    const americaNames = ["North America", "South America", "Central America"];
  
    if (americaNames.includes(continents)) {
      return "America";
    }
    return continents;
  };

module.exports = loadApi;

const { Country, Activity } = require("../db");

const getCountries = async (req, res) => {
  try {
    const results = await Country.findAll({ include: { model: Activity } });

    if (!results.length) return res.status(400).json({ error: error.message });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json("error");
  }
};

module.exports = getCountries;

const { Activity, Country } = require("../../db");

const createActivity = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    const countriesId = countries.map((country) => country.id);

    if (!countriesId || countriesId.length <= 0) {
      return res.status(400).json({ error: "Country not found" });
    }

    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    if (countriesId && countriesId.length > 0) {
      const associatedCountries = await Country.findAll({
        where: {
          id: countriesId
        }
      });
      await newActivity.setCountries(associatedCountries);
    }

    res.status(200).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: "Server error occurred" });
  }
};

module.exports = createActivity;

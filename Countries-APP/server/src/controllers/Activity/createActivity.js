const { Activity, Country } = require("../../db");

const createActivity = async (req, res) => {
    try {
        const { name, difficulty, duration, season, countries } = req.body;
        const countriesId = countries.map((country) => country.id);

        if (!countriesId || countriesId.length <= 0) {
            return res.status(400).json({ error: "Country not found" });
        }

        const existingActivity = await Activity.findOne({
            where: {
                name,
            },
            include: {
                model: Country,
                where: {
                    id: countriesId,
                },
            },
        });

        if (existingActivity) {
            return res.status(405).json({ error: "Activity already exists in the selected country(s)" });
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
                    id: countriesId,
                },
            });
            await newActivity.setCountries(associatedCountries);
        }

        res.status(200).json(newActivity);
    } catch (error) {
        res.status(500).json({ error: "Server error occurred" });
    }
};

module.exports = createActivity;

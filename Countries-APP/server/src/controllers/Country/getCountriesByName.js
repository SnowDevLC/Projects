const { Country, Activity } = require("../../db");
const { Op } = require("sequelize");

const getCountriesByName = async (req, res) => {
    try {
        const { name, continent, activity } = req.query;
        let condition = {
            name: {
                [Op.iLike]: `%${name}%`,
            },
        };
        if (continent !== "All") condition.continent = continent;
        let activityCondition = {};
        if (activity !== "allActivities") {
            activityCondition = {
                name: {
                    [Op.iLike]: `%${activity}%`,
                },
            };
        }
        const results = await Country.findAll({
            where: condition,
            include: {
                model: Activity,
                where: activityCondition,
            },
        });
        let finalResults = results;
        if (activity !== "allActivities" && results.length === 0) {
            finalResults = [];
        }
        if (activity === "allActivities") {
            finalResults = await Country.findAll({
                where: condition,
                include: {
                    model: Activity,
                },
            });
        }
        if (finalResults.length === 0) throw new Error(
            "There is no country with that name");
        return res.status(200).json(finalResults);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = getCountriesByName;

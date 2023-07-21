const onlyLetters = /^[A-Za-z]+$/;

const validate = (activityData) => {
  let errors = {};

  if (!activityData.name) {
    errors.name = "Name requerido";
  }else if(!onlyLetters.test(activityData.name)){
    errors.name = "Only letters are allowed";
  }else if(activityData.name.length > 20){
    errors.name = "Max length of name is 20 characters.";
  }

  if(activityData.difficulty < 1 || activityData.difficulty > 5){
    errors.difficulty = "Difficulty must be at 1 and 5"
  }

  if(activityData.duration <= 0) {
    errors.duration = "The duration must be greater than 0";
  }

  if(activityData.season.length === 0) {
    errors.season = "You must choose at least one season";
  }

  if(activityData.countries.length === 0) {
    errors.countries = "You must choose at least one country";
  }

  
  return errors;
};

export default validate;
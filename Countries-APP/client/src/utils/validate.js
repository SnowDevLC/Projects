
const validate = (activityData) => {
  let errors = {};

  
  if (!activityData.name) {
    errors.name = "Name requerido";
  }
  

  
  return errors;
};

export default validate;
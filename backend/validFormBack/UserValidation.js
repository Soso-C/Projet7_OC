const yup = require("yup");

// Schema validateur d'input pour la création de compte.
const userSchema = yup.object({
  password: yup
    .string()
    .required("Un mot de passe est requis")
    .matches(
      /^.*(?=.{8,30})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "8 - 30 caracteres, une majuscule, un caractere spécial et un nombre est requis"),
  email: yup
    .string()
    .email("Entrez un email valide")
    .required("Un email est requis")
    .matches(/^[a-zA-Z0-9.-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/, "Entrez un email valide !"),
  fullname: yup
    .string()
    .required("Entrez votre nom et prénom")
    .matches(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/,"Doit contenir un espace et pas de caracteres spéciaux ex: Bill Gates")
    .min(6,"6 caracteres minimum sont requis")
    .max(25, "25 caracteres maximum"),
});


module.exports = userSchema
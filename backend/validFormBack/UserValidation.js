const yup = require("yup");

// Schema validateur d'input pour la création de compte.
const userSchema = yup.object({
  password: yup
    .string()
    .required("Un mot de passe est requis")
    .matches(
      /^.*(?=.{8,30})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "8 - 30 caracteres, une majuscule, un caractere spécial et un nombre est requis"
    ),
  email: yup
    .string()
    .email("Entrez un email valide")
    .required("Un email est requis")
    .matches(
      /^[a-zA-Z0-9.-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/,
      "Entrez un email valide !"
    ),
    name: yup
    .string()
    .required({ name: "Entrez votre prenom" })
    .matches(/^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,1}$/, {
      message: {
        name: "Pas de caracteres spécial",
      },
    })
    .min(3, { name: "3 caracteres minimum sont requis" })
    .max(25, { name: "25 caracteres maximum" }),
  lastname: yup
    .string()
    .required({ lastname: "Entrez votre nom" })
    .matches(/^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,1}$/, {
      message: {
        lastname: "Pas de caracteres spécial",
      },
    })
    .min(3, { lastname: "3 caracteres minimum sont requis" })
    .max(25, { lastname: "25 caracteres maximum" }),
});

module.exports = userSchema;

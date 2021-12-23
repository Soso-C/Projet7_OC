const yup = require("yup");

// Schema validateur d'input pour le login.

const loginSchema = yup.object({
  password: yup
    .string()
    .required({ password: "Un mot de passe est requis" })
    .min(8, { password: "Min 8 caracteres" }),
  email: yup
    .string()
    .email({ email: "Entrez un email valide" })
    .required({ email: "Un email est requis" })
    .matches(/^[a-zA-Z0-9.-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/, {
      message: {
        email: "Entrez un email valide !",
      },
    }),
});

module.exports = loginSchema;

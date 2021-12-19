const yup = require("yup");

// Validateur d'input pour lors de la modification du compte.
const userSchema = yup.object({
  fullname: yup
    .string()
    .required({ fullname: "Entrez votre nom et prénom" })
    .matches(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/, {
      message: {
        fullname:
          "Doit contenir un espace et pas de caracteres spéciaux ex: Bill Gates",
      },
    })
    .min(6, { fullname: "6 caracteres minimum sont requis" })
    .max(25, { fullname: "25 caracteres maximum" }),
  github: yup
    .string()
    .max(250, "max 250")
    // .matches(
    //   /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
    //   "Entrez un url valide"
    // )
    .notRequired(),
  bio: yup.string().max(250, "250 caracteres maximum").notRequired(),
  age: yup
    .number()
    .min(18, { age: "minimum 18 ans" })
    .max(100, { age: "maximum 100 ans" })
    .notRequired(),
  metier: yup.string().max(50, "50 caracteres max").notRequired(),
  country: yup.string().max(50, "50 caracteres max").notRequired(),
});

module.exports = userSchema;

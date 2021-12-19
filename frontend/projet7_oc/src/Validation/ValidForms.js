import React from "react";
import * as yup from "yup";

// Validateur d'input pour la création de compte.
export const registerSchema = yup.object().shape({
  password: yup
    .string()
    .required({ password: "Un mot de passe est requis" })
    .matches(
      /^.*(?=.{8,30})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      {
        message: {
          password:
            "8 - 30 caracteres, une majuscule, un caractere spécial et un nombre est requis",
        },
      }
    ),
  confirmPassword: yup
    .string()
    .required({ cpassword: "Mot de passe requis" })
    .oneOf([yup.ref("password"), null], {
      cpassword: "Mot de passe pas identique",
    }),
  email: yup
    .string()
    .email()
    .required({ email: "Un email est requis" })
    .matches(/^[a-zA-Z0-9.-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/, {
      message: {
        email: "Entrez un email valide !",
      },
    }),
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
});

// Validateur d'input pour la connexion de l'user.
export const loginSchema = yup.object().shape({
  password: yup
    .string()
    .required({ password: "Un mot de passe est requis" })
    .matches(
      /^.*(?=.{8,30})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      {
        message: {
          password:
            "8 - 30 caracteres, une majuscule, un caractere spécial et un nombre est requis",
        },
      }
    ),
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

// Validateur d'input pour la création d'un post.
export const postSchema = yup.object().shape({
  // title: yup
  // .string()
  // .max(100, { title: "100 caractères maximum" })
  // inutile pour seulement 1 validation
});

// Validateur d'input pour la création d'un commentaire.
export const comSchema = yup.object().shape({});

// Validateur d'input pour lors de la modification du compte.
export const editProfilSchema = yup.object().shape({
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
    .max(250, 'max 250')
    // .matches(
    //   /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
    //   "Entrez un url valide"
    // )
    .notRequired(),
  bio: yup.string().max(250, { bio: "250 caracteres max" }).notRequired(),
  age: yup
  .number()
  .min(18, { age: "minimum 18 ans" })
  .max(100, { age: "maximum 100 ans"})
  .notRequired(),
  metier: yup.string().max(50, { metier: "50 caracteres max" }).notRequired(),
  country: yup.string().max(50, { country: "50 caracteres max" }).notRequired(),
});

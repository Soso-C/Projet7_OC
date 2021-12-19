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
        email:
        "Entrez un email valide !",
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
export const loginSchema = yup.object().shape({});

// Validateur d'input pour la création d'un post.
export const postSchema = yup.object().shape({});

// Validateur d'input pour la création d'un commentaire.
export const comSchema = yup.object().shape({});

// Validateur d'input pour lors de la modification du compte.
export const editProfilSchema = yup.object().shape({});

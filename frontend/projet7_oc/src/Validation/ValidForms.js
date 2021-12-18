import React from "react";
import * as yup from "yup";

// Validateur d'input pour la création de compte.
export const registerSchema = yup.object().shape({
  password: yup
    .string()
    .required("Entrez un mot de passe")
    .matches(
      /^.*(?=.{8,40})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password au minimum 8 caracteres et 40 caractere max, une majuscule, un nombre et un caractere spécial"
    ),
  confirmPassword: yup
    .string()
    .required("Confirmez votre mot de passe")
    .oneOf([yup.ref("password"), null], "Les mot de passe sont pas identique"),
  email: yup
    .string()
    .email()
    .required("Un email est requis"),
  fullname: yup
  .string()
  .required("Entrez votre nom et prénom")
  .matches(/^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/)
  .max(35,"Maxium 35 caracteres")
});

// Validateur d'input pour la connexion de l'user.
export const loginSchema = yup.object().shape({});

// Validateur d'input pour la création d'un post.
export const postSchema = yup.object().shape({});

// Validateur d'input pour la création d'un commentaire.
export const comSchema = yup.object().shape({});

// Validateur d'input pour lors de la modification du compte.
export const editProfilSchema = yup.object().shape({});

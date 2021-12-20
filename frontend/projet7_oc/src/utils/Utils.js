// Permet de formater la date et de la mettre en FR (pour les post)
export const dateParser = (num) => {
    let options = {hour: "2-digit", minute: "2-digit", seconde: "2-digit", weekday:"long", year:"numeric", month:"short", day:"numeric"};

    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options)

    return date.toString()
}


// date pour commentaire
export const dateParserCom = (num) => {
    let options = {hour: "2-digit", minute: "2-digit", seconde: "2-digit", year:"numeric", month:"short", day:"numeric"};

    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options)

    return date.toString()
}
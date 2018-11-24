const User = require("./user");

let getNickname  = function () {
    const adjetive = ["Classic","Perfect","Darken","Obscure","Main"];
    const object = ["Youth","Doggy","Star","Perk","Lord"];

    //elige 2 valores dentro de cada arreglo con un numero random y finalmente los concatena en un string.
    return `${adjetive[Math.floor(Math.random()*adjetive.length)]}${object[Math.floor(Math.random()*object.length)]}${Math.floor(Math.random()*50)}${Math.floor(Math.random()*50)}`;
};

let nick = getNickname();
let name = false;

while (name = false) {
    //busca dentro del modelo de User en base al nickname
    User.findOne({nickname: nick})
        .then(user => {
            //si no existe, rompe el ciclo
            if (!user) {
                return name = true;
            } else {
                //ejecuta de nuevo la funcion si es que existe
                nick = getNickname();
            }
        });
}

//exporta el nick
module.exports = nick;
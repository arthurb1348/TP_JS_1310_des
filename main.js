const titre = document.querySelector("h1");
const btn = document.querySelector("button");
const txt1 = document.querySelector("#p1");

class Des {
    constructor(nbrface, score) {
        this.nbrface = nbrface;
        this.score = score;
    }
    lancer() {
        this.score = Math.floor(Math.random() * this.nbrface) + 1;
        return this.score;
    }
}

class Joueur {
    constructor(nom, valeurLance, des) {
        this.nom = nom;
        this.valeurLance = valeurLance;
        this.des = des;
    }
    lancerDes() {
        this.des = new Des(6);
        this.valeurLance = this.des.lancer(Des);
        return this.valeurLance;
    }
}

const player = new Joueur('tutur');
console.log(player.lancerDes())

class Partie {
    constructor(joueur1, joueur2, nbrTour, scoreJ1, scoreJ2) {
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
        this.nbrTour = nbrTour;
        this.scoreJ1 = scoreJ1;
        this.scoreJ2 = scoreJ2;
    }
    lancerPartie() {
        this.joueur1 = new Joueur(this.joueur1);
        this.joueur2 = new Joueur(this.joueur2);
        for(let i = 0; i < this.nbrTour; i++) {
            let lanceJ1 = this.joueur1.lancerDes();
            let lanceJ2 = this.joueur2.lancerDes();
            if(lanceJ1 > lanceJ2) {
                this.scoreJ1 += 2;
            } else if(lanceJ1 == lanceJ2) {
                this.scoreJ1 ++;
                this.scoreJ2 ++; 
            } else {
                this.scoreJ2 += 2;
            }
        }
        if(this.scoreJ1 > this.scoreJ2) {
            return `${this.joueur1.nom} à gagner avec un score de : ${this.scoreJ1}`;
        } else if(this.scoreJ1 == this.scoreJ2) {
            return `Match nul avec un score de : ${this.scoreJ1} chacun`;
        } else {
            return `${this.joueur2.nom} à gagner avec un score de : ${this.scoreJ2}`;
        }
    }
}

const partie1 = new Partie("Tutur","Ranger",5,0,0);
console.log(partie1.lancerPartie());
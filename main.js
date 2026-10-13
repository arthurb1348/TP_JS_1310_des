class Des {
    constructor(nbrface = 6) {
        this.nbrface = nbrface;
        this.score = 0;
    }

    lancer() {
        this.score = Math.floor(Math.random() * this.nbrface) + 1;
        return this.score;
    }
}

class Joueur {
    constructor(nom) {
        this.nom = nom;
        this.valeurLance = 0;
        this.des = new Des(6);
    }

    lancerDes() {
        this.valeurLance = this.des.lancer();
        return this.valeurLance;
    }
}

class Partie {
    constructor(nomJ1, nomJ2, nbrTour) {
        this.joueur1 = new Joueur(nomJ1);
        this.joueur2 = new Joueur(nomJ2);
        this.nbrTour = nbrTour;
        this.scoreJ1 = 0;
        this.scoreJ2 = 0;
    }

    lancerPartie() {
        for (let i = 0; i < this.nbrTour; i++) {
            const lanceJ1 = this.joueur1.lancerDes();
            const lanceJ2 = this.joueur2.lancerDes();

            if (lanceJ1 > lanceJ2) {
                this.scoreJ1 += 2;
            } else if (lanceJ1 === lanceJ2) {
                this.scoreJ1++;
                this.scoreJ2++;
            } else {
                this.scoreJ2 += 2;
            }
        }

        if (this.scoreJ1 > this.scoreJ2) {
            return `${this.joueur1.nom} a gagné avec ${this.scoreJ1} points !`;
        } else if (this.scoreJ1 === this.scoreJ2) {
            return `Match nul avec un score de ${this.scoreJ1} chacun !`;
        } else {
            return `${this.joueur2.nom} a gagné avec ${this.scoreJ2} points !`;
        }
    }
}

const titre = document.querySelector("h1");
const btn = document.querySelector("#lancer");
const txt1 = document.querySelector("#p1");
const formulaire = document.querySelector("#form-partie");

const champJ1 = document.querySelector("#joueur1");
const champJ2 = document.querySelector("#joueur2");
const champTours = document.querySelector("#nbrTour");
const erreur = document.querySelector("#erreur");

formulaire.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const nomJ1 = champJ1.value.trim();
    const nomJ2 = champJ2.value.trim();
    const nbrTour = Number(champTours.value);

    erreur.textContent = "";

    if (nomJ1 === "" || nomJ2 === "") {
        erreur.textContent = "Renseigne les deux noms.";
        return;
    }

    if (!Number.isInteger(nbrTour) || nbrTour < 1) {
        erreur.textContent =
            "Le nombre de tours doit être un entier supérieur à 0.";
        return;
    }

    const partie = new Partie(nomJ1, nomJ2, nbrTour);
    // Joue la partie une seule fois et récupère le résultat
    const resultat = partie.lancerPartie();

    if (partie.scoreJ1 === partie.scoreJ2) {
        titre.textContent = resultat;
    } else {
        // Sélectionne le joueur qui a le plus de points
        const gagnant = partie.scoreJ1 > partie.scoreJ2
            ? partie.joueur1
            : partie.joueur2;

        const meilleurScore = Math.max(partie.scoreJ1, partie.scoreJ2);

        // Élément contenant le nom
        const nom = document.createElement("span");
        nom.textContent = gagnant.nom;
        nom.classList.add("nom-vainqueur");

        const score = document.createElement("span");
        score.textContent = `${meilleurScore} points`;
        score.classList.add("score-vainqueur");

        // Remplace le précédent résultat
        titre.textContent = "";
        titre.append(nom, " a gagné avec ", score, " !");
    }

    txt1.textContent =
        `${partie.joueur1.nom} : ${partie.scoreJ1} points | ` +
        `${partie.joueur2.nom} : ${partie.scoreJ2} points`;
    btn.textContent = "Nouvelle partie ?";
});
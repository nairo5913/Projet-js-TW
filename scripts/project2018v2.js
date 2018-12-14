// global variable for the project

// default initial width and heigth for the target
var TARGET_WIDTH = 40;
var TARGET_HEIGHT = 40;

// chrono management
// value of time in tenth of seconds
var time = 0;
// timer variable
var chronoTimer = null;

//
var start;
var remaining;
var terrain;

var tenth;
var seconds;
var minutes;


// YOUR NAME HERE
// Florian Provost
// YOUR CODE BELOW

/* setupListeners : Appeler au chargement de la page et initialiser les
                    différent event. Recupe également les id.
 */
var setupListeners = function()
{
    var cible = document.getElementById("create");
    start = document.getElementById("start");
    terrain = document.getElementById("terrain");
    remaining = document.getElementById("remaining");
    tenth = document.getElementById("tenth");
    seconds = document.getElementById("seconds");
    minutes = document.getElementById("minutes");

    cible.addEventListener("click", ajout_cible);
    start.addEventListener("click", demarre);
};

window.addEventListener("load", setupListeners);

/* storageAvailable : détecte que localStorage est supporté mais aussi disponible
    Parametres :
        type :

    retour :
 */
function storageAvailable(type)
{
    try
    {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e)
    {
        return false;
    }
}

/* ajout_cible : Créé une cible dans le terrain et incrémente le compteur.
 */
function ajout_cible()
{
    var horizontal = (Math.random() * 360) + "px";
    var vertical = (Math.random() * 360) + "px";

    var cible_div = document.createElement("div");
    terrain.appendChild(cible_div);


    cible_div.setAttribute("class", "target on");
    cible_div.style.left = horizontal;
    cible_div.style.top = vertical;
    remaining.textContent = parseInt(remaining.textContent) + 1;

    cible_div.addEventListener("click", hit);
}

/* hit : Supprime l'event de la cible cliquer et appele la fonction gérant
         la suppression.
 */
function hit()
{
    this.removeEventListener("click", hit);
    this.setAttribute("class", this.getAttribute("class") + "hit");
    remaining.textContent = parseInt(remaining.textContent) - 1;

    val = window.setTimeout(remove_hit, 1000, this);

}

/* remove_hit : Supprime la cible ayant été selectionner.
    Parametres
        arguments[0] : Le noeud node enfant à supprimer. Passé par la fonction `window.setTimeout`.
 */
function remove_hit()
{
    terrain.removeChild(arguments[0]);
}

/* demarre : Permet de démarrer la partie
 */
function demarre()
{

    var nbtargets = document.getElementById("nbtargets");

    if (nbtargets.value == 0)
    {
        window.alert("Vous ne pouvez pas lancer une partie avec 0 cible.")
    }
    else
    {
        reset();
        chronoTimer = window.setInterval(gere_temp ,100);

        remaining.textContent = 0;

        for (var i = 0; i < nbtargets.value; i++)
        {
            ajout_cible();
        }
    }
}

/* reset : Réinitialise les élément pour pouvoir lancer une nouvelle pouvoir
           lancer une nouvelle partie.
 */
function reset()
{
    for (var i = 0; i < parseInt(remaining.textContent); i++)
    {
        terrain.removeChild(terrain.lastChild);
    }

    if (chronoTimer != null)
    {
        window.clearInterval(chronoTimer);
    }

    tenth.textContent = 0;
    minutes.textContent = 0;
    seconds.textContent = "00";
    time = 0;
}

/* fini :
 */
function fini()
{
    window.clearInterval(chronoTimer);
    message = "Gagné en " + minutes.textContent + " minutes " +
              seconds.textContent + " secondes " + tenth.textContent +
              " dixieme de secondes";
    window.alert(message);
}

/* gere_temp : Modifie la valeur de la variable time et modifie l'affichage du
               temps.
 */
function gere_temp()
{
    time = time + 1;

    // ms
    if (tenth.textContent != "9")
    {
        tenth.textContent++;
    }
    else
    {
        tenth.textContent = 0;
    }

    // secondes
    if(time%10 == 0)
    {
        seconds.textContent++;

        if(seconds.textContent < 10)
        {
            seconds.textContent = "0" + seconds.textContent;
        }
    }

    // minutes
    if (time%600 == 0)
    {
        minutes.textContent++;
        seconds.textContent = "00";
    }

    if(remaining.textContent == 0)
    {
        fini();
    }
}


function enregistre_score()
{
    if (storageAvailable('localStorage'))
    {
        // Nous pouvons utiliser localStorage
    }
    else
    {
        // Malheureusement, localStorage n'est pas disponible
    }
}

function recupere_score()
{

    if (storageAvailable('localStorage'))
    {
        // Nous pouvons utiliser localStorage
    }
    else
    {
        // Malheureusement, localStorage n'est pas disponible
    }
}

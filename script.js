/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

/*Se la lista delle domande con risposta contiene 3 elementi (cioè tutte le domande) allora il test è concluso*/ 
function isGameOver() {
    if (listaDomandeConRisposta.length === 3) 
        return true;
    else return false;
}

/*Per ogni domanda aggiorno la risposta data con il click */
function aggiornaMappaDomRisp(questionId, choiceId) {
    mappaDomandaRisposta[questionId] = choiceId;
}

function mostraPersonalita() {
    
    const RispostaDomanda1 = mappaDomandaRisposta['one'];
    const RispostaDomanda2 = mappaDomandaRisposta['two'];
    const RispostaDomanda3 = mappaDomandaRisposta['three'];

    if (RispostaDomanda1 === RispostaDomanda2 || RispostaDomanda1 === RispostaDomanda3) 
        RispostaPiuSelezionata = RispostaDomanda1;
    else if (RispostaDomanda2 === RispostaDomanda1 || RispostaDomanda2 === RispostaDomanda3)
        RispostaPiuSelezionata = RispostaDomanda2;
    else if (RispostaDomanda3 === RispostaDomanda1 || RispostaDomanda3 === RispostaDomanda2)
        RispostaPiuSelezionata= RispostaDomanda3;
    else RispostaPiuSelezionata = RispostaDomanda1;
    

    /*mostro il footer con il risultato del test*/
    const element = document.querySelector('footer');
    const titolo = element.querySelector('h1');
    titolo.textContent = RESULTS_MAP[RispostaPiuSelezionata].title;
    const testo = element.querySelector('p');
    testo.textContent = RESULTS_MAP[RispostaPiuSelezionata].contents;
    element.classList.remove('hidden');
}

/*Inserisco nella lista delle domande con risposta quella a cui ho appena risposto (se non vi è già)*/
function aggiornaListaDomande(idQuestion) {
    var flag = 0;
    for (const domanda of listaDomandeConRisposta) {
        if (domanda === idQuestion) 
            flag = 1;
    }
    if (flag === 0) 
        listaDomandeConRisposta.push(idQuestion);
}

function selezionaRisposta(event) {
    const element = event.currentTarget;
    element.classList.remove('notSelected');
    element.classList.add('selected');
    const immagine = element.querySelector('img.checkbox');
    immagine.src="images/checked.png";
    aggiornaListaDomande(element.dataset.questionId);
    aggiornaMappaDomRisp(element.dataset.questionId, element.dataset.choiceId);
    for (const risposta of listaRisposte) {
        if ((risposta !== element) && (risposta.dataset.questionId === element.dataset.questionId)) {
            const image = risposta.querySelector('img.checkbox');
            image.src="images/unchecked.png"
            risposta.classList.remove('selected');
            risposta.classList.add('notSelected');
        }
    }
    if (isGameOver()) {
        for (const risposta of listaRisposte)
            risposta.removeEventListener('click',selezionaRisposta);
        mostraPersonalita();
    }
}

function resetTest() {
    RispostaPiuSelezionata = null;

    for (let i=0;i<listaDomandeConRisposta.length; i++) {
        listaDomandeConRisposta.splice(i,1);
    }

    for (const risposta of listaRisposte) {
        risposta.classList.remove('selected');
        risposta.classList.remove('notSelected');
        const image = risposta.querySelector('img.checkbox');
        image.src = "images/unchecked.png";
        risposta.addEventListener('click',selezionaRisposta);
    }
    const footer = document.querySelector("footer");
    footer.classList.add("hidden");
}

let RispostaPiuSelezionata;  /*variabile globale che conterrà la risposta più selezionata (o la prima in caso di pareggio) */

const mappaDomandaRisposta = { /*contiene per ogni domanda la risposta più recentemente selezionata (inizialmente i valori sono null)*/
    'one' : null,
    'two' : null,
    'three' : null
};   

const listaDomandeConRisposta = [];  /*utile per capire quando sono state date le risposte a tutte le domande*/

const listaRisposte = document.querySelectorAll('section.choice-grid div');

for (const risposta of listaRisposte) {
    risposta.addEventListener('click',selezionaRisposta);
}

const bottone = document.querySelector('footer button');

bottone.addEventListener('click',resetTest);

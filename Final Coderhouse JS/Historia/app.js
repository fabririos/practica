const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {}

function startGame() {
    state = {};
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find( textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text;
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state , option.setState);
    showTextNode(nextTextNodeId);
}



//CAMINOS POSIBLES Y VARIABLES
const textNodes = [
    {
        id: 1,
        text: 'Te despiertas en un lugar extraño y distingues un recipiente con una baba azul cerca tuyo.',
        options: [
            {
                text:'Toma el recipiente',
                setState: { babaAzul: true},
                nextText: 2
            },
            {
                text: 'Deja el recipiente',
                nextText: 2,
            },
        ]
    },
    {
        id:2,
        text: 'Avanzas en búsqueda de respuestas cuando te encuentras con un mercader.',
        options: [
            {
                text: 'Intercambiar recipiente con baba por una espada.',
                requiredState: (currentState) => currentState.babaAzul,
                setState: {babaAzul: false, espada: true},
                nextText: 3
            },
            {
                text: 'Intercambiar recipiente con baba por un escudo.',
                requiredState: (currentState) => currentState.babaAzul,
                setState: {babaAzul: false, escudo: true},
                nextText: 3
            },
            {
                text: 'Ignorar al mercader.',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'Después de dejar al mercader te empiezas a sentir exhausto y te cruzas con una pequeña ciudad situada al lado de un castillo de fachada peligrosa.',
        options: [
            {
                text:'Entrar al castillo',
                nextText: 4
            },
            {
                text:'Encontrar un hotel en la ciudad donde dormir',
                nextText: 5
            },
            {
                text:'Encontrar heno en un establo donde descansar',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'Estas tan cansado que mientras exploras el castillo te quedas dormido y eres asesinado por un terrible monstruo mientras duermes.',
        options :[
            {
                text: 'Fin de tu historia. Reiniciar.',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Sin nada de dinero decides irrumpir en el cuarto mas cercano y te duermes. Después de algunas horas el dueño de la posada te encuentra y te lleva a la celda mas cercana donde te encierran.',
        options: [
            {
            text: 'Fin de tu historia. Reiniciar',
            nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'Te despiertas bien descansado y lleno de energía, listo para ir a explorar el castillo.',
        options: [
            {
            text: 'Explora el castillo',
            nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'Explorando el castillo te encuentas un monstruo horrendo en tu camino.',
        options: [
          {
            text: 'Trata de escapar',
            nextText: 8
          },
          {
            text: 'Ataca con tu espada',
            requiredState: (currentState) => currentState.espada,
            nextText: 9
          },
          {
            text: 'Escóndete detras de tu escudo',
            requiredState: (currentState) => currentState.escudo,
            nextText: 10
          },
          {
            text: 'Tírale la el recipiente con baba azul al monstruo',
            requiredState: (currentState) => currentState.babaAzul,
            nextText: 11
          }
        ]
    },
    {
        id: 8,
        text: 'Tus intentos de escapar son en vano y el monstruo te atrapa fácilmente.',
        options: [
          {
            text: 'Fin de tu historia. Reiniciar',
            nextText: -1
          }
        ]
    },
    {
        id: 9,
        text: 'Inocentemente creíste que éste monstruo podría ser vencido con solo una espada.',
        options: [
          {
            text: 'Fin de tu historia. Reiniciar',
            nextText: -1
          }
        ]
    },
    {
        id: 10,
        text: 'El monstruo se ríe mientras te escondes detras de tu escudo y te devora.',
        options: [
          {
            text: 'Fin de tu historia. Reiniciar',
            nextText: -1
          }
        ]
    },
    {
        id: 11,
        text: 'Lanzaste el recipiente con baba azul al monstruo y explotó. Cuando el polvo se disipa ves a la bestia tirada en el suelo. Tras divisar tu victoria, reclamas al castillo como tuyo y vives el resto de tus dias allí.',
        options: [
          {
            text: 'Felicitaciones! Completaste tu historia.',
            nextText: -1
          }
        ]
    }
]

startGame()
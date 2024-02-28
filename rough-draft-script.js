const textElement = document.getElementById('text');
const optionButtons = document.getElementById('option-buttons');

let state = {}

function startGame() {
    state = {}
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }



    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNode = option.nextText
    if (nextTextNode <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'Discovering the Power',
        options: [
            {
                text: 'Investigate the mysterious artifact with caution.',
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: 'Ignore the artifact at first but eventually experiment with it.',
                nextText: 2
            },
            {
                text: 'Immediately use the artifact without reservation.',
                nextText: 2
            },
            {
                text: 'Keep the artifact hidden and avoid using it.',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Choosing the Path',
        options: [
            {
                text: 'Decide to use the powers for noble causes.',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'Decide to use the powers for noble causes.',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'Something else',
        options: [
            {
                text: 'quit',
                nextText: -1
            },
            {
                text: 'try again',
                nextText: -1
            }
        ]
    }
]

startGame();
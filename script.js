const promtInput = document.getElementById('promtInput');
const terminal = document.getElementById('terminal');
const terminalWindow = document.getElementById('terminalWindow');
const date = document.getElementById('date');
const commandElements = document.querySelectorAll('.command');
let currentIndex = -1;
const history = [];
const availableCommands = ["help", "about", "social", "skills", "education", "experience", "projects", "clear"];

promtInput.focus();
date.innerText = new Date().toDateString();
terminalWindow.addEventListener('click', () => promtInput.focus());

promtInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    enterCommand(event);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    navigateHistory(-1);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    navigateHistory(1);
  } else if (event.key === "Tab") {
    event.preventDefault();
    autocompleteCommand();
  }
});

const enterCommand = (event) => {
  const userInput = event.target.value.trim();
  history.push(userInput);

  const promtElement = document.getElementById('promptClone').cloneNode(true);
  promtElement.classList.remove('hidden');
  promtElement.getElementsByClassName('promtCloneInput')[0].innerHTML = userInput;
  promtElement.setAttribute('id', null);
  promtElement.getElementsByClassName('promtCloneContent')[0].appendChild(selectCommandBlock(userInput));
  terminal.appendChild(promtElement);
  promtInput.value = '';
  promtInput.scrollIntoView({ block: 'start' });
};

const navigateHistory = (step) => {
  currentIndex += step;

  if (currentIndex < -1) {
    currentIndex = -1;
    promtInput.value = '';
  } else if (currentIndex >= history.length) {
    currentIndex = history.length - 1;
  }

  if (currentIndex === -1) {
    promtInput.value = '';
  } else {
    promtInput.value = history[currentIndex];
  }
};

const autocompleteCommand = () => {
  const partialCommand = promtInput.value.trim();
  const matchingCommands = availableCommands.filter(command => command.startsWith(partialCommand));

  if (matchingCommands.length === 1) {
    promtInput.value = matchingCommands[0];
  }
};

const selectCommandBlock = (command) => {
  const lowerCommand = command.toLowerCase()
  switch (lowerCommand) {
    case 'help':
    case 'about':
    case 'social':
    case 'skills':
    case 'education':
    case 'experience':
    case 'projects':
      return getCommandTemplate(lowerCommand);
    case 'clear':
      return clearCommand();
    default:
      return notFoundCommand(command);
  }
}

const getCommandTemplate = (command) => {
  const element = document.getElementById(command).cloneNode(true);
  element.classList.remove('hidden');
  element.setAttribute('id', null);
  return element;
}

const clearCommand = () => {
  terminal.innerHTML = '';
  const element = document.createElement('span');
  return element;
}

const notFoundCommand = (command) => {
  const element = document.createElement('span');
  element.innerText = `-bash: ${command}: command not found`;
  element.classList.add('error');
  return element;
}

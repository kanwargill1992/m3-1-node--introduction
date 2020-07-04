const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");

// focus the input on load
const handleFocus = () => {
  messageInput.focus();
};

// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
  const { author, text } = message;
  const messageElem = document.createElement("p");

  messageElem.classList.add("message", author);
  messageElem.innerHTML = `<span>${text}</span>`;
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;
  // let msg = messageInput.value;
  if (author === "user") messageInput.value = "";
  handleFocus();
};

const sendMessage = (event) => {
  event.preventDefault();
  // console.log(msg);
  let msg = messageInput.value;
  const message = { author: "user", text: msg };
  updateConversation(message);
  fetch(`/parrot-message/?message=${msg}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateConversation(data.message);
    });
};

// call handleFocus on load
handleFocus();

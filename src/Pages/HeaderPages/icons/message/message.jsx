// Dummy data for demonstration (detailed content of messages)
const dummyMessages = [
    {
      id: 1,
      sender: "Reception",
      subject: "Check-in Delay",
      content: `Dear Front Desk,\nThe guest in room 305 will arrive late today.\nPlease note the new arrival time is 8:00 PM.\nThanks,\nReception`,
      status: "Unread",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "Accounting",
      subject: "Payment Issue",
      content: `Hello,\nInvoice #987 remains unpaid.\nKindly check with the guest or relevant department.\nRegards,\nAccounting`,
      status: "Read",
      time: "9:00 AM",
    },
    {
      id: 3,
      sender: "Housekeeping",
      subject: "Room Cleaning Request",
      content: `Hi,\nThe guest in room 402 requested an extra cleaning service at 2:00 PM.\nPlease ensure housekeeping staff is notified.\nThanks,\nHousekeeping`,
      status: "Unread",
      time: "8:45 AM",
    },
  ];
  
  // On DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    const messageList = document.getElementById("messageList");
    const messageView = document.getElementById("messageView");
    const composeMessage = document.getElementById("composeMessage");
    const composeBtn = document.getElementById("composeBtn");
    const refreshBtn = document.getElementById("refreshBtn");
    const composeForm = document.getElementById("composeForm");
  
    // Clicking on a message in the list -> show details in the message view
    messageList.addEventListener("click", (e) => {
      const listItem = e.target.closest("li.message-item");
      if (!listItem) return;
      const messageId = parseInt(listItem.getAttribute("data-id"), 10);
      showMessageDetails(messageId);
    });
  
    // Show message details in the right panel
    function showMessageDetails(id) {
      const msg = dummyMessages.find((m) => m.id === id);
      if (!msg) return;
  
      // Mark as read if it's unread
      const listItem = messageList.querySelector(`li[data-id="${id}"]`);
      if (msg.status === "Unread") {
        msg.status = "Read";
        listItem.classList.remove("unread");
      }
  
      messageView.innerHTML = `
        <h2>${msg.subject}</h2>
        <p><strong>From:</strong> ${msg.sender}</p>
        <p><strong>Time:</strong> ${msg.time}</p>
        <p>${msg.content.replace(/\n/g, "<br>")}</p>
        <div class="message-actions">
          <button class="btn btn-success" onclick="replyMessage(${id})">Reply</button>
          <button class="btn btn-warning" onclick="forwardMessage(${id})">Forward</button>
          <button class="btn btn-info" onclick="toggleReadStatus(${id})">Mark as Unread</button>
          <button class="btn btn-danger" onclick="deleteMessage(null, ${id})">Delete</button>
        </div>
      `;
    }
  
    // Compose New Message button -> scroll to compose form
    composeBtn.addEventListener("click", () => {
      window.scrollTo({
        top: composeMessage.offsetTop,
        behavior: "smooth",
      });
    });
  
    // Refresh Messages button
    refreshBtn.addEventListener("click", () => {
      alert("Messages refreshed (dummy).");
    });
  
    // Submit compose form
    composeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // In real scenario, you'd send data to server
      alert("Message sent successfully!");
      composeForm.reset();
    });
  });
  
  // Global functions to handle pin, delete, reply, forward
  function pinMessage(event, id) {
    event.stopPropagation();
    alert(`Message #${id} pinned (dummy).`);
  }
  
  function deleteMessage(event, id) {
    if (event) event.stopPropagation();
    alert(`Message #${id} deleted (dummy).`);
  }
  
  function replyMessage(id) {
    alert(`Replying to message #${id} (dummy).`);
  }
  
  function forwardMessage(id) {
    alert(`Forwarding message #${id} (dummy).`);
  }
  
  function toggleReadStatus(id) {
    const msg = dummyMessages.find((m) => m.id === id);
    if (!msg) return;
  
    const listItem = document.querySelector(`li[data-id="${id}"]`);
    if (msg.status === "Read") {
      msg.status = "Unread";
      listItem.classList.add("unread");
      alert(`Message #${id} marked as Unread.`);
    } else {
      msg.status = "Read";
      listItem.classList.remove("unread");
      alert(`Message #${id} marked as Read.`);
    }
  }
  
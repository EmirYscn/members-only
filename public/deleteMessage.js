const deleteMessage = async function (messageId) {
  fetch(`/message/${messageId}`, {
    method: "DELETE",
  })
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => console.error("Error:", error));
};

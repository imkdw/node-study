const deleteBtn = document.querySelectorAll(".deleteBtn");

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const btn = event.currentTarget;
    const productId = btn.parentNode.querySelector("[name=productId").value;
    const csrfToken = btn.parentNode.querySelector("[name=_csrf").value;
    const closestParent = btn.closest("article");

    fetch(`/admin/product/${productId}`, {
      method: "DELETE",
      headers: {
        "csrf-token": csrfToken,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        closestParent.parentNode.removeChild(closestParent);
      })
      .catch((err) => console.error(err));
  });
});

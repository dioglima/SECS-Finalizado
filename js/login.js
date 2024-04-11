const url = "https://poupe-mais-api.vercel.app";

const form = document.getElementById("login-form"); //acessando métodos e propriedades do formulário, não acessa de fato é com se fosse um atalho para aquele elemento
const message = document.getElementById("error-message");

//criando um método que escuta um evento e apartir de um evento executa uma ação
form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Evita que a página recarregue

  const username = document.getElementById("user").value;
  const email = document.getElementById("email").value;

  if (username === "" || email === "") {
    message.textContent = "Usuário ou email está vazio";
    return;
  }

  await fetch(`${url}/user/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Example content type
    },
    body: JSON.stringify({ username, email }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json(); //convertendo a resposta em json para um objeto js
    }) // Parse the response as JSON
    .then((data) => {
      console.log(data);
      const userData = {
        username: data.body.username,
        monthlyIncome: data.body.monthlyIncome,
      };

      localStorage.setItem("token", data.body.token);
      localStorage.setItem("data_user", JSON.stringify(userData));

      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      message.textContent = "Usuário ou email já foram cadastrados.";
      console.error("this", error); // Handle errors
    });
});

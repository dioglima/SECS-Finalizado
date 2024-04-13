//constantes
const url = "https://poupe-mais-api.vercel.app";
const token = localStorage.getItem("token");

//Logout
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", (event) => {
  event.preventDefault();

  localStorage.clear("data_user");
  localStorage.clear("token");

  window.location.href = "index.html";
});

//funções úteis
function convertCurrency(value) {
  let BRLCurrency = value.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });

  return BRLCurrency;
}

//get name
const usernameEl = document.getElementById("username");
const monthlyIncomeEl = document.getElementById("monthly-income");

const totalIncomeEl = document.getElementById("total-incomes");
const totalExpenseEl = document.getElementById("total-expense");

const dataUser = JSON.parse(localStorage.getItem("data_user"));

const username = dataUser.username;
const monthlyIncome = dataUser.monthlyIncome;

usernameEl.innerText = `${username}!`;
//innerText aplica como texto, innerHTML se houver algum elemento html deve ser adicionado
// o texto fica normal
monthlyIncomeEl.innerHTML = `<span>R$</span> ${convertCurrency(monthlyIncome)}`;

//obter transações
async function getData() {
  await fetch(`${url}/transaction/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Example content type
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    }) // Parse the response as JSON
    .then((data) => {
      const response = data.body;

      const incomes = response.filter((item) => item.type === "INCOME");
      const expenses = response.filter((item) => item.type === "EXPENSE");

      const totalIncomes = incomes.reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );

      const totalExpenses = expenses.reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );

      totalIncomeEl.innerHTML = `+ <span>R$</span> ${convertCurrency(
        totalIncomes,
      )}`;

      totalExpenseEl.innerHTML = `- <span>R$</span> ${convertCurrency(
        totalExpenses,
      )}`;

      monthlyIncomeEl.innerHTML = `<span>R$</span> ${convertCurrency(
        totalIncomes - totalExpenses,
      )}`;
    })
    .catch((error) => {
      console.error("this", error); // Handle errors
    });
}
getData();

//obter categorias
async function getCategories() {
  const categories = document.querySelector(".categories");

  await fetch(`${url}/category/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
    .then((response) => {
      if(!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((data) => {
      const categoriesData = data.body;

      const categoriesChildes = categoriesData.map((category, index) => {
        const li = document.createElement("li");
        li.setAttribute("class", "category");

        const img = document.createElement("img");
        img.setAttribute("src", "./assets/elipse-verde.svg");
        img.setAttribute("alt", "Elipse Verde");

        const span = document.createElement("span");
        span.textContent = category.categoryName;
        
        li.appendChild(img);
        li.appendChild(span);

        return li;
      });

      const liCadastrarCategoria = document.createElement("li");
      liCadastrarCategoria.setAttribute("class", "btn-new-categorie");

      const img = document.createElement("img");
      img.setAttribute("src", "./assets/elipse-azul-2.svg");
      img.setAttribute("alt", "Elipse Azul");

      const span = document.createElement("span");
      span.textContent = "Cadastrar nova categoria";

      liCadastrarCategoria.appendChild(img);
      liCadastrarCategoria.appendChild(span);

      categories.append(...categoriesChildes);
      categories.appendChild(liCadastrarCategoria);
    })
    .catch((error) => {
      console.error("this", error);
    });
}
getCategories();

//obter opções
async function getOptions() {
  const categorySelect = document.getElementById("category-select");

  await fetch(`${url}/category/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Example content type
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    }) // Parse the response as JSON
    .then((data) => {
      const categories = data.body;
      console.log("🚀 ~ .then ~ categories:", categories);

      const options = categories.map((category) => {
        const novaOpcao = document.createElement("option");
        novaOpcao.value = category.id;
        novaOpcao.textContent = category.categoryName;
        return novaOpcao;
      });

      console.log(options);

      categorySelect.append(...options);
    })
    .catch((error) => {
      console.error("this", error); // Handle errors
    });
}
getOptions();

// obter os maiores gastos do mês

async function getBiggestExpenseMonth() {
  await fetch(`${url}/transaction/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
    .then((response) => {
      if(!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((data) => {
      const transactions = data.body;
      const biggestExpenses = document.querySelector("#biggest-expenses");

      const expenses = transactions.filter(
        (transaction) => transaction.type === "EXPENSE",
      );

      console.log("🚀 ~ .then ~ expenses:", expenses);

      const expensesMonth = expenses.filter((expense) => {
        // const month = parseInt(expense.createdAt.split("T")[0].split("-")[1]);
        const month = new Date(expense.createdAt).getMonth() + 1;
        return month === new Date().getMonth() + 1;
      });

      console.log("🚀 ~ expensesMonth ~ expensesMonth:", expensesMonth);

      if (expensesMonth.length > 0) {
        // Ordenar as despesas em ordem decrescente com base no valor
        expenses.sort((a, b) => b.value - a.value);

        let topExpenses = [];

        if (expenses.length >= 7) {
          topExpenses = expenses.slice(0, 7);
        } else {
          topExpenses = expenses.slice(0, expenses.length);
        }

        const biggestExpenseChildes = topExpenses.map((topExpense) => {
          const li = document.createElement("li");

          const span = document.createElement("span");
          const img = document.createElement("img");
          img.setAttribute("src", "./assets/elipse-azul.svg");
          span.appendChild(img);
          span.innerHTML += `${topExpense.description}`;

          const span02 = document.createElement("span");
          span02.textContent = `R$ ${topExpense.value}`;

          li.appendChild(span);
          li.appendChild(span02);

          return li;
        });

        biggestExpenses.innerHTML = "";

        biggestExpenses.append(...biggestExpenseChildes);
      } else {
        const li = document.createElement("li");

        li.setAttribute("class", "no-content");
        li.textContent = "Nenhum gasto encontrado";

        biggestExpenses.innerHTML = "";

        biggestExpenses.appendChild(li);
      }
    })
    .catch((error) => {
      console.error("this", error);
    });
}

getBiggestExpenseMonth();

// criando transacao income
const formIncome = document.getElementById("add-income-form");

formIncome.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita que a página recarregue

  const value = document.getElementById("income-value").value;
  const description = document.getElementById("income-description").value;

  await fetch(`${url}/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Example content type
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      value: Number(value),
      description,
      type: "INCOME",
      categoryId: null,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    }) // Parse the response as JSON
    .then((data) => {
      formIncome.reset();
      getData();
    })
    .catch((error) => {
      console.error("this", error); // Handle errors
    });
});

// criando transacao expense
const formExpense = document.getElementById("add-expense-form");

formExpense.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita que a página recarregue

  const value = document.getElementById("expense-value").value;
  const description = document.getElementById("expense-description").value;
  const categoryId = document.getElementById("category-select").value;

  await fetch(`${url}/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Example content type
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      value: Number(value),
      description,
      type: "EXPENSE",
      categoryId: categoryId,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    }) // Parse the response as JSON
    .then((data) => {
      formExpense.reset();
      getData();
      getBiggestExpenseMonth();
    })
    .catch((error) => {
      console.error("this", error); // Handle errors
    });
});

const url = "https://poupe-mais-api.vercel.app";
const token = sessionStorage.getItem("token");

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", function (event) {
    event.preventDefault();
    logout();
});

// Obter os dados do usuário
async function getUserData() {
    const usernameElement = document.getElementById("username");
    const incomeElement = document.getElementById("total-incomes");
    const expenseElement = document.getElementById("total-expense");
    const totalElement = document.getElementById("monthly-income");

    const username = sessionStorage.getItem("username");
    usernameElement.textContent = username; 
    
    await fetch(`${url}/transaction/list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    .then(function (response) {
        if (!response.ok) { throw new Error(response.statusText) }

        return response.json();
    })
    .then(function (data) {
        const transactions = [
            {
              "id": "d721f801-7f62-498e-a7d0-700b44604572",
              "value": 2000,
              "description": "Sobre alguma coisa",
              "type": "INCOME",
              "userId": "6a04f4a5-4df3-4b1b-b4ea-02efbe5ea9ce",
              "categoryId": null,
              "createdAt": "2024-04-08T19:32:31.466Z",
              "updatedAt": "2024-04-08T19:32:31.466Z",
              "category": null
            },
            {
              "id": "add3b160-b1d4-4e8e-b60f-7bb9745411ac",
              "value": 2000,
              "description": "Sobre alguma coisa",
              "type": "INCOME",
              "userId": "6a04f4a5-4df3-4b1b-b4ea-02efbe5ea9ce",
              "categoryId": null,
              "createdAt": "2024-04-08T19:32:39.975Z",
              "updatedAt": "2024-04-08T19:32:39.975Z",
              "category": null
            },
            {
              "id": "195a92dc-8fa7-41ac-9d1f-48cd1c545250",
              "value": 1000,
              "description": "Novo Ganho",
              "type": "INCOME",
              "userId": "6a04f4a5-4df3-4b1b-b4ea-02efbe5ea9ce",
              "categoryId": null,
              "createdAt": "2024-04-08T19:37:00.037Z",
              "updatedAt": "2024-04-08T19:37:00.037Z",
              "category": null
            }];

        console.log(transactions);

        const incomes = transactions.filter(({ type }) => type === "INCOME");
        const expenses = transactions.filter(({ type }) => type === "EXPENSE");

        const totalIncomes = incomes.reduce((accumulator, currentValue) => { return accumulator + currentValue.value }, 0);
        const totalExpenses = expenses.reduce((accumulator, currentValue) => { return accumulator + currentValue.value }, 0);
        const total = totalIncomes - totalExpenses;

        incomeElement.innerHTML = `<span>+ R$ ${totalIncomes}</span>`;
        expenseElement.innerHTML = `<span>- R$ ${totalExpenses}</span>`;
        totalElement.innerHTML = `<span>R$ ${total}</span>`;
    })
    .catch(function (error) {
        console.error(error);
    })
}

getUserData();

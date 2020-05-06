(function() {
    'use strict';

    async function getUserAsync() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    function createListWithInnerHTML(users) {

        const usersTable = users.map(user => {
            return `
            <tr>
                <th scope="row">${user.id}</th>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
            </tr>`
        });

        const template = `
                <table class="table">
                    <h1>Criação via <code>&ltinnerHTML&gt</code></h1>
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usersTable}          
                    </tbody>
                </table>;`

        document.querySelector('.hero-list-innerHTML').innerHTML = template;
    }

    function createListWithDOMAPI(users) {
        const table = document.createElement('table');
        table.classList.add('table');

        const thead = document.createElement('thead');
        thead.classList.add('thead-dark');

        const trHead = document.createElement('tr');

        const thId = document.createElement('th');
        thId.setAttribute("scope", "col");
        thId.textContent = '#';

        const thName = document.createElement('th');
        thName.setAttribute("scope", "col");
        thName.textContent = 'Nome';

        const thUSername = document.createElement('th');
        thUSername.setAttribute("scope", "col");
        thUSername.textContent = 'Username';

        const thEmail = document.createElement('th');
        thEmail.setAttribute("scope", "col");
        thEmail.textContent = 'Email';

        const h1 = document.createElement('h1');
        h1.textContent = 'Criação via DOM API';

        const tbody = document.createElement('tbody');

        users.forEach(user => {
            const trBody = document.createElement('tr');

            const thIdBody = document.createElement('th');
            thEmail.setAttribute("scope", "row");
            thIdBody.textContent = user.id;

            const tdName = document.createElement('td');
            tdName.textContent = user.name;

            const tdUsername = document.createElement('td');
            tdUsername.textContent = user.username;

            const tdEmail = document.createElement('td');
            tdEmail.textContent = user.email;

            trBody.appendChild(thIdBody);
            trBody.appendChild(tdName);
            trBody.appendChild(tdUsername);
            trBody.appendChild(tdEmail);

            tbody.appendChild(trBody);
        });

        trHead.appendChild(thId);
        trHead.appendChild(thName);
        trHead.appendChild(thUSername);
        trHead.appendChild(thEmail);

        thead.appendChild(trHead);
        table.appendChild(thead);
        table.appendChild(tbody);

        document.querySelector('.hero-list-DOM-API').appendChild(h1);
        document.querySelector('.hero-list-DOM-API').appendChild(table);
    }

    function createListWithTemplate(users) {

        const template = document.getElementById('content');

        users.forEach(user => {
            template.appendChild(createUserFromTemplate(user));
        });

        function createUserFromTemplate(user) {
            const userTemplate = document.getElementById('hero-list-Template').content.cloneNode(true);

            userTemplate.querySelector('.id').innerHTML = user.id;
            userTemplate.querySelector('.name').innerHTML = user.name;
            userTemplate.querySelector('.username').innerHTML = user.username;
            userTemplate.querySelector('.email').innerHTML = user.email;

            return userTemplate;
        }
    }

    async function createAllTemplates() {
        const users = await getUserAsync();

        createListWithInnerHTML(users);
        createListWithDOMAPI(users);
        createListWithTemplate(users);
    }

    createAllTemplates();

})();

let accounts = [];  // This will store all accounts

// Show appropriate form when navigation links are clicked
document.getElementById('createAccountLink').addEventListener('click', () => showForm('createAccountForm'));
document.getElementById('depositLink').addEventListener('click', () => showForm('depositForm'));
document.getElementById('withdrawLink').addEventListener('click', () => showForm('withdrawForm'));
document.getElementById('dataLink').addEventListener('click', () => {
    showForm('allData');
    displayAllData(); // Make sure this function is called to update the data display
});

// Show the appropriate form
function showForm(formId) {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

// Create account function
function createAccount() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
        const newAccount = {
            username,
            email,
            password,
            balance: 0,
            transactions: []
        };
        accounts.push(newAccount);
        document.getElementById('createAccountMessage').textContent = 'Account created successfully!';
        showForm('depositForm');  // Go to deposit form after account creation
    } else {
        document.getElementById('createAccountMessage').textContent = 'Please fill all fields!';
    }
}

// Deposit function
function depositAmount() {
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const password = document.getElementById('depositPassword').value;
    const username = document.getElementById('username').value;

    // Find the account by username
    const account = accounts.find(acc => acc.username === username);

    if (account && password === account.password) {
        if (amount > 0) {
            account.balance += amount;
            account.transactions.push({ type: 'deposit', amount });
            document.getElementById('depositMessage').textContent = `Deposited $${amount}. New balance: $${account.balance}.`;
            displayAllData();  // Update the account details display after deposit
        } else {
            document.getElementById('depositMessage').textContent = 'Please enter a valid amount!';
        }
    } else {
        document.getElementById('depositMessage').textContent = 'Incorrect username or password!';
    }
}

// Withdraw function
function withdrawAmount() {
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const password = document.getElementById('withdrawPassword').value;
    const username = document.getElementById('username').value;

    // Find the account by username
    const account = accounts.find(acc => acc.username === username);

    if (account && password === account.password) {
        if (amount > 0 && amount <= account.balance) {
            account.balance -= amount;
            account.transactions.push({ type: 'withdraw', amount });
            document.getElementById('withdrawMessage').textContent = `Withdrew $${amount}. New balance: $${account.balance}.`;
            displayAllData();  // Update the account details display after withdrawal
        } else {
            document.getElementById('withdrawMessage').textContent = 'Insufficient funds or invalid amount!';
        }
    } else {
        document.getElementById('withdrawMessage').textContent = 'Incorrect username or password!';
    }
}

// Display all accounts and their data
function displayAllData() {
    if (accounts.length > 0) {
        let accountDetailsHTML = '';
        
        // Iterate through all accounts and display their data
        accounts.forEach(account => {
            accountDetailsHTML += `
                <div>
                    <h3>Account: ${account.username}</h3>
                    <p><strong>Email:</strong> ${account.email}</p>
                    <p><strong>Balance:</strong> $${account.balance}</p>
                    <p><strong>Transactions:</strong></p>
                    <ul>
                        ${account.transactions.map(tx => `<li>${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}: $${tx.amount}</li>`).join('')}
                    </ul>
                    <hr>
                </div>
            `;
        });
        
        document.getElementById('accountDetails').innerHTML = accountDetailsHTML;
    } else {
        document.getElementById('accountDetails').textContent = 'No accounts found. Please create an account first.';
    }
}

// Show appropriate section when a link is clicked
function showSection(sectionId) {
    // Hide all sections
    var sections = document.querySelectorAll('.section-container, .form-container');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the selected section
    var sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
}

// Initially show the home section
window.onload = function() {
    showSection('homeSection');
};

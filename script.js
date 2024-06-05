document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const employeeForm = document.getElementById('employeeForm');
    const dataTable = document.querySelector('#dataTable tbody');
    const db = firebase.firestore();

    function switchTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.getAttribute('data-tab'));
        });
    });

    switchTab('home');

    employeeForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const employeeId = document.getElementById('employeeId').value;
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const certifications = document.getElementById('certifications').value;
        const certExpiry = document.getElementById('certExpiry').value;
        const projectName = document.getElementById('projectName').value;

        const employeeData = {
            employeeId,
            name,
            dob,
            certifications,
            certExpiry,
            projectName
        };

        db.collection('employees').add(employeeData).then(() => {
            alert('Data submitted successfully!');
            employeeForm.reset();
            switchTab('data');
            loadEmployees();
        }).catch(error => console.error('Error:', error));
    });

    function loadEmployees() {
        db.collection('employees').get().then((querySnapshot) => {
            dataTable.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const emp = doc.data();
                const row = dataTable.insertRow();
                row.insertCell(0).innerText = emp.employeeId;
                row.insertCell(1).innerText = emp.name;
                row.insertCell(2).innerText = emp.dob;
                row.insertCell(3).innerText = emp.certifications;
                row.insertCell(4).innerText = emp.certExpiry;
                row.insertCell(5).innerText = emp.projectName;
            });
        });
    }

    loadEmployees();
});

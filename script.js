document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const employeeForm = document.getElementById('employeeForm');
    const dataTable = document.querySelector('#dataTable tbody');

    // Function to switch tabs
    function switchTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    }

    // Event listeners for tab buttons
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.getAttribute('data-tab'));
        });
    });

    // Initial tab
    switchTab('home');

    // Event listener for form submission
    employeeForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const employeeId = document.getElementById('employeeId').value;
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const certifications = document.getElementById('certifications').value;
        const certExpiry = document.getElementById('certExpiry').value;
        const projectName = document.getElementById('projectName').value;

        // Add data to the table
        const row = dataTable.insertRow();
        row.insertCell(0).innerText = employeeId;
        row.insertCell(1).innerText = name;
        row.insertCell(2).innerText = dob;
        row.insertCell(3).innerText = certifications;
        row.insertCell(4).innerText = certExpiry;
        row.insertCell(5).innerText = projectName;

        // Reset the form
        employeeForm.reset();

        // Switch to Data tab to show the added data
        switchTab('data');
    });
});

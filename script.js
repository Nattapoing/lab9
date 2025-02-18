async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        document.getElementById('user-list').innerHTML = 
            '<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
    }
}

function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = users.map(user => `
        <div class="user-card" onclick="location.href='user-detail.html?id=${user.id}'">
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>บริษัท: ${user.company.name}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', fetchUsers);
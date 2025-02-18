async function fetchUserDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (!userId) {
        location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();
        displayUserDetail(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        document.getElementById('user-detail').innerHTML = 
            '<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
    }
}

function displayUserDetail(user) {
    const userDetail = document.getElementById('user-detail');
    userDetail.innerHTML = `
        <h1>${user.name}</h1>
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>โทรศัพท์: ${user.phone}</p>
        <p>เว็บไซต์: ${user.website}</p>
        <h2>ที่อยู่</h2>
        <p>${user.address.street}, ${user.address.suite}</p>
        <p>${user.address.city}, ${user.address.zipcode}</p>
        <h2>บริษัท</h2>
        <p>ชื่อ: ${user.company.name}</p>
        <p>คำขวัญ: ${user.company.catchPhrase}</p>
    `;

    document.getElementById('view-posts').addEventListener('click', () => {
        location.href = `user-posts.html?id=${user.id}`;
    });
}

document.addEventListener('DOMContentLoaded', fetchUserDetail);
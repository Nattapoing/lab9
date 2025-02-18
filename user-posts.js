async function fetchUserPosts() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (!userId) {
        location.href = 'index.html';
        return;
    }

    try {
        const [userResponse, postsResponse] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        ]);

        const user = await userResponse.json();
        const posts = await postsResponse.json();
        
        document.getElementById('user-name').textContent = user.name;
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        document.getElementById('posts-list').innerHTML = 
            '<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
    }
}

function displayPosts(posts) {
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = posts.map(post => `
        <div class="post-card" id="post-${post.id}">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <button class="toggle-comments-btn" 
                    onclick="toggleComments(${post.id})"
                    data-post-id="${post.id}">
                ดูความคิดเห็น
            </button>
            <div class="comments-section" id="comments-${post.id}" style="display: none;"></div>
        </div>
    `).join('');
}

async function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    const button = document.querySelector(`button[data-post-id="${postId}"]`);
    
    if (commentsSection.style.display === 'none') {
        try {
            if (!commentsSection.hasChildNodes()) {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                const comments = await response.json();
                
                commentsSection.innerHTML = comments.map(comment => `
                    <div class="comment">
                        <h4>${comment.name}</h4>
                        <p><em>${comment.email}</em></p>
                        <p>${comment.body}</p>
                    </div>
                `).join('');
            }
            
            commentsSection.style.display = 'block';
            button.textContent = 'ซ่อนความคิดเห็น';
        } catch (error) {
            console.error('Error fetching comments:', error);
            commentsSection.innerHTML = '<p>เกิดข้อผิดพลาดในการโหลดความคิดเห็น</p>';
        }
    } else {
        commentsSection.style.display = 'none';
        button.textContent = 'ดูความคิดเห็น';
    }
}

document.addEventListener('DOMContentLoaded', fetchUserPosts);
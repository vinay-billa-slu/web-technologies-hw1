document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const reviewContainer = document.getElementById('review-container');
            data.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';
                reviewCard.innerHTML = `
                    <h4>${review.reviewer_name}</h4>
                    <p><strong>Rating:</strong> ${review.rating}</p>
                    <p>${review.review_text}</p>
                    <small>${review.date}</small>
                `;
                reviewContainer.appendChild(reviewCard);
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the review data:', error);
            // Optional: display a message to the user
            document.getElementById('review-container').innerHTML = '<p>Could not load reviews.</p>';
        });
});

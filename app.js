// Function to convert rating string to numeric value for display
function parseRating(ratingString) {
    const match = ratingString.match(/(\d+)/);
    return match ? match[1] : '0';
}

// Function to load reviews dynamically from data.json
async function loadReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    
    try {
        // Fetch reviews from data.json file
        const response = await fetch('data.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const reviews = await response.json();
        
        if (reviews && reviews.length > 0) {
            reviewsContainer.innerHTML = reviews.map(review => `
                <div class="review-card">
                    <div class="review-header">
                        <span class="reviewer-name">${review.reviewer_name}</span>
                        <div class="review-rating">
                            <span class="star-rating">★</span>
                            <span>${parseRating(review.rating)}</span>
                            <span class="review-date">• ${review.date}</span>
                        </div>
                    </div>
                    <p class="review-text">${review.review_text}</p>
                </div>
            `).join('');
        } else {
            reviewsContainer.innerHTML = '<div class="error">No reviews found.</div>';
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
        reviewsContainer.innerHTML = '<div class="error">Failed to load reviews. Please try again later.</div>';
    }
}

// Load reviews when page loads
document.addEventListener('DOMContentLoaded', loadReviews);

// Add some interactivity to the navigation tabs
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

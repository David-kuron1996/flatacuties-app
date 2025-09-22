
// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Using the Fetch API to get data from a URL
fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

    // Get all vote buttons
    const voteButtons = document.querySelectorAll('button[data-animal]');
    
    // Initialize vote counts from localStorage or set to 0
    let voteCounts = JSON.parse(localStorage.getItem('animalVotes')) || {};
    
    // Update the display with saved votes
    updateVoteDisplay();
    
    // Add click event listener to each button
    voteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const animalName = button.getAttribute('data-animal');
            
            // Increment the vote count for this animal
            if (!voteCounts[animalName]) {
                voteCounts[animalName] = 0;
            }
            voteCounts[animalName]++;
            
            // Save to localStorage
            localStorage.setItem('animalVotes', JSON.stringify(voteCounts));
            
            // Update the display
            updateVoteDisplay();
            
            // Show a thank you message
            showThankYouMessage(animalName);
        });
    });
    
    // Function to update the vote count display
    function updateVoteDisplay() {
        const voteCountElements = document.querySelectorAll('.vote-count');
        
        voteCountElements.forEach(element => {
            const animalName = element.getAttribute('data-animal');
            const count = voteCounts[animalName] || 0;
            element.textContent = count;
            
            // Update pluralization
            const voteText = element.nextElementSibling;
            if (voteText && voteText.textContent.includes('vote')) {
                voteText.textContent = count === 1 ? ' vote' : ' votes';
            }
        });
    }
    
    // Function to show a thank you message
    function showThankYouMessage(animalName) {
        // Create a temporary message element
        const message = document.createElement('div');
        message.className = 'thank-you-message';
        message.textContent = `Thank you for voting for ${animalName}!`;
        
        // Style the message
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.backgroundColor = '#4CAF50';
        message.style.color = 'white';
        message.style.padding = '10px 20px';
        message.style.borderRadius = '5px';
        message.style.zIndex = '1000';
        message.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.5s';
        
        // Add to the page
        document.body.appendChild(message);
        
        // Fade in
        setTimeout(() => {
            message.style.opacity = '1';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 500);
        }, 3000);
    }
});

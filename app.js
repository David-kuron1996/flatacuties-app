
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const animalsContainerEl = document.getElementById('animals-container');
    const resultsContainerEl = document.getElementById('results-container');
    const resultsEl = document.getElementById('results');
    
    // State
    let animals = [];

    let showResults = false;
    
    // Fetch animals data
    async function fetchAnimals() {
        try {
            loadingEl.style.display = 'block';
            errorEl.style.display = 'none';
            
            const response = await fetch("db.json");
            if (!response.ok) throw new Error('Failed to fetch data');
            
            const data = await response.json();
            animals = data.characters;
            
            renderAnimals();
        } catch (error) {
            showError(error.message);
        } finally {
            loadingEl.style.display = 'none';
        }
    }
    
    // Show error message
    function showError(message) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        animalsContainerEl.style.display = 'none';
        resultsContainerEl.style.display = 'none';
    }
    
    // Render animals voting interface
    function renderAnimals() {
        animalsContainerEl.innerHTML = '';
        animalsContainerEl.style.display = 'grid';
        resultsContainerEl.style.display = 'none';
        
        animals.forEach(animal => {
            const card = document.createElement('div');
            card.className = 'animal-card';
            card.innerHTML = `
                <h3>${animal.name}</h3>
                <p>Votes: <span class="vote-count">${animal.votes}</span></p>
                <button class="vote-btn" data-id="${animal.id}">Vote</button>
            `;
            animalsContainerEl.appendChild(card);
        });
        
        // Add vote button event listeners
        document.querySelectorAll('.vote-btn').forEach(btn => {
            btn.addEventListener('click', handleVote);
        });
        
        // Add toggle results button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toggle-btn';
        toggleBtn.textContent = 'Show Results';
        toggleBtn.addEventListener('click', toggleResults);
        animalsContainerEl.appendChild(toggleBtn);
    }
    
    // Handle vote button click
    function handleVote(e) {
        const id = parseInt(e.target.dataset.id);
        const animal = animals.find(a => a.id === id);
        
        if (animal) {
            animal.votes++;
            document.querySelector(`[data-id="${id}"]`).previousElementSibling.querySelector('.vote-count').textContent = animal.votes;
        }
    }
    
    // Toggle between voting and results view
    function toggleResults() {
        showResults = !showResults;
        
        if (showResults) {
            renderResults();
            document.querySelector('.toggle-btn').textContent = 'Back to Voting';
        } else {
            renderAnimals();
        }
    }
    
    // Render voting results
    function renderResults() {
        resultsContainerEl.style.display = 'block';
        animalsContainerEl.style.display = 'none';
        
        // Sort animals by votes (descending)
        const sortedAnimals = [...animals].sort((a, b) => b.votes - a.votes);
        
        resultsEl.innerHTML = '';
        
        sortedAnimals.forEach((animal, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            // Calculate percentage for visual bar
            const totalVotes = animals.reduce((sum, a) => sum + a.votes, 0) || 1;
            const percentage = Math.round((animal.votes / totalVotes) * 100);
            
            resultItem.innerHTML = `
                <div class="result-rank">${index + 1}</div>
                <img src="${animal.image}" alt="${animal.name}" class="result-image">
                <div class="result-info">
                    <h3>${animal.name}</h3>
                    <div class="vote-bar-container">
                        <div class="vote-bar" style="width: ${percentage}%"></div>
                    </div>
                    <p>${animal.votes} votes (${percentage}%)</p>
                </div>
            `;
            
            resultsEl.appendChild(resultItem);
        });
    }
    
    // Initialize the app
    fetchAnimals();
});
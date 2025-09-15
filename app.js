document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/characters')
    .then(res => res.json())
    .then(animals => {
        animals.forEach(animal => {
         const card = document.querySelector(`.animal-card[data-id='${animal.id}']`);
         if (!card) return;
         
         const name = card.querySelector('.animal-name');
         const details = card.querySelector('.animal-details');
         const votecount = card.querySelector('.vote-count');
         const votebtn = card.querySelector('.vote-btn');

         votecount.textContent = animal.votes;

         button.addEventListener('click', (event) => {
            document.querySelectorAll('.animal-details').forEach(details => {
                if (details !== details) {
                    details.Style.display = 'none';
                }
            });
            details.Style.display = (details.Style.display === 'block') ? 'none' : 'block'
         
        });

        let votescount = animal.votes;
        votebtn.addEventListener('click', () => {
            votescount+=1;
            votecount.textContent = votes;
        });
    });
})
        .catch(error => {
            console.log(error)('error fetch animals :', error);
        
    });
});
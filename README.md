# Animal Voting App

A simple web application that allows users to vote for their favorite animals and view real-time voting results.

## Features

- **Voting System**: Users can vote for their favorite animals with a single click
- **Real-time Results**: Vote counts update immediately after voting
- **Results View**: Toggle between voting interface and results display
- **Visual Results**: Results are displayed with percentage bars and rankings
- **Responsive Design**: Works on various screen sizes

## How It Works

1. The application fetches animal data from a `db.json` file
2. Each animal is displayed as a card with its name, current vote count, and a vote button
3. Users can click the vote button to increment the vote count for an animal
4. A "Show Results" button allows users to switch to a results view
5. In the results view, animals are ranked by vote count with visual percentage bars

## File Structure

 index.html       # Main HTML file
 script.js        # JavaScript application code
 style.css        # CSS styles
 db.json          # Animal data (name, votes, image)


## Data Structure

The application expects a `db.json` file with the following structure:

```json
{
  "characters": [
    {
      "id": 1,
      "name": "Lion",
      "votes": 0,
      "image": "path/to/lion.jpg"
    },
    {
      "id": 2,
      "name": "Elephant",
      "votes": 0,
      "image": "path/to/elephant.jpg"
    }
    // More animals...
  ]
}
```

## HTML Elements Required

The application expects the following HTML elements to be present:

```html
<div id="loading">Loading...</div>
<div id="error" style="display: none;"></div>
<div id="animals-container"></div>
<div id="results-container" style="display: none;">
    <h2>Voting Results</h2>
    <div id="results"></div>
</div>
```

## CSS Classes Used

The application uses the following CSS classes for styling:

- `animal-card`: Container for each animal in voting view
- `vote-count`: Displays the current vote count
- `vote-btn`: Button for voting
- `toggle-btn`: Button to toggle between views
- `result-item`: Container for each result in results view
- `result-rank`: Displays the ranking position
- `result-image`: Animal image in results view
- `result-info`: Container for result information
- `vote-bar-container`: Container for the percentage bar
- `vote-bar`: Visual representation of vote percentage

## Browser Compatibility

This application works in all modern browsers that support:
- ES6 JavaScript features  
- Fetch API
- DOM manipulation methods

## License

This project is open source and available under the MIT License.  
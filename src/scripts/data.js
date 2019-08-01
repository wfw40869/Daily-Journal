// Creates an API object that has a getJournalEntries method

const API = {
    getJournalEntries() {
        // returns the data as a json file
        return fetch(`http://localhost:8088/entries`)
            .then(entries => entries.json())
    },
    saveJournalEntry (newJournalEntry) {
        // Use `fetch` with the POST method to add your entry to your API
       return fetch("http://localhost:8088/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJournalEntry)
        })
    }
}


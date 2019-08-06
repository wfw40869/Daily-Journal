// Creates an API object that has a getJournalEntries method

const API = {
    getJournalEntries(mood = "") {
        // returns the data as a json file
        if (mood.length > 0) {
            return fetch(`http://localhost:8088/entries?mood=${mood}`)
                .then(entries => entries.json())
        } else {
            return fetch(`http://localhost:8088/entries`)
                .then(entries => entries.json())
        }
    },
    saveJournalEntry(newJournalEntry) {
        // Use `fetch` with the POST method to add your entry to your API
        return fetch("http://localhost:8088/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJournalEntry)
        })
    },
    deleteJournalEntry(entryId) {
        return fetch(`http://localhost:8088/entries/${entryId}`, {
            method: "DELETE"
        })
            .then(entries => entries.json())
    }
}

export default API


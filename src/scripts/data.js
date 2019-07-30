const API = {
    getJournalEntries() {
        return fetch(`http://localhost:8088/entries`)
            .then(entries => entries.json())
    }
}
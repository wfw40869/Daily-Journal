import determineMood from "./mood.js"

const makeJournalEntryComponent = (journalEntry) => {
    // Create your own HTML structure for a journal entry
    return `
        <section class="journalEntry">
            <h2>${journalEntry.date}</h2>
            <h3>${journalEntry.conceptsCovered}</h3>
            <p>${journalEntry.entryMessage}</p>
            <div class="mood">${determineMood(journalEntry)}</div>
            <button id="deleteEntry--${journalEntry.id}">Delete Entry</button>
        </section>
    `
}

export default makeJournalEntryComponent
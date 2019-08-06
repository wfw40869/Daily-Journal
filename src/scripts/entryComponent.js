import determineMood from "./mood.js"

const makeJournalEntryComponent = (journalEntry) => {
    // Create your own HTML structure for a journal entry
    return `
        <section class="journalEntry">
            <h2>${journalEntry.date}</h2>
            <h3>${journalEntry.conceptsCovered}</h3>
            <div class="mood">Mood: ${determineMood(journalEntry)}</div>
            <p>${journalEntry.entryMessage}</p>
            <aside class="buttons__aside">
                <button class="delete__button" id="deleteEntry--${journalEntry.id}">Delete</button>
                <button class="edit__button" id="editEntry--${journalEntry.id}">Edit</button>
            </aside>
        </section>
    `
}

export default makeJournalEntryComponent
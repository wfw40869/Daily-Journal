import determineMood from "./mood.js"
const htmlComponents = {
    makeJournalEntryComponent: (journalEntry) => {
        // Create your own HTML structure for a journal entry
        return `
            <section class="journalEntry">
                <h2>${moment(`${journalEntry.date}`).format("MMMM Do YYYY")}</h2>
                <h3>${journalEntry.conceptsCovered}</h3>
                <div class="mood">Mood: ${determineMood(journalEntry)}</div>
                <p>${journalEntry.entryMessage}</p>
                <aside class="buttons__aside">
                    <button class="btn delete__button" id="deleteEntry--${journalEntry.id}">Delete</button>
                    <button class="btn edit__button" id="editEntry--${journalEntry.id}">Edit</button>
                </aside>
            </section>
        `
    },
    makeEditComponent: (journalEntry) => {
        return `
            <form action="#">
                <fieldset>
                    <input type="date" name="editDate" id="editDate" value="${journalEntry.date}">
                </fieldset>
                <fieldset>
                    <input type="text" name="editConcepts" id="editConcepts" value="${journalEntry.conceptsCovered}">
                </fieldset>
                <fieldset>
                    <textarea name="editEntry" id="editMessage" cols="30" rows="10">${journalEntry.entryMessage}</textarea>
                </fieldset>
                <fieldset>
                    <label for="editMood">Happy, Okay or Sad</label>
                    <input type="text" name="editMood" id="editMood" value="${journalEntry.mood}">
                </fieldset>
                <input type="submit" value="Save" id="saveEntryEdit--${journalEntry.id}">
            </form> 
        `
    },
    makeEditedJournalEntryComponent: (journalEntry) => {
        return `
                <h2>${moment(`${journalEntry.date}`).format("MMMM Do YYYY")}</h2>
                <h3>${journalEntry.conceptsCovered}</h3>
                <div class="mood">Mood: ${determineMood(journalEntry)}</div>
                <p>${journalEntry.entryMessage}</p>
                <aside class="buttons__aside">
                    <button class="btn delete__button" id="deleteEntry--${journalEntry.id}">Delete</button>
                    <button class="btn edit__button" id="editEntry--${journalEntry.id}">Edit</button>
                </aside>
            `
    }
}

export default htmlComponents
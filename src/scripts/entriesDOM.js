/*
    Purpose: To render all journal entries to the DOM

    Arguments: entries (array of objects)
*/
const entryLogContainer = document.querySelector("#entryLog")
const renderJournalEntries = (entries) => {
    entryLogContainer.innerHTML = ""
    entries.forEach(entry => {
        const htmlToDisplay = makeJournalEntryComponent(entry)
        entryLogContainer.innerHTML += htmlToDisplay
    })

}
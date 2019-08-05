/*
    Purpose: To render all journal entries to the DOM

    Arguments: entries (array of objects)
*/

import makeJournalEntryComponent from "./entryComponent.js"

const entryLogContainer = document.querySelector("#entryLog")

const renderJournalEntries = (entries) => {
    entryLogContainer.innerHTML = ""
    entries.forEach(entry => {
        const htmlToDisplay = makeJournalEntryComponent(entry)
        entryLogContainer.innerHTML += htmlToDisplay
    })

}

export default renderJournalEntries
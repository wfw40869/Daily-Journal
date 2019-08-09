/*
    Purpose: To render all journal entries to the DOM

    Arguments: entries (array of objects)
*/

import htmlComponents from "./entryComponent.js"

const entryLogContainer = document.querySelector("#entryLog")

const renderJournalEntries = (entries) => {
    entryLogContainer.innerHTML = ""
    entries.forEach(entry => {
        const htmlToDisplay = htmlComponents.makeJournalEntryComponent(entry)
        entryLogContainer.innerHTML += htmlToDisplay
    })

}

export default renderJournalEntries
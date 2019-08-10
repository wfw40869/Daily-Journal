import API from "./data.js"
import renderJournalEntries from "./entriesDOM.js"
import htmlComponents from "./entryComponent.js"
import localEntries from "./journal.js"

const addEntryButton = document.querySelector("#submit"),
    dateInput = document.querySelector("#journalDate"),
    conceptsInput = document.querySelector("#conceptsCovered"),
    entryInput = document.querySelector("#journalEntry"),
    mood = document.querySelector("#dailyMood").value,
    entryLog = document.querySelector("#entryLog")


export default {
    registerSubmitListener() {
        addEntryButton.addEventListener("click", (event) => {
            event.preventDefault()
            // Invoke the factory function, passing along the form field values

            if (dateInput.value === "" || conceptsInput.value === "" || entryInput.value === "") {
                alert("Please fill out all fields")
            } else {
                const newJournalEntry = {
                    date: dateInput.value,
                    conceptsCovered: conceptsInput.value,
                    entryMessage: entryInput.value,
                    mood: mood
                }
                // saves jounral entry to database
                API.saveJournalEntry(newJournalEntry)
                    .then(parsedEntry => {
                        localEntries.push(parsedEntry)
                        return parsedEntry
                    })
                    // Adding parenthesis after getJournalEntries and renderJournalEntries methods is not necessary because we want to pass in the entire function as an argument!!!
                    .then(API.getJournalEntries)
                    .then(renderJournalEntries)
                dateInput.value = ""
                entryInput.value = ""
                conceptsInput.value = ""
            }
        })
    },
    registerDeleteListener() {
        document.querySelector("#entryLog").addEventListener("click", (event) => {
            if (event.target.id.startsWith("deleteEntry")) {
                const entryId = event.target.id.split("--")[1]
                // find the index of the entry we want to delete in the localEntries array
                const indexToDelete = localEntries.find(entry => entry.id === parseInt(entryId))

                // delete only that entry at that index
                localEntries.splice(indexToDelete.id - 1, 1)
                API.deleteJournalEntry(entryId)
                    // Adding parenthesis after getJournalEntries and renderJournalEntries methods is not necessary because we want to pass in the entire function as an argument!!!
                    .then(API.getJournalEntries)
                    .then(renderJournalEntries)
            }
        })

    },
    filterEntries() {
        document.querySelector("#filterEntries").addEventListener("click", (event) => {
            const mood = event.target.value
            if (mood !== undefined) {
                // filter the local entries array by mood and store it
                let filteredEntries = localEntries.filter(entry => entry.mood === mood)
                // render the filtered array
                renderJournalEntries(filteredEntries)
            }
        })
    },
    registerEditListener() {
        entryLog.addEventListener("click", (event) => {
            // ===================
            // EDIT BUTTON CLICKS
            // ==================
            if (event.target.id.startsWith("editEntry")) {
                // grab the id number of the entry that was clicked
                const entryId = event.target.id.split("--")[1]
                const entryDOMSectionTag = event.target.parentElement.parentElement

                // get the entry to edit from the API, make an html edit component with it and display it to the DOM
                API.getJournalEntryById(entryId)
                    .then(parsedEntry => {
                        entryDOMSectionTag.innerHTML = htmlComponents.makeEditComponent(parsedEntry)
                    })
                // ===================
                // SAVE BUTTON CLICKS
                // ===================
            } else if (event.target.id.startsWith("saveEntry")) {
                event.preventDefault()
                this.saveEntry(event)
            }
        })
    },
    saveEntry(event) {
        // find the index of the entry we want to delete in the localEntries array
        // grab the id number of the entry that was clicked
        const entryId = event.target.id.split("--")[1],
            indexToEdit = localEntries.find(entry => entry.id === parseInt(entryId)),
            // grabs the section tag of the entry
            entryDOMSectionTag = event.target.parentElement.parentElement,
            // grabs all of the information that the user inputted
            editedDate = document.querySelector("#editDate"),
            editedConcepts = document.querySelector("#editConcepts"),
            editedEntry = document.querySelector("#editMessage"),
            editedMood = document.querySelector("#editMood")

        // checks if the fields are blank
        if (editedDate.value !== "" && editedConcepts.value !== "" && editedEntry.value !== "" && editedMood.value !== "") {
            // create an object to store in the API and the local array
            const editedJournalEntry = {
                id: parseInt(entryId),
                date: editedDate.value,
                conceptsCovered: editedConcepts.value,
                entryMessage: editedEntry.value,
                mood: editedMood.value
            }

            // Update local array
            localEntries[indexToEdit.id - 1] = editedJournalEntry
            //  rerender new information to DOM with edit buttons
            entryDOMSectionTag.innerHTML = ""
            entryDOMSectionTag.innerHTML = htmlComponents.makeEditedJournalEntryComponent(editedJournalEntry)
            // Put updated information in API
            API.editJournalEntry(entryId, editedJournalEntry)
        } else {
            alert("Please make sure all fields are filled out")
        }

    }
}
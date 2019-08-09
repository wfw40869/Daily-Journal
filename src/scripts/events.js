import API from "./data.js"
import renderJournalEntries from "./entriesDOM.js"
import htmlComponents from "./entryComponent.js"
import localEntries from "./journal.js"

const addEntryButton = document.querySelector("#submit"),
    dateInput = document.querySelector("#journalDate"),
    conceptsInput = document.querySelector("#conceptsCovered"),
    entryInput = document.querySelector("#journalEntry"),
    mood = document.querySelector("#dailyMood").value


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
                console.log("indexToDelete: ", indexToDelete);

                // delete only that entry at that index
                console.log("localentries before delete", localEntries)
                localEntries.splice(indexToDelete.id - 1, 1)
                console.log("localentries after delete", localEntries)

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
        document.querySelector("#entryLog").addEventListener("click", (event) => {
            if (event.target.id.startsWith("editEntry")) {
                console.log("Edit button clicked")
                // grab the id number of the entry that was clicked
                const entryId = event.target.id.split("--")[1]
                const entryDOMSectionTag = event.target.parentElement.parentElement

                // find the index of the entry we want to edit in the localEntries array

                // const indexToEdit = localEntries.find(entry => entry.id === entryId)
                API.getJournalEntryById(entryId)
                    .then(parsedEntry => {
                        entryDOMSectionTag.innerHTML = htmlComponents.makeEditComponent(parsedEntry)
                    })
                // listen for save button clicks
                this.registerSaveListener()
            }
        })
    },
    registerSaveListener() {
        document.querySelector("#entryLog").addEventListener("click", (event) => {
            event.preventDefault()
            if (event.target.id.startsWith("saveEntryEdit")) {
                console.log("Save button clicked")
                // find the index of the entry we want to delete in the localEntries array
                // grab the id number of the entry that was clicked
                const entryId = event.target.id.split("--")[1],
                    indexToEdit = localEntries.find(entry => entry.id === parseInt(entryId)),
                    // grabs the section tag of the entry
                    entryDOMSectionTag = event.target.parentElement.parentElement,
                    // grabs all of the information that the user inputted
                    editedDate = document.querySelector("#editDate").value,
                    editedConcepts = document.querySelector("#editConcepts").value,
                    editedEntry = document.querySelector("#editMessage").value,
                    editedMood = document.querySelector("#editMood").value

                console.log("indexToEdit: ", indexToEdit);


                console.log("editedDate: ", editedDate);
                // checks if the fields are blank
                if (editedDate !== "" && editedConcepts !== "" && editedEntry !== "" && editedMood !== "") {
                    const editedJournalEntry = {
                        id: entryId,
                        date: editedDate,
                        conceptsCovered: editedConcepts,
                        entryMessage: editedEntry,
                        mood: editedMood
                    }

                    // Update local array
                    console.log("Local Entries array before edit: ", localEntries)
                    localEntries[indexToEdit.id - 1] = editedJournalEntry
                    console.log("Edited Entry in local array", localEntries[indexToEdit])
                    console.log("Local Entries array after edit:", localEntries)
                    //  rerender new information to DOM with edit buttons
                    entryDOMSectionTag.innerHTML = htmlComponents.makeEditedJournalEntryComponent(editedJournalEntry)
                    // Put new information in API
                    API.editJournalEntry(entryId, editedJournalEntry)
                } else {
                    alert("Please make sure all fields are filled out")
                }
            }
        })
    }

}
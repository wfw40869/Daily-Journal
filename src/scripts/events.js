import API from "./data.js"
import renderJournalEntries from "./entriesDOM.js"

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
                    date: moment(dateInput.value).format('MMMM Do YYYY'),
                    conceptsCovered: conceptsInput.value,
                    entryMessage: entryInput.value,
                    mood: mood
                }
                // saves jounral entry to database
                API.saveJournalEntry(newJournalEntry)
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
                //get the happy entries
                API.getJournalEntries(mood)
                //render happy entries
                    .then(renderJournalEntries)
            }
        })
    }

}
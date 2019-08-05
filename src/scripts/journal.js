/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

*/

import API from "./data.js"
import renderJournalEntries from "./entriesDOM.js"



// calls the API object method then parses through the returned entries and renders them to the page
API.getJournalEntries().then(parsedEntries => renderJournalEntries(parsedEntries))

const addEntryButton = document.querySelector("#submit"),
    entryDateInput = document.querySelector("#journalDate"),
    conceptsCoveredInput = document.querySelector("#conceptsCovered"),
    journalEntryInput = document.querySelector("#journalEntry"),
    moodInput = document.querySelector("#dailyMood")


addEntryButton.addEventListener("click", (event) => {
    event.preventDefault()
    // Invoke the factory function, passing along the form field values
    const newJournalEntry = createJournalEntry(entryDateInput.value, conceptsCoveredInput.value, journalEntryInput.value, moodInput.value)
    
    // saves jounral entry to database
    API.saveJournalEntry(newJournalEntry).then(() => {
        API.getJournalEntries()
            .then(parsedEntries => renderJournalEntries(parsedEntries))
    }
    )
    entryDateInput.value = ""
    journalEntryInput.value = ""
    conceptsCoveredInput.value = ""
})


const createJournalEntry = (date, concepts, entry, mood) => {
    return {
        date: moment(date).format('MMMM Do YYYY'),
        conceptsCovered: concepts,
        entryMessage: entry,
        mood: mood
    }
}


/*
My brain hurt from making my Tic-Tac-Toe game work, but I learned about removeEventListener() and that if you pass in the true boolean it Removes the event handler from the capturing phase. Also, I learned about factory functions and how they return objects.
*/










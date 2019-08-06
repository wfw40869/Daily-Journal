/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

*/

import API from "./data.js"
import renderJournalEntries from "./entriesDOM.js"
import events from "./events.js"

// let entriesArray = []

// API.getJournalEntries().then(parsedEntries => parsedEntries.map(entry => entriesArray.push(entry)))


// calls the API object method then parses through the returned entries and renders them to the page
API.getJournalEntries().then(parsedEntries => renderJournalEntries(parsedEntries))


events.registerSubmitListener()
events.registerDeleteListener()
events.filterEntries()















/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

*/  

// calls the API object method then parses through the returned entries and renders them to the page
API.getJournalEntries().then(parsedEntries => renderJournalEntries(parsedEntries))










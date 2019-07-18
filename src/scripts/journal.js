/*
    Define the keys and value for a JavaScript object that
    represents a journal entry about what you learned today
*/
const journalEntries = [
    {
        date: "07/09/2019",
        conceptsCovered: "Group Projects",
        entryMessage: "Learned a lot about working in a group. Plan, Plan Plan. Have clear and concise goals. Also, have a reach goal and a minimum viable product goal.",
        mood: "happy"
    },
    {
        date: "07/10/2019",
        conceptsCovered: "Using the Debugger",
        entryMessage: "The debugger is very useful. Creating a flag to pause code to see what something is at that point in time is awesome!",
        mood: "happy"
    },
    {
        date: "07/11/2019",
        conceptsCovered: "Manipulating the DOM",
        entryMessage: "Learned about foreach loops, navigating through objects and looping through arrays",
        mood: "happy"
    },
    {
        date: "07/12/2019",
        conceptsCovered: "Manipulating the DOM and Objects",
        entryMessage: "Learned about foreach loops, changing elements' classes using JS DOM manipulation, navigating through objects and looping through arrays",
        mood: "happy"
    }
]

const determineMood = (journalEntry) => {
    // if journal entry matches a mood, return the corresponding ionicon
    if (journalEntry.mood === "happy") {
        return `
        <i class="far fa-smile"></i>
        `
    } else if (journalEntry.mood === "okay") {
        return `
        <i class="far fa-meh"></i>
        `
    } else {
        return `
        <i class="far fa-frown-open"></i>
        `
    }

}

const makeJournalEntryComponent = (journalEntry) => {
    // Create your own HTML structure for a journal entry
    return `
        <section class="journalEntry">
            <h2>${journalEntry.date}</h2>
            <h3>${journalEntry.conceptsCovered}</h3>
            <p>${journalEntry.entryMessage}</p>
            <div class="mood">${determineMood(journalEntry)}</div>
        </section>
    `
}

/*
    Purpose: To render all journal entries to the DOM

    Arguments: entries (array of objects)
*/
const entryLogContainer = document.querySelector("#entryLog")
const renderJournalEntries = (entries) => {
    entries.forEach(entry => {
        const htmlToDisplay = makeJournalEntryComponent(entry)
        entryLogContainer.innerHTML += htmlToDisplay
    })

}

// Invoke the render function
renderJournalEntries(journalEntries)


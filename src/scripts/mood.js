
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

export default determineMood
const getEventbriteData = require("./getEventbriteData");
const addToHubspot = require("./addToHubspot");

(async () => {
    // App log
    console.log("Hubspot App script started");

    console.log("###############################");

    // Get all new contacts
    const contacts = await getEventbriteData();

    // Contact count log
    console.log("Will process: %d contact(s)", contacts.length);

    // Add contacts list to hubspot
    await addToHubspot(contacts);
})();

// Dependencies
const axios = require("axios");
const helpers = require("./helpers");

const getContactsData = async () => {
    // Fetch the list of events
    const eventsConfig = {
        method: "get",
        url: "https://www.eventbriteapi.com/v3/organizations/310759224217/events?page_size=200",
        headers: {
            Authorization: process.env.EVENTBRITE_PRIVATE_KEY,
        },
    };

    try {
        const eventsResponse = await axios(eventsConfig);
        const events = eventsResponse.data.events;

        // Iterate through each event
        const attendeesData = [];
        for (const event of events) {
            const eventId = event.id;

            // Fetch attendees for each event
            const config = {
                method: "get",
                url: `https://www.eventbriteapi.com/v3/events/${eventId}/attendees`,
                headers: {
                    Authorization: "Bearer 3OS4Z7IUGLA3Z3PSAKGR",
                },
            };

            const res = await axios(config);
            const attendees = res.data["attendees"].map(
                ({ profile, answers }) => {
                    return [profile, answers];
                }
            );

            attendees.forEach((contact) => {
                const contactObject = { ...contact[0] };
                const attendedEvents = events
                    .map((event) => event.name.text)
                    .join("; ");

                if (contact[1]) {
                    contact[1].forEach((question) => {
                        // Map question keys to desired names
                        const mappedKey = helpers.mapQuestionKey(
                            question.question
                        );

                        // Add the mapped key to the contact object
                        contactObject[mappedKey] = question.answer;
                    });
                }

                attendeesData.push({
                    firstname: contactObject.first_name,
                    email: contactObject.email,
                    lastname: contactObject.last_name,
                    phone: contactObject.cell_phone,
                    age_range: contactObject.age_range,
                    zip: contactObject.postal_code,
                    interested_subject: contactObject.interested_subject,
                    open_day_source: contactObject.open_day_source,
                    marketing_consent: contactObject.marketing_consent,
                    attended_events: attendedEvents,
                });
            });
        }
        return attendeesData;
    } catch (error) {
        throw error;
    }
};

getContactsData().then((x) => console.log(x));
module.exports = getContactsData;

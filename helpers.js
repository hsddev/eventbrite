let helpers = {};

helpers.separateList = (array, by) => {
    const list = [];
    let arrayToAdd = [];

    for (const [id, item] of array.entries()) {
        arrayToAdd.push(item);

        if (arrayToAdd.length === by) {
            list.push(arrayToAdd);
            arrayToAdd = [];
        } else {
            if (id === array.length - 1) {
                list.push(arrayToAdd);
                arrayToAdd = null;
            }
        }
    }

    return list;
};

helpers.mapQuestionKey = (question) => {
    const keyMap = {
        "What is your age range?": "age_range",
        "What subject/s are you interested in?": "interested_subject",
        "How did you hear about our open day?": "open_day_source",
        "Are you happy for us to keep in touch with you about courses, events and further information?":
            "marketing_consent",
        "What is your postcode?": "post_code",
    };

    return keyMap[question] || question.toLowerCase().replace(/\s+/g, "_");
};

module.exports = helpers;

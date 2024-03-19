export const helpers = {
    settingDate: (date) => {
        const dateHelper = new Date(date);
        // setting the date structure to MM/DD/YYYY . We add one to the getMonth() section because it relates 0 to January, so the plus one fixes that
        const setDate = `${dateHelper.getMonth() + 1}/${dateHelper.getDate()}/${dateHelper.getFullYear()}`;

        return `${setDate}`;
    },
};
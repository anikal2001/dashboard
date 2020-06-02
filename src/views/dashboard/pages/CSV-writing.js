const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './file.csv',
    header: [
        { id: 'name', title: 'NAME' },
        { id: 'lang', title: 'LANGUAGE' }
    ]
});



export function create_csv(records) {
}


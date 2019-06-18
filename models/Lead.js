const firebase = require('../firebase');
const stringify = require ('csv-stringify');

const create = ({ name, email }) => {
    const leads = firebase.database().ref('leads');
    const lead = leads.push({ name, email });
    return lead;
};

const csv = (cb) => {
    const leads = firebase.database().ref('leads'); 
    const data = [['id', 'name', 'email']];
    leads.on('value', (snapshot) => {
        snapshot.forEach((lead) => {
            const { name, email } = lead.val();
            data.push([lead.key, name, email]);
        });
        stringify(data, (err, output) => {
            cb(output);
        });
    });
};

module.exports = {
    create,
    csv,
};
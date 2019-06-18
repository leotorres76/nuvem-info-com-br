const firebase = require('../firebase');
const stringify = require ('csv-stringify');

const create = ({ email, name, ipAddress, date }) => {
    const leads = firebase.database().ref('leads');
    const lead = leads.push({ email, name, ipAddress, date });
    return lead;
};

const csv = (cb) => {
    const leads = firebase.database().ref('leads'); 
    const data = [['id', 'email', 'name', 'ip', 'data_hora']];
    leads.on('value', (snapshot) => {
        snapshot.forEach((lead) => {
            const { email, name, ipAddress, date } = lead.val();
            data.push([lead.key, email, name, ipAddress, date]);
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
const firebase = require('../firebase');
const stringify = require ('csv-stringify');

//essa função grava os campos no firebase
const create = ({ email, name, ipAddress, tipo, date }) => {
    const leads = firebase.database().ref('leads');
    const lead = leads.push({ email, name, ipAddress, tipo, date });
    return lead;
};

//cria arquivo csv com os dados do firebase
const csv = (cb) => {
    const leads = firebase.database().ref('leads'); 
    const data = [['id', 'email', 'name', 'ip', 'tipo', 'data_hora']];
    leads.on('value', (snapshot) => {
        snapshot.forEach((lead) => {
            const { email, name, ipAddress, date } = lead.val();
            data.push([lead.key, email, name, ipAddress, tipo, date]);
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
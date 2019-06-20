const express = require ('express');
const bodyParser = require('body-parser');
const Lead = require('./models/Lead');
const ip = require('ip');

const app = express ();


app.use(express.static('assets'));


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/computacao-em-nuvem', (req, res) => {
    res.sendFile(__dirname + '/public/computacao-em-nuvem.html');
});

app.get('/o-que-e-lgpd', (req, res) => {
    res.sendFile(__dirname + '/public/o-que-e-lgpd.html');
});

app.get('/como-criar-lgpd', (req, res) => {
    res.sendFile(__dirname + '/public/como-criar-lgpd.html');
});

app.get('/lgpd-seguros', (req, res) => {
    res.sendFile(__dirname + '/public/lgpd-seguros.html');
});

app.get('/lista', (req, res) => {
    res.sendFile(__dirname + '/public/lista.html');
});

app.get('/obrigado', (req, res) => {
    res.sendFile(__dirname + '/public/obrigado.html');
});

app.post('/leads', (req, res) => {
    const name = req.body.lead.name; //pega o campo name do form e leva pro Lead.js
    const email = req.body.lead.email; //pega o campo email do form e leva pro Lead.js
    const ipAddress = req.body.lead.myIp; //pega o ip pela função getIp do index.html
    const tipo = ''; //campo criado apenas para preenchimento manual posteriormente no csv
	const date = new Date(Date.now()).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }); // pega a data e leva pro Lead.js
	const lead = Lead.create({ name, email, ipAddress, date }); //cria no firebase com a função Lead
	res.sendFile(__dirname + '/public/obrigado.html'); //aqui devolve algo depois de gravar no firebase pode ser a pagina de obrigado.html ou msg na mesma pagina
});

app.get('/leads.csv', (req, res) =>{
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'betaleads.csv\"');
    Lead.csv((data) => {
        res.send(data);
    });
});

app.listen(process.env.PORT || 3000);
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

//Conexão banco de dados 
mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://127.0.0.1:27017/dbsistema';
mongoose.connect(dbUrl, {useNewUrlParser: true})
.then(mongoose => console.log('Conectado com banco local'))
.catch(err => console.log(err));


const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(json());
app.use(urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))

app.set('port', process.env.PORT || 8080);


app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
    
});

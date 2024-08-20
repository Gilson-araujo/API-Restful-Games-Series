const { json } = require('express');
const fs = require('fs/promises');

const MostrarSeries = async (req,res) => {
    try{

    const series = await fs.readFile('./src/data/series.json');

    res.send(series);

} catch(erro){
        res.status(erro.message);
    }
};

const SeriePorGenero = async (req,res) => {
    try{

    const series = await fs.readFile('./src/data/series.json');

    const seriesEmJS = JSON.parse(series);

    const filtro = seriesEmJS.filter((serie) => {
        return serie.genre === req.query.genero
    });

    if(!filtro){
        res.status(404).json(`Filmes do genero ${req.query.genero} não foram encontrados no servidor`)
    }

    res.send(filtro)

    } catch(erro){
    res.status(erro.message)  }
};

const SeriePorid = async (req,res) => {

    try{
        const lerSeries = await fs.readFile('./src/data/series.json');

        const Converter_series = JSON.parse(lerSeries);

        const serie_buscada = Converter_series.filter((serie) => {
            return serie.id === Number(req.query.id)
        }
    );

    if(!serie_buscada){
        res.status(400).json('Serie não encontrada!')
    }
        res.send(serie_buscada);

    }catch(erro) {
        res.send(erro.message)
    }
};

const cadastrar_series = async(req,res) =>{

    try{
        const serie = req.body

        const LerSeries = await fs.readFile('./src/data/series.json');

        const converter_series = await JSON.parse(LerSeries)

        serie.id = converter_series.length+1

        const buscar_serie = converter_series.find((serie) => {
            return serie.name === req.body.name
        });

        if(buscar_serie){
            res.status(400).json('Serie já cadastrada') 
        };

        converter_series.push(serie);

        await fs.writeFile('./src/data/series.json', JSON.stringify(converter_series));

        res.send(`A série ${serie.name} foi cadastrada no sistema!`);
    }
    catch(erro){
        res.status(erro.message)};
};

const cadastrar_episodio = async (req,res) => {
    try{
        const LerSeries = await fs.readFile('./src/data/series.json');

        const converter_series = JSON.parse(LerSeries);

        const buscar_serie = converter_series.find((serie) => {
            return serie.id === Number(req.query.id)
        }
    ); 
        if(!buscar_serie){
            res.status(400).json('Serie não encontrada') };

        const arrayEpisodios = converter_series[req.query.id-1].seasons[req.query.season-1].episodes;

        arrayEpisodios.splice(req.body.code-1,0,req.body);

        await fs.writeFile('./src/data/series.json', JSON.stringify(converter_series));

        res.send(`A série ${buscar_serie.name} foi editada com sucesso`);

    }catch(erro){
        res.status(400).json(erro.message);
    }
};

const excluir_Serie = async (req,res) => {
    try{
        const LerSeries = await fs.readFile('./src/data/series.json');

        const converter_series = JSON.parse(LerSeries);

        const buscar_serie = converter_series.find((serie) => {
            return serie.id === Number(req.query.id)
        }
    ); 
        if(!buscar_serie){
            res.status(404).json('Serie não encontrada') };

        converter_series.splice(req.query.id-1,1);

        await fs.writeFile('./src/data/series.json', JSON.stringify(converter_series));

        res.send(`A série ${buscar_serie.name} foi excluída com sucesso`);

    }catch(erro){
        res.status(400).json(erro.message);
    }
};

const excluirTemporada = async (req,res) => {
    try{
        const LerSeries = await fs.readFile('./src/data/series.json');

        const converter_series = JSON.parse(LerSeries);

        const buscar_serie = converter_series.find((serie) => {
            return serie.id === Number(req.query.id)
        }
    ); 
        if(!buscar_serie){
            res.status(404).json('Serie não encontrada') };

        const excluirTemporada = converter_series[req.query.id-1].seasons

        excluirTemporada.splice(req.query.season-1,1);

        await fs.writeFile('./src/data/series.json', JSON.stringify(converter_series));

        res.send(`A série ${buscar_serie.name} teve a temporada ${req.query.season} excluída com sucesso`);

    }catch(erro){
        res.status(400).json(erro.message);
    }
};

const excluirEpisodio = async(req,res) => {
    try{
        const LerSeries = await fs.readFile('./src/data/series.json');

        const converter_series = JSON.parse(LerSeries);

        const buscar_serie = converter_series.find((serie) => {
            return serie.id === Number(req.query.id)
        }
    ); 
        if(!buscar_serie){
            res.status(404).json('Serie não encontrada') };
            
            const episodio = converter_series[req.query.id-1].seasons[req.query.season-1].episodes 

            episodio.splice(req.query.ep-1,1)

            await fs.writeFile('./src/data/series.json', JSON.stringify(converter_series));
            
            res.send(`A série ${buscar_serie.name} teve o episódio ${req.query.ep} excluído com sucesso`);

    } catch(erro){
        res.status(500).json(erro.message);
    }      
};

const cadastrarTemporada = async (req,res) => {
    try{
        const LerSeries = await fs.readFile('./src/data/series.json');

        const converter_series = JSON.parse(LerSeries);

        const serie = converter_series.find((serie) => {
           return serie.id === Number(req.query.id)
        }  
    ); 

    if(!serie){
        res.status(404).json('Série não encontrada');
    }
    else if(serie.seasons[req.query.season-1]) {
        res.status(400).json('Temporada já cadastrada');
    }
        serie.seasons.splice(req.query.season-1,0,req.body);

        await fs.writeFile('./src/data/series.json', JSON.stringify(converter_series));

        res.send(`A serie ${serie.name} foi editada com sucesso`);
        
    }catch(erro){
        
        res.status(400).json(erro.message);
    }
};


module.exports = {
    MostrarSeries,
    SeriePorGenero,
    SeriePorid,
    cadastrar_series,
    cadastrar_episodio,
    excluir_Serie,
    excluirTemporada,
    excluirEpisodio, 
    cadastrarTemporada }
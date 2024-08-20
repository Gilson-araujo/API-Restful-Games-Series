const express = require('express');
const jogos = require('../controladores/controladores');
const series = require('../controladores/controladores series');

const rotas = express();

const authenticUser = (req,res,next) => {

    if(req.query.senha === 'ok'){
        next();      
    }
    else{
        res.status(401).json('Usuário não autenticado');
    }
};

rotas.get('/games', authenticUser, jogos.mostrar_jogos);
rotas.get('/game', authenticUser, jogos.mostrar_JogoPorId);
rotas.post('/games', authenticUser, jogos.cadastrar_jogo);
rotas.patch('/games', authenticUser, jogos.atualizar_jogo);
rotas.delete('/games', authenticUser, jogos.deletar_jogo);


rotas.get('/series', authenticUser, series.MostrarSeries);
rotas.get('/serie', authenticUser, series.SeriePorGenero);
rotas.get('/serieID', authenticUser, series.SeriePorid);
rotas.post('/series', authenticUser, series.cadastrar_series);
rotas.patch('/cadastrarEP', authenticUser, series.cadastrar_episodio);
rotas.patch('/cadastrarTemporada', authenticUser, series.cadastrarTemporada);
rotas.delete('/series', authenticUser, series.excluir_Serie);
rotas.delete('/temporada', authenticUser, series.excluirTemporada);
rotas.delete('/episodio', authenticUser, series.excluirEpisodio);

module.exports = rotas;
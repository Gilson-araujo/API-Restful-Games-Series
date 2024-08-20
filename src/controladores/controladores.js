const { json } = require('express');
const fs = require('fs/promises');

const mostrar_jogos = async (req,res) => {

try{
    const ler_jogos = await fs.readFile('./src/data/games.json');

    res.send(ler_jogos);
} 
catch(erro) {
    res.status(400).json(erro.message) }
};

const mostrar_JogoPorId = async (req,res) => {

    try{
        const ler_jogos = await fs.readFile('./src/data/games.json');

        converterJogos = JSON.parse(ler_jogos);

        const jogo = converterJogos.find((jogo) => {
            return jogo.id === Number(req.body.id) ;
        })

        if(!jogo){
            res.status(404).json('Jogo não encontrado');
        }
    
        res.send(jogo);
    } 
    catch(erro) {
        res.status(400).json(erro.message) }
};

const cadastrar_jogo = async (req,res) => {

    let id_disponivel = 4;

    try{
        const ler_jogos = await fs.readFile('./src/data/games.json');

        converterJogos = JSON.parse(ler_jogos);

        const jogo = req.body;
        jogo.id = id_disponivel;

        const procurar_jogo = converterJogos.find((jogo) => {
            return jogo.id === Number(req.body.id) ;
        })

        if(!jogo){
            res.status(400).json('Jogo cadastrado!');
        };

        converterJogos.push(jogo);

        await fs.writeFile('./src/data/games.json', JSON.stringify(converterJogos));

        id_disponivel++

        res.send(`O jogo ${jogo.title} foi cadastrado com sucesso`);
    } 
    catch(erro) {
        res.status(400).json(erro.message) }
};

const atualizar_jogo = async (req,res) => {
    
    try{
        const ler_jogos = await fs.readFile('./src/data/games.json');

        ListadeJogos = JSON.parse(ler_jogos);

        const JogoEncontrado = ListadeJogos.find((jogo) => {
            return jogo.id === Number(req.query.id);})

        if(!JogoEncontrado){
            res.status(404).json('Jogo não encontrado'); };

        switch (req.query.editar){
            case 'title':
                JogoEncontrado.title = req.body.value
                break;
            case 'launchYear':
                JogoEncontrado.launchYear = req.body.value
                break;
            case 'consoles':
                JogoEncontrado.consoles = req.body.value
                break;
            case 'liked':
                JogoEncontrado.liked = req.body.value
                break;
        };

        await fs.writeFile('./src/data/games.json',JSON.stringify(ListadeJogos));

        res.send(`Jogo ${JogoEncontrado.title} editado com sucesso!`);

    } catch(erro){
        res.status(400).json(erro.message);
    }
};

const deletar_jogo = async (req,res) => {
try{      
const ler_jogos = await fs.readFile('./src/data/games.json');

    ListadeJogos = JSON.parse(ler_jogos);

        const JogoEncontrado = ListadeJogos.find((jogo) => {
            return jogo.id === Number(req.query.id);})
        
            if(!JogoEncontrado){
                res.status(404).json('Jogo não encontrado'); }

        ListadeJogos.splice(ListadeJogos.indexOf(JogoEncontrado),1);
        
    await fs.writeFile('./src/data/games.json',JSON.stringify(ListadeJogos));

 res.send(`Jogo excluído com sucesso!`);

    } catch(erro){
        res.status(400).json(erro.message);
    }
};


module.exports = {
    mostrar_jogos,
    mostrar_JogoPorId,
    cadastrar_jogo,
    atualizar_jogo,
    deletar_jogo}

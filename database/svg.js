const pool = require('./pool');

const getSVG = (request, response) => {
    const municipio = request.params.nome;
  
    pool.query('SELECT ST_AsSVG(geom) FROM municipio WHERE nome ilike $1', [municipio], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };
  
  const getViewBox = (request, response) => {
    const municipio = request.params.nome;
  
    pool.query('SELECT getViewBox($1)', [municipio], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  // Recuperar o svg do estado com base no municipio:

  const getSvgEstado = (request, response) => {
    const municipio = request.params.cidade;

    pool.query('SELECT ST_AsSVG(E.Geom) FROM Estado E, Municipio M WHERE ST_Within(M.Geom, E.Geom) AND M.nome ilike $1',[municipio],(error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  //Recuperando o viewBox do estado :

  const getViewBoxEstado = (request, response) => {
    const municipio = request.params.cidade;
  
    pool.query('SELECT getViewBoxEstado(E.Nome) FROM Estado E, Municipio M WHERE ST_Within(M.Geom, E.Geom) AND M.Nome ilike $1',[municipio] , (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  // Recuperar informações da cidade:

  const getInfoCidade = (request, response) => {
    const municipio = request.params.cidade;
  
    pool.query('SELECT M.Nome, M.Codigo, M.Area, E.Nome AS Estado FROM Municipio M, Estado E WHERE M.Nome ilike $1 AND ST_Within(M.Geom,E.Geom)',[municipio] , (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };







module.exports = {getSVG, getViewBox, getSvgEstado, getViewBoxEstado, getInfoCidade};
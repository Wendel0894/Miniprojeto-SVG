//Consumindo os dados da API

async function gerarSvg() {

    let cidade = document.getElementById('cidade').value

    try {

        // Recuperando o Path da cidade : 

        const responsePath = await fetch(`http://localhost:3000/getSvg/${cidade}`)
        //const responseViewBox = await fetch(`http://localhost:3000/getViewBox/${cidade}`)

        // Path e viewBox do estado

        const responsePathEstado = await fetch(`http://localhost:3000/getSvgEstado/${cidade}`)
        const responseViewBoxEstado = await fetch(`http://localhost:3000/getViewBoxEstado/${cidade}`)

        // Recuperando as informações da cidade:

        const infoCidade = await fetch(`http://localhost:3000/getInfoCidade/${cidade}`)

        const path = await responsePath.json() // Path da cidade
        //const viewBox = await responseViewBox.json()
        const pathEtd = await responsePathEstado.json() // Path do estado
        const viewBoxEtd = await responseViewBoxEstado.json() // viewBox do estado
        const dadosCidade = await infoCidade.json() // Informações da cidade
        
        console.log(dadosCidade)
        mostrarSvg(path, pathEtd, viewBoxEtd, dadosCidade)

    } catch (error) {
       alert(error)
    }
}

function mostrarSvg (pathCidade, pathEstado, viewBoxEstado, dadosCidade) {
    document.getElementById('SVG').innerHTML =

    `<svg  viewBox="${viewBoxEstado[0].getviewboxestado}">  
        <path D="${pathEstado[0].st_assvg}"
              stroke= "black"
              stroke-width = "0.01"
              fill="green"
        /> 
        <path D="${pathCidade[0].st_assvg}"
              stroke= "yellow"
              stroke-width = "0.005"
              fill="red"
        /> 
    </svg>
    
    <div id="texto"> 
        <h2>
            Localizada no estado da(o) ${dadosCidade[0].estado}, a cidade de ${dadosCidade[0].nome} (cod: ${dadosCidade[0].codigo}) 
            possui uma area de aproximadamente ${dadosCidade[0].area} km.
        </h2>        
    </div>`
}





// Menu

function menu()
{
    var sidebar = document.querySelector('.sidebar')
    var conteudo = document.querySelector('.conteudo')

    sidebar.classList.toggle('active')
    conteudo.classList.toggle('active')
}

function esconderMenu()
{
    var tamanhoTela = window.innerWidth;

    if(tamanhoTela < "600")
    {
        var sidebar = document.querySelector('.sidebar')
        var conteudoSite = document.querySelector('.conteudo-site')

        sidebar.classList.remove('active')
        conteudoSite.classList.remove('active')
    }
}


// funções principais

function personagens()
{
    var paginacao = document.querySelector('.paginacao')
    var carregamento = document.querySelector('.carregamento')

    carregamento.style.display = "flex"
 
    setPaginacao()

    var ajax = new XMLHttpRequest()

    ajax.open('GET', link)

    ajax.onreadystatechange = function()
    {
        if(ajax.readyState == 4 && ajax.status == 200)
        {

            var dadosJsonObj = JSON.parse(ajax.responseText)

            var grupoCard = document.querySelector('.grupo-card')

            var cor = 1
            var corCartao

            dadosJsonObj['results'].forEach(personagem => 
            {

                if (cor % 2 == 0) 
                {
                    corCartao = "cor-amarelo"
                } else {
                    corCartao = "cor-azul"
                }

                setCartao(personagem, corCartao, grupoCard, "&index.html")


                cor += 1
                
            });

            carregamento.style.display = "none"
            paginacao.style.display = "flex"

        }
    }

    ajax.send()
}


function pesquisar()
{
    var parametroPesquisa = document.getElementById('campo-pesquisa').value
    var grupoCard = document.querySelector('.grupo-card')
    var mensagemErro = document.getElementById('nao-encontrado')


    grupoCard.innerHTML = ""

    var link = "https://rickandmortyapi.com/api/character/?name=" + parametroPesquisa


    var ajax = new XMLHttpRequest()

    ajax.open('GET', link)

    ajax.onreadystatechange = function()
    {
        if(ajax.readyState == 4 && ajax.status == 200)
        {
            mensagemErro.style.display = 'none'
            var dadosJsonObj = JSON.parse(ajax.responseText)

            var cor = 1
            var corCartao

            dadosJsonObj['results'].forEach(personagem => 
            {

                if (cor % 2 == 0) 
                {
                    corCartao = "cor-amarelo"
                } else {
                    corCartao = "cor-azul"
                }

                setCartao(personagem, corCartao, grupoCard, "&pesquisar.html")


                cor += 1
                
            });
            
        }


        if(ajax.readyState == 4 && ajax.status == 404)
        {
            mensagemErro.style.display = 'block'
        }
    }

    ajax.send()
}


function sortear()
{
    var parametroSorteio = Math.floor(Math.random() * 671 + 1)
    var grupoCard = document.querySelector('.grupo-card')

    grupoCard.innerHTML = ""

    var link = "https://rickandmortyapi.com/api/character/" + parametroSorteio


    var ajax = new XMLHttpRequest()

    ajax.open('GET', link)

    ajax.onreadystatechange = function()
    {
        if(ajax.readyState == 4 && ajax.status == 200)
        {
            var dadosJsonObj = JSON.parse(ajax.responseText)

            var corCartao
            pagina = 0


            if (Math.floor(Math.random() * 10 + 1) > 5) 
            {
                corCartao = "cor-amarelo"
            } else {
                corCartao = "cor-azul"
            }


                // var linkPerfil = document.createElement('a')
                // linkPerfil.classList.add('botao-perfil')
                // linkPerfil.href = "perfil.html?pagina=0&id=" + dadosJsonObj.id + "&sortear.html"


                // var card = document.createElement('div')
                // card.classList.add('card')
                // card.classList.add(corCartao)
    
    
                // var avatar = document.createElement('div')
                // avatar.classList.add('avatar')
    
    
                // var imgAvatar = document.createElement('img')
                // imgAvatar.src = dadosJsonObj.image
                // imgAvatar.alt = dadosJsonObj.name
                // linkPerfil.appendChild(imgAvatar)
    
    
                // var conteudoCard = document.createElement('div')
                // conteudoCard.classList.add('conteudo-texto')
    
    
                // conteudoCard.innerHTML = 
                // `<ul>
                // <li>${ dadosJsonObj.name }</li>
                // <li>${ dadosJsonObj.status}</li>
                // <li>${ dadosJsonObj.species}</li>
                // </ul>`
    
    
    
                // grupoCard.appendChild(card)
                // card.appendChild(avatar)
                // avatar.appendChild(linkPerfil)
                // card.appendChild(conteudoCard)

            setCartao(dadosJsonObj, corCartao, grupoCard, "&sortear.html")

        }
    }

    ajax.send()
}


function perfil()
{
    var carregamento = document.querySelector('.carregamento')
    var perfil = document.querySelector('#perfil')

    carregamento.style.display = "flex"

    var status = document.querySelector('.status')
    var imagemPerfil = document.querySelector('#imagem-perfil')
    var nome = document.getElementById('nome')
    var especie = document.getElementById('especie')
    var genero = document.getElementById('genero')

    getParametrosUrl()

    var link = "https://rickandmortyapi.com/api/character/" + idPerfil


    var ajax = new XMLHttpRequest()

    ajax.open('GET', link)

    ajax.onreadystatechange = function()
    {
        if(ajax.readyState == 4 && ajax.status == 200)
        {
            var dadosJsonObj = JSON.parse(ajax.responseText)


             status.innerHTML = "Status: " + dadosJsonObj.status
             imagemPerfil.src =  dadosJsonObj.image
             imagemPerfil.alt =  dadosJsonObj.name
             nome.innerHTML = "Nome: " + dadosJsonObj.name
             especie.innerHTML = "Especie: " + dadosJsonObj.species
             genero.innerHTML = "Genero: " + dadosJsonObj.gender

             
            var arrayEpisodio = dadosJsonObj.episode
            var urlOrigem = dadosJsonObj.origin.url
            var urlLocalizacao = dadosJsonObj.location.url

            getOrigem(urlOrigem)
            getLocalizacao(urlLocalizacao)
            getEpisodio(arrayEpisodio)


             carregamento.style.display = "none"
             perfil.style.display = "block"

        }
    }

    ajax.send()
}



// Construtores

function setPaginacao() 
{
    var url = document.location.href.split('?')
    var urlSeparacao = url.splice('?')
    var parametro = urlSeparacao[1]


    if(parametro == undefined)
    {
        link = "https://rickandmortyapi.com/api/character"
        pagina = 1 
    }
    else
    {
        link = "https://rickandmortyapi.com/api/character?" + parametro
        pagina = parseInt(parametro.substr(5,2)) 
    }

    var paginaVoltar = document.querySelector(".voltar")
    var paginaProximo = document.querySelector(".proximo")
    var numeroPagina = document.querySelector('.numero')


    if (pagina == 1) {
        paginaVoltar.setAttribute('href', 'index.html?page=' + 1)
    } else {
        paginaVoltar.setAttribute('href', 'index.html?page=' + (pagina - 1))
    }

    if (pagina == 34) 
    {
        paginaProximo.setAttribute('href', 'index.html?page=' + 34)
        console.log('index.html?page=' + 34)
    } else 
    {
        paginaProximo.setAttribute('href', 'index.html?page=' + (pagina + 1) )
    }


    numeroPagina.innerHTML= pagina + "/34"

}

function setCartao (personagem, corCartao, grupoCard, caminho)
{
    if(pagina)
    {
        pagina = pagina
    }
    else
    {
       var  pagina = 0
    }
    
    var linkPerfil = document.createElement('a')
    linkPerfil.classList.add('botao-perfil')
    linkPerfil.href = "perfil.html?page=" + pagina + "&id=" + personagem.id + caminho


    var card = document.createElement('div')
    card.classList.add('card')
    card.classList.add(corCartao)


    var avatar = document.createElement('div')
    avatar.classList.add('avatar')


    var imgAvatar = document.createElement('img')
    imgAvatar.src = personagem.image
    imgAvatar.alt = personagem.name
    linkPerfil.appendChild(imgAvatar)


    var conteudoCard = document.createElement('div')
    conteudoCard.classList.add('conteudo-texto')


    conteudoCard.innerHTML = 
    `<ul>
    <li>${ personagem.name }</li>
    <li>${ personagem.status}</li>
    <li>${ personagem.species}</li>
    </ul>`



    grupoCard.appendChild(card)
    card.appendChild(avatar)
    avatar.appendChild(linkPerfil)
    card.appendChild(conteudoCard)


}


// Funções segundarias

function  getOrigem(url)
{
    var nomeOrigem = document.getElementById('nomeOrigem')
    var tipoOrigem = document.getElementById('tipoOrigem')
    var dimensaoOrigem = document.getElementById('dimensaoOrigem')

    if(url !== "")
    {
        var ajax = new XMLHttpRequest()

        ajax.open('GET', url)

        ajax.onreadystatechange = function()
        {
            if(ajax.readyState == 4 && ajax.status == 200)
            {
                var dadosJsonObjOrigem = JSON.parse(ajax.responseText)

                nomeOrigem.innerHTML = "Nome: " + dadosJsonObjOrigem.name
                tipoOrigem.innerHTML  = "Tipo: " + dadosJsonObjOrigem.type
                dimensaoOrigem.innerHTML  = "Dimensão: " + dadosJsonObjOrigem.dimension

            }

        }

        ajax.send()
    }
    else
    {
        nomeOrigem.innerHTML = "Nome: Desconhecido" 
        tipoOrigem.innerHTML  = "Tipo: Desconhecido" 
        dimensaoOrigem.innerHTML  = "Dimensão: Desconhecido"
    }
}

function  getLocalizacao(url)
{
    
    var nomeLocalizacao = document.getElementById('nomeLocalizacao')
    var tipoLocalizacao= document.getElementById('tipoLocalizacao')
    var dimensaoLocalizacao = document.getElementById('dimensaoLocalizacao')

    if(url !== "")
    {
        var ajax = new XMLHttpRequest()

        ajax.open('GET', url)
    
        ajax.onreadystatechange = function()
        {
            if(ajax.readyState == 4 && ajax.status == 200)
            {
                var dadosJsonObjLocalizacao = JSON.parse(ajax.responseText)
    
    
                nomeLocalizacao.innerHTML = "Nome: " + dadosJsonObjLocalizacao.name
                tipoLocalizacao.innerHTML  = "Tipo: " + dadosJsonObjLocalizacao.type
                dimensaoLocalizacao.innerHTML  = "Dimensão: " + dadosJsonObjLocalizacao.dimension
    
    
    
    
            }
        }
    
        ajax.send()
    }
    else
    {
        nomeOrigem.innerHTML = "Nome: Desconhecido" 
        tipoOrigem.innerHTML  = "Tipo: Desconhecido" 
        dimensaoOrigem.innerHTML  = "Dimensão: Desconhecido"
    }
  
}

function  getEpisodio(array)
{
    var secaoEpisodio = document.querySelector(".episodios")
    var dadosJsonObjEpisodio = []
    var i = 0

    array.forEach(url => 
    {

        var ajax = new XMLHttpRequest()
    
        ajax.open('GET', url)
    
    
        ajax.onreadystatechange = function()
        {
            
    
            if(ajax.readyState == 4 && ajax.status == 200)
            {
                
                
                dadosJsonObjEpisodio.push(JSON.parse(ajax.responseText))
                
                var div = document.createElement('div')
                div.classList.add("card-epi")
                div.innerHTML = 
                "<p id='nomeEpisodio'> Nome: " + dadosJsonObjEpisodio[i].name + " </p>" +                    
                "<p id='dataEpisodio'>Data: " + dadosJsonObjEpisodio[i].air_date + " </p>" +
                "<p id='numeroEpisodio'>Episodio: " + dadosJsonObjEpisodio[i].episode + " </p>"
    
                secaoEpisodio.appendChild(div)

                i += 1
    
                
    
                
    
            }
        }
    
        ajax.send()

    })

}

function getParametrosUrl() 
{
    var botaoRetorno = document.querySelector('.link-retorno')

    var url = window.location.href
    var separacaoParametro = url.split('?')
    var separacaoParametroAgregado = separacaoParametro[1].split('&')
    var parametroPagina = separacaoParametroAgregado[0]
    var parametroID = separacaoParametroAgregado[1]
    var paginaRetorno = separacaoParametroAgregado[2]


    botaoRetorno.setAttribute("href", paginaRetorno + "?" + parametroPagina)

    idPerfil = parametroID.substr(3,5)

}
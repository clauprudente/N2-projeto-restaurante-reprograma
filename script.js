const container = document.querySelector('.col-8');
fetch('http://localhost:3000/comidas')
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.forEach(adicionaComida => {
            console.log(adicionaComida);
            const box = document.createElement('div');
            box.setAttribute('class', 'media mb-4');

            const imagem = document.createElement('img');
            imagem.setAttribute('class', 'mr-3 img-thumbnail');
            imagem.setAttribute('alt', adicionaComida.nome);
            imagem.setAttribute('width', '200px');
            imagem.setAttribute('src', adicionaComida.imagem)

            const body = document.createElement('div');
            body.setAttribute('class', 'media-body');
            body.innerHTML = `
            <strong>${adicionaComida.nome}</strong>
            ${adicionaComida.descricao}`

            const botaoDelete = document.createElement('button')
            botaoDelete.textContent = 'Remover'
            botaoDelete.setAttribute('class', 'btn btn-info')
            botaoDelete.setAttribute('data-id', adicionaComida._id)

            body.appendChild(botaoDelete)

            box.appendChild(imagem);
            box.appendChild(body)
            container.appendChild(box);

            botaoDelete.addEventListener('click', () => {
                fetch(`http://localhost:3000/comidas/${adicionaComida._id}`, {
                    method: 'DELETE',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                })
                    .then(() => {
                        box.remove();
                    })
                    .catch(erro => {
                        console.log(erro)
                    })
            })

        });
    })
    .catch(erro => {
        console.log("Deu erro!!!", erro)
    })


const botaoAdd = document.querySelector('#criar_comida_button')
botaoAdd.addEventListener("click", criarComida)

function criarComida() {
    console.log('Clicou no forms :)')
    const nome = document.querySelector("#nome_input").value
    const descricao = document.querySelector("#descricao_input").value
    const imagem = 'https://picsum.photos/200/200'
    const comida = {
        nome, descricao, imagem
    }
    fetch(
        'http://localhost:3000/comidas',
        {
            method: 'POST',
            body: JSON.stringify(comida),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => console.log("criou!"));
    window.location.reload()
}

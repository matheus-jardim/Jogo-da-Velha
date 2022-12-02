let escolhaJogo = '';

document.querySelectorAll('.opcao').forEach((item) => {
    item.addEventListener('click', (e) => {
        if(escolhaJogo == '') {
            escolhaJogo = escolha(e);
        }
    })    
})

document.querySelectorAll('.quadro').forEach((espaco) => {
    espaco.addEventListener('click', (e) => {
        if(escolhaJogo == '') {
            alert('Escolha uma opção para iniciar o jogo!')
        } else {
            if(e.target.getAttribute('data-ok') === null) {
                e.target.setAttribute('data-ok','disabled');
                if(e.target.getAttribute('data-key') == 'quadro'){
                    e.target.setAttribute('data-jogo', escolhaJogo)
                    let jogo = jogada(e);
                    e.target.append(jogo);
                    verificarVencedor(); 
                }
            }
        }
    })
})

document.querySelector('.jogar--novamente').addEventListener('click', novoJogo);

function escolha(e) {
    if(e.target.getAttribute('data-ok') === null) {
        document.querySelectorAll(`.${e.target.getAttribute('class')}`).forEach((item) => {
            item.setAttribute('data-ok','disabled');
        })
        document.querySelector('.escolha').style.display = 'none';
        return e.target.getAttribute("data-key");
    };
}

function jogada() {    
    let jogo = document.querySelector(`.${escolhaJogo}`).cloneNode(true);
    if(escolhaJogo == 'circulo') {
        escolhaJogo = 'x';
    } else {
        escolhaJogo = 'circulo';
    }
    return jogo;    
}

function verificarVencedor() {
    const q11 = document.querySelector('.q-1-1').getAttribute('data-jogo');
    const q12 = document.querySelector('.q-1-2').getAttribute('data-jogo');
    const q13 = document.querySelector('.q-1-3').getAttribute('data-jogo');
    const q21 = document.querySelector('.q-2-1').getAttribute('data-jogo');
    const q22 = document.querySelector('.q-2-2').getAttribute('data-jogo');
    const q23 = document.querySelector('.q-2-3').getAttribute('data-jogo');
    const q31 = document.querySelector('.q-3-1').getAttribute('data-jogo');
    const q32 = document.querySelector('.q-3-2').getAttribute('data-jogo');
    const q33 = document.querySelector('.q-3-3').getAttribute('data-jogo');

    if((q11 == q12) && (q12== q13) && (q11 !== null)) {
        document.querySelector('.linha--vencedora.horizontal1').style.display = 'block';
        pararJogo(q11);
    }
    if((q21 == q22) && (q22== q23) && (q21 !== null)) {
        document.querySelector('.linha--vencedora.horizontal2').style.display = 'block';
        pararJogo(q21);
    }
    if((q31 == q32) && (q32== q33) && (q31 !== null)) {
        document.querySelector('.linha--vencedora.horizontal3').style.display = 'block';
        pararJogo(q31);
    }

    if((q11 == q21) && (q21== q31) && (q11 !== null)) {
        document.querySelector('.linha--vencedora.vertical1').style.display = 'block';
        pararJogo(q11);
    }
    if((q12 == q22) && (q22== q32) && (q12 !== null)) {
        document.querySelector('.linha--vencedora.vertical2').style.display = 'block';
        pararJogo(q12);
    }
    if((q13 == q23) && (q23== q33) && (q13 !== null)) {
        document.querySelector('.linha--vencedora.vertical3').style.display = 'block';
        pararJogo(q13);
    }

    if((q11 == q22) && (q22== q33) && (q11 !== null)) {
        document.querySelector('.linha--vencedora.transversalse').style.display = 'block';
        pararJogo(q11);
    }
    if((q31 == q22) && (q22== q13) && (q31 !== null)) {
        document.querySelector('.linha--vencedora.transversalne').style.display = 'block';
        pararJogo(q31);
    } 
    
    let linhaVencedora = false
    
    document.querySelectorAll('.linha--vencedora').forEach((item) => {
        if(item.style.display == 'block') {
            linhaVencedora = true;
        }
    })
    console.log(linhaVencedora)
    

    if(document.querySelectorAll('.quadro[data-jogo]').length == 9 && linhaVencedora == false) {
        pararJogo('EMPATE')
    } 
}

function pararJogo(vencedor) {
    document.querySelectorAll('.quadro').forEach((item) => {
        item.removeAttribute('data-ok');
        item.setAttribute('data-ok','disabled');
        if(vencedor == 'EMPATE') {
            document.querySelector('.vencedor').innerHTML = `EMPATOU!`;
            document.querySelector('.resultado').style.backgroundColor = 'rgba(255, 255, 0, 0.8)';

        } else {
            document.querySelector('.vencedor').innerHTML = `O VENCEDOR É O  ${vencedor}!`;
            document.querySelector('.resultado').style.backgroundColor = 'rgba(0, 255, 0, 0.8)';

        }
        document.querySelector('.resultado').style.display = 'flex'; 
    })
    
}

function novoJogo() {

    document.querySelectorAll('.quadro').forEach((item) => {
        item.innerHTML = '';
        item.removeAttribute('data-ok');
        item.removeAttribute('data-jogo');
    });
    document.querySelectorAll('.linha--vencedora').forEach((item) => {
        item.style.display = 'none';
    });
    document.querySelector('.resultado').style.display = 'none';

    document.querySelectorAll('.escolha .opcao').forEach((item) => {
        item.removeAttribute('data-ok');
    })
    escolhaJogo = '';
    document.querySelector('.escolha').style.display = 'flex';
}


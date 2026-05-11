const ctx = document.getElementById('graficoFonema').getContext('2d');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['/s/', '/r/', '/v/'],
        datasets: [{
            data: [40, 35, 25],
            backgroundColor: [
                '#FFC107', // Amarelo
                '#E58678', // Salmão/Rosa (o mesmo do seu botão)
                '#61D8D6'  // Ciano/Turquesa
            ],
            borderWidth: 0, // Remove as bordas brancas entre as fatias
            hoverOffset: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '40%', // Faz o buraco do meio ficar grande (efeito rosca fina)
        plugins: {
            legend: {
                display: true,
                position: 'bottom', // Na imagem original os nomes estão fora, 
                                   // mas nativamente a legenda embaixo fica bem limpa.
                labels: {
                    usePointStyle: true,
                    padding: 20
                }
            }
        }
    }
});

//atividade diária
const ctxSemana = document.getElementById('graficoAtividade').getContext('2d');

new Chart(ctxSemana, {
    type: 'bar',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Sessões',
            data: [12, 19, 15, 8, 22, 30, 10],
            backgroundColor: '#E58678', // A cor salmão do seu botão
            borderRadius: 8,           // Barras arredondadas nas pontas
            borderSkipped: false,      // Garante que o arredondado apareça bem
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false // Remove as linhas de grade do fundo para um visual clean
                },
                ticks: {
                    color: '#9ca3af' // Cor cinza (text-gray-400)
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#9ca3af'
                }
            }
        },
        plugins: {
            legend: {
                display: false // Esconde a legenda para ganhar espaço
            }
        }
    }
});

//evolução de acertos por paciente
const ctxPacientes = document.getElementById('graficoEvolucao').getContext('2d');

new Chart(ctxPacientes, {
    type: 'line',
    data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'], // Tempo
        datasets: [
            {
                label: 'João',
                data: [40, 55, 50, 75, 80],
                borderColor: '#E58678', // Salmão
                backgroundColor: '#E58678',
                tension: 0.4,
                pointRadius: 4
            },
            {
                label: 'Maria',
                data: [60, 65, 80, 82, 95],
                borderColor: '#61D8D6', // Turquesa
                backgroundColor: '#61D8D6',
                tension: 0.4,
                pointRadius: 4
            },
            {
                label: 'Pedro',
                data: [30, 40, 35, 50, 45],
                borderColor: '#a855f7', // Roxo
                backgroundColor: '#a855f7',
                tension: 0.4,
                pointRadius: 4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: { callback: (value) => value + '%' } // Adiciona % no eixo Y
            },
            x: {
                grid: { display: false }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    font: { size: 12 }
                }
            }
        }
    }
});
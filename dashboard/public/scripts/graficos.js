// =========================
// GRÁFICO DE FONEMAS
// =========================

const graficoFonema = document.getElementById('graficoFonema');

if (graficoFonema) {

    const ctx = graficoFonema.getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['/s/', '/r/', '/v/'],
            datasets: [{
                data: [40, 35, 25],
                backgroundColor: [
                    '#FFC107',
                    '#E58678',
                    '#61D8D6'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '40%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            }
        }
    });
}


// =========================
// ATIVIDADE DIÁRIA
// =========================

const graficoAtividade = document.getElementById('graficoAtividade');

if (graficoAtividade) {

    const ctxSemana = graficoAtividade.getContext('2d');

    new Chart(ctxSemana, {
        type: 'bar',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Sessões',
                data: [12, 19, 15, 8, 22, 30, 10],
                backgroundColor: '#E58678',
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9ca3af'
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
                    display: false
                }
            }
        }
    });
}


// =========================
// EVOLUÇÃO DOS PACIENTES
// =========================

const graficoEvolucao = document.getElementById('graficoEvolucao');

if (graficoEvolucao) {

    const ctxPacientes = graficoEvolucao.getContext('2d');

    new Chart(ctxPacientes, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'],
            datasets: [
                {
                    label: 'João',
                    data: [40, 55, 50, 75, 80],
                    borderColor: '#E58678',
                    backgroundColor: '#E58678',
                    tension: 0.4,
                    pointRadius: 4
                },
                {
                    label: 'Maria',
                    data: [60, 65, 80, 82, 95],
                    borderColor: '#61D8D6',
                    backgroundColor: '#61D8D6',
                    tension: 0.4,
                    pointRadius: 4
                },
                {
                    label: 'Pedro',
                    data: [30, 40, 35, 50, 45],
                    borderColor: '#a855f7',
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
                    ticks: {
                        callback: (value) => value + '%'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}


// =========================
// DESEMPENHO POR FONEMA
// =========================

const graficoFonemaPerfil = document.getElementById('graficoFonemaPerfil');

if (graficoFonemaPerfil) {

    const ctxFonemas = graficoFonemaPerfil.getContext('2d');

    new Chart(ctxFonemas, {
        type: 'bar',
        data: {
            labels: ['/s/', '/r/', '/l/', '/ch/', '/v/'],
            datasets: [{
                label: 'Taxa de acertos (%)',
                data: [68, 52, 75, 60, 84],
                backgroundColor: [
                    '#61D8D6',
                    '#E58678',
                    '#FFC107',
                    '#a855f7',
                    '#34d399'
                ],
                borderRadius: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: (value) => value + '%'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// =========================
// GRÁFICO HOME
// =========================

const graficoHomeAtividade = document.getElementById('graficoHomeAtividade');

if (graficoHomeAtividade) {

    const ctxHome = graficoHomeAtividade.getContext('2d');

    new Chart(ctxHome, {
        type: 'bar',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Minutos',
                data: [12, 19, 15, 8, 22, 30, 10],
                backgroundColor: '#C57BDB',
                borderRadius: 10,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9ca3af'
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
                    display: false
                }
            }
        }
    });
}

const calendarElement = document.getElementById("calendar");

if (calendarElement) {

  const calendar = new tui.Calendar(calendarElement, {
    defaultView: 'month',
    usageStatistics: false,

    calendars: [
      {
        id: '1',
        name: 'Sessões',
        backgroundColor: '#C57BDB',
        borderColor: '#C57BDB',
      }
    ]
  });

  calendar.createEvents([
    {
      id: '1',
      calendarId: '1',
      title: 'Ana Clara',
      category: 'time',
      start: '2026-05-16T10:00:00',
      end: '2026-05-16T11:00:00',
    }
  ]);
}
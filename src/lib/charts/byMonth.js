export default (data, allowed) => ({
    chart: {
        type: 'line'
    },
    title: {
        text: `${allowed ? '' : 'Pas'} adorade, par mois`
    },
    xAxis: {
        categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    },
    yAxis: {
        title: {
            text: 'Nombre'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: true
        }
    },
    series: [{
        name: 'Homme',
        data: Object.values(data).map((item) => allowed ? item.allowed.man : item.disallowed.man)
    }, {
        name: 'Femme',
        data: Object.values(data).map((item) => allowed ? item.allowed.women : item.disallowed.women)
    }]
})

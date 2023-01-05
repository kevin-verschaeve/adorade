export default (data) => ({
    chart: {
        type: 'column',
        width: 300
    },
    title: {
        text: 'Global',
        align: 'left'
    },
    xAxis: {
        categories: ['Hommes', 'Femmes']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Nombre'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: 'gray',
                textOutline: 'none'
            }
        }
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: 'Adorade',
        data: [data.allowed.man, data.allowed.women]
    }, {
        name: 'Pas adorade',
        data: [data.disallowed.man, data.disallowed.women]
    }]
})

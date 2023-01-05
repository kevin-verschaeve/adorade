export default (data) => ({
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Quel sexe est le plus adorade ?'
    },
    plotOptions: {
        pie: {
            shadow: false,
            center: ['50%', '50%']
        }
    },
    series: [{
        name: 'Nombre',
        data: [
            {
                name: 'Hommes',
                y: data.allowed.man + data.disallowed.man,
                color: '#85C1E9',
            },
            {
                name: 'Femmes',
                y: data.allowed.women + data.disallowed.women,
                color: 'lightpink',
            }
        ],
        size: '60%',
        dataLabels: {
            formatter: function () {
                return this.point.name;
            },
            distance: -50
        }
    }, {
        name: 'Nombre',
        data: [
            {
                name: 'Adorade',
                y: data.allowed.man,
                color: '#58D68D',
            },
            {
                name: 'Pas adorade',
                y: data.disallowed.man,
                color: '#D98880',
            },
            {
                name: 'Adorade',
                y: data.allowed.women,
                color: '#58D68D',
            },
            {
                name: 'Pas adorade',
                y: data.disallowed.women,
                color: '#D98880',
            }
        ],
        size: '80%',
        innerSize: '60%',
        dataLabels: {
            formatter: function () {
                return this.y > 1 ? `<b>${this.point.name}:</b> ${this.y}` : null;
            },
        },
        id: 'sexe'
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 400
            },
            chartOptions: {
                series: [{
                }, {
                    id: 'sexe',
                    dataLabels: {
                        enabled: false
                    }
                }]
            }
        }]
    }
})

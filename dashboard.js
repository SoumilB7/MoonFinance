const ctx = document.getElementById('myChart').getContext('2d');

rsk = JSON.parse(sessionStorage.getItem("rsk"))
stab = JSON.parse(sessionStorage.getItem("stab"))
diver = JSON.parse(sessionStorage.getItem("diver"))
risky = (sessionStorage.getItem("risky"))

rick = document.getElementById("rick")
rick.innerHTML= risky

var cagr = 0;

if(risky=="Low Risk"){
    cagr = "7%-10%"
}else if(risky=="Mid Risk"){
    cagr = "10%-12%"
}else if(risky=="High Risk"){
    cagr = "12%-15%"
}
caggr = document.getElementById("caggr")
caggr.innerHTML = cagr


rsk = rsk
stab = stab
diver = diver


rmax = 4*1.5
smax = 5.25 *1.5
dmax = 4*1.5

rout = (rsk/rmax)*100
sout = (stab/smax)*100
dout = (diver/dmax)*100


console.log(rsk)
console.log(stab)
console.log(diver)

const data = {
    labels: ['Risk', 'Diversity', 'Stability'],
    datasets: [{
        label: 'portfolio',
        data: [rout, dout, sout],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 5,
        pointHitRadius: 10,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointBorderWidth: 1
    }]
};

const config = {
    type: 'radar',
    data: data,
    
options: {
    scales: {
        r: {
            angleLines: {
                display: true,
                color:"rgb(255,255,255)",
                beginAtZero:true
            },
            gridLines: {
                display:true,
                color:"rgb(255,255,255)",
                beginAtZero:true
            },
            pointLabels: {
               display: true, // Hides the labels around the radar chart
               color:"rgb(255,255,255)",
               size:"30px",
               borderColor:"rgb(150,150,150)",
               beginAtZero:true
            },

            ticks: {
               display: false, // Hides the labels in the middel (numbers)
               beginAtZero:true,
               
            },
            beginAtZero:true,
            max:100

       }
   }
}
  };

const myChart = new Chart(ctx, config);

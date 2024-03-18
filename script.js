// export {globalVariable};


qns = JSON.parse(localStorage.getItem("qns"))
console.log(qns)
function app(a,b){
    if(qns[a]==''){
        qns[a] = b;
        console.log(a,b);
        qns_str = JSON.stringify(qns)
        localStorage.setItem("qns",qns_str)
    }
}
let chk = 0
for(let i=1;i<10;i++){
    if(qns[i]!=''){
        chk+=1;
    }
}

function GetScores(){
    var risk_score = 0;
    var stability_score = 0;
    var diversity_score = 0;
    risk_score = (qns[1])*0.15 + (qns[2])*0.1 + (qns[3])*0.3 + (qns[5])*0.15 + (qns[6])*0.12 + (qns[7])*0.05 + (qns[8])*0.08;
    diversity_score = (qns[4])*0.1 + (qns[5])*0.08+ (qns[9])*0.1 + 2/risk_score; 
    stability_score = (qns[1])*0.1 + (qns[2])*0.1 + (qns[6])*0.2 + (qns[7])*0.15 + (qns[8])*0.15 + (qns[5])*0.4;
    var risky
    if(risk_score<=1.9){
      risky = "Low Risk";
    }else if(risk_score<2.25){
      risky = "Mid Risk";
    }else if((risk_score>2.25)){
      risky = "High Risk";
    }
    var diver;
    if(diversity_score<=1.5){
      diver = "Low Diversity";
    }else if(diversity_score<2.1){
      diver = "Mid Diversity";
    }else if(diversity_score>2.1){
      diver = "High Diversity";
    }
    var staby;
    if(stability_score<=2){
      staby = "Low Stability";
    }else if(stability_score<3.2){
      staby = "Mid Stability";
    }else if(stability_score>=3.2){
      staby = "High Stability";
    }
    console.log(risk_score)
    console.log(diversity_score)
    console.log(stability_score)

    // globalVariable={
    //   rsk: risk_score,
    //   stab: stability_score,
    //   diver:diversity_score
    // };
    

    // rsk_str = JSON.stringify(risk_score)
    sessionStorage.setItem("rsk",risk_score)
    // stab_str = JSON.stringify(stability_score)
    sessionStorage.setItem("stab",stability_score)
    // diver_str = JSON.stringify(diversity_score)
    sessionStorage.setItem("diver",diversity_score)

    sessionStorage.setItem('risky',risky)
    
    console.log(risky)
    console.log(diver)
    console.log(staby)
    
}

if(chk==9){
    GetScores();
}



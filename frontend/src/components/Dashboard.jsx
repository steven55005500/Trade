 
import React,{useEffect,useState} from "react";

export default function Dashboard({user}){

const [bottomTab,setBottomTab]=useState("AiEarn");

const [sec,setSec]=useState(15*3600+32*60+11);

useEffect(()=>{

const t=setInterval(()=>{

setSec(p=>p>0?p-1:0);

},1000);

return()=>clearInterval(t);

},[]);

const formatTime=(s)=>{

const h=Math.floor(s/3600);

const m=Math.floor((s%3600)/60);

const se=s%60;

return `${h}h ${m}m ${se}s`;

};

const earned=user?.totalEarned?.toFixed?.(4)||"0.5245";

const tp=user?.tradePower||"0.5";

const daily=user?.dailyEarn?.toFixed?.(3)||"0.028";


const card={

background:"#fff",

borderRadius:"15px",

padding:"18px",

boxShadow:"0 4px 10px rgba(0,0,0,.05)"

};


return(

<div style={{

background:"#f4f5fa",

minHeight:"100vh",

paddingBottom:"90px",

fontFamily:"Arial"

}}>

{/* HEADER */}

<div style={{

display:"flex",

justifyContent:"space-between",

background:"#fff",

padding:"12px 15px",

borderBottom:"1px solid #eee"

}}>

<div>

You Earned :

<span style={{color:"#10b981",fontWeight:"bold"}}>

 ₮ {earned}

</span>

</div>

<button style={{

background:"#f59e0b",

border:"none",

color:"#fff",

padding:"6px 15px",

borderRadius:"20px",

fontWeight:"bold",

cursor:"pointer"

}}>

Withdraw →

</button>

</div>


{/* PROMO */}

<div style={{

background:"#2f3e2e",

color:"#fff",

padding:"10px 15px",

display:"flex",

justifyContent:"space-between"

}}>

<div>

<span style={{color:"#f472b6"}}>

WEEKEND EARN FAST

</span>

<br/>

Earn

<span style={{color:"#4ade80"}}>

 ↑30%

</span>

in 48h

</div>

<button style={{

background:"#3b82f6",

border:"none",

color:"#fff",

borderRadius:"15px",

padding:"6px 12px"

}}>

LET'S GO

</button>

</div>


<div style={{padding:"15px"}}>

{/* TP CARD */}

<div style={{...card,textAlign:"center"}}>

<h3 style={{color:"#475569"}}>

TP (Trade Power)

</h3>

<h1 style={{

fontSize:"40px",

margin:"10px 0"

}}>

🧊 {tp}

</h1>

<div>

Daily Earn :

<b>${daily}</b>

<span style={{

color:"#84cc16",

fontWeight:"bold"

}}>

(+5.5%)

</span>

</div>

<div style={{

marginTop:"10px",

background:"#ede9fe",

display:"inline-block",

padding:"6px 15px",

borderRadius:"20px",

color:"#6d28d9",

fontWeight:"bold"

}}>

🕒 Settlement :

{formatTime(sec)}

</div>


{/* BUTTONS */}

<div style={{

display:"flex",

gap:"10px",

marginTop:"15px"

}}>

<button style={{

flex:1,

background:"#84cc16",

color:"#fff",

border:"none",

padding:"12px",

borderRadius:"10px",

fontWeight:"bold"

}}>

Buy TP

</button>

<button style={{

flex:1,

background:"#fce7f3",

color:"#db2777",

border:"none",

padding:"12px",

borderRadius:"10px",

fontWeight:"bold"

}}>

Refer & Earn

</button>

</div>

</div>


{/* ROI */}

<div style={{...card,marginTop:"15px"}}>

<h3 style={{

textAlign:"center",

color:"#6d28d9"

}}>

Return on Investment

</h3>

<table style={{

width:"100%",

fontSize:"14px"

}}>

<tbody>

<tr>

<td>≥$0</td>

<td align="right" style={{color:"#84cc16"}}>

5.5%

</td>

</tr>

<tr>

<td>≥$20</td>

<td align="right" style={{color:"#84cc16"}}>

6%

</td>

</tr>

<tr>

<td>

≥$300 🔥🔥🔥

</td>

<td align="right" style={{color:"#84cc16"}}>

6.5%

</td>

</tr>

</tbody>

</table>

</div>

</div>


{/* FOOTER */}

<div style={{

position:"fixed",

bottom:0,

left:0,

right:0,

background:"#fff",

display:"flex",

justifyContent:"space-around",

padding:"10px",

boxShadow:"0 -2px 10px rgba(0,0,0,.08)"

}}>

{["AiEarn","Friends","Introduction"].map(tab=>(

<div

key={tab}

onClick={()=>setBottomTab(tab)}

style={{

cursor:"pointer",

color:bottomTab===tab?

"#ef4444":"#64748b"

}}

>

{tab}

</div>

))}

</div>

</div>

);

}
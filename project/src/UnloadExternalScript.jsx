export const UnloadExternalScript = (scriptToremove) => {
console.log(scriptToremove[0])
    for(let j=0;j<scriptToremove.length;j++){
    let allsuspects=document.getElementsByTagName("script");
    // console.log(allsuspects.length)
    for (let i=allsuspects.length; i>=0; i--){
if (allsuspects[i] && allsuspects[i].getAttribute("src")!==null 
  && allsuspects[i].getAttribute("src").indexOf(`${scriptToremove[j]}`)                !== -1 ){
           allsuspects[i].parentNode.removeChild(allsuspects[i])
        }    
    }

    }
}
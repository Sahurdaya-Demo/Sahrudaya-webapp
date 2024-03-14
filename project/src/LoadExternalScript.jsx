const LoadExternalScript = (scriptURLS) => {
    const loadScript = (index) => {
      if (index < scriptURLS.length) {
    const externalScript = document.createElement("script");
    // externalScript.onerror = loadError;
    externalScript.id = "external";
    externalScript.async = true;
    externalScript.type = "text/javascript";
    externalScript.setAttribute("crossorigin", "anonymous");
    externalScript.src = scriptURLS[index];
    
    // Use onload to load the next script in the array
    externalScript.onload = () => {
      
      loadScript(index + 1);
    };
    
    // Use onerror to handle loading errors if needed
    // externalScript.onerror = loadError;

    document.body.appendChild(externalScript);
  }
}
loadScript(0);
}
export default LoadExternalScript;
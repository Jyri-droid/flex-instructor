// Get flex-related CSS rules
getStyle = (cssSelector) => {
    const element = document.querySelector(cssSelector);
    let styles = "";
    const elementCss = window.getComputedStyle(element);
    const display = elementCss.getPropertyValue("display");
    const flex = elementCss.getPropertyValue("flex");
    const flexBasis = elementCss.getPropertyValue("flex-basis");
    const flexWrap = elementCss.getPropertyValue("flex-wrap");
    if (cssSelector.match(/container/i)) {
        styles = "display: " + display + ";";
    }
    if (flex.match(/1 1 0%/i)) {
        styles += " flex: 1; ";
    }
    if (!flexWrap.match(/nowrap/i)) {
        styles += " flex-wrap: " + flexWrap +  ";";   
    }
    if (!flexBasis.match(/\b0%/i) && !flexBasis.match(/auto/i)) {
        styles += " flex-basis: " + flexBasis + ";";
    }
    styles = styles.replace("16px", "1rem");
    return styles;
}

// Re-render CSS styles when breakpoint changes
let currentBreakpoint;
let breakpoint;
window.addEventListener("resize", function() {
    if (window.innerWidth <= 600) {
        breakpoint = 1;
    }
    if (window.innerWidth > 600 && window.innerWidth <= 800) {
        breakpoint = 2;
    } if(window.innerWidth > 800) { 
        breakpoint = 3; 
    }
    if (breakpoint !== currentBreakpoint) {
        renderStyles();
        changeBreakpoint(breakpoint);
        blinkBreakpoint();
    }
    currentBreakpoint = breakpoint;
});

// Write CSS styles text in elements
renderStyles = () => {
    const elements = [];
    elements.push(document.querySelector(".container1").children);
    elements.push(document.querySelector(".container2").children);
    const pElements = document.getElementsByTagName("p");
    for (let i = 0; i < elements.length; i++) {
        for (let j of elements[i]) {
            j.innerHTML = getStyle("." + j.className);
        }
    }
    pElements[0].innerHTML = getStyle(".container1");
    pElements[1].innerHTML = getStyle(".container2");
}
renderStyles();

// Assign breakpoint indicator
const screenSizeIndicator = document.getElementById("screenSize");
changeBreakpoint = (breakpoint) => {
    switch(breakpoint) {
        case 1:
            screenSizeIndicator.innerHTML = "Breakpoint: mobile"
            break;
        case 2:
            screenSizeIndicator.innerHTML = "Breakpoint: tablet"
            break;
        case 3:
            screenSizeIndicator.innerHTML = "Breakpoint: desktop"
    }
}

// Make breakpoint indicator blink
blinkBreakpoint = () => {
    screenSizeIndicator.style.color = "white";
    setTimeout(function() {
            screenSizeIndicator.style.color = "dimgray";
        }, 200);
}
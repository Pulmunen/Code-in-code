// DOM elements
const transitionTarget = document.querySelector('.base-selector')
const styleRules = document.querySelector('.style-rules')
const transitionRules = document.querySelector('.animation-rules')

/*
 Check if the stylesheet is internal or hosted on the current domain.
 If it isn't, attempting to access sheet.cssRules will throw a cross origin error.
 
 NOTE: One problem this could raise is hosting stylesheets on a CDN with a
 different domain. Those would be cross origin, so you can't access them.
*/
const isSameDomain = (styleSheet) => {
    // Internal style blocks won't have an href value
    if (!styleSheet.href) {
      return true;
    }
  
    return styleSheet.href.indexOf(window.location.origin) === 0;
  };
  
  /*
   Determine if the given rule is a CSSStyleRule
   See: https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
  */
  const isStyleRule = (rule) => rule.type === 1;
  
//   /**
//    * Get all custom properties on a page
//    * @return array<array[string, string]>
//    * ex; [["--color-accent", "#b9f500"], ["--color-text", "#252525"], ...]
//    */
  const getCSSAnimPropIndex = () =>
    // styleSheets is array-like, so we convert it to an array.
    // Filter out any stylesheets not on this domain
    [...document.styleSheets].filter(isSameDomain).reduce(
      (finalArr, sheet) =>
        finalArr.concat(
          // cssRules is array-like, so we convert it to an array
          [...sheet.cssRules].filter(isStyleRule).reduce((propValArr, rule) => {
            const props = [...rule.style]
              .map((propName) => [
                propName.trim(),
                rule.style.getPropertyValue(propName).trim()
              ])
              // Filter for transition properties
              .filter(([propName]) => propName.startsWith("trans"));
  
            return [...propValArr, ...props];
          }, [])
        ),
      []
    );
  
    const cssAnimPropIndex = getCSSAnimPropIndex();
  
  // Add the transition rules to the DOM
  transitionRules.innerHTML = cssAnimPropIndex.map(
    ([prop, val]) => `<span>${prop}: ${val};<br></span>`
  ).join('');
  
const compStyles = getComputedStyle(transitionTarget)   

transitionTarget.addEventListener("transitionend",  transitionAnim);
function transitionAnim(){
    let stylesArr=[]

    stylesArr.push(`color: ${compStyles.getPropertyValue('color')}`);
    stylesArr.push(`font-size: ${compStyles.getPropertyValue('font-size')}`)
    stylesArr.push(`letter-spacing: ${compStyles.getPropertyValue('letter-spacing')}`)
    
    styleRules.innerHTML = stylesArr.join(`; </br>`) 
    styleRules.classList.toggle('changer')
}
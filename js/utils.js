export async function renderWithTemplate(
    templateFn, parentElement, data,
    position = 'afterbegin', callback = false, clear = true) {
      if(clear) {
        parentElement.innerHTML = "";
      }
      const htmlString = await templateFn(data);
      parentElement.insertAdjacentHTML(position, htmlString);
      if(callback) {
        callback(data);
      }   
  }


function loadTemplate(path){
    return async function (){
      const response = await fetch(path);
      if(response.ok){
        const html = response.text();
        return html;
      }
     }
    }

export function loadHeaderFooter() {
    const headerHTML = loadTemplate("/partials/header.html");
    const footerHTML = loadTemplate("/partials/footer.html");
    let header = document.getElementById("main-header");
    let footer = document.getElementById("main-footer");
    renderWithTemplate(headerHTML, header);
    renderWithTemplate(footerHTML, footer);
  }



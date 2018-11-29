export function setTimeoutAsync(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

/**
 * @param {String} url - address for the HTML to fetch
 * @return {String} the resulting HTML string fragment
 */
export async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

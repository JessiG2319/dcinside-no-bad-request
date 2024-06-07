'use strict';

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let now = Date.now();

  browser.cookies.getAll({ domain: "dcinside.com" }).then((cookies) => {
    let promises = [];
    cookies.forEach((cookie) => {
      if (!cookie.session && cookie.expirationDate * 1000 < now) {
        promises.push(browser.cookies.remove({ name: cookie.name, url: ((cookie.secure) ? 'https://' : 'http://') + cookie.domain + cookie.path }));
      }
    });
    return Promise.allSettled(promises);
  }).then((values) => {
    sendResponse(values);
  });

  return true;
});
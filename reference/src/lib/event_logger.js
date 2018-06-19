
export default function log_event(event_name, callback) {
  var publisher = '';
  if(window.__sharethis__) {
    publisher = window.__sharethis__.property;
  }

  var log_url = (("https:" == document.location.protocol) ? "https://" : "http://") + "l.sharethis.com/log";

  log_url += "?event=" + event_name;
  log_url += "&product=gdpr-compliance-tool";
  log_url += "&publisher=" + publisher;
  log_url += "&source=cmp.js";
  log_url += "&ts=" + new Date();
  log_url += "&url=" + document.location.href;
  log_url += "&title=" + document.title;

  var img = new Image(1, 1);
  img.src = log_url;
  img.onload = function() {
    return typeof callback === "function" ? callback(true) : void 0;
  };

  img.onerror = function() {
    return typeof callback === "function" ? callback(false) : void 0;
  };

}


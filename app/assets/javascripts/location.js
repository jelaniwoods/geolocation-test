var options = {
  enableHighAccuracy: true
};

function getLocation(callback, error) {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(callback, error, options);
  } else {
    flash({
      type: "danger",
      message: "Geolocation not supported by your browser!"
    });
  }
}

function flash({ type = "success", message = "Success" }) {
  $(`<div class="alert alert-${type} alert-dismissable rounded-0 mb-0 px-0" role="alert">
      <div class="container">
        <div class="row">
          <div class="col d-flex align-items-center justify-content-between">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>`).insertAfter("header:first-child");
}

function toggleSubmitButtonWithId(id) {
  var button = document.getElementById(id);

  if (button.hasAttribute("disabled")) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", true);
  }
}

function API({ method, url, payload }) {
  var baseUrl = "";

  return $.ajax({
    contentType: "application/json",
    method,
    url: baseUrl + url,
    data: JSON.stringify(payload)
  });
}

function clockEvent({ method, url, payload }) {
  return API({ method, url, payload })
    .done(function (response) {
      flash({ message: (response && response.notice) || "Success" });

      window.location.reload();
    })
    .fail(function (error) {
      flash({
        type: "warning",
        message:
          (error && error.responseJSON && error.responseJSON.alert) ||
          error.statusText
      });

      window.location.reload();
    });
}

// Express
function expressClock({ method, url, payload }) {
  return API({ method, url, payload })
    .done(function (response) {
      flash({
        message: (response && response.notice) || "Success"
      });

      response &&
        response.redirect_to &&
        window.location.assign(response.redirect_to);
    })
    .fail(function (error) {
      flash({
        type: "warning",
        message:
          (error && error.responseJSON && error.responseJSON.alert) ||
          error.statusText
      });

      error &&
        error.responseJSON &&
        error.responseJSON.redirect_to &&
        window.location.assign(error.responseJSON.redirect_to);
    });
}

function handleExpress(event) {
  event.preventDefault();
  toggleSubmitButtonWithId(event.target.id);

  getLocation(
    function (position) {
      var { latitude, longitude } = position.coords;

      expressClock({
        method: "POST",
        url: "/pages/location",
        payload: {
          location: {
            latitude,
            longitude
          }
        }
      });
    },
    function (error) {
      flash({
        type: "warning",
        message: `Processing without location (${error.message}).`
      });

      expressClock({
        method: "POST",
        url: "/pages/location",
        payload: {
          location: {
            latitude: null,
            longitude: null
          }
        }
      });
    }
  );
}

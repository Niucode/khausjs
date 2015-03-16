// Generated by CoffeeScript 1.7.1
(function($) {
  $.fn.khausImageUploader = function() {
    return $.each(this, function(key, div) {
      var images, input, inputName;
      images = $(div).find('img.khaus-uploaded-thumb');
      images.on('click', function() {
        var filename;
        filename = $(this).attr('src').split('/').pop();
        $('<input>', {
          type: 'hidden',
          name: 'khaus_delete_thumb[]',
          value: filename
        }).appendTo(div);
        return $(this).remove();
      });
      input = $(div).find(':input[type=file]');
      inputName = input.attr('name');
      input.removeAttr('name');
      return input.on('change', function(ev) {
        if ($(this).val()) {
          $.each(ev.target.files, function(key, value) {
            var reader;
            if (value.type.match('image.*')) {
              reader = new FileReader();
              reader.onload = (function(file) {
                return function(e) {
                  var id;
                  id = btoa($.now());
                  id = id.replace(/[^a-z]+/ig, '');
                  $('<input>', {
                    'class': id,
                    'type': 'hidden',
                    'name': inputName + '[]',
                    'value': e.target.result
                  }).prependTo(div);
                  return $('<img>', {
                    'class': 'khaus-upload-thumb',
                    'src': e.target.result
                  }).on('click', function() {
                    $('input.' + id + '').remove();
                    return $(this).remove();
                  }).prependTo(div);
                };
              })(value);
            }
            return reader.readAsDataURL(value);
          });
          return $(this).val('');
        }
      });
    });
  };
  $.khausCleanFormErrors = function(form) {
    $(form).find(".form-group").removeClass("has-error has-feedback");
    $(form).find("span.form-control-feedback").remove();
    $(form).find("span.help-block").remove();
    return $(form).find(":input").tooltip("destroy");
  };
  $.khausDisplayFormErrors = function(type, form, errors) {
    var counter, err;
    err = errors || window.khaus.errors;
    counter = 0;
    return $.each(err, function(key, value) {
      var badge, inTab, input, page, pageName, tab;
      counter++;
      input = $(form).find(":input[name=" + key + "]");
      if (input.size() !== 1) {
        input = $(form).find(":input[name^='" + key + "[']");
      }
      input.parents('.form-group').addClass("has-error");
      inTab = input.parents('.tab-content');
      if (inTab.size() > 0) {
        if (counter === 1) {
          $('ul.nav-tabs .badge').remove();
        }
        page = input.parents('.tab-pane');
        pageName = page.attr('id');
        tab = $("ul.nav-tabs a[href=#" + pageName + "]");
        badge = tab.find('.badge');
        if (badge.length === 0) {
          badge = $('<span>', {
            'class': 'badge'
          }).text(0);
          badge.appendTo(tab);
        }
        badge.text(parseInt(badge.text()) + 1);
      }
      switch (type) {
        case 'block':
          return $("<span>", {
            "class": "help-block"
          }).html(value).insertAfter(input);
        case 'tooltip':
          return input.tooltip({
            placement: "top",
            title: value,
            container: "body"
          });
      }
    });
  };
  $.khausNotify = function(title, message, settings) {
    var container, icon, icon_cont, message_cont, message_title, notify, o;
    o = $.extend({
      delay: 10000,
      template: "default",
      icon: null
    }, settings);
    container = $(".khaus-notify-container");
    if (container.size() === 0) {
      container = $("<div>", {
        "class": "khaus-notify-container"
      }).prependTo("body");
    }
    notify = $("<div>", {
      "class": "khaus-notify khaus-notify-" + o.template
    });
    if (o.icon !== null) {
      icon = $("<i>", {
        "class": "fa fa-fw " + o.icon
      });
      icon_cont = $("<div>", {
        "class": "icon-container"
      }).html(icon);
      notify.append(icon_cont);
    }
    message_cont = $("<div>", {
      "class": "text-container"
    });
    message_title = $("<div>", {
      "class": "title"
    }).html(title).appendTo(message_cont);
    message = $("<div>").html(message).appendTo(message_cont);
    notify.append(message_cont);
    notify.appendTo(container);
    notify.on("click", function() {
      $(this).removeClass("khaus-notify-show");
      $(this).addClass("khaus-notify-hide");
      return $(this).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
        return $(this).remove();
      });
    });
    return setTimeout(function() {
      notify.addClass("khaus-notify-show");
      return setTimeout(function() {
        return notify.trigger("click");
      }, o.delay);
    }, 1);
  };
  $.khausLaunchFormErrors = function() {
    var form;
    if (!!window.khaus.errors && !!window.khaus.form) {
      form = $("form[name=" + window.khaus.form + "]");
      return $.khausDisplayFormErrors('block', form);
    }
  };
  $.khausLaunchAlerts = function(settings) {
    var o;
    o = $.extend({
      title: {
        "default": "",
        primary: "",
        success: "El proceso ha finalizado",
        danger: "Ha ocurrido un error",
        warning: "Importante",
        info: "Informaci&oacute;n"
      }
    }, settings);
    if (!!window.khaus.warning) {
      $.khausNotify(o.title.warning, window.khaus.warning, {
        template: 'warning'
      });
    }
    if (!!window.khaus.danger) {
      $.khausNotify(o.title.danger, window.khaus.danger, {
        template: 'danger'
      });
    }
    if (!!window.khaus.success) {
      $.khausNotify(o.title.success, window.khaus.success, {
        template: 'success'
      });
    }
    if (!!window.khaus.info) {
      return $.khausNotify(o.title.info, window.khaus.info, {
        template: 'info'
      });
    }
  };
  $.khausAjaxWait = function(settings) {
    var o;
    o = $.extend({
      type: 'cursor'
    }, settings);
    switch (o.type) {
      case 'cursor':
        return $.ajaxSetup({
          beforeSend: function() {
            return $('body').addClass('khaus-ajax-wait');
          },
          complete: function() {
            return $('body').removeClass('khaus-ajax-wait');
          },
          success: function() {
            return $('body').removeClass('khaus-ajax-wait');
          }
        });
    }
  };
  $.fn.khausAttachName = function() {
    return $.each(this, function() {
      return $(this).on('submit', function(ev) {
        if ($(this).is('[name]') && $(this).find('input[name=_name]').size() === 0) {
          return $('<input>', {
            'name': '_name',
            'type': 'hidden',
            'value': $(this).attr('name')
          }).prependTo($(this));
        }
      });
    });
  };
  $.fn.khausConfirmBeforeSubmit = function(settings) {
    var o;
    o = $.extend({
      title: "",
      message: ""
    }, settings);
    return $.each(this, function() {
      return $(this).on('submit', function(ev) {
        var e;
        ev.preventDefault();
        e = $(this);
        return $.khausConfirm(o.title, o.message, function() {
          e.off('submit');
          return e.submit();
        });
      });
    });
  };
  $.khausAlert = function(title, message) {
    var modal_D1, modal_D2, modal_D3, modal_body, modal_footer, modal_header;
    if ($(".khaus-modal-alert").size() > 0) {
      $(".khaus-modal-alert").remove();
    }
    modal_D1 = $("<div>", {
      "class": "modal fade khaus-modal-alert"
    });
    modal_D2 = $("<div>", {
      "class": "modal-dialog"
    }).appendTo(modal_D1);
    modal_D3 = $("<div>", {
      "class": "modal-content"
    }).appendTo(modal_D2);
    modal_header = $("<div>", {
      "class": "modal-header"
    }).appendTo(modal_D3);
    $("<h4>", {
      "class": "modal-title"
    }).html(title).appendTo(modal_header);
    modal_body = $("<div>", {
      "class": "modal-body"
    }).html(message).appendTo(modal_D3);
    modal_footer = $("<div>", {
      "class": "modal-footer"
    }).appendTo(modal_D3);
    $("<button>", {
      "type": "button",
      "class": "btn btn-primary",
      "data-dismiss": "modal"
    }).html("Aceptar").appendTo(modal_footer);
    return modal_D1.modal("show");
  };
  $.khausPrompt = function(title, message, defaultValue, callback) {
    var input_prompt, modal_D1, modal_D2, modal_D3, modal_body, modal_footer, modal_header;
    if (defaultValue == null) {
      defaultValue = "";
    }
    if (callback == null) {
      callback = function() {};
    }
    if ($(".khaus-modal-prompt").size() > 0) {
      $(".khaus-modal-prompt").remove();
    }
    modal_D1 = $("<div>", {
      "class": "modal fade khaus-modal-prompt"
    });
    modal_D2 = $("<div>", {
      "class": "modal-dialog"
    }).appendTo(modal_D1);
    modal_D3 = $("<div>", {
      "class": "modal-content"
    }).appendTo(modal_D2);
    modal_header = $("<div>", {
      "class": "modal-header"
    }).appendTo(modal_D3);
    $("<h4>", {
      "class": "modal-title"
    }).html(title).appendTo(modal_header);
    modal_body = $("<div>", {
      "class": "modal-body"
    }).appendTo(modal_D3);
    $("<h5>").css({
      "font-weight": "bold"
    }).html(message).appendTo(modal_body);
    input_prompt = $("<input>", {
      "type": "text",
      "class": "form-control"
    }).val(defaultValue).appendTo(modal_body);
    modal_footer = $("<div>", {
      "class": "modal-footer"
    }).appendTo(modal_D3);
    $("<button>", {
      "type": "button",
      "class": "btn btn-default",
      "data-dismiss": "modal"
    }).html("Cancelar").appendTo(modal_footer);
    $("<button>", {
      "type": "button",
      "class": "btn btn-primary",
      "data-dismiss": "modal"
    }).html("Aceptar").on("click", function() {
      callback(input_prompt.val());
    }).appendTo(modal_footer);
    modal_D1.modal("show");
    return setTimeout(function() {
      return input_prompt.select();
    }, 200);
  };
  $.khausConfirm = function(title, message, callback) {
    var modal_D1, modal_D2, modal_D3, modal_body, modal_footer, modal_header;
    if (callback == null) {
      callback = function() {};
    }
    if ($(".khaus-modal-confirm").size() > 0) {
      $(".khaus-modal-confirm").remove();
    }
    modal_D1 = $("<div>", {
      "class": "modal fade khaus-modal-confirm"
    });
    modal_D2 = $("<div>", {
      "class": "modal-dialog"
    }).appendTo(modal_D1);
    modal_D3 = $("<div>", {
      "class": "modal-content"
    }).appendTo(modal_D2);
    modal_header = $("<div>", {
      "class": "modal-header"
    }).appendTo(modal_D3);
    $("<h4>", {
      "class": "modal-title"
    }).html(title).appendTo(modal_header);
    modal_body = $("<div>", {
      "class": "modal-body"
    }).html(message).appendTo(modal_D3);
    modal_footer = $("<div>", {
      "class": "modal-footer"
    }).appendTo(modal_D3);
    $("<button>", {
      "type": "button",
      "class": "btn btn-default",
      "data-dismiss": "modal"
    }).html("Cancelar").appendTo(modal_footer);
    $("<button>", {
      "type": "button",
      "class": "btn btn-primary",
      "data-dismiss": "modal"
    }).html("Aceptar").on("click", function() {
      callback();
    }).appendTo(modal_footer);
    return modal_D1.modal("show");
  };
  $.fn.khausForm = function(settings) {
    var o;
    o = $.extend({
      errors: 'block',
      reload: true
    }, settings);
    return $.each(this, function() {
      var form;
      form = $(this);
      return form.on('submit', function(ev) {
        return form.ajaxForm({
          delegation: true,
          success: function(response, status, xhr, $form) {
            if (o.reload) {
              return window.location.reload();
            }
          },
          error: function(response, status, xhr, $form) {
            var errors;
            console.debug(response);
            $.khausCleanFormErrors($form);
            if (typeof response.responseJSON !== 'undefined') {
              errors = response.responseJSON;
            } else {
              errors = $.parseJSON(response.responseText);
            }
            $.each(errors, function(key, value) {
              if (key.match(/^khaus/)) {
                key = key.replace('khaus', '').toLowerCase();
                if (typeof window.khaus[key] !== 'undefined') {
                  return window.khaus[key] = value;
                }
              }
            });
            $.khausLaunchAlerts();
            return $.khausDisplayFormErrors(o.errors, $form, errors);
          }
        });
      });
    });
  };
  $.fn.khausNumberFormat = function() {
    var replace;
    replace = function(number) {
      number = number.replace(/[^0-9]+/g, '');
      return number = number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    return this.each(function() {
      var number;
      if ($(this).is(':input')) {
        number = replace($(this).val());
        return $(this).val(number);
      } else {
        number = replace($(this).html());
        return $(this).html(number);
      }
    });
  };
  return $.fn.khausLoadSelect = function(settings) {
    var o;
    o = $.extend({
      url: $(this).data('khaus-url'),
      select: $(this).data('khaus-select')
    }, settings);
    return this.each(function() {
      return $(this).on('change', function() {
        var select;
        select = $(o.select);
        select.attr('disabled', true);
        select.text('');
        return $.get(o.url, {
          value: $(this).val()
        }, function(r) {
          $.each(r, function() {
            return $('<option>', {
              value: this.id
            }).text(this.nombre).appendTo(select);
          });
          return select.removeAttr('disabled');
        });
      });
    });
  };
})(jQuery);

$(document).ready(function() {
  $('form').khausAttachName();
  $.khausLaunchFormErrors();
  $.khausLaunchAlerts();
  return $('form.khaus-form').khausForm();
});

(function () {
	'use strict';
	var USING_TEMPLATES = true;
	var USING_TEMPLATE_VALIDATION = true;
	/* Custom validation message defaults here */
	var VALIDATION_MESSAGES = [{name: 'required', message: 'This field is required'}, {
		name: 'maxlength',
		message: 'This field is too long.'
	}, {name: 'minlength', message: 'This field is too short.'}];
	/* Module Templates + Data */
	var MODULE_NAME = "formlyLumx";
	var PREFIX = "lx";
	var FIELDS = [{
		"name": "checkbox",
		"template": "<div class=\"checkbox\"><input ng-model=\"model[options.key]\" type=\"checkbox\" ng-checked=\"::to.checked\" class=\"checkbox__input\"><label for=\"{{::id}}\" class=\"checkbox__label\">{{to.label}}</label><span ng-if=\"::to.description\" class=\"checkbox__help\">{{::to.description}}</span></div>"
	}, {
		"name": "date-picker",
		"template": "<lx-date-picker model=\"model[options.key]\" label=\"{{to.label}} {{::to.required ? \'*\' : \'\'}}\"></lx-date-picker>"
	}, {
		"name": "dropdown",
		"template": "<lx-dropdown><button class=\"btn\" ng-class=\"::to.className || \'btn--m btn--black btn--flat\'\" lx-ripple lx-dropdown-toggle><i ng-if=\"::to.icon\" class=\"mdi mdi-dots-vertical\"></i> {{to.label}}</button><lx-dropdown-menu><ul><li ng-repeat=\"o in ::to.options\"><a class=\"dropdown-link\" ng-click=\"o.action()\">{{::o.text}}</a></li></ul></lx-dropdown-menu></lx-dropdown>"
	}, {
		"name": "flex",
		"template": "<formly-form class=\"aftl-flex-fields\" model=\"$parent.model\" fields=\"to.fields\" flex-container=\"{{::to.flex.container}}\" flex-align=\"{{::to.flex.align}}\" flex-gutter=\"{{::to.flex.gutter}}\"></formly-form>"
	}, {
		"name": "input",
		"template": "<lx-text-field model=\"::model[options.key]\" icon=\"{{::to.icon}}\" fixed-label=\"::to.fixedLabel\" theme=\"{{::to.theme}}\" disabled=\"to.disabled\" label=\"{{to.label}} {{::to.required ? \'*\' : \'\'}}\" valid=\"fc.$valid && fc.$touched\" error=\"fc.$invalid && fc.$touched\"><input ng-model=\"model[options.key]\" type=\"{{::to.type}}\" ng-class=\"::to.className\"></lx-text-field>"
	}, {
		"name": "radio",
		"template": "<div class=\"radio-group\"><h3><label>{{to.label}}</label></h3><div class=\"radio-button\" ng-repeat=\"o in to.options\"><input ng-model=\"$parent.model[$parent.options.key]\" id=\"{{::id + \'_\' + $index}}\" type=\"radio\" ng-disabled=\"::o.disabled\" class=\"radio-button__input\" ng-value=\"::o.value\" aria-labelledby=\"{{::id + \'_\' + $index + \'_radioButton\'}}\"><label for=\"{{::id + \'_\' + $index}}\" class=\"radio-button__label\">{{::o.name}}</label><span ng-if=\"::o.description\" class=\"radio-button__help\">{{::o.description}}</span></div></div>"
	}, {
		"name": "select",
		"template": "<div class=\"aftl-select\"><h3 ng-if=\"::to.label\"><label>{{to.label}} {{::to.required ? \'*\' : \'\'}}</label></h3><lx-select ng-model=\"model[options.key]\" choices=\"to.options\" placeholder=\"{{::to.placeholder}}\" min-length=\"::to.minLength\" allow-clear=\"::to.allowClear\" ng-attr-multiple=\"{{::to.multiple}}\"><lx-select-selected>{{$selected[to.selected]}} {{::to.selected2 ? \' - \' + $selected[to.selected2] : \'\'}}</lx-select-selected><lx-select-choices>{{$choice[to.choice]}} {{::to.choice2 ? \' - \' + $choice[to.choice2] : \'\'}}</lx-select-choices></lx-select></div>"
	}, {
		"name": "switch",
		"template": "<div class=\"switch\"><input ng-model=\"model[options.key]\" type=\"checkbox\" ng-checked=\"::to.checked\" class=\"switch__input\"><label for=\"{{::id}}\" class=\"switch__label\">{{to.label}}</label><span ng-if=\"::to.description\" class=\"switch__help\">{{::to.description}}</span></div>"
	}, {
		"name": "textarea",
		"template": "<lx-text-field model=\"::model[options.key]\" fixed-label=\"::to.fixedLabel\" icon=\"{{::to.icon}}\" theme=\"{{::to.theme}}\" label=\"{{to.label}} {{::to.required ? \'*\' : \'\'}}\" valid=\"fc.$valid && fc.$touched\" error=\"fc.$invalid && fc.$touched\"><textarea ng-model=\"model[options.key]\" rows=\"{{::to.rows}}\" cols=\"{{::to.cols}}\">\n    </textarea></lx-text-field>"
	}, {
		"name": "title",
		"template": "<div class=\"aftl-title\"><span ng-class=\"::to.className || \'fs-title\'\" aria-describedby=\"{{::id}}\">{{to.title}}</span></div>"
	}];
	var WRAPPERS = [{
		"name": "wrapper-div",
		"template": "<div ng-class=\"::to.div.className\" ng-style=\"::to.div.style\"><formly-transclude></formly-transclude></div>"
	}, {
		"name": "wrapper-errors",
		"template": "<div><formly-transclude></formly-transclude><ul class=\"form-error\" ng-messages=\"fc.$error\" ng-show=\"options.validation.errorExistsAndShouldBeVisible\"><li ng-repeat=\"(name, message) in ::options.validation.messages\" ng-message=\"{{::name}}\">{{message(fc.$viewValue, fc.$modelValue, this)}}</li></ul><span class=\"form-pending\" ng-if=\"to.pending && fc.$pending && fc.$touched\">{{::to.pending || \'Checking...\'}}</span></div>"
	}, {
		"name": "wrapper-flex-item",
		"template": "<div ng-class=\"\'{{::to.flex.className}}\'\" flex-item=\"{{::to.flex.item}}\" flex-order=\"{{::to.flex.order}}\"><formly-transclude></formly-transclude></div>"
	}];

	function _prefixer(name) {
		return PREFIX + '-' + name;
	}

	function _wrapperTemplateUrl(name) {
		return 'wrappers/formly-wrappers-' + _prefixer(name) + '.html';
	}

	function _fieldTemplateUrl(name) {
		return 'fields/formly-fields-' + _prefixer(name) + '.html';
	}

	/*@ngInject*/
	function setWrappers(formlyConfigProvider) {
		if (USING_TEMPLATES) {
			WRAPPERS.map(function (wrapper) {
				formlyConfigProvider.setWrapper({
					name: _prefixer(wrapper.name),
					templateUrl: _wrapperTemplateUrl(wrapper.name)
				});
				return _prefixer(wrapper.name);
			});
		}
	}

	function addFieldValidationOptions(apiCheck) {  /* validation using apiCheck.js */
		var APICHECK_VALIDATION_FIELDS = [{
			"name": "checkbox",
			"validateOptions": {
				"label": apiCheck.string,
				"description": apiCheck.string,
				"checked": apiCheck.boolean,
				"required": apiCheck.boolean
			}
		}, {
			"name": "date-picker",
			"validateOptions": {"label": apiCheck.string, "required": apiCheck.boolean}
		}, {
			"name": "input",
			"validateOptions": {
				"label": apiCheck.string,
				"icon": apiCheck.string,
				"fixedLabel": apiCheck.boolean,
				"disabled": apiCheck.boolean,
				"className": apiCheck.string,
				"theme": apiCheck.oneOf(['light', 'dark']),
				"type": apiCheck.oneOf(['text', 'number', 'email', 'password', 'url', 'tel']),
				"required": apiCheck.boolean
			}
		}, {
			"name": "radio",
			"validateOptions": {
				"label": apiCheck.string,
				"description": apiCheck.string,
				"options": apiCheck.arrayOf({
					"name": apiCheck.string,
					"value": apiCheck.oneOfType([apiCheck.string, apiCheck.number]),
					"disabled": apiCheck.boolean
				}),
				"required": apiCheck.boolean
			}
		}, {
			"name": "select",
			"validateOptions": {
				"label": apiCheck.string,
				"placeholder": apiCheck.string,
				"min-length": apiCheck.number,
				"allow-clear": apiCheck.boolean,
				"ng-attr-multiple": apiCheck.boolean,
				"selected": apiCheck.string,
				"selected2": apiCheck.string,
				"choice": apiCheck.string,
				"choice2": apiCheck.string,
				"choices": apiCheck.array,
				"required": apiCheck.boolean
			}
		}, {
			"name": "switch",
			"validateOptions": {
				"label": apiCheck.string,
				"description": apiCheck.string,
				"checked": apiCheck.boolean,
				"required": apiCheck.boolean
			}
		}, {
			"name": "textarea",
			"validateOptions": {
				"label": apiCheck.string,
				"icon": apiCheck.string,
				"theme": apiCheck.oneOf(['light', 'dark']),
				"required": apiCheck.boolean,
				"rows": apiCheck.number,
				"cols": apiCheck.number
			}
		}];
		APICHECK_VALIDATION_FIELDS.map(function (validationField) {
			FIELDS.map(function (field) {
				if (field.name === validationField.name) {
					field.validateOptions = validationField.validateOptions;
				}
			});
		});
	}

	/*@ngInject*/
	function setFields(formlyConfig, apiCheck) {
		if (USING_TEMPLATES) {
			if (USING_TEMPLATE_VALIDATION) {        /* validate options using apiCheck to reduce developer errors */
				addFieldValidationOptions(apiCheck);
				FIELDS.map(function (field) {
					formlyConfig.setType({
						name: _prefixer(field.name),
						templateUrl: _fieldTemplateUrl(field.name),
						validateOptions: function (options) {
							options.data.apiCheck = apiCheck.warn(apiCheck.shape({templateOptions: apiCheck.shape(field.templateOptions || {}).optional}), arguments);
						}
					});
				});
			} else {        /* skip validating options */
				apiCheck.disable();
				FIELDS.map(function (field) {
					formlyConfig.setType({name: _prefixer(field.name), templateUrl: _fieldTemplateUrl(field.name)});
				});
			}
		}
	}

	function setDefaults(formlyConfig, formlyValidationMessages) {
		formlyConfig.extras.ngModelAttrsManipulatorPreferBound = true;
		VALIDATION_MESSAGES.map(function (validation) {
			formlyValidationMessages.addStringMessage(validation.name, validation.message);
		});
		formlyValidationMessages.messages.pattern = function (viewValue, modelValue, scope) {
			return (viewValue || modelValue) + ' is invalid';
		};
	}

	function cacheTemplates($templateCache) {
		if (USING_TEMPLATES) {
			FIELDS.map(function (field) {
				$templateCache.put(_fieldTemplateUrl(field.name), field.template);
			});
			WRAPPERS.map(function (wrapper) {
				$templateCache.put(_wrapperTemplateUrl(wrapper.name), wrapper.template);
			});
		}
	}

	angular.module(MODULE_NAME, ['formly']).config(setWrappers).run(setFields).run(setDefaults).run(cacheTemplates);
}());
(function () {'use strict'; var USING_TEMPLATES = true; var MODULE_NAME = "formlyLumx"; var PREFIX = "lx";var FIELDS = [{ "name": "checkbox", "template": "<div class=\"checkbox\" ng-class=\"{\'mt+\': options.templateOptions.description}\"><input ng-model=\"model[options.key]\" type=\"checkbox\" class=\"checkbox__input\"><label for=\"{{::id}}\" class=\"checkbox__label\">{{::options.templateOptions.label}}</label></div>"}, {"name": 
"date-picker", "template": "<div><lx-date-picker model=\"model[options.key]\" label=\"{{::options.templateOptions.label}} {{::options.templateOptions.required ? \'*\' : \'\'}}\" ng-required=\"options.templateOptions.required\"></lx-date-picker></div>"}, {"name": 
"flex", "template": "<div flex-container=\"{{::options.templateOptions.flex.container}}\" flex-align=\"{{::options.templateOptions.flex.align}}\" flex-gutter=\"{{::options.templateOptions.flex.gutter}}\"><formly-form fields=\"options.templateOptions.fields\" model=\"$parent.model\" name=\"{{::id}}\"></formly-form></div>"}, {"name": 
"input", "template": "<div><lx-text-field model=\"::model[options.key]\" fixed-label=\"::options.templateOptions.fixedLabel\" theme=\"{{::options.templateOptions.theme}}\" label=\"{{::options.templateOptions.label}} {{::options.templateOptions.required ? \'*\' : \'\'}}\" disabled=\"::options.templateOptions.disabled\" valid=\"options.formControl.$valid && options.formControl.$touched\" error=\"options.formControl.$invalid && options.formControl.$touched || options.validators\"><input ng-model=\"model[options.key]\" type=\"{{::options.templateOptions.type}}\" ng-required=\"::options.templateOptions.required\" ng-disabled=\"::options.templateOptions.disabled\" ng-model-options=\"::options.modelOptions || {}\"></lx-text-field></div>"}, {"name": 
"radio", "template": "<div><br><div class=\"radio-group\"><h3><label>{{::options.templateOptions.label}}</label></h3><div class=\"radio-button\" ng-repeat=\"option in options.templateOptions.options\"><input ng-model=\"$parent.model[$parent.options.key]\" id=\"{{::id + \'_\' + $index}}\" type=\"radio\" ng-disabled=\"::option.disabled\" class=\"radio-button__input\" ng-value=\"::option.value\" aria-labelledby=\"{{::id + \'_\' + $index + \'_radioButton\'}}\"><label for=\"{{::id + \'_\' + $index}}\" class=\"radio-button__label\">{{::option.name}}</label><span ng-if=\"::option.description\" class=\"radio-button__help\">{{::option.description}}</span></div></div></div>"}, {"name": 
"select", "template": "<div><br><h3><label>{{::options.templateOptions.label || \'Select\'}} {{::options.templateOptions.required ? \'*\' : \'\'}}</label></h3><lx-select ng-model=\"model[options.key]\" choices=\"options.templateOptions.options\" placeholder=\"{{::options.templateOptions.placeholder}}\" min-length=\"::options.templateOptions.minLength\" allow-clear=\"::options.templateOptions.allowClear\" ng-attr-multiple=\"{{::options.templateOptions.multiple  || undefined }}\"><lx-select-selected>{{$selected[options.templateOptions.selected]}} {{::options.templateOptions.selected2 ? \' - \' + $selected[options.templateOptions.selected2] : \'\'}}</lx-select-selected><lx-select-choices>{{$choice[options.templateOptions.choice]}} {{::options.templateOptions.choice2 ? \' - \' + $choice[options.templateOptions.choice2] : \'\'}}</lx-select-choices></lx-select></div>"}, {"name": 
"switch", "template": "<div class=\"switch\" ng-class=\"{\'mt+\': options.templateOptions.description}\"><input ng-model=\"model[options.key]\" type=\"checkbox\" class=\"switch__input\" ng-disabled=\"options.templateOptions.disabled\"><label for=\"{{::id}}\" class=\"switch__label\">{{::options.templateOptions.label}}</label></div>"}, {"name": 
"textarea", "template": "<div><lx-text-field icon=\"{{::options.templateOptions.icon}}\" theme=\"{{::options.templateOptions.theme}}\" label=\"{{::options.templateOptions.label}} {{::options.templateOptions.required ? \'*\' : \'\'}}\" fixed-label=\"::options.templateOptions.fixedLabel\" model=\"::model[options.key]\" disabled=\"::options.templateOptions.disabled\" valid=\"options.formControl.$valid && options.formControl.$touched\" error=\"options.formControl.$invalid && options.formControl.$touched || options.validators\"><textarea ng-model=\"model[options.key]\" ng-required=\"::options.templateOptions.required\" ng-disabled=\"::options.templateOptions.disabled\" ng-model-options=\"::options.modelOptions || {}\">\n    </textarea></lx-text-field></div>"}, {"name": 
"title", "template": "<span ng-if=\"::options.templateOptions.space || true\"><br></span><div><span ng-class=\"::options.templateOptions.className || \'fs-title\'\" ng-style=\"::options.templateOptions.style\" aria-describedby=\"{{::id}}\">{{::options.templateOptions.title}}</span><formly-transclude></formly-transclude></div>"}]; var WRAPPERS = [{ "name": "wrapper-div", "template": "<div ng-class=\"::options.templateOptions.div.className\" ng-style=\"::options.templateOptions.div.style\"><formly-transclude></formly-transclude></div>"}, {"name": 
"wrapper-errors", "template": "<div><formly-transclude></formly-transclude><ul class=\"form-error\" ng-messages=\"options.formControl.$error\" ng-show=\"options.formControl.$invalid && options.formControl.$touched || options.validators\"><li ng-repeat=\"error in options.templateOptions.errors\" ng-message=\"{{error.name}}\">{{::error.message || \'Error\'}}</li></ul></div>"}, {"name": 
"wrapper-flex-item", "template": "<div ng-class=\"::options.templateOptions.flex.className\" flex-item=\"{{::options.templateOptions.flex.item}}\" flex-order=\"{{::options.templateOptions.flex.order}}\"><formly-transclude></formly-transclude></div>"}];function _prefixer(name) { return PREFIX + '-' + name; } function _wrapperTemplateUrl(name) { return 'wrappers/formly-wrappers-' + _prefixer(name) + '.html'; } function _fieldTemplateUrl(name) { return 'fields/formly-fields-' + _prefixer(name) + '.html'; } angular.module(MODULE_NAME, ['formly']).config(setCustomTemplates).run(cacheLumXTemplates); 	/*@ngInject*/ 	function cacheLumXTemplates($templateCache) { 		if (USING_TEMPLATES) { 			angular.forEach(FIELDS, function (field) { 				$templateCache.put(_fieldTemplateUrl(field.name), field.template); 			}); 			angular.forEach(WRAPPERS, function (wrapper) { 				$templateCache.put(_wrapperTemplateUrl(wrapper.name), wrapper.template); 			});}} 	/*@ngInject*/ 	function setCustomTemplates(formlyConfigProvider) { 		if (USING_TEMPLATES) { 			var wrapperList = []; 			angular.forEach(WRAPPERS, function (wrapper) { 				wrapperList.push(_prefixer(wrapper.name)); 			}); 			angular.forEach(WRAPPERS, function (wrapper) { 				formlyConfigProvider.setWrapper({name: _prefixer(wrapper.name), templateUrl: _wrapperTemplateUrl(wrapper.name)});}); 			angular.forEach(FIELDS, function (field) { 				formlyConfigProvider.setType({name: _prefixer(field.name), templateUrl: _fieldTemplateUrl(field.name), wrappers: wrapperList}); 			});			formlyConfigProvider.templateManipulators.preWrapper.push(function ariaDescribedBy(template, options, scope) { 					if (options.templateOptions && angular.isDefined(options.templateOptions.description) && 						options.type !== 'lx-radio') { 						var el = angular.element('<a></a>'); 						el.append(template); 						var modelEls = angular.element(el[0].querySelectorAll('[ng-model]')); 						if (modelEls) { el.append('<p id="' + scope.id + '_description"' + 								'class="'+ options.type.slice(3) + '__help"' + 								'ng-if="options.templateOptions.description">' + 								'{{options.templateOptions.description}}' + 								'</p>' 							); 							modelEls.attr('aria-describedby', scope.id + '_description'); 							return el.html(); 						} else { 							return template; 						} 					} else { 						return template; 					} 				});			}}}());
(function () {
  'use strict';
  angular.module('demo')
    .directive('shmckSidebar', shmckSidebar);

  function shmckSidebar() {

    var sidebarLinks = [{
      divider: 'TYPES',
      state: 'text',
      text: 'Text'
      //icon: 'text-format'
    }, {
      state: 'text',
      text: 'Numbers'
      //icon: 'plus-one'
    }, {
      state: 'option',
      text: 'Checkboxes'
      //icon: 'check-box'
    }, {
      state: 'option',
      text: 'Switches'
      //icon: 'radio-button-off'
    }, {
      state: 'option',
      text: 'Radio buttons'
      //icon: 'radio-button-on'
    }, {
      state: 'select',
      text: 'Selectors'
      //icon: 'arrow-drop-down'
    }, {
      state: 'select',
      text: 'Dates'
      //icon: 'today'
    }, {
      divider: 'WRAPPERS',
      state: 'wrapper',
      text: 'Above/Below'
    }, {
      state: 'error',
      text: 'Errors'
    }, {
      state: 'theme',
      text: 'Themes'
    }, {
      state: 'flex',
      text: 'FlexBox'
    }];

    return {
      scope: {
        items: '@'
      },
      templateUrl: 'app/nav/sidebar.tmpl.html',
      controllerAs: 'vm',
      bindToController: true,
      controller: function (SidebarService) {
        var vm = this;
        vm.sidebarLinks = sidebarLinks;
        vm.sidebar = SidebarService;
      }
    };
  }

}());

/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

    config.toolbar = [
       {
           name: 'document',
           groups: ['mode', /*'document', 'doctools'*/],
           items: ['Source',/* '-', 'NewPage', 'Preview', 'Print', '-', 'Templates'*/]
       },
       {
           name: 'basicstyles',
           groups: ['basicstyles', 'cleanup'],
           items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
       },
       {
           name: 'paragraph',
           groups: ['list', 'indent', /*'blocks', */'align'],
           items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', /*'-', 'Blockquote', 'CreateDiv', */'-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
       },
       {
           name: 'links',
           items: ['Link', 'Unlink', 'Anchor']
       },      
       '/',
       {
           name: 'styles',
           items: [/*'Styles',*/ 'Format', 'Font', 'FontSize']
       },
       {
           name: 'colors',
           items: ['TextColor', 'BGColor']
       }
    ];

	// Let's have it basic on dialogs as well.
	config.removeDialogTabs = 'link:advanced';
};

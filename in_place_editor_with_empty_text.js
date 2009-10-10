Ajax.InPlaceEditorWithEmptyText = Class.create(Ajax.InPlaceEditor, {
	
  initialize : function($super, element, url, options) {
    if (!options.emptyText)        options.emptyText      = "click to edit...";
    if (!options.emptyClassName)   options.emptyClassName = "inplaceeditor-empty";

    $super(element, url, options);

    this.checkEmpty();
  },

  checkEmpty : function() {
    if (this.element.innerHTML.length == 0 && this.options.emptyText) {

      this.element.appendChild(
          new Element("span", { className : this.options.emptyClassName }).update(this.options.emptyText)
        );
    }
  },

  getText : function($super) {
    if (empty_span = this.element.select("." + this.options.emptyClassName).first()) {
      empty_span.remove();
    }

    return $super();
  },

  wrapUp : function($super, transport) {
    this.checkEmpty();
    return $super(transport);
  },

  leaveEditMode: function() {
    this.element.removeClassName(this.options.savingClassName);
    this.removeForm();
    this.element.style.backgroundColor = this._originalBackground;
    this.element.show();
    if (this.options.externalControl)
      this.options.externalControl.show();
    this._saving = false;
    this._editing = false;
    this._oldInnerHTML = null;
    this.triggerCallback('onLeaveEditMode');
  }

});
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dojo/text!./templates/FancyCounter.html"
], function (declare, lang, on, domConstruct, domAttr, _WidgetBase, _TemplatedMixin, template) {
	return declare("FancyCounter", [_WidgetBase, _TemplatedMixin], {

		templateString: template,
		newNode: null,
		counterButton: null,
		
		_setCounterButtonAttr: { node: "counterButtonNode", type: "innerHTML" },
		_i: 0,

		postCreate: function () {
			this.newNode = dojo.clone(this.counterNode);
			domAttr.set(this.counterNode, "hidden", "true");
			on(this.counterButtonNode, 'click', lang.hitch(this, '_onClickTitleButton'));
		},

		_onClickTitleButton: function () {
			this._i++;
			if (this._i > 10) {
				domConstruct.destroy(this.contentNode.lastChild);
				if (this._i === 20) this._i = 0;
			} else {
				this.newNode.innerHTML = this._i;
				domConstruct.place(dojo.clone(this.newNode), this.contentNode, "last");
			}
		}
	});
});
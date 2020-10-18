! function(e) {
	var t = {};

	function s(i) {
		if (t[i]) return t[i].exports;
		var n = t[i] = {
			i: i,
			l: !1,
			exports: {}
		};
		return e[i].call(n.exports, n, n.exports, s), n.l = !0, n.exports
	}
	s.m = e, s.c = t, s.d = function(e, t, i) {
		s.o(e, t) || Object.defineProperty(e, t, {
			configurable: !1,
			enumerable: !0,
			get: i
		})
	}, s.r = function(e) {
		Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}, s.n = function(e) {
		var t = e && e.__esModule ? function() {
			return e.default
		} : function() {
			return e
		};
		return s.d(t, "a", t), t
	}, s.o = function(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, s.p = "", s(s.s = 0)
}([function(e, t, s) {
	"use strict";
	var i;
	s.r(t),
		function(e) {
			e[e.None = 0] = "None", e[e.BronzeMedal = 1] = "BronzeMedal", e[e.GoldMedal = 2] = "GoldMedal", e[e.SilverMedal = 3] = "SilverMedal", e[e.Alert = 4] = "Alert", e[e.Crown = 5] = "Crown", e[e.Ammo = 6] = "Ammo", e[e.Armour = 7] = "Armour", e[e.Barber = 8] = "Barber", e[e.Clothes = 9] = "Clothes", e[e.Franklin = 10] = "Franklin", e[e.Bike = 11] = "Bike", e[e.Car = 12] = "Car", e[e.Gun = 13] = "Gun", e[e.Heart = 14] = "Heart", e[e.Makeup = 15] = "Makeup", e[e.Mask = 16] = "Mask", e[e.Michael = 17] = "Michael", e[e.Star = 18] = "Star", e[e.Tatoo = 19] = "Tatoo", e[e.Trevor = 20] = "Trevor", e[e.Lock = 21] = "Lock", e[e.Tick = 22] = "Tick"
		}(i || (i = {}));
	var n, h = i;
	! function(e) {
		e[e.ChaletLondon = 0] = "ChaletLondon", e[e.HouseScript = 1] = "HouseScript", e[e.Monospace = 2] = "Monospace", e[e.CharletComprimeColonge = 4] = "CharletComprimeColonge", e[e.Pricedown = 7] = "Pricedown"
	}(n || (n = {}));
	var o, r = n;
	class a {
		constructor(e, t, s, i = 255) {
			this.R = e, this.G = t, this.B = s, this.A = i
		}
	}
	a.Empty = new a(0, 0, 0, 0), a.Transparent = new a(0, 0, 0, 0), a.Black = new a(0, 0, 0, 255), a.White = new a(255, 255, 255, 255), a.WhiteSmoke = new a(245, 245, 245, 255);
	class l {
		constructor(e, t, s, i, n = 0, h = new a(255, 255, 255)) {
			this.TextureDict = e, this.TextureName = t, this.pos = s, this.size = i, this.heading = n, this.color = h, this.visible = !0
		}
		LoadTextureDictionary() {
			mp.game.graphics.requestStreamedTextureDict(this._textureDict, !0)
		}
		set TextureDict(e) {
			this._textureDict = e, this.IsTextureDictionaryLoaded || this.LoadTextureDictionary()
		}
		get TextureDict() {
			return this._textureDict
		}
		get IsTextureDictionaryLoaded() {
			return mp.game.graphics.hasStreamedTextureDictLoaded(this._textureDict)
		}
		Draw(e, t, s, i, n, h, o) {
			e = e || this.TextureDict, t = t || this.TextureName, s = s || this.pos, i = i || this.size, n = n || this.heading, h = h || this.color, (o = o || !0) && (mp.game.graphics.hasStreamedTextureDictLoaded(e) || mp.game.graphics.requestStreamedTextureDict(e, !0));
			const r = 1080 * (mp.game.resolution.width / mp.game.resolution.height),
				a = this.size.Width / r,
				l = this.size.Height / 1080,
				c = this.pos.X / r + .5 * a,
				u = this.pos.Y / 1080 + .5 * l;
			mp.game.graphics.drawSprite(e, t, c, u, a, l, n, h.R, h.G, h.B, h.A)
		}
	}
	class c {
		constructor() {
			this.handlers = []
		}
		on(e) {
			this.handlers.push(e)
		}
		off(e) {
			this.handlers = this.handlers.filter(t => t !== e)
		}
		emit(...e) {
			this.handlers.slice(0).forEach(t => t(...e))
		}
		expose() {
			return this
		}
	}
	class u {
		constructor(e, t) {
			this.X = 0, this.Y = 0, this.X = e, this.Y = t
		}
	}
	class m {
		constructor(e = 0, t = 0) {
			this.Width = e, this.Height = t
		}
	}
	class d {
		constructor() {
			this.enabled = !0
		}
	}
	class g extends d {
		constructor(e, t, s) {
			super(), this.enabled = !0, this.pos = e, this.size = t, this.color = s
		}
		Draw(e, t, s) {
			e || (e = new m(0, 0)), t || s || (e = new u(this.pos.X + e.Width, this.pos.Y + e.Height), t = this.size, s = this.color);
			const i = t.Width / 1280,
				n = t.Height / 720,
				h = e.X / 1280 + .5 * i,
				o = e.Y / 720 + .5 * n;
			mp.game.graphics.drawRect(h, o, i, n, s.R, s.G, s.B, s.A)
		}
	}
	class f extends g {
		constructor(e, t, s) {
			super(e, t, s)
		}
		Draw(e, t, s) {
			e || (e = new m), !e || t || s || (e = new u(this.pos.X + e.Width, this.pos.Y + e.Height), t = this.size, s = this.color);
			const i = 1080 * (mp.game.resolution.width / mp.game.resolution.height),
				n = t.Width / i,
				h = t.Height / 1080,
				o = e.X / i + .5 * n,
				r = e.Y / 1080 + .5 * h;
			mp.game.graphics.drawRect(o, r, n, h, s.R, s.G, s.B, s.A)
		}
	}
	class _ extends d {
		constructor(e, t, s, i, n, h) {
			super(), this.caption = e, this.pos = t, this.scale = s, this.color = i || new a(255, 255, 255, 255), this.font = n || 0, this.centered = h || !1
		}
		Draw(e, t, s, i, n, h) {
			!e || t || s || i || n || h || (t = new u(this.pos.X + e.Width, this.pos.Y + e.Height), s = this.scale, i = this.color, n = this.font, h = this.centered);
			const o = t.X / 1280,
				r = t.Y / 720;
			mp.game.ui.setTextFont(parseInt(n)), mp.game.ui.setTextScale(s, s), mp.game.ui.setTextColour(i.R, i.G, i.B, i.A), mp.game.ui.setTextCentre(h), mp.game.ui.setTextEntry("STRING"), mp.game.ui.addTextComponentSubstringPlayerName(e), mp.game.ui.drawText(o, r)
		}
	}
	exports = _,
		function(e) {
			e[e.Left = 0] = "Left", e[e.Centered = 1] = "Centered", e[e.Right = 2] = "Right"
		}(o || (o = {}));
	class p extends _ {
		constructor(e, t, s, i, n, h) {
			super(e, t, s, i || new a(255, 255, 255), n || 0, !1), this.TextAlignment = o.Left, h && (this.TextAlignment = h)
		}
		Draw(e, t, s, i, n, h, r, a, l) {
			let c = e,
				d = h,
				g = h;
			e || (e = new m(0, 0)), e && !t && (g = this.TextAlignment, c = this.caption, t = new u(this.pos.X + e.Width, this.pos.Y + e.Height), s = this.scale, i = this.color, n = this.font, 1 == d || 0 == d ? d = this.centered : (d = void 0, r = this.DropShadow, a = this.Outline, l = this.WordWrap));
			const f = 1080 * (mp.game.resolution.width / mp.game.resolution.height),
				_ = this.pos.X / f,
				p = this.pos.Y / 1080;
			if (mp.game.ui.setTextFont(parseInt(n)), mp.game.ui.setTextScale(1, s), mp.game.ui.setTextColour(i.R, i.G, i.B, i.A), void 0 !== d) mp.game.ui.setTextCentre(d);
			else {
				switch (r && mp.game.ui.setTextDropshadow(2, 0, 0, 0, 0), a && console.warn("not working!"), g) {
					case o.Centered:
						mp.game.ui.setTextCentre(!0);
						break;
					case o.Right:
						mp.game.ui.setTextRightJustify(!0), mp.game.ui.setTextWrap(0, _)
				}
				if (l) {
					const e = (this.pos.X + l.Width) / f;
					mp.game.ui.setTextWrap(_, e)
				}
			}
			mp.game.ui.setTextEntry("STRING"), mp.game.ui.addTextComponentSubstringPlayerName(c), mp.game.ui.drawText(_, p)
		}
		static AddLongString(e) {
			for (var t = 0; t < e.length; t += 99) {
				e.substr(t, Math.min(99, e.length - t))
			}
		}
	}
	class I {
		constructor(e, t = "") {
			this.BackColor = I.DefaultBackColor, this.HighlightedBackColor = I.DefaultHighlightedBackColor, this.ForeColor = I.DefaultForeColor, this.HighlightedForeColor = I.DefaultHighlightedForeColor, this.RightLabel = "", this.LeftBadge = h.None, this.RightBadge = h.None, this.Enabled = !0, this._rectangle = new f(new u(0, 0), new m(431, 38), new a(150, 0, 0, 0)), this._text = new p(e, new u(8, 0), .33, a.WhiteSmoke, r.ChaletLondon, o.Left), this.Description = t, this._selectedSprite = new l("commonmenu", "gradient_nav", new u(0, 0), new m(431, 38)), this._badgeLeft = new l("commonmenu", "", new u(0, 0), new m(40, 40)), this._badgeRight = new l("commonmenu", "", new u(0, 0), new m(40, 40)), this._labelText = new p("", new u(0, 0), .35, a.White, 0, o.Right)
		}
		get Text() {
			return this._text.caption
		}
		set Text(e) {
			this._text.caption = e
		}
		SetVerticalPosition(e) {
			this._rectangle.pos = new u(this.Offset.X, e + 144 + this.Offset.Y), this._selectedSprite.pos = new u(0 + this.Offset.X, e + 144 + this.Offset.Y), this._text.pos = new u(8 + this.Offset.X, e + 147 + this.Offset.Y), this._badgeLeft.pos = new u(0 + this.Offset.X, e + 142 + this.Offset.Y), this._badgeRight.pos = new u(385 + this.Offset.X, e + 142 + this.Offset.Y), this._labelText.pos = new u(420 + this.Offset.X, e + 148 + this.Offset.Y)
		}
		addEvent(e, ...t) {
			this._event = {
				event: e,
				args: t
			}
		}
		fireEvent() {
			this._event && mp.events.call(this._event.event, this, ...this._event.args)
		}
		Draw() {
			this._rectangle.size = new m(431 + this.Parent.WidthOffset, 38), this._selectedSprite.size = new m(431 + this.Parent.WidthOffset, 38), this.Hovered && !this.Selected && (this._rectangle.color = new a(255, 255, 255, 20), this._rectangle.Draw()), this._selectedSprite.color = this.Selected ? this.HighlightedBackColor : this.BackColor, this._selectedSprite.Draw(), this._text.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this.LeftBadge != h.None ? (this._text.pos = new u(35 + this.Offset.X, this._text.pos.Y), this._badgeLeft.TextureDict = this.BadgeToSpriteLib(this.LeftBadge), this._badgeLeft.TextureName = this.BadgeToSpriteName(this.LeftBadge, this.Selected), this._badgeLeft.color = this.IsBagdeWhiteSprite(this.LeftBadge) ? this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148) : a.White, this._badgeLeft.Draw()) : this._text.pos = new u(8 + this.Offset.X, this._text.pos.Y), this.RightBadge != h.None && (this._badgeRight.pos = new u(385 + this.Offset.X + this.Parent.WidthOffset, this._badgeRight.pos.Y), this._badgeRight.TextureDict = this.BadgeToSpriteLib(this.RightBadge), this._badgeRight.TextureName = this.BadgeToSpriteName(this.RightBadge, this.Selected), this._badgeRight.color = this.IsBagdeWhiteSprite(this.RightBadge) ? this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148) : a.White, this._badgeRight.Draw()), this.RightLabel && "" !== this.RightLabel && (this._labelText.pos = new u(420 + this.Offset.X + this.Parent.WidthOffset, this._labelText.pos.Y), this._labelText.caption = this.RightLabel, this._labelText.color = this._text.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._labelText.Draw()), this._text.Draw()
		}
		SetLeftBadge(e) {
			this.LeftBadge = e
		}
		SetRightBadge(e) {
			this.RightBadge = e
		}
		SetRightLabel(e) {
			this.RightLabel = e
		}
		BadgeToSpriteLib(e) {
			return "commonmenu"
		}
		BadgeToSpriteName(e, t) {
			switch (e) {
				case h.None:
					return "";
				case h.BronzeMedal:
					return "mp_medal_bronze";
				case h.GoldMedal:
					return "mp_medal_gold";
				case h.SilverMedal:
					return "medal_silver";
				case h.Alert:
					return "mp_alerttriangle";
				case h.Crown:
					return "mp_hostcrown";
				case h.Ammo:
					return t ? "shop_ammo_icon_b" : "shop_ammo_icon_a";
				case h.Armour:
					return t ? "shop_armour_icon_b" : "shop_armour_icon_a";
				case h.Barber:
					return t ? "shop_barber_icon_b" : "shop_barber_icon_a";
				case h.Clothes:
					return t ? "shop_clothing_icon_b" : "shop_clothing_icon_a";
				case h.Franklin:
					return t ? "shop_franklin_icon_b" : "shop_franklin_icon_a";
				case h.Bike:
					return t ? "shop_garage_bike_icon_b" : "shop_garage_bike_icon_a";
				case h.Car:
					return t ? "shop_garage_icon_b" : "shop_garage_icon_a";
				case h.Gun:
					return t ? "shop_gunclub_icon_b" : "shop_gunclub_icon_a";
				case h.Heart:
					return t ? "shop_health_icon_b" : "shop_health_icon_a";
				case h.Lock:
					return "shop_lock";
				case h.Makeup:
					return t ? "shop_makeup_icon_b" : "shop_makeup_icon_a";
				case h.Mask:
					return t ? "shop_mask_icon_b" : "shop_mask_icon_a";
				case h.Michael:
					return t ? "shop_michael_icon_b" : "shop_michael_icon_a";
				case h.Star:
					return "shop_new_star";
				case h.Tatoo:
					return t ? "shop_tattoos_icon_b" : "shop_tattoos_icon_";
				case h.Tick:
					return "shop_tick_icon";
				case h.Trevor:
					return t ? "shop_trevor_icon_b" : "shop_trevor_icon_a";
				default:
					return ""
			}
		}
		IsBagdeWhiteSprite(e) {
			switch (e) {
				case h.Lock:
				case h.Tick:
				case h.Crown:
					return !0;
				default:
					return !1
			}
		}
		BadgeToColor(e, t) {
			switch (e) {
				case h.Lock:
				case h.Tick:
				case h.Crown:
					return t ? new a(255, 0, 0, 0) : new a(255, 255, 255, 255);
				default:
					return new a(255, 255, 255, 255)
			}
		}
	}
	I.DefaultBackColor = a.Empty, I.DefaultHighlightedBackColor = a.White, I.DefaultForeColor = a.WhiteSmoke, I.DefaultHighlightedForeColor = a.Black;
	class w extends I {
		constructor(e, t = !1, s = "") {
			super(e, s), this.OnCheckedChanged = new c, this.Checked = !1;
			this._checkedSprite = new l("commonmenu", "shop_box_blank", new u(410, 95), new m(50, 50)), this.Checked = t
		}
		get CheckedChanged() {
			return this.OnCheckedChanged.expose()
		}
		SetVerticalPosition(e) {
			super.SetVerticalPosition(e), this._checkedSprite.pos = new u(380 + this.Offset.X + this.Parent.WidthOffset, e + 138 + this.Offset.Y)
		}
		Draw() {
			super.Draw(), this._checkedSprite.pos = this._checkedSprite.pos = new u(380 + this.Offset.X + this.Parent.WidthOffset, this._checkedSprite.pos.Y);
			const e = this.HighlightedForeColor == I.DefaultHighlightedForeColor;
			this.Selected && e ? this._checkedSprite.TextureName = this.Checked ? "shop_box_tickb" : "shop_box_blankb" : this._checkedSprite.TextureName = this.Checked ? "shop_box_tick" : "shop_box_blank", this._checkedSprite.color = this.Enabled ? this.Selected && !e ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._checkedSprite.Draw()
		}
		SetRightBadge(e) {
			return this
		}
		SetRightLabel(e) {
			return this
		}
	}
	class x {
		constructor(e = "", t = null) {
			this.DisplayText = e, this.Data = t
		}
	}
	class S {
		constructor(e) {
			if (0 === e.length) throw new Error("ItemsCollection cannot be empty");
			this.items = e
		}
		length() {
			return this.items.length
		}
		getListItems() {
			const e = [];
			for (const t of this.items) t instanceof x ? e.push(t) : "string" == typeof t && e.push(new x(t.toString()));
			return e
		}
	}
	class C {
		static MeasureString(e) {
			let t = 0;
			const s = e.toString().split("");
			for (const e of s) C.CharMap[e] && (t += C.CharMap[e] + 1);
			return t
		}
	}
	C.CharMap = {
		" ": 6,
		"!": 6,
		'"': 6,
		"#": 11,
		$: 10,
		"%": 17,
		"&": 13,
		"'": 4,
		"(": 6,
		")": 6,
		"*": 7,
		"+": 10,
		",": 4,
		"-": 6,
		".": 4,
		"/": 7,
		0: 12,
		1: 7,
		2: 11,
		3: 11,
		4: 11,
		5: 11,
		6: 12,
		7: 10,
		8: 11,
		9: 11,
		":": 5,
		";": 4,
		"<": 9,
		"=": 9,
		">": 9,
		"?": 10,
		"@": 15,
		A: 12,
		B: 13,
		C: 14,
		D: 14,
		E: 12,
		F: 12,
		G: 15,
		H: 14,
		I: 5,
		J: 11,
		K: 13,
		L: 11,
		M: 16,
		N: 14,
		O: 16,
		P: 12,
		Q: 15,
		R: 13,
		S: 12,
		T: 11,
		U: 13,
		V: 12,
		W: 18,
		X: 11,
		Y: 11,
		Z: 12,
		"[": 6,
		"\\": 7,
		"]": 6,
		"^": 9,
		_: 18,
		"`": 8,
		a: 11,
		b: 12,
		c: 11,
		d: 12,
		e: 12,
		f: 5,
		g: 13,
		h: 11,
		i: 4,
		j: 4,
		k: 10,
		l: 4,
		m: 18,
		n: 11,
		o: 12,
		p: 12,
		q: 12,
		r: 7,
		s: 9,
		t: 5,
		u: 11,
		v: 10,
		w: 14,
		x: 9,
		y: 10,
		z: 9,
		"{": 6,
		"|": 3,
		"}": 6
	};
	class M extends I {
		constructor(e, t = "", s = new S([]), i = 0) {
			super(e, t), this.currOffset = 0, this.collection = [], this.ScrollingEnabled = !0, this.HoldTimeBeforeScroll = 200, this.OnListChanged = new c, this._index = 0;
			this.Collection = s.getListItems(), this.Index = i, this._arrowLeft = new l("commonmenu", "arrowleft", new u(110, 105), new m(30, 30)), this._arrowRight = new l("commonmenu", "arrowright", new u(280, 105), new m(30, 30)), this._itemText = new p("", new u(290, 104), .35, a.White, r.ChaletLondon, o.Right)
		}
		get Collection() {
			return this.collection
		}
		set Collection(e) {
			if (!e) throw new Error("The collection can't be null");
			this.collection = e
		}
		get SelectedItem() {
			return this.Collection.length > 0 ? this.Collection[this.Index] : null
		}
		get SelectedValue() {
			return null == this.SelectedItem ? null : null == this.SelectedItem.Data ? this.SelectedItem.DisplayText : this.SelectedItem.Data
		}
		get ListChanged() {
			return this.OnListChanged.expose()
		}
		get Index() {
			return null == this.Collection ? -1 : null != this.Collection && 0 == this.Collection.length ? -1 : this._index % this.Collection.length
		}
		set Index(e) {
			if (null == this.Collection) return;
			if (null != this.Collection && 0 == this.Collection.length) return;
			this._index = 1e5 - 1e5 % this.Collection.length + e;
			const t = this.Collection.length >= this.Index ? this.Collection[this.Index].DisplayText : " ";
			this.currOffset = C.MeasureString(t)
		}
		SetVerticalPosition(e) {
			this._arrowLeft.pos = new u(300 + this.Offset.X + this.Parent.WidthOffset, 147 + e + this.Offset.Y), this._arrowRight.pos = new u(400 + this.Offset.X + this.Parent.WidthOffset, 147 + e + this.Offset.Y), this._itemText.pos = new u(300 + this.Offset.X + this.Parent.WidthOffset, e + 147 + this.Offset.Y), super.SetVerticalPosition(e)
		}
		SetRightLabel(e) {
			return this
		}
		SetRightBadge(e) {
			return this
		}
		Draw() {
			super.Draw();
			const e = this.Collection.length >= this.Index ? this.Collection[this.Index].DisplayText : " ",
				t = this.currOffset;
			this._itemText.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._itemText.caption = e, this._arrowLeft.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._arrowRight.color = this.Enabled ? this.Selected ? this.HighlightedForeColor : this.ForeColor : new a(163, 159, 148), this._arrowLeft.pos = new u(375 - t + this.Offset.X + this.Parent.WidthOffset, this._arrowLeft.pos.Y), this.Selected ? (this._arrowLeft.Draw(), this._arrowRight.Draw(), this._itemText.pos = new u(405 + this.Offset.X + this.Parent.WidthOffset, this._itemText.pos.Y)) : this._itemText.pos = new u(420 + this.Offset.X + this.Parent.WidthOffset, this._itemText.pos.Y), this._itemText.Draw()
		}
	}
	class O extends I {
		get Index() {
			return this._index % this._items.length
		}
		set Index(e) {
			this._index = 1e8 - 1e8 % this._items.length + e
		}
		constructor(e, t, s, i = "", n = !1) {
			super(e, i);
			this._items = t, this._arrowLeft = new l("commonmenutu", "arrowleft", new u(0, 105), new m(15, 15)), this._arrowRight = new l("commonmenutu", "arrowright", new u(0, 105), new m(15, 15)), this._rectangleBackground = new f(new u(0, 0), new m(150, 9), new a(4, 32, 57, 255)), this._rectangleSlider = new f(new u(0, 0), new m(75, 9), new a(57, 116, 200, 255)), this._rectangleDivider = new f(new u(0, 0), new m(2.5, 20), n ? a.WhiteSmoke : a.Transparent), this.Index = s
		}
		SetVerticalPosition(e) {
			this._rectangleBackground.pos = new u(250 + this.Offset.X + this.Parent.WidthOffset, e + 158.5 + this.Offset.Y), this._rectangleSlider.pos = new u(250 + this.Offset.X + this.Parent.WidthOffset, e + 158.5 + this.Offset.Y), this._rectangleDivider.pos = new u(323.5 + this.Offset.X + this.Parent.WidthOffset, e + 153 + this.Offset.Y), this._arrowLeft.pos = new u(235 + this.Offset.X + this.Parent.WidthOffset, 155.5 + e + this.Offset.Y), this._arrowRight.pos = new u(400 + this.Offset.X + this.Parent.WidthOffset, 155.5 + e + this.Offset.Y), super.SetVerticalPosition(e)
		}
		IndexToItem(e) {
			return this._items[e]
		}
		Draw() {
			super.Draw(), this._arrowLeft.color = this.Enabled ? this.Selected ? a.Black : a.WhiteSmoke : new a(163, 159, 148), this._arrowRight.color = this.Enabled ? this.Selected ? a.Black : a.WhiteSmoke : new a(163, 159, 148);
			let e = (this._rectangleBackground.size.Width - this._rectangleSlider.size.Width) / (this._items.length - 1) * this.Index;
			this._rectangleSlider.pos = new u(250 + this.Offset.X + e + +this.Parent.WidthOffset, this._rectangleSlider.pos.Y), this.Selected && (this._arrowLeft.Draw(), this._arrowRight.Draw()), this._rectangleBackground.Draw(), this._rectangleSlider.Draw(), this._rectangleDivider.Draw()
		}
		SetRightBadge(e) {}
		SetRightLabel(e) {}
	}
	class D extends g {
		constructor(e, t, s) {
			super(e, t, s), this.Items = []
		}
		addItem(e) {
			this.Items.push(e)
		}
		Draw(e) {
			if (!this.enabled) return;
			e = e || new m;
			const t = 1080 * (mp.game.resolution.width / mp.game.resolution.height),
				s = this.size.Width / t,
				i = this.size.Height / 1080,
				n = (this.pos.X + e.Width) / t + .5 * s,
				h = (this.pos.Y + e.Height) / 1080 + .5 * i;
			for (var o of (mp.game.graphics.drawRect(n, h, s, i, this.color.R, this.color.G, this.color.B, this.color.A), this.Items)) o.Draw(new m(this.pos.X + e.Width, this.pos.Y + e.Height))
		}
	}
	class R {
		static PlaySound(e, t) {
			mp.game.audio.playSound(-1, e, t, !1, 0, !0)
		}
	}
	s.d(t, "default", function() {
		return T
	});
	const b = mp.game.graphics.getScreenActiveResolution(0, 0);
	mp.game.resolution = {}, mp.game.resolution.width = b.x, mp.game.resolution.height = b.y;
	class T {
		constructor(e, t, s, i, n) {
			this.counterPretext = "", this.counterOverride = void 0, this.lastUpDownNavigation = 0, this.lastLeftRightNavigation = 0, this._activeItem = 1e3, this.extraOffset = 0, this.WidthOffset = 0, this.Visible = !0, this.MouseControlsEnabled = !1, this._justOpened = !0, this.safezoneOffset = new u(0, 0), this.MaxItemsOnScreen = 9, this._maxItem = this.MaxItemsOnScreen, this.AUDIO_LIBRARY = "HUD_FRONTEND_DEFAULT_SOUNDSET", this.AUDIO_UPDOWN = "NAV_UP_DOWN", this.AUDIO_LEFTRIGHT = "NAV_LEFT_RIGHT", this.AUDIO_SELECT = "SELECT", this.AUDIO_BACK = "BACK", this.AUDIO_ERROR = "ERROR", this.MenuItems = [], this.onIndexChange = new c, this.onListChange = new c, this.onSliderChange = new c, this.onSliderSelect = new c, this.onCheckboxChange = new c, this.onItemSelect = new c, this.onMenuClose = new c, this.onMenuChange = new c, this.MouseEdgeEnabled = !0, this.title = e, this.subtitle = t, this.spriteLibrary = i || "commonmenu", this.spriteName = n || "interaction_bgd", this.offset = new u(s.X, s.Y), this.Children = new Map, this._mainMenu = new D(new u(0, 0), new m(700, 500), new a(0, 0, 0, 0)), this._logo = new l(this.spriteLibrary, this.spriteName, new u(0 + this.offset.X, 0 + this.offset.Y), new m(431, 107)), this._mainMenu.addItem(this._title = new p(this.title, new u(215 + this.offset.X, 20 + this.offset.Y), 1.15, new a(255, 255, 255), 1, o.Centered)), "" !== this.subtitle && (this._mainMenu.addItem(new f(new u(0 + this.offset.X, 107 + this.offset.Y), new m(431, 37), new a(0, 0, 0, 255))), this._mainMenu.addItem(this._subtitle = new p(this.subtitle, new u(8 + this.offset.X, 110 + this.offset.Y), .35, new a(255, 255, 255), 0, o.Left)), this.subtitle.startsWith("~") && (this.counterPretext = this.subtitle.substr(0, 3)), this._counterText = new p("", new u(425 + this.offset.X, 110 + this.offset.Y), .35, new a(255, 255, 255), 0, o.Right), this.extraOffset += 37), this._upAndDownSprite = new l("commonmenu", "shop_arrows_upanddown", new u(190 + this.offset.X, 147 + 37 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new m(50, 50)), this._extraRectangleUp = new f(new u(0 + this.offset.X, 144 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new m(431, 18), new a(0, 0, 0, 200)), this._extraRectangleDown = new f(new u(0 + this.offset.X, 162 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new m(431, 18), new a(0, 0, 0, 200)), this._descriptionBar = new f(new u(this.offset.X, 123), new m(431, 4), a.Black), this._descriptionRectangle = new l("commonmenu", "gradient_bgd", new u(this.offset.X, 127), new m(431, 30)), this._descriptionText = new p("Description", new u(this.offset.X + 5, 125), .35, new a(255, 255, 255, 255), r.ChaletLondon, o.Left), this._background = new l("commonmenu", "gradient_bgd", new u(this.offset.X, 144 + this.offset.Y - 37 + this.extraOffset), new m(290, 25)), mp.events.add("render", this.render.bind(this)), console.log(`Created Native UI! ${this.title}`)
		}
		get CurrentSelection() {
			return this._activeItem % this.MenuItems.length
		}
		set CurrentSelection(e) {
			this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem = 1e3 - 1e3 % this.MenuItems.length + e, this.CurrentSelection > this._maxItem ? (this._maxItem = this.CurrentSelection, this._minItem = this.CurrentSelection - this.MaxItemsOnScreen) : this.CurrentSelection < this._minItem && (this._maxItem = this.MaxItemsOnScreen + this.CurrentSelection, this._minItem = this.CurrentSelection)
		}
		get IndexChange() {
			return this.onIndexChange.expose()
		}
		get ListChange() {
			return this.onListChange.expose()
		}
		get SliderChange() {
			return this.onSliderChange.expose()
		}
		get SliderSelect() {
			return this.onSliderSelect.expose()
		}
		get CheckboxChange() {
			return this.onCheckboxChange.expose()
		}
		get ItemSelect() {
			return this.onItemSelect.expose()
		}
		get MenuClose() {
			return this.onMenuClose.expose()
		}
		get MenuChange() {
			return this.onMenuChange.expose()
		}
		RecalculateDescriptionPosition() {
			this._descriptionBar.pos = new u(this.offset.X, 112 + this.extraOffset + this.offset.Y), this._descriptionRectangle.pos = new u(this.offset.X, 112 + this.extraOffset + this.offset.Y), this._descriptionText.pos = new u(this.offset.X + 8, 118 + this.extraOffset + this.offset.Y), this._descriptionBar.size = new m(431 + this.WidthOffset, 4), this._descriptionRectangle.size = new m(431 + this.WidthOffset, 30);
			let e = this.MenuItems.length;
			e > this.MaxItemsOnScreen + 1 && (e = this.MaxItemsOnScreen + 2), this._descriptionBar.pos = new u(this.offset.X, 38 * e + this._descriptionBar.pos.Y), this._descriptionRectangle.pos = new u(this.offset.X, 38 * e + this._descriptionRectangle.pos.Y), this._descriptionText.pos = new u(this.offset.X + 8, 38 * e + this._descriptionText.pos.Y)
		}
		SetMenuWidthOffset(e) {
			if (this.WidthOffset = e, null != this._logo && (this._logo.size = new m(431 + this.WidthOffset, 107)), this._mainMenu.Items[0].pos = new u((this.WidthOffset + this.offset.X + 431) / 2, 20 + this.offset.Y), this._counterText && (this._counterText.pos = new u(425 + this.offset.X + e, 110 + this.offset.Y)), this._mainMenu.Items.length >= 2) {
				this._mainMenu.Items[1].size = new m(431 + this.WidthOffset, 37)
			}
		}
		AddItem(e) {
			this._justOpened && (this._justOpened = !1), e.Offset = this.offset, e.Parent = this, e.SetVerticalPosition(25 * this.MenuItems.length - 37 + this.extraOffset), this.MenuItems.push(e), e.Description = this.FormatDescription(e.Description), this.RefreshIndex(), this.RecalculateDescriptionPosition()
		}
		RefreshIndex() {
			if (0 == this.MenuItems.length) return this._activeItem = 1e3, this._maxItem = this.MaxItemsOnScreen, void(this._minItem = 0);
			for (let e = 0; e < this.MenuItems.length; e++) this.MenuItems[e].Selected = !1;
			this._activeItem = 1e3 - 1e3 % this.MenuItems.length, this._maxItem = this.MaxItemsOnScreen, this._minItem = 0
		}
		Clear() {
			this.MenuItems = [], this.RecalculateDescriptionPosition()
		}
		Open() {
			R.PlaySound(this.AUDIO_BACK, this.AUDIO_LIBRARY), this.Visible = !0
		}
		Close() {
			R.PlaySound(this.AUDIO_BACK, this.AUDIO_LIBRARY), this.Visible = !1, this.onMenuClose.emit()
		}
		GoLeft() {
			if (this.MenuItems[this.CurrentSelection] instanceof M || this.MenuItems[this.CurrentSelection] instanceof O)
				if (this.MenuItems[this.CurrentSelection] instanceof M) {
					const e = this.MenuItems[this.CurrentSelection];
					if (0 == e.Collection.length) return;
					e.Index--, R.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.onListChange.emit(e, e.Index)
				} else if (this.MenuItems[this.CurrentSelection] instanceof O) {
				const e = this.MenuItems[this.CurrentSelection];
				e.Index = e.Index - 1, R.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.onSliderChange.emit(e, e.Index, e.IndexToItem(e.Index))
			}
		}
		GoRight() {
			if (this.MenuItems[this.CurrentSelection] instanceof M || this.MenuItems[this.CurrentSelection] instanceof O)
				if (this.MenuItems[this.CurrentSelection] instanceof M) {
					const e = this.MenuItems[this.CurrentSelection];
					if (0 == e.Collection.length) return;
					e.Index++, R.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.onListChange.emit(e, e.Index)
				} else if (this.MenuItems[this.CurrentSelection] instanceof O) {
				const e = this.MenuItems[this.CurrentSelection];
				e.Index++, R.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.onSliderChange.emit(e, e.Index, e.IndexToItem(e.Index))
			}
		}
		SelectItem() {
			if (!this.MenuItems[this.CurrentSelection].Enabled) return void R.PlaySound(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
			const e = this.MenuItems[this.CurrentSelection];
			this.MenuItems[this.CurrentSelection] instanceof w ? (e.Checked = !e.Checked, R.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY), this.onCheckboxChange.emit(e, e.Checked)) : (R.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY), this.onItemSelect.emit(e, this.CurrentSelection), this.Children.has(e) && (this.Visible = !1, this.Children.get(e).Visible = !0, this.onMenuChange.emit(this.Children.get(e), !0))), e.fireEvent()
		}
		getMousePosition(e = !1) {
			const t = mp.game.resolution.width,
				s = mp.game.resolution.height,
				i = mp.gui.cursor.position;
			let [n, h] = [i[0], i[1]];
			return e && ([n, h] = [i[0] / t, i[1] / s]), [n, h]
		}
		GetScreenResolutionMantainRatio() {
			const e = mp.game.resolution.width,
				t = mp.game.resolution.height;
			return new m(1080 * (e / t), 1080)
		}
		IsMouseInBounds(e, t) {
			const [s, i] = this.getMousePosition();
			this.GetScreenResolutionMantainRatio();
			return s >= e.X && s <= e.X + t.Width && i > e.Y && i < e.Y + t.Height
		}
		IsMouseInListItemArrows(e, t, s) {
			mp.game.invoke("0x54ce8ac98e120cab".toUpperCase(), "jamyfafi"), mp.game.ui.addTextComponentSubstringPlayerName(e.Text);
			var i = this.GetScreenResolutionMantainRatio();
			var n = 1080 * (i.Width / i.Height);
			const h = 5 + mp.game.invoke("0x85f061da64ed2f67".toUpperCase(), 0) * n * .35 + 10,
				o = 431 - h;
			return this.IsMouseInBounds(t, new m(h, 38)) ? 1 : this.IsMouseInBounds(new u(t.X + h, t.Y), new m(o, 38)) ? 2 : 0
		}
		ProcessMouse() {
			if (!this.Visible || this._justOpened || 0 == this.MenuItems.length || !this.MouseControlsEnabled) return void this.MenuItems.filter(e => e.Hovered).forEach(e => e.Hovered = !1);
			mp.gui.cursor.visible || (mp.gui.cursor.visible = !0);
			let e = this.MenuItems.length - 1,
				t = 0;
			this.MenuItems.length > this.MaxItemsOnScreen + 1 && (e = this._maxItem), this.IsMouseInBounds(new u(0, 0), new m(30, 1080)) && this.MouseEdgeEnabled ? (mp.game.cam.setGameplayCamRelativeHeading(mp.game.cam.getGameplayCamRelativeHeading() + 5), mp.game.ui.setCursorSprite(6)) : this.IsMouseInBounds(new u(this.GetScreenResolutionMantainRatio().Width - 30, 0), new m(30, 1080)) && this.MouseEdgeEnabled ? (mp.game.cam.setGameplayCamRelativeHeading(mp.game.cam.getGameplayCamRelativeHeading() - 5), mp.game.ui.setCursorSprite(7)) : this.MouseEdgeEnabled && mp.game.ui.setCursorSprite(1);
			for (let i = this._minItem; i <= e; i++) {
				let e = this.offset.X,
					n = this.offset.Y + 144 - 37 + this.extraOffset + 38 * t,
					h = 431 + this.WidthOffset;
				const o = 38,
					r = this.MenuItems[i];
				if (this.IsMouseInBounds(new u(e, n), new m(h, o))) {
					if (r.Hovered = !0, mp.game.controls.isControlJustPressed(0, 24) || mp.game.controls.isDisabledControlJustPressed(0, 24))
						if (r.Selected && r.Enabled)
							if (this.MenuItems[i] instanceof M && this.IsMouseInListItemArrows(this.MenuItems[i], new u(e, n), 0) > 0) {
								switch (this.IsMouseInListItemArrows(this.MenuItems[i], new u(e, n), 0)) {
									case 1:
										R.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY), this.MenuItems[i].fireEvent(), this.onItemSelect.emit(this.MenuItems[i], i);
										break;
									case 2:
										var s = this.MenuItems[i];
										(null == s.Collection ? s.Items.Count : s.Collection.Count) > 0 && (s.Index++, R.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.onListChange.emit(s, s.Index))
								}
							} else this.SelectItem();
					else r.Selected ? !r.Enabled && r.Selected && R.PlaySound(this.AUDIO_ERROR, this.AUDIO_LIBRARY) : (this.CurrentSelection = i, R.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY), this.onIndexChange.emit(this.CurrentSelection), this.SelectItem())
				} else r.Hovered = !1;
				t++
			}
			const i = 144 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset + this.safezoneOffset.Y,
				n = this.safezoneOffset.X + this.offset.X;
			this.MenuItems.length <= this.MaxItemsOnScreen + 1 || (this.IsMouseInBounds(new u(n, i), new m(431 + this.WidthOffset, 18)) ? (this._extraRectangleUp.color = new a(30, 30, 30, 255), (mp.game.controls.isControlJustPressed(0, 24) || mp.game.controls.isDisabledControlJustPressed(0, 24)) && (this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoUpOverflow() : this.GoUp())) : this._extraRectangleUp.color = new a(0, 0, 0, 200), this.IsMouseInBounds(new u(n, i + 18), new m(431 + this.WidthOffset, 18)) ? (this._extraRectangleDown.color = new a(30, 30, 30, 255), (mp.game.controls.isControlJustPressed(0, 24) || mp.game.controls.isDisabledControlJustPressed(0, 24)) && (this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoDownOverflow() : this.GoDown())) : this._extraRectangleDown.color = new a(0, 0, 0, 200))
		}
		ProcessControl() {
			this.Visible && (this._justOpened ? this._justOpened = !1 : (mp.game.controls.isControlJustReleased(0, 177) && this.GoBack(), 0 != this.MenuItems.length && (mp.game.controls.isControlPressed(0, 172) && this.lastUpDownNavigation + 120 < Date.now() ? (this.lastUpDownNavigation = Date.now(), this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoUpOverflow() : this.GoUp()) : mp.game.controls.isControlJustReleased(0, 172) ? this.lastUpDownNavigation = 0 : mp.game.controls.isControlPressed(0, 173) && this.lastUpDownNavigation + 120 < Date.now() ? (this.lastUpDownNavigation = Date.now(), this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoDownOverflow() : this.GoDown()) : mp.game.controls.isControlJustReleased(0, 173) ? this.lastUpDownNavigation = 0 : mp.game.controls.isControlPressed(0, 174) && this.lastLeftRightNavigation + 100 < Date.now() ? (this.lastLeftRightNavigation = Date.now(), this.GoLeft()) : mp.game.controls.isControlJustReleased(0, 174) ? this.lastLeftRightNavigation = 0 : mp.game.controls.isControlPressed(0, 175) && this.lastLeftRightNavigation + 100 < Date.now() ? (this.lastLeftRightNavigation = Date.now(), this.GoRight()) : mp.game.controls.isControlJustReleased(0, 175) ? this.lastLeftRightNavigation = 0 : mp.game.controls.isControlJustPressed(0, 201) && this.SelectItem())))
		}
		FormatDescription(e) {
			const t = 425 + this.WidthOffset;
			let s = 0,
				i = "";
			const n = e.split(" ");
			for (const e of n) {
				const n = C.MeasureString(e);
				(s += n) > t ? (i += "\n" + e + " ", s = n + C.MeasureString(" ")) : (i += e + " ", s += C.MeasureString(" "))
			}
			return i
		}
		GoUpOverflow() {
			this.MenuItems.length <= this.MaxItemsOnScreen + 1 || (this._activeItem % this.MenuItems.length <= this._minItem ? this._activeItem % this.MenuItems.length == 0 ? (this._minItem = this.MenuItems.length - this.MaxItemsOnScreen - 1, this._maxItem = this.MenuItems.length - 1, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem = 1e3 - 1e3 % this.MenuItems.length, this._activeItem += this.MenuItems.length - 1, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0) : (this._minItem--, this._maxItem--, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem--, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0) : (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem--, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0), R.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY), this.onIndexChange.emit(this.CurrentSelection))
		}
		GoUp() {
			this.MenuItems.length > this.MaxItemsOnScreen + 1 || (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem--, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0, R.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY), this.onIndexChange.emit(this.CurrentSelection))
		}
		GoDownOverflow() {
			this.MenuItems.length <= this.MaxItemsOnScreen + 1 || (this._activeItem % this.MenuItems.length >= this._maxItem ? this._activeItem % this.MenuItems.length == this.MenuItems.length - 1 ? (this._minItem = 0, this._maxItem = this.MaxItemsOnScreen, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem = 1e3 - 1e3 % this.MenuItems.length, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0) : (this._minItem++, this._maxItem++, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem++, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0) : (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem++, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0), R.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY), this.onIndexChange.emit(this.CurrentSelection))
		}
		GoDown() {
			this.MenuItems.length > this.MaxItemsOnScreen + 1 || (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1, this._activeItem++, this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0, R.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY), this.onIndexChange.emit(this.CurrentSelection))
		}
		GoBack() {
			R.PlaySound(this.AUDIO_BACK, this.AUDIO_LIBRARY), this.Visible = !1, null != this.ParentMenu && (this.ParentMenu.Visible = !0, this.ParentMenu._justOpened = !0, this.onMenuChange.emit(this.ParentMenu, !1)), this.onMenuClose.emit()
		}
		BindMenuToItem(e, t) {
			e.ParentMenu = this, e.ParentItem = t, this.Children.set(t, e)
		}
		ReleaseMenuFromItem(e) {
			if (!this.Children.has(e)) return !1;
			const t = this.Children.get(e);
			return t.ParentItem = null, t.ParentMenu = null, this.Children.delete(e), !0
		}
		render() {
			if (this.Visible) {
				if (this._justOpened && (null == this._logo || this._logo.IsTextureDictionaryLoaded || this._logo.LoadTextureDictionary(), this._background.IsTextureDictionaryLoaded || this._background.LoadTextureDictionary(), this._descriptionRectangle.IsTextureDictionaryLoaded || this._descriptionRectangle.LoadTextureDictionary(), this._upAndDownSprite.IsTextureDictionaryLoaded || this._upAndDownSprite.LoadTextureDictionary()), this._mainMenu.Draw(), this.ProcessMouse(), this.ProcessControl(), this._background.size = this.MenuItems.length > this.MaxItemsOnScreen + 1 ? new m(431 + this.WidthOffset, 38 * (this.MaxItemsOnScreen + 1)) : new m(431 + this.WidthOffset, 38 * this.MenuItems.length), this._background.Draw(), this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0, "" !== this.MenuItems[this._activeItem % this.MenuItems.length].Description) {
					this.RecalculateDescriptionPosition();
					let e = this.MenuItems[this._activeItem % this.MenuItems.length].Description;
					this._descriptionText.caption = e;
					const t = this._descriptionText.caption.split("\n").length;
					this._descriptionRectangle.size = new m(431 + this.WidthOffset, 25 * t + 15), this._descriptionBar.Draw(), this._descriptionRectangle.Draw(), this._descriptionText.Draw()
				}
				if (this.MenuItems.length <= this.MaxItemsOnScreen + 1) {
					let e = 0;
					for (const t of this.MenuItems) t.SetVerticalPosition(38 * e - 37 + this.extraOffset), t.Draw(), e++;
					this._counterText && this.counterOverride && (this._counterText.caption = this.counterPretext + this.counterOverride, this._counterText.Draw())
				} else {
					let t = 0;
					for (let s = this._minItem; s <= this._maxItem; s++) {
						var e = this.MenuItems[s];
						e.SetVerticalPosition(38 * t - 37 + this.extraOffset), e.Draw(), t++
					}
					if (this._extraRectangleUp.size = new m(431 + this.WidthOffset, 18), this._extraRectangleDown.size = new m(431 + this.WidthOffset, 18), this._upAndDownSprite.pos = new u(190 + this.offset.X + this.WidthOffset / 2, 147 + 37 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), this._extraRectangleUp.Draw(), this._extraRectangleDown.Draw(), this._upAndDownSprite.Draw(), this._counterText) {
						if (this.counterOverride) this._counterText.caption = this.counterPretext + this.counterOverride;
						else {
							const e = this.CurrentSelection + 1 + " / " + this.MenuItems.length;
							this._counterText.caption = this.counterPretext + e
						}
						this._counterText.Draw()
					}
				}
				this._logo.Draw()
			}
		}
	}
	exports.Menu = T, exports.UIMenuItem = I, exports.UIMenuListItem = M, exports.UIMenuCheckboxItem = w, exports.UIMenuSliderItem = O, exports.BadgeStyle = h, exports.Point = u, exports.Size = m, exports.Color = a, exports.Font = r, exports.ItemsCollection = S, exports.ListItem = x
}]);

Ptero.Fourier.scene_loading = (function(){

	var bgSprite, bgPos;

	var time;

	var wheelRadius = 100;
	var wheelBillboard;
	var wheelPos;

	return {
		init: function() {
			bgSprite = Ptero.assets.sprites['title'];
			var frustum = Ptero.screen.getFrustum();
			bgPos = {
				x:0,
				y:0,
				z: frustum.near,
			};

			time = 0;
			
			var x = wheelRadius;
			var y = wheelRadius;
			var w = wheelRadius*2;
			var h = wheelRadius*2;
			wheelBillboard = new Ptero.Billboard(x,y,w,h,1);
			wheelPos = {
				x: 0,
				y: frustum.nearBottom/2,
				z: frustum.near,
			};
		},
		update: function(dt) {
			time += dt;
		},
		draw: function(ctx) {
			bgSprite.draw(ctx, bgPos);

			ctx.save();
			wheelBillboard.transform(ctx, wheelPos);

			var r = wheelRadius;
			ctx.translate(r,r);

			var i,len=16;
			var dx,dy;
			var da = Math.PI*2/len;
			ctx.lineWidth = 12;
			for (i=0; i<len; i++) {
				var a = da*i;
				ctx.beginPath();
				ctx.moveTo(0,0);
				dx = Math.cos(a);
				dy = Math.sin(a);
				ctx.beginPath();
				ctx.moveTo(dx*r*0.5, dy*r*0.5);
				ctx.lineTo(dx*r, dy*r);
				var alpha = 1.0 -((Math.floor(time/0.1)+i) % len)/len;
				ctx.strokeStyle = "rgba(255,255,255,"+alpha+")";
				ctx.stroke();
			}

			ctx.restore();
		},
	};
})();
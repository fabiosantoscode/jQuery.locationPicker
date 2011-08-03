/*!
 * jQuery.locationPicker() plugin.
 *
 * @author Lupo Montero <lupo@e-noise.com>
 */
(function(c){var e={flags_path:"img/flags"};var a=function(f){return function(){var g=c(this),h=g.attr("title");f.node.val(h.replace(/, /g,","));f.node.data("loc",g.data("loc"));f.node.data("geo",g.data("geo"));f.locInput.val(h).hide();f.selHolder.html(h);f.selHolderWrapper.show();f.locList.hide()}};var d=function(h,r,o){var p,q,n,l,m,g,u,t,w,s,v,f="";if(!o||!o.length){return}r.locList.hide().html("");for(p=0,q=o.length;p<q;p++){w=o[p];loc={};u=c("<li>");t=c("<a>");t.attr("href","#");t.html(w.formatted_address);s=w.address_components||[];for(n=0,l=s.length;n<l;n++){for(m=0,g=s[n].types.length;m<g;m++){if(s[n].types[m]==="country"){loc.country={short_name:s[n].short_name,long_name:s[n].long_name}}else{if(s[n].types[m]==="locality"){loc.locality={short_name:s[n].short_name,long_name:s[n].long_name}}else{if(s[n].types[m]==="administrative_area_level_1"){loc.state={short_name:s[n].short_name,long_name:s[n].long_name}}}}}}f="";if(loc.locality){f+=loc.locality.short_name}if(loc.state&&loc.state.short_name&&(!loc.locality||loc.state.short_name!==loc.locality.short_nameshort_name)){if(f.length>0){f+=", "}f+=loc.state.short_name}if(loc.country){f+=", "+loc.country.short_name;v=loc.country.short_name.toLowerCase();t.addClass(v);if(h.flags_path){t.css("background-image","url("+h.flags_path+"/"+v+".png)")}}t.attr("title",f);t.data("loc",loc);t.data("geo",w);t.click(a(r));u.append(t);r.locList.append(u)}r.locList.show()};var b=function(j,i){var l={node:i,wrapper:c('<div class="location-picker" style="position: relative; display: inline;">'),locInput:c('<input size="30">'),locList:c('<ul style="position: absolute; left: 0;">').hide(),selHolderWrapper:c('<span class="placeholder">').hide(),selHolder:c("<span>"),selHolderCloseBtn:c('<a href="#">X</a>')},f=l.wrapper,k=l.locInput,g=l.locList,m=l.selHolderWrapper,q=l.selHolder,h=l.selHolderCloseBtn,n,p="",o;k.keydown(function(){if(n){clearTimeout(n)}});k.keyup(function(){var r=k.val();if(r===p){return}p=r;if(r.length<3){return}if(n){clearTimeout(n)}k.addClass("location-picker-loading");n=setTimeout(function(){var t,s;if(o){o.abort()}o=c.ajax({url:"proxy.php?s="+encodeURIComponent(r),dataType:"json",success:function(u){if(!u||!u.status||u.status!=="OK"){}k.removeClass("location-picker-loading");d(j,l,u.results)}})},500)});h.click(function(){m.hide();k.show();g.show()});m.append(q);m.append(h);f.append(k);f.append(m);f.append(g);i.hide().before(f)};c.fn.locationPicker=function(f){var g=c.extend(e,f||{});c(this).each(function(h){b(g,c(this))})}})(jQuery);
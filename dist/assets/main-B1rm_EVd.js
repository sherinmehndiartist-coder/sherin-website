import{s as n}from"./main-DX9-Gp6c.js";async function l(){try{const{data:r,error:o}=await n.from("products").select("*").limit(3).order("created_at",{ascending:!1});if(!o&&r){const a=document.getElementById("home-products-grid");r.length===0?a.innerHTML='<p style="text-align: center; width: 100%; color: var(--text-secondary);">Check back soon for new products.</p>':(a.innerHTML="",r.forEach(e=>{let t="";e.image_url&&(t=`<img src="${e.image_url}" alt="${e.name}" class="product-img" />`),a.innerHTML+=`
                  <div class="product-card">
                      ${t}
                      <div class="product-info">
                          <h3 class="product-title">${e.name}</h3>
                          <div class="product-price">
                              ${e.offer_price?`<span class="original-price" style="text-decoration: line-through; color: var(--text-secondary); font-size: 0.9rem; margin-right: 0.5rem;">₹${e.price}</span> <span style="font-weight: 600; color: var(--accent-gold);">₹${e.offer_price}</span>`:`<span style="font-weight: 600; color: var(--accent-gold);">₹${e.price}</span>`}
                          </div>
                          <a href="/shop.html" class="btn btn-primary" style="margin-top:1rem; display:block; text-align:center; padding:0.5rem;">Shop Now</a>
                      </div>
                  </div>
              `}))}}catch(r){console.error("Home products fetch fail:",r)}try{let{data:r,error:o}=await n.from("packages").select("*").eq("status","Active").order("price",{ascending:!0}).limit(3);if(!o&&r){const a=document.getElementById("home-pricing-grid");r.length===0?a.innerHTML='<p style="text-align: center; width: 100%; color: var(--text-secondary);">Packages are being updated.</p>':(a.innerHTML="",r.forEach(e=>{const t=e.highlight;let i="";e.features&&Array.isArray(e.features)&&(i=e.features.map(s=>`<li>✓ ${s}</li>`).join(""));const c=t?'<div style="position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--accent-gold); color: white; padding: 4px 16px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em;">MOST POPULAR</div>':"";a.innerHTML+=`
                       <div class="pricing-card ${t?"elevated":""}">
                          ${c}
                          <h3 style="color: var(--text-secondary); font-size: 1.25rem;">${e.name}</h3>
                          <h4 style="font-size: 2.5rem; margin: 1rem 0; ${t?"color: var(--accent-gold);":"color: var(--text-primary);"}">₹${e.price}</h4>
                          <ul style="margin: 1.5rem 0 2.5rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.8rem; text-align: left;">
                              ${i}
                          </ul>
                          <a href="/booking.html?package=${encodeURIComponent(e.name)}" class="btn ${t?"btn-primary":"btn-secondary"}" style="width: 100%; ${t?"":"border-color: var(--border-color); color: var(--text-primary);"}">Book ${e.name}</a>
                       </div>
                   `}))}}catch(r){console.error("Home packages fetch fail:",r)}}document.addEventListener("DOMContentLoaded",l);

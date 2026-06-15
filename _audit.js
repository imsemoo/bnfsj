const fs=require("fs");const css=fs.readFileSync("css/pages.css","utf8");const L=css.split(/\r?\n/);
const find=(re,label)=>{const hits=[];L.forEach((l,i)=>{if(re.test(l))hits.push((i+1)+': '+l.trim().slice(0,70));});if(hits.length)console.log(`\n=== ${label} (${hits.length}) ===\n`+hits.join("\n"));};
// hardcoded px font-sizes not in token (font-size: Npx or font: ... Npx)
find(/font(-size)?:[^;]*\b(9|10|11|13|15|17|19|20|21|23|25|26)px/, "px font-sizes off-scale");
find(/\b0\.[0-9]+s\b/, "raw seconds (transitions/anim)");
find(/cubic-bezier/, "raw cubic-bezier");
find(/box-shadow:[^;]*rgba\([^)]*0\.[3-9]/, "heavy shadows (alpha>=0.3)");
find(/border-radius:\s*[0-9]+px/, "raw px radius");
find(/letter-spacing/, "letter-spacing (check Arabic)");
find(/transition:\s*all\b/, "transition: all");
find(/margin|padding/, "spacing decls count only").length;
// count spacing values not using var(--space)
let raw=0; L.forEach(l=>{const m=l.match(/(margin|padding|gap)[^;:]*:\s*([^;]+);/g);});
console.log("\n=== px gap/margin/padding literals (non-token, excl 0/1px/2px hairlines) ===");
L.forEach((l,i)=>{ const m=l.match(/\b(margin|padding|gap|inset)[a-z-]*:\s*[^;]*\b([3-9]|1[0-9]|2[0-9])px/); if(m && !/var\(/.test(l) && !/border|shadow|radius|width:|height:|transform|translate|blur|::|svg/.test(l)) console.log((i+1)+': '+l.trim().slice(0,72)); });

/* Power Nation — store data.
   PRICES ARE PLACEHOLDERS: replace with real prices before going live.
   Images: drop files at images/products/<id>.jpg (main). For extra views add <id>-2.jpg and <id>-3.jpg and set extraViews: true.
   For a photo per colour, add images: { colourKey: "images/products/file.jpg" } (and optional colourNames). */

window.PN_COLOURS = {
  black:    { name: "Black",        hex: "#141216" },
  white:    { name: "White",        hex: "#f3f1f5" },
  pink:     { name: "Hot Pink",     hex: "#ff3d8e" },
  babypink: { name: "Baby Pink",    hex: "#f6b5cf" },
  red:      { name: "Red",          hex: "#d4182f" },
  purple:   { name: "Purple",       hex: "#6c2fb5" },
  royal:    { name: "Royal Blue",   hex: "#1f50d4" },
  navy:     { name: "Navy",         hex: "#17244c" },
  teal:     { name: "Teal",         hex: "#10a39a" },
  gold:     { name: "Gold",         hex: "#d1a23a" },
  silver:   { name: "Silver",       hex: "#b8bbc4" },
  ab:       { name: "AB Iridescent", hex: "linear-gradient(135deg,#ffb3dc,#b9a6ff 30%,#9fd7ff 55%,#d4ffe9 75%,#fff0a8)" }
};

window.PN_CATEGORIES = {
  bows:        { name: "Bows",              sub: "Big, bold, competition-ready." },
  practice:    { name: "Practice Wear",     sub: "Built for full-out reps." },
  warmups:     { name: "Hoodies & Warm-ups", sub: "Arrive like a team." },
  bags:        { name: "Backpacks & Bags",  sub: "Comp day, sorted." },
  accessories: { name: "Accessories",       sub: "Poms, holders and the rest." },
  shoes:       { name: "Cheer Shoes",       sub: "Official Nfinity stockist." }
};

const YOUTH_ADULT = ["YXS", "YS", "YM", "YL", "AXS", "AS", "AM", "AL", "AXL"];
const ADULT = ["XS", "S", "M", "L", "XL", "XXL"];
const SHOE = ["UK 1", "UK 2", "UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8", "UK 9"];
const ONE = ["One size"];

window.PN_PRODUCTS = [
  { id: "signature-bow", name: "Signature Comp Bow", sub: "3\" grosgrain cheer bow", cat: "bows", price: 12, tags: ["best"], colours: ["pink", "black", "white", "red", "royal", "purple", "teal", "navy", "gold", "silver", "babypink"], sizes: ONE,
    desc: "Our best-selling competition bow. 3-inch grosgrain ribbon, stiffened so it holds its shape through every basket toss, on a hair elastic that stays put.",
    details: ["3\" (7.5cm) ribbon, approx. 20cm wide", "Stiffened to hold shape", "Secure hair elastic", "Add your team logo on bulk orders"] },
  { id: "rhinestone-bow", name: "Full Rhinestone Bow", sub: "Hand-stoned AB crystal bow", cat: "bows", price: 28, tags: ["best"], colours: ["ab", "silver", "gold", "pink", "black"], sizes: ONE,
    desc: "Fully covered in hand-applied rhinestones that catch every stage light. The finishing touch for elite and worlds teams.",
    details: ["Hand-applied 3mm stones", "AB or full-colour options", "Fully stiffened core", "Ships in a protective bow box"] },
  { id: "metallic-bow", name: "Mirror Metallic Bow", sub: "High-shine competition bow", cat: "bows", price: 16, tags: ["new"], colours: ["silver", "gold", "pink", "royal", "red", "purple"], sizes: ONE,
    desc: "Mirror-finish metallic fabric over a stiff core. Matches our metallic uniform upgrades exactly.",
    details: ["Mirror metallic finish", "Matches metallic uniform fabric", "Hair elastic fitting"] },
  { id: "logo-bow", name: "Custom Team Logo Bow", sub: "Sublimated with your logo", cat: "bows", price: 14, tags: ["team"], colours: ["pink", "black", "white", "red", "royal", "purple", "teal", "navy"], sizes: ONE,
    desc: "Your club logo and colours, sublimated edge to edge. Free design included, no minimum order.",
    details: ["Free design", "No minimum order", "Full-colour sublimation", "Lead time approx. 3 weeks"] },
  { id: "mini-bow", name: "Tiny Tots Mini Bow", sub: "2\" bow for minis", cat: "bows", price: 9, tags: [], colours: ["pink", "babypink", "white", "purple", "teal"], sizes: ONE,
    desc: "A smaller 2-inch bow sized for tiny and mini athletes, on a soft no-snag elastic.",
    details: ["2\" ribbon", "Soft no-snag elastic", "Sized for ages 3–8"] },

  { id: "power-crop", name: "Power Crop Top", sub: "Seamless practice crop", cat: "practice", price: 24, tags: ["new", "best"], colours: ["black", "pink", "white", "purple", "royal", "teal"], sizes: YOUTH_ADULT,
    desc: "A locked-in, seamless crop that stays put through tumbling passes. Double-layer front, sweat-wicking fabric.",
    details: ["Seamless knit", "Double-layer front", "Sweat-wicking", "Add rhinestone or vinyl team name"] },
  { id: "practice-shorts", name: "Practice Shorts", sub: "Stretch high-waist short", cat: "practice", price: 20, tags: ["best"], colours: ["black", "navy", "pink", "white", "purple"], sizes: YOUTH_ADULT,
    desc: "High-waist four-way-stretch shorts with a wide waistband that doesn't roll during stunts.",
    details: ["Four-way stretch", "Wide no-roll waistband", "Squat-proof fabric"] },
  { id: "rhinestone-tee", name: "Rhinestone Practice Tee", sub: "Your team name in stones", cat: "practice", price: 30, tags: ["team"], colours: ["black", "white", "pink"], sizes: YOUTH_ADULT,
    desc: "Soft, boxy practice tee with your team name in AB or full-colour rhinestones. Designs up to 32 × 40cm.",
    details: ["2–5mm AB or full-colour stones", "Max design area 32 × 40cm", "Free design", "No minimum order"] },
  { id: "cropped-tee", name: "Oversized Cropped Tee", sub: "Boxy practice tee", cat: "practice", price: 22, tags: ["new"], colours: ["white", "black", "babypink", "silver"], sizes: YOUTH_ADULT,
    desc: "Heavyweight cotton, boxy cropped fit. Wear it over a crop for warm-ups.",
    details: ["Heavyweight cotton", "Cropped boxy fit", "Pre-shrunk"] },
  { id: "flyer-leggings", name: "Flyer Leggings", sub: "Full-length seamless legging", cat: "practice", price: 32, tags: [], colours: ["black", "purple", "navy", "pink"], sizes: YOUTH_ADULT,
    desc: "Seamless, high-rise leggings with grip-friendly fabric for stunting.",
    details: ["Seamless high-rise", "Grip-friendly finish", "Squat-proof"] },
  { id: "racer-tank", name: "Racerback Practice Tank", sub: "Lightweight training tank", cat: "practice", price: 20, tags: [], colours: ["white", "black", "pink", "royal", "red"], sizes: YOUTH_ADULT,
    desc: "Featherweight racerback tank for hot gyms and summer camps.",
    details: ["Lightweight mesh-knit", "Racerback cut", "Quick-dry"] },

  { id: "team-hoodie", name: "Team Hoodie", sub: "Heavyweight fleece hoodie", cat: "warmups", price: 38, tags: ["best"], colours: ["black", "navy", "pink", "purple", "white", "red"], sizes: YOUTH_ADULT,
    desc: "Heavyweight brushed fleece with your club name embroidered, vinyled or stoned on the back.",
    details: ["350gsm brushed fleece", "Embroidery, vinyl or rhinestone", "Kangaroo pocket", "No minimum order"] },
  { id: "warmup-jacket", name: "Full-Zip Warm-Up Jacket", sub: "Competition walk-out jacket", cat: "warmups", price: 48, tags: ["new", "team"], colours: ["black", "navy", "royal", "red", "purple"], sizes: YOUTH_ADULT,
    desc: "The jacket your team walks out in. Satin-touch shell, contrast piping and your crest on the chest.",
    details: ["Satin-touch shell", "Contrast piping", "Crest + name personalisation"] },
  { id: "team-joggers", name: "Team Joggers", sub: "Tapered fleece jogger", cat: "warmups", price: 32, tags: [], colours: ["black", "navy", "silver", "pink"], sizes: YOUTH_ADULT,
    desc: "Tapered fleece joggers that match the Team Hoodie.",
    details: ["Brushed fleece", "Tapered cuffed leg", "Zip pockets"] },
  { id: "parent-hoodie", name: "Proud Cheer Parent Hoodie", sub: "For the loudest fans", cat: "warmups", price: 40, tags: [], colours: ["black", "pink", "navy", "white"], sizes: ADULT,
    desc: "Adult hoodie for the parents in the stands. Add your athlete's name and team on the back.",
    details: ["Adult sizing", "Personalise with athlete name", "Heavyweight fleece"] },

  { id: "nfinity-backpack", name: "Nfinity Backpack", sub: "Classic pink or Black Sparkle", cat: "bags", price: 55, tags: ["new", "best"], colours: ["pink", "black"], sizes: ONE,
    colourNames: { pink: "Classic Pink", black: "Black Sparkle" },
    images: { pink: "images/products/nfinity-backpack-pink.jpg", black: "images/products/nfinity-backpack-black.jpg" },
    desc: "The cheer backpack athletes ask for by name, from Nfinity. Choose Classic Pink or glittering Black Sparkle, both with the embroidered white Nfinity logo. Power Nation is an official Nfinity distributor.",
    details: ["Official Nfinity product", "Embroidered Nfinity logo", "Large main compartment + front zip pocket", "Mesh side pockets and side clip straps", "Padded top carry handle"] },
  { id: "comp-backpack", name: "Competition Backpack", sub: "Shoe pocket + bow clip", cat: "bags", price: 45, tags: ["best"], colours: ["black", "pink", "navy", "purple"], sizes: ONE,
    desc: "Separate vented shoe compartment, padded laptop sleeve and an external bow clip. Add a name for free.",
    details: ["Vented shoe compartment", "External bow clip", "Free name embroidery", "Water-resistant base"] },
  { id: "weekender", name: "Weekender Duffel", sub: "Two-day comp bag", cat: "bags", price: 40, tags: [], colours: ["black", "navy", "pink"], sizes: ONE,
    desc: "Big enough for a two-day competition: uniform, warm-ups, shoes and snacks.",
    details: ["45L capacity", "Wet/dry pocket", "Padded shoulder strap"] },
  { id: "bow-bag", name: "Clear Bow Bag", sub: "Keep bows crush-free", cat: "bags", price: 8, tags: [], colours: ["white", "pink", "black"], sizes: ONE,
    desc: "Clear zip bag that keeps your bow in shape in your kit bag.",
    details: ["Clear PVC", "Zip close", "Fits one large bow"] },

  { id: "comp-poms", name: "Competition Poms", sub: "Metallic + matte mix", cat: "accessories", price: 22, tags: [], colours: ["pink", "silver", "gold", "royal", "red", "purple", "black", "white"], sizes: ONE,
    desc: "Full, fluffy poms in up to three colours. Mix metallic and matte to match your uniform.",
    details: ["6\" strands", "Baton handle", "Mix up to 3 colours"] },
  { id: "bow-holder", name: "Bow Holder Banner", sub: "Personalised wall banner", cat: "accessories", price: 18, tags: ["new"], colours: ["pink", "black", "purple", "white"], sizes: ONE,
    desc: "Show off your bow collection. Personalised with your athlete's name.",
    details: ["Holds up to 12 bows", "Personalised name", "Wall hook included"] },
  { id: "team-bottle", name: "Team Water Bottle", sub: "Insulated steel bottle", cat: "accessories", price: 12, tags: [], colours: ["pink", "black", "white", "teal"], sizes: ONE,
    desc: "Double-walled steel bottle that keeps water cold through a full day at comp.",
    details: ["750ml", "Double-walled steel", "Add a name"] },
  { id: "crew-socks", name: "Cheer Crew Socks (3 pack)", sub: "Cushioned crew socks", cat: "accessories", price: 10, tags: [], colours: ["white", "black"], sizes: ["S", "M", "L"],
    desc: "Cushioned crew socks that won't slip down inside your cheer shoes.",
    details: ["Cushioned sole", "Arch support band", "Pack of 3"] },

  { id: "nfinity-vengeance", name: "Nfinity Vengeance", sub: "Competition cheer shoe", cat: "shoes", price: 105, tags: ["best"], colours: ["black", "white"], sizes: SHOE,
    images: { black: "images/products/nfinity-vengeance-black.jpg" },
    desc: "The lightweight competition shoe built for stunting and tumbling, from Nfinity. Power Nation is an official Nfinity distributor.",
    details: ["Official Nfinity product", "Finger grips for stunting", "Lightweight sole"] },
  { id: "nfinity-flyte", name: "Nfinity Flyte", sub: "Lightweight cheer shoe", cat: "shoes", price: 95, tags: [], colours: ["white", "black"], sizes: SHOE,
    desc: "Featherlight cheer shoe with a flexible sole, ideal for flyers.",
    details: ["Official Nfinity product", "Ultra-light build", "Flexible sole"] }
];

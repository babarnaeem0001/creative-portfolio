import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const pages = [
  { file: "index.html", route: "home" },
  { file: path.join("work", "index.html"), route: "work" },
  { file: path.join("gallery", "index.html"), route: "gallery" },
  { file: path.join("contact", "index.html"), route: "contact" },
];

const metaByRoute = {
  home: {
    title: "Babar Naeem | AI Engineer &amp; Data Scientist",
    description:
      "I'm Babar Naeem - an AI Engineer and Data Scientist based in Islamabad, Pakistan. I build intelligent systems, automation workflows, and full-stack applications from idea to execution.",
  },
  work: {
    title: "Babar Naeem | Selected Projects",
    description:
      "Selected AI, automation, and full-stack development work by Babar Naeem - from mobile apps to RAG systems.",
  },
  gallery: {
    title: "Babar Naeem | Research Notes",
    description:
      "Research notes, process snapshots, and technical insights from Babar Naeem's AI and development practice.",
  },
  contact: {
    title: "Babar Naeem | Contact",
    description:
      "Start a conversation with Babar Naeem about AI systems, automation, and full-stack development projects.",
  },
};

const portfolioAssets = [
  "pos-solution-app.png",
  "dastarkhaan-app.png",
  "study-app.png",
  "intent-classifier.jpg",
  "voice-reception-automation.jpg",
  "studyfocus.jpg",
  "artistic-portfolio-website.jpg",
  "ai-systems-poster.svg",
];

const decodeHtml = (value) =>
  value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/&quot;/gi, '"');

const normalize = (value) =>
  decodeHtml(String(value || ""))
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[^a-z0-9]+/gi, "")
    .toLowerCase();

const exactRules = new Map(
  [
    ["Palmer", "Babar Naeem"],
    ["Based in Tokyo", "Based in Pakistan"],
    ["Art Director + Framer Developer", "AI Engineer + Data Scientist"],
    ["Independent", "Applied"],
    ["Overview", "Systems"],
    ["Multidisciplinary", "Modeling"],
    ["Focused", "Scalable"],
    ["Cairo", "Dastarkhaan"],
    ["Oslo", "StudyFocus"],
    ["Chain", "POS Solution"],
    ["Manila", "Intent Classifier"],
    ["Theo", "Voice Reception AI"],
    ["Clarifications", "Scope Notes"],
    ["What services do you offer?", "What do you build?"],
    ["What is your typical turnaround time?", "How do you scope AI projects?"],
    ["Do you only work in Framer?", "Do you work with existing data stacks?"],
    ["Can you handle both design and build?", "Can you take ideas from prototype to production?"],
    ["Do you offer brand strategy too?", "Do you help with evaluation and monitoring?"],
    ["Studio Wrap", "Built for Real Use"],
    ["Art Direction", "AI Systems"],
    ["Branding", "Data Science"],
    ["Strategy", "LLM Design"],
    ["Web Design", "Automation"],
    ["Pattern Dimensions", "Code, Intelligence,"],
    ["and Moments that", "Automation systems"],
    ["Connect and Leave a", "that think,"],
    ["Bold", "learn, and ship."],
    ["Babar", "Babar"],
    ["Digital Designer", "AI Engineer"],
    ["Visual Freelancer", "Data Scientist"],
    ["Visual", "Data"],
    ["Freelancer", "Scientist"],
    ["Digital Nomad", "Full Stack Developer"],
    ["Creative Developer", "Automation Architect"],
    ["Creative Development", "Applied AI"],
    ["Sonder Goods", "Dastarkhaan"],
    ["Halo Wear", "Taj Mahal App"],
    ["Lucent Lab", "StudyFocus"],
    ["Arc Bloom", "Intent Classifier"],
    ["Atelier Nara", "RAG System"],
    ["Creative Direction", "Restaurant App"],
    ["Identity Design", "NLP / AI"],
    ["Portfolio Site", "AI Automation"],
    ["Services", "Capabilities"],
    ["Precise", "Practical"],
    ["Structured", "Reliable"],
    ["Visual Language", "AI Strategy"],
    ["Brand Identity", "Data Products"],
    ["Motion Direction", "LLM Workflows"],
    ["Framer Sites", "Analytics Apps"],
    ["Visual Thinker", "Systems Thinker"],
    ["Experience", "Experience"],
    ["Digital Craft", "AI Delivery"],
    ["Global", "Remote"],
    ["Creative Collabs", "AI Collaborations"],
    ["Studio", "Product"],
    ["Creative Partnerships", "Technical Partnerships"],
    ["Clavmen Studio", "Independent Practice"],
    ["2022 - Present", "2023 - Present"],
    ["Art Director / Designer", "AI Engineer &amp; Full Stack Developer"],
    ["Tokyo", "Islamabad, Pakistan"],
    ["Modular Eight", "LLM Systems"],
    ["Senior Developer", "RAG Pipelines + Agent Workflows"],
    ["Osaka", "Remote"],
    ["Haus of Signal", "App Development"],
    ["Creative Technologist", "Full Stack Mobile &amp; Web Apps"],
    ["Berlin", "Pakistan"],
    ["Studio Orbit", "Automation Design"],
    ["UI/UX Designer", "Workflow Architect"],
    ["Dallas", "Remote"],
    ["Novaform Labs", "ML / AI Projects"],
    ["Junior Designer", "NLP + Intent Classification + Predictive Systems"],
    ["Kyoto", "Applied"],
    ["Lisa Kuroda", "Dmitri Volkov"],
    ["Lisa Kuroda", "Farid Rahmonov"],
    ["Dmitri Volkov", "Farid Rahmonov"],
    ["Founder, Studio Analog", "Babar turned our rough AI idea into a clear working product. The build was fast, practical, and easy for our team to use."],
    ["Useful systems, not empty demos", "Founder, data startup"],
    ["Turned a fuzzy AI brief into a product we could launch.", "Babar turned our rough AI idea into a clear working product. The build was fast, practical, and easy for our team to use."],
    ["Daniel Reyes", "Elena Kowalski"],
    ["Daniel Reyes", "Elena Markovic"],
    ["Elena Kowalski", "Elena Markovic"],
    ["Director, Framehaus", "He understood the workflow quickly and delivered an automation system that removed hours of manual work every week."],
    ["Clean workflows that actually save time", "Product lead"],
    ["Strong on backend logic, data flow, and polished delivery.", "He understood the workflow quickly and delivered an automation system that removed hours of manual work every week."],
    ["Mei Tanaka", "Amara Chen"],
    ["Mei Tanaka", "Aigerim Sadykova"],
    ["Amara Chen", "Aigerim Sadykova"],
    ["UX Designer, Nuro", "The RAG workflow Babar built gave us cleaner answers, better search, and a much more reliable internal knowledge base."],
    ["Built a RAG pipeline that works in production", "Research manager"],
    ["Built a retrieval workflow our team actually trusts every day.", "The RAG workflow Babar built gave us cleaner answers, better search, and a much more reliable internal knowledge base."],
    ["San Francisco", "Austin, USA"],
    ["Julian Pierce", "Idris Bennani"],
    ["Marcus Johnson", "Idris Bennani"],
    ["Director, Vektor Inc.", "Babar communicates clearly, ships quickly, and thinks through the product details instead of only writing code."],
    ["Shipped a polished app from scratch, fast", "Operations director"],
    ["Fast execution, clean thinking, and a very usable final system.", "Babar communicates clearly, ships quickly, and thinks through the product details instead of only writing code."],
    ["London", "Casablanca"],
    ["Hana Samoto", "Samina Qureshi"],
    ["Fatima Al-Rashid", "Samina Qureshi"],
    ["CEO, Willow Studio", "He handled the AI layer, data logic, and app experience with real care. The result felt polished and dependable."],
    ["Reliable output for real teams", "Founder, consultancy"],
    ["Handled both the AI layer and product details with real care.", "He handled the AI layer, data logic, and app experience with real care. The result felt polished and dependable."],
    ["I design AI products to be useful first: measurable, understandable, and ready for real workflows.", "Babar turned our rough AI idea into a clear working product. The build was fast, practical, and easy for our team to use."],
    ["Every system I build needs a strong backbone: clear data, thoughtful evaluation, and clean delivery.", "He understood the workflow quickly and delivered an automation system that removed hours of manual work every week."],
    ["Good AI work is not hype. It is accuracy, latency, usability, and trust working together.", "The RAG workflow Babar built gave us cleaner answers, better search, and a much more reliable internal knowledge base."],
    ["The best products turn messy operational problems into calm, repeatable decisions.", "Babar communicates clearly, ships quickly, and thinks through the product details instead of only writing code."],
    ["I like shipping fast, but I care even more about making the thing dependable once it is live.", "He handled the AI layer, data logic, and app experience with real care. The result felt polished and dependable."],
    ["Islamabad", "Islamabad"],
    ["Awards", "Focus Areas"],
    ["Awwwards", "LLM"],
    ["CSSD", "Full Stack"],
    ["Framer", "Automation"],
    ["Dribbble", "Databases"],
    ["FWA", "MLOps"],
    ["CSSDA", "Decisioning"],
    ["27x", "01x"],
    ["14x", "02x"],
    ["09x", "03x"],
    ["08x", "04x"],
    ["Custom Quotes", "Flexible Scope"],
    ["Design Packages", "Service Packages"],
    ["Pricing Tiers", "Delivery Models"],
    ["$99", "$300"],
    ["$299", "$800"],
    ["$899", "$1,500"],
    ["/Month", "/ Project"],
    ["Starter Plan", "Starter Sprint"],
    ["One page Framer site", "Problem framing workshop"],
    ["Custom layout visuals", "Solution architecture"],
    ["Mobile-first responsive build", "Data and tooling review"],
    ["Design system setup", "Success metric definition"],
    ["SEO-ready structure", "Risk and dependency mapping"],
    ["Basic CMS integration", "Execution roadmap"],
    ["Contact form setup", "Clear handoff notes"],
    ["Growth Plan", "Build Phase"],
    ["Up to 5 pages", "Pipeline implementation"],
    ["Framer CMS-powered sections", "Model or prompt design"],
    ["Component-based structure", "Evaluation loops"],
    ["Motion design transitions", "Workflow automation"],
    ["Clean UX-focused layout", "Simple user experience"],
    ["Device-optimized responsiveness", "Monitoring basics"],
    ["Style guide system", "Documentation and guides"],
    ["Email capture integrations", "System integrations"],
    ["Full Scope Plan", "Full System"],
    ["10 pages with CMS", "Production architecture"],
    ["Advanced layout strategy", "Full data workflow"],
    ["Full brand system support", "Experimentation and eval"],
    ["Animation direction", "Governance and QA"],
    ["Custom-built components", "Custom product surfaces"],
    ["Framer CMS training", "Team enablement"],
    ["Launch support &amp; QA", "Launch and tuning"],
    ["Performance optimization", "Performance optimization"],
    ["Creative Notes", "Field Notes"],
    ["Gregory Lalle", "Babar Naeem"],
    ["May 21, 2024", "April 2026"],
    ["Clive Willow", "Babar Naeem"],
    ["February 5, 2024", "March 2026"],
    ["Ravin Claw", "Babar Naeem"],
    ["June 2, 2024", "February 2026"],
    ["Clay Nicolas", "Babar Naeem"],
    ["June 10, 2025", "January 2026"],
    ["2025", "2026"],
    ["Design", "LLM"],
    ["Visual Identity", "Full Stack"],
    ["Portfolio", "Automation"],
    ["Works", "Projects"],
    ["All Works", "Selected Projects"],
    ["Gallery", "Research"],
    ["Call Me", "Let's Work"],
    ["24/7 Support", "Project Inquiries"],
    ["Remote", "Remote"],
    ["Contact Now", "View Projects"],
  ].map(([from, to]) => [normalize(from), to])
);

const containsRules = [
  ["curatedinterfaces", ""],
  ["ibuildexpressiveperformancedrivenwebsites", "I build AI systems, data products, analytics workflows, and automation experiences that are clear, production-minded, and built to create measurable value."],
  ["iblendcleandesignandnativedevelopmentinsideframer", "I build AI systems, data products, analytics workflows, and automation experiences that are clear, production-minded, and built to create measurable value."],
  ["clarifyingdeliverablesbeforetheybegin", "Questions about scope, models, data, and delivery before we build anything important."],
  ["whatsyourprocesslike", "What does collaboration look like?"],
  ["finalsection", "Closing Notes"],
  ["patterndimensionsandmoments", "Code, Intelligence,<br>and Automation"],
  ["13years", "I'm Babar Naeem - an AI Engineer and Data Scientist based in Islamabad, Pakistan. I build AI systems, automation workflows, and full-stack applications that are practical, fast, and built to scale."],
  ["relentlesscreativediscipline", "I'm Babar Naeem - an AI Engineer and Data Scientist based in Islamabad, Pakistan. I build AI systems, automation workflows, and full-stack applications that are practical, fast, and built to scale."],
  ["featuredprojects", "Featured Projects"],
  ["featuredworks", "Selected Work"],
  ["everyprojectisachancetoblenddesignanddevelopment", "From retrieval systems to forecasting pipelines, I turn complex model and data work into products people can actually use."],
  ["sleekdigitalrealities", "From retrieval systems to forecasting pipelines, I turn complex model and data work into products people can actually use."],
  ["weguideeveryvisualdecision", "I build AI and automation systems that solve real problems, not demos. Every project ships with clear goals and measurable outcomes."],
  ["fromstrategytoexecutionweshapeconsistentbrandsystems", "Clean pipelines, strong evaluation, and production-ready code. Systems you can trust in the real world."],
  ["weusemotionasadesigntool", "From prototype to full deployment. I design architectures that grow with your needs."],
  ["designmeetsexecutionwithrealtimescalablewebsites", "LLMs, RAG systems, intent classifiers, and automation workflows tailored to your use case."],
  ["webridgecreativedirectionwithrealworldexecution", "I bridge experimentation and delivery, combining modeling, data work, and product thinking into systems that are useful, fast, and built to hold up in production."],
  ["blendingdesignandcodewithfunctionalclarity", "Building intelligent systems with useful data, clear models, and production-grade execution."],
  ["seamlessworkflow", "I bridge experimentation and delivery, combining modeling, data work, and product thinking into systems that are useful, fast, and built to hold up in production."],
  ["pickplans", "Build Track"],
  ["testimonialreviews", "Working Principles"],
  ["akihikoelevatedeverylayer", '"I design AI products to be useful first: measurable, understandable, and ready for real workflows."'],
  ["akihikoapproacheseveryproject", '"Every system I build needs a strong backbone: clear data, thoughtful evaluation, and clean delivery."'],
  ["hisabilitytomerge", '"Good AI work is not hype. It is accuracy, latency, usability, and trust working together."'],
  ["workingwithakihikowasmorethan", '"The best products turn messy operational problems into calm, repeatable decisions."'],
  ["akihikobringsararebalance", '"I like shipping fast, but I care even more about making the thing dependable once it is live."'],
  ["selectedhonors", "Core Specialties"],
  ["recognizedforboldinteraction", "Building RAG systems, intent classifiers, and AI-powered pipelines using LangChain and HuggingFace."],
  ["awardedforoutstandingexecution", "React, Next.js, Node.js, FastAPI - end-to-end apps with clean architecture."],
  ["celebratedforfrontendexcellence", "Workflow systems that reduce manual work and increase signal."],
  ["highlightedforstrongtypographicsystems", "PostgreSQL, MongoDB, MySQL, Redis, Pinecone - strong data foundations."],
  ["projectpricing", "Engagement Models"],
  ["perfectforsmalllaunchesandpersonalsites", "Focused AI, automation, or app work - scoped, fast, and actionable."],
  ["fastdeliverywithindays", "Rapid prototype plan"],
  ["designedforgrowingbrandsthatneedflexibility", "For teams ready to turn a validated use case into a working product or internal tool."],
  ["bestforstudiosorteamsneedingstructure", "End-to-end development - from architecture to production deployment, with full handoff."],
  ["visualjournal", "Research Notes"],
  ["featuredarticle", "Notebook"],
  ["gooddesignisnotjustaboutstructure", "How I build RAG systems and intent classifiers that ship to production."],
  ["typographytodayisnolongerstatic", "From Dastarkhaan to StudyFocus - what I learned shipping mobile apps."],
  ["minimaldesignisntemptiness", "Designing workflows that actually reduce manual effort."],
  ["portfoliostodaymustbemorethanarchives", "The tools and frameworks I use across full stack, AI, and databases."],
  ["officetokyojapan", "Based in Islamabad, Pakistan"],
  ["followmeoninstagram", "Available for remote AI, automation, and full stack collaborations."],
  ["sayhiakihikocom", "Use the work page as the project brief entry point."],
];

const routeHref = (route, target) => {
  const prefix = route === "home" ? "./" : "../";
  if (target === "home") return prefix;
  return `${prefix}${target}/`;
};

const assetHref = (route, file) => `${route === "home" ? "./" : "../"}assets/${file}`;

const replaceHeadMeta = (html, route) => {
  const meta = metaByRoute[route];
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${meta.description}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${meta.title}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${meta.description}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${meta.title}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${meta.description}$2`);
};

const replaceHeadImages = (html, route) =>
  html
    .replace(
      /(<link\s+href=")[^"]*framerusercontent\.com\/images\/[^"]*("\s+rel="icon"[^>]*>)/g,
      `$1${assetHref(route, "ai-systems-poster.svg")}$2`
    )
    .replace(
      /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
      `$1${assetHref(route, "pos-solution-app.png")}$2`
    )
    .replace(
      /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
      `$1${assetHref(route, "pos-solution-app.png")}$2`
    );

const replaceTextChunk = (text) => {
  const key = normalize(text);
  if (!key) return text;
  if (/\(WDX.?[^\)]*\)/i.test(text)) return "";
  if (exactRules.has(key)) return exactRules.get(key);
  const contains = containsRules.find(([fragment]) => key.includes(fragment));
  return contains ? contains[1] : text;
};

const replaceTextNodes = (html) => {
  let output = "";
  let lastIndex = 0;
  let rawTag = null;
  const tagPattern = /<!--[\s\S]*?-->|<[^>]+>/g;
  for (const match of html.matchAll(tagPattern)) {
    const tag = match[0];
    const text = html.slice(lastIndex, match.index);
    output += rawTag ? text : replaceTextChunk(text);
    output += tag;
    const lower = tag.toLowerCase();
    if (!rawTag && /^<\s*(script|style|noscript)\b/.test(lower)) {
      rawTag = lower.match(/^<\s*([a-z0-9-]+)/)?.[1] || null;
    } else if (rawTag && new RegExp(`^<\\s*/\\s*${rawTag}\\s*>`).test(lower)) {
      rawTag = null;
    }
    lastIndex = match.index + tag.length;
  }
  output += rawTag ? html.slice(lastIndex) : replaceTextChunk(html.slice(lastIndex));
  return output;
};

const replaceLinks = (html, route) =>
  html
    .replace(/href="https:\/\/x\.com\/MandroDesign"/g, `href="${routeHref(route, "contact")}"`)
    .replace(/href="https:\/\/www\.instagram\.com\/MandroDesign\/?"/g, `href="${routeHref(route, "home")}"`)
    .replace(/href="https:\/\/dribbble\.com\/MandroDesign"/g, `href="${routeHref(route, "work")}"`)
    .replace(/href="https:\/\/framer\.com\/marketplace\/creator\/Mandro"/g, `href="${routeHref(route, "gallery")}"`)
    .replace(/href="\.\/work\/sonder-goods[^"]*"/g, `href="${routeHref(route, "work")}"`)
    .replace(/href="\.\/work\/halo-wear[^"]*"/g, `href="${routeHref(route, "work")}"`)
    .replace(/href="\.\/work\/lucent-lab[^"]*"/g, `href="${routeHref(route, "work")}"`)
    .replace(/href="\.\/work\/arc-bloom[^"]*"/g, `href="${routeHref(route, "work")}"`)
    .replace(/href="\.\/work\/atelier-nara[^"]*"/g, `href="${routeHref(route, "work")}"`);

const replaceLogoText = (html) =>
  html.replace(
    /(<a\b[^>]*data-framer-name="Logo"[^>]*>[\s\S]*?<p\b[^>]*>)[\s\S]*?(<\/p>)/g,
    "$1Babar Naeem$2"
  );

const reelSrcDoc = (route) => {
  const slides = ["pos-solution-app.png", "dastarkhaan-app.png", "study-app.png"]
    .map((file) => `&lt;img src=&quot;${assetHref(route, file)}&quot; alt=&quot;Babar Naeem project preview&quot;&gt;`)
    .join("");
  return `&lt;!doctype html&gt;&lt;style&gt;html,body{margin:0;height:100%;overflow:hidden;background:#050505}body{display:grid;place-items:center;font-family:Inter,Arial,sans-serif}.reel{position:relative;width:100%;height:100%;overflow:hidden}.reel img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;animation:fade 9s infinite}.reel img:nth-child(2){animation-delay:3s}.reel img:nth-child(3){animation-delay:6s}.label{position:absolute;left:8%;bottom:8%;color:white;font:700 6vw Inter,Arial,sans-serif;letter-spacing:.02em;text-shadow:0 8px 28px #000}@keyframes fade{0%,8%{opacity:0;transform:scale(1.04)}15%,35%{opacity:1;transform:scale(1)}45%,100%{opacity:0;transform:scale(1.02)}}&lt;/style&gt;&lt;div class=&quot;reel&quot;&gt;${slides}&lt;div class=&quot;label&quot;&gt;AI BUILDS&lt;/div&gt;&lt;/div&gt;`;
};

const replaceBrokenVideoEmbeds = (html, route) =>
  html.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, (tag) => {
    if (!/player\.vimeo\.com|about:blank|AI BUILDS|content:'AI'/.test(tag)) return tag;
    let next = tag.replace(/\s+src="[^"]*"/, ' src="about:blank"');
    if (/\s+srcdoc="[^"]*"/.test(next)) {
      next = next.replace(/\s+srcdoc="[^"]*"/, ` srcdoc="${reelSrcDoc(route)}"`);
    } else {
      next = next.replace(/<iframe\b/i, `<iframe srcdoc="${reelSrcDoc(route)}"`);
    }
    return next;
  });

const replaceImageAssets = (html, route) => {
  let index = 0;
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    if (!/framerusercontent\.com\/images|randomuser\.me/.test(tag)) return tag;
    const url = assetHref(route, portfolioAssets[index % portfolioAssets.length]);
    index += 1;
    let next = tag
      .replace(/\s+srcset="[^"]*"/gi, "")
      .replace(/\s+sizes="[^"]*"/gi, "")
      .replace(/\s+src="[^"]*"/i, ` src="${url}"`)
      .replace(/\s+alt(="[^"]*")?/i, ' alt="Babar Naeem project asset"');
    if (!/\s+src="/i.test(next)) next = next.replace(/<img\b/i, `<img src="${url}"`);
    if (!/\s+alt=/i.test(next)) next = next.replace(/<img\b/i, '<img alt="Babar Naeem project asset"');
    return next;
  });
};

const replaceOverrideCacheBusting = (html) =>
  html
    .replace(/href="(\.\/|\.\.\/)override\.css(?:\?[^"]*)?"/g, 'href="$1override.css?v=assets-20260430"')
    .replace(/src="(\.\/|\.\.\/)override\.js(?:\?[^"]*)?"/g, 'src="$1override.js?v=assets-20260430"');

const replaceRichParagraphs = (html) =>
  html
    .replace(
      /<p\b([^>]*)>(?:(?!<\/p>)[\s\S])*sleek digital(?:(?!<\/p>)[\s\S])*<\/p>/gi,
      '<p$1>From retrieval systems to forecasting pipelines, I turn complex model and data work into products people can actually use.</p>'
    )
    .replace(
      /<p\b([^>]*)>(?:(?!<\/p>)[\s\S])*Blending(?:(?!<\/p>)[\s\S])*Delivering(?:(?!<\/p>)[\s\S])*<\/p>/gi,
      '<p$1>Building intelligent systems with useful data, clear models, and production-grade execution.</p>'
    )
    .replace(
      /<p\b([^>]*)>(?:(?!<\/p>)[\s\S])*seamless workflow(?:(?!<\/p>)[\s\S])*<\/p>/gi,
      '<p$1>I bridge experimentation and delivery, combining modeling, data work, and product thinking into systems that are useful, fast, and built to hold up in production.</p>'
    );

for (const page of pages) {
  const absolute = path.join(root, page.file);
  const original = fs.readFileSync(absolute, "utf8");
  const next = replaceOverrideCacheBusting(
    replaceImageAssets(
      replaceRichParagraphs(
        replaceBrokenVideoEmbeds(
          replaceLogoText(replaceLinks(replaceTextNodes(replaceHeadImages(replaceHeadMeta(original, page.route), page.route)), page.route)),
          page.route
        )
      ),
      page.route
    )
  );
  fs.writeFileSync(absolute, next, "utf8");
  console.log(`${page.file}: ${original.length} -> ${next.length}`);
}

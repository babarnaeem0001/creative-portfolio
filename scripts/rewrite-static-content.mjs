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
    ["Founder, Studio Analog", "Useful systems, not empty demos"],
    ["Daniel Reyes", "Elena Kowalski"],
    ["Director, Framehaus", "Clean workflows that actually save time"],
    ["Mei Tanaka", "Amara Chen"],
    ["UX Designer, Nuro", "Shipped a polished app from scratch, fast"],
    ["Julian Pierce", "Marcus Johnson"],
    ["Director, Vektor Inc.", "Built a RAG pipeline that works in production"],
    ["Hana Samoto", "Fatima Al-Rashid"],
    ["CEO, Willow Studio", "Reliable output for real teams"],
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
    ["$99", "Custom"],
    ["$299", "Custom"],
    ["$899", "Custom"],
    ["/Month", "/Project"],
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
  ["13years", "I'm Babar Naeem - an AI Engineer and Data Scientist based in Islamabad, Pakistan. I build intelligent systems, automation workflows, and full-stack applications from idea to execution. I work with LLMs, RAG pipelines, intent classifiers, and real-world apps that think and scale."],
  ["relentlesscreativediscipline", "I'm Babar Naeem - an AI Engineer and Data Scientist based in Islamabad, Pakistan. I build intelligent systems, automation workflows, and full-stack applications from idea to execution. I work with LLMs, RAG pipelines, intent classifiers, and real-world apps that think and scale."],
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

const replaceTextChunk = (text) => {
  const key = normalize(text);
  if (!key) return text;
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

const reelSrcDoc =
  "&lt;!doctype html&gt;&lt;style&gt;html,body{margin:0;height:100%;overflow:hidden;background:#0b0b0b}body:before{content:'AI';position:absolute;inset:0;display:grid;place-items:center;color:#fff;font:700 18vw Inter,Arial,sans-serif;letter-spacing:.02em}body:after{content:'';position:absolute;inset:-30%;background:linear-gradient(120deg,transparent 35%,rgba(255,255,255,.2),transparent 65%);animation:sweep 4s linear infinite}@keyframes sweep{from{transform:translateX(-45%)}to{transform:translateX(45%)}}&lt;/style&gt;";

const replaceBrokenVideoEmbeds = (html) =>
  html.replace(
    /src="https:\/\/player\.vimeo\.com\/video\/315891633[^"]*"/g,
    `src="about:blank" srcdoc="${reelSrcDoc}"`
  );

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
  const next = replaceRichParagraphs(
    replaceBrokenVideoEmbeds(
      replaceLogoText(replaceLinks(replaceTextNodes(replaceHeadMeta(original, page.route)), page.route))
    )
  );
  fs.writeFileSync(absolute, next, "utf8");
  console.log(`${page.file}: ${original.length} -> ${next.length}`);
}

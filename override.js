(function () {
  const routeKey = (() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("/work")) return "work";
    if (path.includes("/gallery")) return "gallery";
    if (path.includes("/contact")) return "contact";
    return "home";
  })();

  const homeHref = routeKey === "home" ? "./" : "../";
  const galleryHref = routeKey === "home" ? "./gallery/" : "../gallery/";
  const workHref = routeKey === "home" ? "./work/" : "../work/";
  const contactHref = routeKey === "home" ? "./contact/" : "../contact/";

  const normalize = (value) =>
    String(value || "")
      .replace(/&nbsp;/gi, " ")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[^a-z0-9]+/gi, "")
      .toLowerCase();

  const plainNodes = () =>
    Array.from(document.querySelectorAll("p, h1, h2, h3, h4, h5, h6"));

  const replaceText = (matcher, html) => {
    plainNodes().forEach((node) => {
      const current = normalize(node.textContent);
      if (!current) return;
      const matched =
        typeof matcher === "string"
          ? current === normalize(matcher)
          : matcher(current, node);
      if (matched) node.innerHTML = html;
    });
  };

  const replaceRollingText = (matcher, newText, href) => {
    const rolling = Array.from(document.querySelectorAll("p[class*='rolling-text-inner']"));
    rolling.forEach((node) => {
      const current = normalize(node.textContent);
      const matched =
        typeof matcher === "string"
          ? current === normalize(matcher)
          : matcher(current, node);
      if (!matched) return;

      const spanTemplate = node.querySelector("span");
      if (!spanTemplate) return;
      const style = spanTemplate.getAttribute("style") || "";

      node.innerHTML = "";
      Array.from(newText).forEach((character) => {
        const span = document.createElement("span");
        if (style) span.setAttribute("style", style);
        span.innerHTML = character === " " ? "&nbsp;" : character;
        node.appendChild(span);
      });

      if (href) {
        const link = node.closest("a");
        if (link) {
          link.setAttribute("href", href);
          link.removeAttribute("target");
          link.removeAttribute("rel");
        }
      }
    });
  };

  const replaceRollingLinkByHref = (hrefPart, newText, newHref) => {
    document.querySelectorAll(`a[href*="${hrefPart}"]`).forEach((link) => {
      const node = link.querySelector("p[class*='rolling-text-inner']");
      if (!node) return;
      const spanTemplate = node.querySelector("span");
      if (!spanTemplate) return;
      const style = spanTemplate.getAttribute("style") || "";

      node.innerHTML = "";
      Array.from(newText).forEach((character) => {
        const span = document.createElement("span");
        if (style) span.setAttribute("style", style);
        span.innerHTML = character === " " ? "&nbsp;" : character;
        node.appendChild(span);
      });

      link.setAttribute("href", newHref);
      link.removeAttribute("target");
      link.removeAttribute("rel");
    });
  };

  const replaceHref = (oldHref, newHref) => {
    document.querySelectorAll(`a[href="${oldHref}"]`).forEach((link) => {
      link.setAttribute("href", newHref);
      if (newHref.startsWith("./") || newHref.startsWith("../")) {
        link.removeAttribute("target");
        link.removeAttribute("rel");
      }
    });
  };

  const rewriteProjectDetailLinks = () => {
    const slugs = ["sonder-goods", "halo-wear", "lucent-lab", "arc-bloom", "atelier-nara"];
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (slugs.some((slug) => href.includes(slug))) {
        link.setAttribute("href", workHref);
        link.removeAttribute("target");
        link.removeAttribute("rel");
      }
    });
  };

  const hideBySelector = (selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      const target = node.closest("div, section, a") || node;
      target.classList.add("bn-hidden");
    });
  };

  const hideSectionByHeading = (heading) => {
    const target = normalize(heading);
    plainNodes().forEach((node) => {
      if (normalize(node.textContent) === target) {
        const section = node.closest("section");
        if (section) section.classList.add("bn-hidden");
      }
    });
  };

  const applyMeta = () => {
    const meta = {
      home: {
        title: "Babar Naeem | AI Engineer & Data Scientist",
        description:
          "I'm Babar Naeem — an AI Engineer and Data Scientist based in Islamabad, Pakistan. I build intelligent systems, automation workflows, and full-stack applications from idea to execution.",
      },
      work: {
        title: "Babar Naeem | Selected Projects",
        description:
          "Selected AI, automation, and full-stack development work by Babar Naeem — from mobile apps to RAG systems.",
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
    }[routeKey];

    document.title = meta.title;
    [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[name="twitter:title"]',
    ].forEach((selector) => {
      const node = document.querySelector(selector);
      if (node) node.setAttribute("content", selector.includes("description") ? meta.description : meta.title);
    });
    [
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ].forEach((selector) => {
      const node = document.querySelector(selector);
      if (node) node.setAttribute("content", meta.description);
    });
  };

  const applyCommon = () => {
    replaceHref("./", homeHref);
    replaceHref("./gallery", galleryHref);
    replaceHref("./work", workHref);
    replaceHref("./contact", contactHref);
    replaceHref("./#top", homeHref + "#top");
    rewriteProjectDetailLinks();

    document.querySelectorAll('a[href*="MandroDesign"]').forEach((link) => {
      link.setAttribute("href", contactHref);
      link.removeAttribute("target");
      link.removeAttribute("rel");
    });

    replaceText("Palmer", "Babar");
    replaceText((text) => text.includes("basedintokyo"), "Based in Pakistan");
    replaceText((text) => text.includes("artdirectorframerdeveloper"), "AI Engineer + Data Scientist");
    replaceText(
      (text) =>
        text.includes("ibuildexpressiveperformancedrivenwebsites") ||
        text.includes("iblendcleandesignandnativedevelopmentinsideframer"),
      "I build AI systems, data products, analytics workflows, and automation experiences that are clear, production-minded, and built to create measurable value."
    );
    replaceText((text) => text === "independent", "Applied");
    replaceText((text) => text === "overview", "Systems");
    replaceText((text) => text === "multidisciplinary", "Modeling");
    replaceText((text) => text === "focused", "Delivery");

    replaceText((text) => text.includes("helpcenter"), "Questions");
    replaceText((text) => text === "clarifications", "Scope Notes");
    replaceText(
      (text) => text.includes("clarifyingdeliverablesbeforetheybegin"),
      "Questions about scope, models, data, and delivery before we build anything important."
    );
    replaceText((text) => text === "whatservicesdoyouoffer", "What do you build?");
    replaceText((text) => text === "whatisyourtypicalturnaroundtime", "How do you scope AI projects?");
    replaceText((text) => text === "doyouonlyworkinframer", "Do you work with existing data stacks?");
    replaceText((text) => text === "canyouhandlebothdesignandbuild", "Can you take ideas from prototype to production?");
    replaceText((text) => text === "doyouofferbrandstrategytoo", "Do you help with evaluation and monitoring?");
    replaceText((text) => text.includes("whatsyourprocesslike"), "What does collaboration look like?");

    replaceText((text) => text.includes("finalsection"), "Closing Notes");
    replaceText((text) => text === "studiowrap", "Built for Real Use");

    replaceRollingText("instagram", "Home", homeHref);
    replaceRollingText("dribbble", "Work", workHref);
    replaceRollingText("framer", "Research", galleryHref);
    replaceRollingText("twitter", "Contact", contactHref);
    replaceRollingLinkByHref("instagram.com", "Home", homeHref);
    replaceRollingLinkByHref("dribbble.com", "Work", workHref);
    replaceRollingLinkByHref("framer.com", "Research", galleryHref);
    replaceRollingLinkByHref("x.com/MandroDesign", "Contact", contactHref);

    hideBySelector('a[href*="framer.link/"]');
    hideBySelector('#__framer-badge-container');
    hideSectionByHeading("Clients");
  };

  const applyHome = () => {
    replaceText((text) => text === "artdirection", "AI Systems");
    replaceText((text) => text === "branding", "Data Science");
    replaceText((text) => text === "strategy", "LLM Design");
    replaceText((text) => text === "webdesign", "Automation");
    replaceText(
      (text) => text.includes("patterndimensionsandmoments"),
      "Models, Pipelines<br>and Products that<br>Think Fast and Drive<br>Real Impact."
    );
    replaceText((text) => text === "babar", "Babar");
    replaceText((text) => text === "digitaldesigner", "AI Engineer");
    replaceText((text) => text === "visualfreelancer", "Data Scientist");
    replaceText((text) => text === "digitalnomad", "Full Stack Developer");
    replaceText((text) => text === "creativedeveloper", "Automation Architect");
    replaceText(
      (text) => text.includes("13years") || text.includes("relentlesscreativediscipline"),
      "I'm Babar Naeem — an AI Engineer and Data Scientist based in Islamabad, Pakistan. I build intelligent systems, automation workflows, and full-stack applications from idea to execution. I work with LLMs, RAG pipelines, intent classifiers, and real-world apps that think and scale."
    );

    replaceText((text) => text === "creativedevelopment", "Applied AI");
    replaceText((text) => text.includes("featuredprojects"), "Featured Projects");
    replaceText((text) => text.includes("featuredworks"), "Selected Work");
    replaceText(
      (text) => text.includes("everyprojectisachancetoblenddesignanddevelopment"),
      "From retrieval systems to forecasting pipelines, I turn complex model and data work into products people can actually use."
    );
    replaceText((text) => text === "sondergoods", "Dastarkhaan");
    replaceText((text) => text === "halowear", "Taj Mahal App");
    replaceText((text) => text === "lucentlab", "StudyFocus");
    replaceText((text) => text === "arcbloom", "Intent Classifier");
    replaceText((text) => text === "ateliernara", "RAG System");
    replaceText((text) => text === "creativedirection", "Restaurant App");
    replaceText((text) => text === "identitydesign", "Productivity App");
    replaceText((text) => text === "portfoliosite", "AI Automation");

    replaceText((text) => text === "services", "Capabilities");
    replaceText((text) => text === "precise", "Practical");
    replaceText((text) => text === "structured", "Reliable");
    replaceText((text) => text === "focused", "Scalable");
    replaceText((text) => text === "visuallanguage", "AI Strategy");
    replaceText((text) => text === "brandidentity", "Data Products");
    replaceText((text) => text === "motiondirection", "LLM Workflows");
    replaceText((text) => text === "framersites", "Analytics Apps");
    replaceText(
      (text) => text.includes("weguideeveryvisualdecision"),
      "I build AI and automation systems that solve real problems, not demos. Every project ships with clear goals and measurable outcomes."
    );
    replaceText(
      (text) => text.includes("fromstrategytoexecutionweshapeconsistentbrandsystems"),
      "Clean pipelines, strong evaluation, and production-ready code. Systems you can trust in the real world."
    );
    replaceText(
      (text) => text.includes("weusemotionasadesigntool"),
      "From prototype to full deployment. I design architectures that grow with your needs."
    );
    replaceText(
      (text) => text.includes("designmeetsexecutionwithrealtimescalablewebsites"),
      "LLMs, RAG systems, intent classifiers, and automation workflows tailored to your use case."
    );

    replaceText((text) => text === "visualthinker", "Systems Thinker");
    replaceText(
      (text) => text.includes("webridgecreativedirectionwithrealworldexecution"),
      "I bridge experimentation and delivery, combining modeling, data work, and product thinking into systems that are useful, fast, and built to hold up in production."
    );

    replaceText((text) => text.includes("experience"), "Experience");
    replaceText((text) => text.includes("pickplans"), "Build Track");
    replaceText((text) => text === "clavmenstudio", "Independent Practice");
    replaceText((text) => text === "2022present", "2023 - present");
    replaceText((text) => text === "artdirectordesigner", "AI Engineer & Full Stack Developer");
    replaceText((text) => text === "tokyo", "Islamabad, Pakistan");
    replaceText((text) => text === "modulareight", "LLM Systems");
    replaceText((text) => text === "seniordeveloper", "RAG Pipelines + Agent Workflows");
    replaceText((text) => text === "osaka", "Remote");
    replaceText((text) => text === "hausofsignal", "App Development");
    replaceText((text) => text === "creativetechnologist", "Full Stack Mobile & Web Apps");
    replaceText((text) => text === "berlin", "Pakistan");
    replaceText((text) => text === "studioorbit", "Automation Design");
    replaceText((text) => text === "uiuxdesigner", "Workflow Architect");
    replaceText((text) => text === "dallas", "Remote");
    replaceText((text) => text === "novaformlabs", "ML / AI Projects");
    replaceText((text) => text === "juniordesigner", "NLP + Intent Classification + Predictive Systems");
    replaceText((text) => text === "kyoto", "Applied");

    replaceText((text) => text.includes("testimonialreviews"), "Working Principles");
    replaceText((text) => text === "lisakuroda", "Applied AI");
    replaceText((text) => text === "founderstudioanalog", "Useful systems, not empty demos");
    replaceText((text) => text === "danielreyes", "Automation");
    replaceText((text) => text === "directorframehaus", "Clean workflows that actually save time");
    replaceText((text) => text === "meitanaka", "App Development");
    replaceText((text) => text === "uxdesignernuro", "Shipped a polished app from scratch, fast");
    replaceText((text) => text === "julianpierce", "LLM Systems");
    replaceText((text) => text === "directorvektorinc", "Built a RAG pipeline that works in production");
    replaceText((text) => text === "hanasamoto", "Data Projects");
    replaceText((text) => text === "ceowillowstudio", "Reliable output for real teams");
    replaceText(
      (text) => text.includes("akihikoelevatedeverylayer"),
      '"I design AI products to be useful first: measurable, understandable, and ready for real workflows."'
    );
    replaceText(
      (text) => text.includes("akihikoapproacheseveryproject"),
      '"Every system I build needs a strong backbone: clear data, thoughtful evaluation, and clean delivery."'
    );
    replaceText(
      (text) => text.includes("hisabilitytomerge"),
      '"Good AI work is not hype. It is accuracy, latency, usability, and trust working together."'
    );
    replaceText(
      (text) => text.includes("workingwithakihikowasmorethan"),
      '"The best products turn messy operational problems into calm, repeatable decisions."'
    );
    replaceText(
      (text) => text.includes("akihikobringsararebalance"),
      '"I like shipping fast, but I care even more about making the thing dependable once it is live."'
    );

    replaceText((text) => text === "awards", "Focus Areas");
    replaceText((text) => text.includes("selectedhonors"), "Core Specialties");
    replaceText((text) => text === "awwwards", "LLM");
    replaceText((text) => text === "cssd", "Full Stack");
    replaceText((text) => text === "framer", "Automation");
    replaceText((text) => text === "dribbble", "Databases");
    replaceText((text) => text === "fwa", "MLOps");
    replaceText((text) => text === "cssda", "Decisioning");
    replaceText((text) => text === "27x", "01x");
    replaceText((text) => text === "14x", "02x");
    replaceText((text) => text === "09x", "03x");
    replaceText((text) => text === "08x", "04x");
    replaceText(
      (text) => text.includes("recognizedforboldinteraction"),
      "Building RAG systems, intent classifiers, and AI-powered pipelines using LangChain and HuggingFace."
    );
    replaceText(
      (text) => text.includes("awardedforoutstandingexecution"),
      "React, Next.js, Node.js, FastAPI — end-to-end apps with clean architecture."
    );
    replaceText(
      (text) => text.includes("celebratedforfrontendexcellence"),
      "Workflow systems that reduce manual work and increase signal."
    );
    replaceText(
      (text) => text.includes("highlightedforstrongtypographicsystems"),
      "PostgreSQL, MongoDB, MySQL, Redis, Pinecone — strong data foundations."
    );

    replaceText((text) => text.includes("projectpricing"), "Engagement Models");
    replaceText((text) => text === "customquotes", "Flexible Scope");
    replaceText((text) => text === "designpackages", "Service Packages");
    replaceText((text) => text === "pricingtiers", "Delivery Models");
    replaceText((text) => text === "99" || text === "$99", "Custom");
    replaceText((text) => text === "299" || text === "$299", "Custom");
    replaceText((text) => text === "899" || text === "$899", "Custom");
    replaceText((text) => text === "month", "/Project");
    replaceText((text) => text === "starterplan", "Starter Sprint");
    replaceText(
      (text) => text.includes("perfectforsmalllaunchesandpersonalsites"),
      "Focused AI, automation, or app work — scoped, fast, and actionable."
    );
    replaceText((text) => text === "onepageframersite", "Problem framing workshop");
    replaceText((text) => text === "customlayoutvisuals", "Solution architecture");
    replaceText((text) => text === "mobilefirstresponsivebuild", "Data and tooling review");
    replaceText((text) => text.includes("fastdeliverywithindays"), "Rapid prototype plan");
    replaceText((text) => text === "designsystemsetup", "Success metric definition");
    replaceText((text) => text === "seoreadystructure", "Risk and dependency mapping");
    replaceText((text) => text === "basiccmsintegration", "Execution roadmap");
    replaceText((text) => text === "contactformsetup", "Clear handoff notes");
    replaceText((text) => text === "growthplan", "Build Phase");
    replaceText(
      (text) => text.includes("designedforgrowingbrandsthatneedflexibility"),
      "For teams ready to turn a validated use case into a working product or internal tool."
    );
    replaceText((text) => text === "upto5pages", "Pipeline implementation");
    replaceText((text) => text === "framercmspoweredsections", "Model or prompt design");
    replaceText((text) => text === "componentbasedstructure", "Evaluation loops");
    replaceText((text) => text === "motiondesigntransitions", "Workflow automation");
    replaceText((text) => text === "cleanuxfocusedlayout", "Simple user experience");
    replaceText((text) => text === "deviceoptimizedresponsiveness", "Monitoring basics");
    replaceText((text) => text === "styleguidesystem", "Documentation and guides");
    replaceText((text) => text === "emailcaptureintegrations", "System integrations");
    replaceText((text) => text === "fullscopeplan", "Full System");
    replaceText(
      (text) => text.includes("bestforstudiosorteamsneedingstructure"),
      "End-to-end development — from architecture to production deployment, with full handoff."
    );
    replaceText((text) => text === "10pageswithcms", "Production architecture");
    replaceText((text) => text === "advancedlayoutstrategy", "Full data workflow");
    replaceText((text) => text === "fullbrandsystemsupport", "Experimentation and eval");
    replaceText((text) => text === "animationdirection", "Governance and QA");
    replaceText((text) => text === "custombuiltcomponents", "Custom product surfaces");
    replaceText((text) => text === "framercmstraining", "Team enablement");
    replaceText((text) => text === "launchsupportqa", "Launch and tuning");
    replaceText((text) => text === "performanceoptimization", "Performance optimization");

    replaceText((text) => text.includes("visualjournal"), "Research Notes");
    replaceText((text) => text === "creativenotes", "Field Notes");
    replaceText((text) => text.includes("featuredarticle"), "Notebook");
    replaceText((text) => text === "gregorylalle", "Babar Naeem");
    replaceText((text) => text === "may212024", "April 2026");
    replaceText((text) => text === "clivewillow", "Babar Naeem");
    replaceText((text) => text === "february52024", "March 2026");
    replaceText((text) => text === "ravinclaw", "Babar Naeem");
    replaceText((text) => text === "june22024", "February 2026");
    replaceText((text) => text === "claynicolas", "Babar Naeem");
    replaceText((text) => text === "june102025", "January 2026");
    replaceText((text) => text === "design", "LLM");
    replaceText((text) => text === "visualidentity", "Full Stack");
    replaceText((text) => text === "portfolio", "Automation");
    replaceText(
      (text) => text.includes("gooddesignisnotjustaboutstructure"),
      "How I build RAG systems and intent classifiers that ship to production."
    );
    replaceText(
      (text) => text.includes("typographytodayisnolongerstatic"),
      "From Dastarkhaan to StudyFocus — what I learned shipping mobile apps."
    );
    replaceText(
      (text) => text.includes("minimaldesignisntemptiness"),
      "Designing workflows that actually reduce manual effort."
    );
    replaceText(
      (text) => text.includes("portfoliostodaymustbemorethanarchives"),
      "The tools and frameworks I use across full stack, AI, and databases."
    );
  };

  const applyWork = () => {
    replaceText((text) => text === "works", "Projects");
    replaceText((text) => text === "allworks", "Selected Projects");
    replaceText((text) => text === "sondergoods", "Dastarkhaan");
    replaceText((text) => text === "branding", "Restaurant App");
    replaceText((text) => text === "halowear", "Taj Mahal App");
    replaceText((text) => text === "webdesign", "Restaurant App");
    replaceText((text) => text === "lucentlab", "StudyFocus");
    replaceText((text) => text === "creativedirection", "Productivity App");
    replaceText((text) => text === "arcbloom", "Intent Classifier");
    replaceText((text) => text === "identitydesign", "NLP / AI");
    replaceText((text) => text === "ateliernara", "RAG System");
    replaceText((text) => text === "portfoliosite", "AI Automation");
  };

  const applyGallery = () => {
    replaceText((text) => text === "gallery", "Research");
  };

  const applyContact = () => {
    replaceText((text) => text === "callme", "Let's Work");
    replaceText((text) => text === "247support", "Project Inquiries");
    replaceText((text) => text === "remote", "Remote");
    replaceText((text) => text.includes("officetokyojapan"), "Based in Islamabad, Pakistan");
    replaceText((text) => text.includes("followmeoninstagram"), "Available for remote AI, automation, and full stack collaborations.");
    replaceText((text) => text.includes("sayhiakihikocom"), "Use the work page as the project brief entry point.");
    replaceText((text) => text === "contactnow", "View Projects");
    document.querySelectorAll('a[href*="instagram.com"]').forEach((link) => {
      link.setAttribute("href", workHref);
      link.removeAttribute("target");
      link.removeAttribute("rel");
    });
  };

  const run = () => {
    applyMeta();
    applyCommon();
    if (routeKey === "home") applyHome();
    if (routeKey === "work") applyWork();
    if (routeKey === "gallery") applyGallery();
    if (routeKey === "contact") applyContact();
  };

  run();
  window.addEventListener("load", run);
  let attempts = 0;
  const timer = window.setInterval(() => {
    run();
    attempts += 1;
    if (attempts > 10) window.clearInterval(timer);
  }, 500);
})();

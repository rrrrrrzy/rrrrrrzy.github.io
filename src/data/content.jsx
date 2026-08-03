export const CONFIG = {
    profile: {
        name: "饶子扬 / Ziyang Rao",
        title: "PhD candidate @ HKUST (Guangzhou)",
        location: "Guangzhou, China",
        email: "zrao538@connect.hkust-gz.edu.cn",
        github: "https://github.com/rrrrrrzy",
        googleScholar: "https://scholar.google.com/citations?user=Kk9N_l0AAAAJ",
        cv: "/documents/Rao_Ziyang_CV.pdf",
        // twitter: "https://twitter.com/yourusername",
        avatar: "/images/profile.jpg",
        favicon: "/images/favicon.ico",
        // bio: ""
    },
    researchInterests: [
        { name: "Flow Matching VLA", color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
        { name: "Uncertainty Quantification", color: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" },
        { name: "Mechanistic Interpretability", color: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
        // { name: "AI Safety", color: "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300"}
    ],

    // NOTE: keep every line flush against the left margin. Markdown treats lines
    // indented by four or more spaces as a code block, so indenting this template
    // literal to match the surrounding code renders the whole bio in a grey box.
    aboutMe: `
I am a PhD candidate in Artificial Intelligence at HKUST (Guangzhou), advised by [Prof. Hui Xiong](https://ailab.hkust-gz.edu.cn/), and a research intern at the X-Lab of [AI² Robotics](https://ai2robotics.com/en/).

My work centres on **embodied AI**: I study the geometry of flow-matching policies and ask when their actions can be trusted, so that vision-language-action models fail loudly rather than silently. This grows out of a wider interest in **uncertainty quantification** and **mechanistic interpretability** — what representations a model actually forms, and what its internals reveal about the reliability of its outputs. My earlier research also spans **information retrieval** and **multimodal LLMs**.

I earned my MPhil in AI at the same lab, co-advised by Prof. Hui Xiong and [Dr. Xuming Hu](https://xuminghu.github.io/), where alongside research I was actively engaged in AI startups and knowledge transfer.
`,

    // Newest first. `authors` wraps the site owner's name in **bold** — it is
    // rendered as Markdown by HomePage.jsx. Omit a key from `links` to hide that
    // icon. `venueColor` needs paired light/dark classes.
    publications: [
        {
            title: "The Geometric Nature and a Free Proxy for Flow-Matching Uncertainty",
            authors: "**Ziyang Rao**, Yiren Zhao, Weiyu Guo, Ben Fei, Yandong Guo, Hui Xiong",
            venue: "Preprint",
            venueColor: "bg-slate-500 dark:bg-slate-600",
            links: { pdf: "https://arxiv.org/abs/2607.27933", code: "https://github.com/rrrrrrzy/fm-geometry" },
            tags: ["Flow Matching", "Uncertainty Quantification", "Embodied AI"]
        },
        {
            title: "Source-Lifted Flow Matching for Intervenable Multimodal Imitation",
            authors: "He Zhang, Ying Sun, Pengteng Li, Ziyang Chen, Yiren Zhao, **Ziyang Rao**, Weiyu Guo, Yandong Guo, Hui Xiong",
            venue: "Preprint",
            venueColor: "bg-slate-500 dark:bg-slate-600",
            links: { pdf: "https://arxiv.org/abs/2607.10206" },
            tags: ["Flow Matching", "Imitation Learning"]
        },
        {
            title: "Towards Mechanistically Understanding Why Memorized Knowledge Fails to Generalize in Large Language Model Finetuning",
            authors: "Lu Dai, **Ziyang Rao**, Yili Wang, Hanqing Wang, Hao Liu, Hui Xiong",
            venue: "Preprint",
            venueColor: "bg-slate-500 dark:bg-slate-600",
            links: { pdf: "https://arxiv.org/abs/2607.08393" },
            tags: ["Mechanistic Interpretability", "LLM"]
        },
        {
            title: "LLM-Oriented Information Retrieval: A Denoising-First Perspective",
            authors: "Lu Dai, Liang Sun, Fanpu Cao, **Ziyang Rao**, Cehao Yang, Hao Liu, Hui Xiong",
            venue: "SIGIR 2026",
            venueColor: "bg-indigo-600 dark:bg-indigo-500",
            links: { pdf: "https://arxiv.org/abs/2605.00505", doi: "https://doi.org/10.1145/3805712.3808544" },
            tags: ["Information Retrieval", "LLM"]
        },
        {
            title: "RGB-Event ISP: The Dataset and Benchmark",
            authors: "Yunfan Lu, Yanlin Qian, **Ziyang Rao**, Junren Xiao, Liming Chen, Hui Xiong",
            venue: "ICLR 2025",
            venueColor: "bg-teal-600 dark:bg-teal-500",
            links: { pdf: "https://openreview.net/forum?id=BqtoARyz7Y", code: "https://github.com/yunfanLu/RGB-Event-ISP" },
            tags: ["Event Camera", "Dataset"]
        }
    ],

    // Rendered by the "Selected Projects" section in HomePage.jsx, also commented out.
    // Shape:
    // {
    //     name: "",
    //     description: "",
    //     tech: "Python, PyTorch",
    //     link: "",
    //     accent: "border-l-indigo-400 dark:border-l-indigo-500"
    // }
    projects: [],

    education: [
        {
            school: "Hong Kong University of Science and Technology (Guangzhou)",
            degree: "PhD. candidate in Artificial Intelligence",
            date: "2026 - present"
        },
        {
            school: "Hong Kong University of Science and Technology (Guangzhou)",
            degree: "MPhil. in Artificial Intelligence",
            date: "2023 - 2025"
        },
        {
            school: "Renmin University of China",
            degree: "BSc. in Economic Statistics",
            date: "2019 - 2023"
        }
    ],

    blogs: [
        {
            id: 1,
            title: "Welcome to my blog!",
            date: "2025-12-22",
            category: "Research",
            excerpt: "My first blog post.",
            image: "/images/gallery/1.jpg",
            content: "More to come..."
        }
    ],

    galleries: [
        {
            title: "Random",
            description: "Random photo dump.",
            photos: [
                "/images/gallery/1.jpg",
                "/images/gallery/2.jpg",
                "/images/gallery/3.jpg",

            ]
        }
    ]
};

export const CONFIG = {
    profile: {
        name: "饶子扬 / Ziyang Rao",
        title: "Incoming PhD @ IMPRS-IS / University of Tübingen",
        location: "Guangzhou, China",
        email: "zrao538@connect.hkust-gz.edu.cn",
        github: "https://github.com/rrrrrrzy",
        googleScholar: "https://scholar.google.com/citations?user=Kk9N_l0AAAAJ", // TODO: Update with actual ID
        cv: "/documents/Rao_Ziyang_CV.pdf",
        // twitter: "https://twitter.com/yourusername",
        avatar: "/images/profile.jpg",
        favicon: "/images/favicon.ico",
        // bio: ""
    },
    researchInterests: [
        { name: "Information Retrieval", color: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" },
        { name: "Mechanistic Interpretability", color: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
        { name: "Multimodal Language Models", color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
        // { name: "AI Safety", color: "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300"}
    ],

    aboutMe: `
I am an incoming PhD candidate in the [Health NLP Lab](https://health-nlp.com/) of the University of Tübingen, 
under the supervision of [Prof. Carsten Eickhoff](https://health-nlp.com/people/carsten) and [Dr.Harry Scells](https://scells.me/). 

My research interests lie in **information retrieval, mechanistic interpretability, and multimodal LLMs**. 
I am exploring the foundations and dynamics of knowledge representation inside LMs, 
and the applications of modern IR methods in high-stakes domains like healthcare and medicine. 

Previously, I got my MPhil. degree in AI from HKUST (GZ) supervised by [Prof. Hui Xiong](https://ailab.hkust-gz.edu.cn/) and [Dr. Xuming Hu](https://xuminghu.github.io/), 
where I also actively engaged in AI startups and knowledge transfer beyond academic pursuits. 

<mark>I am seeking a short-term internship opportunity since my PhD enrollment has been deferred due to visa check.</mark>
    `,

    publications: [
        {
            title: "Efficient Alignment of Large Language Models via Sparse Feedback",
            authors: "San Zhang, Li Si, Wang Wu",
            venue: "ICLR 2024 (Oral)",
            venueColor: "bg-indigo-600 dark:bg-indigo-500",
            links: { pdf: "#", code: "#" },
            tags: ["Alignment", "Efficiency"]
        }
    ],

    projects: [
        {
            name: "Modeling and Interpreting Information Flow in Visual Language Models",
            description: "一个自动检索并总结最新 AI 论文的智能代理系统。",
            tech: "Python, LangChain",
            link: "#",
            accent: "border-l-indigo-400 dark:border-l-indigo-500"
        }
    ],

    education: [
        {
            school: "IMPRS-IS / University of Tübingen",
            degree: "incoming PhD. candidate",
            date: "2025 - present"
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

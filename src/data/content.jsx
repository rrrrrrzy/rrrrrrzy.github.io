export const CONFIG = {
    profile: {
        name: "张三 (San Zhang)",
        title: "AI Researcher @ Leading Intelligence Lab",
        location: "Shanghai, China",
        email: "san.zhang@example.com",
        github: "https://github.com/yourusername",
        twitter: "https://twitter.com/yourusername",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=San",
        // 在此处设置你的 Favicon 链接（支持 .png, .ico, .svg）
        favicon: "https://api.dicebear.com/7.x/bottts/svg?seed=San",
        bio: "专注于大语言模型（LLM）的对齐、高效微调以及多模态感知。致力于探索通用人工智能（AGI）的边界，多篇论文发表于 ICLR, NeurIPS 和 CVPR。"
    },

    researchInterests: [
        { name: "Large Language Models", color: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" },
        { name: "Multimodal Learning", color: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
        { name: "Reinforcement Learning", color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
        { name: "AI Safety", color: "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300" }
    ],

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
            name: "Auto-Research-Agent",
            description: "一个自动检索并总结最新 AI 论文的智能代理系统。",
            tech: "Python, LangChain",
            link: "#",
            accent: "border-l-indigo-400 dark:border-l-indigo-500"
        }
    ],

    education: [
        {
            school: "Example University",
            degree: "Ph.D. in Computer Science",
            date: "2020 - 2024"
        }
    ],

    blogs: [
        {
            id: 1,
            title: "如何评价 2024 年的大模型对齐技术趋势？",
            date: "2024-10-20",
            category: "Research",
            excerpt: "从 RLHF 到 DPO，对齐技术正在经历从复杂到简洁的范式演变...",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
            content: "这里是文章的详细内容..."
        }
    ],

    galleries: [
        {
            title: "都市漫步 (City Walk)",
            description: "记录上海街头的瞬间。",
            photos: [
                "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=800"
            ]
        }
    ]
};

// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-首页",
    title: "首页",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },
  {
    id: "person-shixiaoshuang",
    title: "石小爽 教授 (Xiaoshuang Shi)",
    description: "教授、博士生导师、国家青年特聘专家 - 机器学习、模式识别、医学数据分析",
    section: "团队成员",
    handler: () => {
      window.location.href = "/team/#shixiaoshuang";
    },
  },{id: "nav-团队成员",
          title: "团队成员",
          description: "实验室师资力量与学生团队介绍",
          section: "Navigation",
          handler: () => {
            window.location.href = "/team/";
          },
        },{id: "nav-研究项目",
          title: "研究项目",
          description: "实验室在研与已完成的重点研究项目",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-论文成果",
          title: "论文成果",
          description: "实验室发表的学术论文列表（按年份倒序）",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-活动与新闻",
          title: "活动与新闻",
          description: "实验室举办的学术活动、讲座与重要新闻",
          section: "Navigation",
          handler: () => {
            window.location.href = "/activities/";
          },
        },{id: "nav-联系我们",
          title: "联系我们",
          description: "实验室联系方式与地址信息",
          section: "Navigation",
          handler: () => {
            window.location.href = "/contact/";
          },
        },{id: "news-获得-国家自然科学基金项目-视觉图像特征编码和理解-2023-01-2025-12",
          title: '获得 国家自然科学基金项目：视觉图像特征编码和理解 (2023.01-2025.12).',
          description: "",
          section: "News",},{id: "news-主持-国家自然科学基金面上项目-基于弱监督深度学习的数字病理切片的自动标注和检索-2023-01-2026-12",
          title: '主持 国家自然科学基金面上项目：基于弱监督深度学习的数字病理切片的自动标注和检索 (2023.01-2026.12).',
          description: "",
          section: "News",},{id: "news-论文-on-which-nodes-does-gcn-fail-enhancing-gcn-from-the-node-perspective-被-icml-2024-ccf-a-录用",
          title: '论文 On Which Nodes Does GCN Fail? Enhancing GCN From the Node Perspective...',
          description: "",
          section: "News",},{id: "news-论文-act-diffusion-efficient-adversarial-consistency-training-for-one-step-diffusion-models-被-cvpr-2024-ccf-a-录用",
          title: '论文 ACT-Diffusion: Efficient Adversarial Consistency Training for One-step Diffusion Models 被 CVPR 2024...',
          description: "",
          section: "News",},{id: "news-论文-sconu-selective-conformal-uncertainty-in-large-language-models-被-acl-2025-ccf-a-录用",
          title: '论文 SConU: Selective Conformal Uncertainty in Large Language Models 被 ACL 2025 (CCF-A)...',
          description: "",
          section: "News",},{id: "news-主持-科技部重大专项子课题-重大慢病诊疗关键检验项目医学决定水平的建立与应用研究-2025-08-2029-07",
          title: '主持 科技部重大专项子课题：重大慢病诊疗关键检验项目医学决定水平的建立与应用研究 (2025.08-2029.07).',
          description: "",
          section: "News",},{id: "projects-视觉图像特征编码和理解",
          title: '视觉图像特征编码和理解',
          description: "国家自然科学基金项目 (2023.01-2025.12)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/project_1_nsfc_overseas/";
            },},{id: "projects-基于弱监督深度学习的数字病理切片的自动标注和检索",
          title: '基于弱监督深度学习的数字病理切片的自动标注和检索',
          description: "国家自然科学基金面上项目 (2023.01-2026.12)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/project_2_nsfc_general/";
            },},{id: "projects-支持机器学习自动化的元学习理论与应用",
          title: '支持机器学习自动化的元学习理论与应用',
          description: "科技部重点研发子课题 (2022.12-2027.11)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/project_3_most_rd/";
            },},{id: "projects-重大慢病诊疗关键检验项目医学决定水平的建立与应用研究",
          title: '重大慢病诊疗关键检验项目医学决定水平的建立与应用研究',
          description: "科技部重大专项子课题 (2025.08-2029.07)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/project_4_most_major/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/cv/", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%78%73%73%68%69%32%30%32%31@%75%65%73%74%63.%65%64%75.%63%6E", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=BWGQt3YAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

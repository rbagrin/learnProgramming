module.exports = {
    allQuestions: [
        {
            category: 0x01, // if
            level: 1,
            correctAnswer: 1,
            options: {
                1: "îmi place fotbalul",
                2: "îmi plac jocurile",
                totalOptions: 2
            },
            mainBranch: "joc_fotbal",
            optionalBranch: "joc_minecraft"
        },
        {
            category: 0x01, // if
            level: 2,
            correctAnswer: 2,
            options: {
                1: "îmi place AAAA",
                2: "îmi plac BBBB",
                totalOptions: 2
            },
            mainBranch: "joc_asdsadsa",
            optionalBranch: "joc_adsadsad"
        },
        {
            category: 0x01, // if
            level: 3,
            correctAnswer: 2,
            options: {
                1: "îmi place CCCCC",
                2: "îmi plac DDDDDD",
                totalOptions: 2
            },
            mainBranch: "joc_zxzxzx",
            optionalBranch: null
        },
        {
            category: 0x02, // while
            level: 4,
            correctAnswer: 2,
            options: {
                1: "îmi place EEEEEE",
                2: "îmi plac FFFFFFF",
                totalOptions: 2
            },
            mainBranch: "joc_gfghgffg",
            optionalBranch: null
        },
        {
            category: 0x03, // for
            level: 5,
            correctAnswer: 2,
            options: {
                1: "îmi place GGGGGGGGG",
                2: "îmi plac HHHHHHH",
                totalOptions: 2
            },
            mainBranch: "joc_trtrtrt",
            optionalBranch: null
        }
    ]
};
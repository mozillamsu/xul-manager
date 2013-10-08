function pageBreak() {
    console.log("\n");
    let sep = "================================================================================";
    for(let i = 0; i < 3; i++) {
        console.log(sep);
    }
    console.log("\n");
};

exports.pageBreak = pageBreak;
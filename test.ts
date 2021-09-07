
const tableName = "hello"
const first = tableName.substr(0, 1);
const last = tableName.substr(1, tableName.length - 1)

const className = first.toUpperCase() + last;
console.log(className);

const aaa = "courier_detail";
const bbb = aaa.includes("_");

if (bbb) {
    const ccc = aaa.split("_")
    let myCalss = '';
    for (let index = 0; index < ccc.length; index++) {
        const element = ccc[index];
        const first = element.substr(0, 1);
        const last = element.substr(1, element.length - 1)

        const className = first.toUpperCase() + last;

        myCalss = myCalss + className
    }
    console.log(myCalss);

}


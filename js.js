const numbers = [12, -5, 8, -2, 0, 15, -9, 7];

let pos = []
let neg = []
for (const num of numbers){
    if (num>=0){
        pos.push(num)
    }else{
        neg.push(num)
    }
}
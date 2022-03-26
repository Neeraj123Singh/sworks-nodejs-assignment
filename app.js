const express = require("express");
const app = express();
const axios = require('axios')

const api = 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=f7e6ac4b0ba239bc37b049cad87fc4c3';


const PORT = 3000;

app.use(express.json());

const prime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}

const getMinIndex = (arr, i, l) => {
    let minIndex = i;
    let minValue = Number.MAX_SAFE_INTEGER;
    for (let j = i; j <= l; j++) {
        if (arr[j] < minValue) {
            minValue = arr[j]
            minIndex = j;
        };
    }
    return minIndex;
}
const reverse = (arr, i, j) => {
    let mid = parseInt(i + j) / 2;
    for (let k = 0; k <= mid; k++) {
        let temp = arr[k];
        arr[k] = arr[j - k];
        arr[j - k] = temp;
    }
    return arr;
}
app.get('/sworksort', async (req, res) => {
    let { arr } = req.body;
    let count = 0;
    if (Array.isArray(arr)) {
        let l = arr.length;
        for (let i = 0; i < l - 1; i++) {
            let minIndex = getMinIndex(arr, i, l - 1);
            count += minIndex - i + 1;
            arr = reverse(arr, i, minIndex);
        }
        res.status(200).send({ totalCost: count });
    } else {
        res.status(422).send({ error: "Today's Date is not Prime" })
    }
})

app.get('/result', async (req, res) => {
    let today = new Date();
    let todayDate = today.getDate();
    if (prime(todayDate)) {
        let r = await axios.get(api);
        console.log(r)
        res.status(200).send(r.data)
    } else {
        res.status(422).send({ error: "Today's Date is not Prime" });
    }
})
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});


/*
 let l=4 , then
 for (i=1;i<=3;i++)
 j= positon of min(i,L);
 reverse(i,j)//cost = i-j+1
 test case:
 [4,2,1,3]
 3- iterations
 1 iteration i=1;
 ---
 j=3
 cost =3
 now we have
 1,2,4,3
 i=2
 -----
 j=1
 cost =1
 1,2,4,3
i=3
----
cost = 2
total cost = 3+2+1=6


new test case
----------------
l=7
[7,6,5,4,3,2,1]
7
[1,2,3,4,5,6,7]
1
1
1
1
1
*/
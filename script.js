// change the variable value with the url of your dataset
const myUrl = "shows.json"; //https://makerslab.em-lyon.com/dww/data/shows.json

const getData = async(doStuffs) => {
    try {
        const response = await fetch(myUrl);
        if(!response.ok){
            throw new Error("Network response not ok :" + response.statusText);
        }
        const data = await response.json();
        doStuffs(data);
    } catch(error) {
        console.error("Problem occurend while getting your data" + error);
    }
}


getData((data)=>{
    // your program starts here

    // data is a javascript object containing all your dataset
    console.log(data);


   // your program ends here
});

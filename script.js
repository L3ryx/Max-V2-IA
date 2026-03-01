async function generate(){

let autoMode = document.getElementById("autoMode")?.checked;

let data={
genre:document.getElementById("genre").value,
age:document.getElementById("age").value,
haut:document.getElementById("haut").value,
bas:document.getElementById("bas").value,
fond:document.getElementById("fond").value,
angle:document.getElementById("angle").value,
autoMode:autoMode
};

let res=await fetch("/generate",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
});

let json=await res.json();

document.getElementById("output").value=json.prompt;

}
